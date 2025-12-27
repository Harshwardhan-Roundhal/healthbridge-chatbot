import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Send, Mic, Image as ImageIcon } from 'lucide-react';
import Header from '../components/Header';

import MessageBubble from '../components/MessageBubble';
import WelcomeScreen from '../components/WelcomeScreen';
import { createChatSession } from '../services/geminiService';
import type  { Message } from '../types';
import { Chat, GenerateContentResponse } from "@google/genai";

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatInitialized, setChatInitialized] = useState(false);
  
  // Ref to hold the mutable chat session
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize chat session only once
  useEffect(() => {
    try {
      chatSessionRef.current = createChatSession();
      setChatInitialized(true);
    } catch (error) {
      console.error("Failed to initialize chat:", error);
      const errorMessage: Message = {
        id: 'system-error',
        role: 'model',
        text: "Error: API Key missing or invalid. Please check your configuration.",
        timestamp: new Date()
      };
      setMessages([errorMessage]);
    }
  }, []);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle textarea auto-resize
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${Math.min(textAreaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputText]);

  const handleSendMessage = async (text: string = inputText) => {
    if (!text.trim() || !chatSessionRef.current || isLoading) return;

    const userMessageText = text.trim();
    setInputText('');
    
    // Reset height of textarea
    if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto';
    }

    // 1. Add User Message
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: userMessageText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    // 2. Add Placeholder AI Message
    const aiMsgId = (Date.now() + 1).toString();
    const newAiMsg: Message = {
      id: aiMsgId,
      role: 'model',
      text: '', // Start empty
      timestamp: new Date(),
      isStreaming: true
    };
    setMessages(prev => [...prev, newAiMsg]);

    try {
      // 3. Start Streaming
      const result = await chatSessionRef.current.sendMessageStream({ message: userMessageText });
      
      let fullResponseText = '';

      for await (const chunk of result) {
        const chunkContent = chunk as GenerateContentResponse;
        const textChunk = chunkContent.text;
        
        if (textChunk) {
          fullResponseText += textChunk;
          
          setMessages(prev => 
            prev.map(msg => 
              msg.id === aiMsgId 
                ? { ...msg, text: fullResponseText } 
                : msg
            )
          );
        }
      }

      // 4. Finalize message
      setMessages(prev => 
        prev.map(msg => 
          msg.id === aiMsgId 
            ? { ...msg, isStreaming: false } 
            : msg
        )
      );

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === aiMsgId 
            ? { ...msg, text: "I apologize, but I encountered an error processing your request. Please try again.", isStreaming: false } 
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <Header />

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto relative scroll-smooth">
        <div className="w-full max-w-4xl mx-auto min-h-full pb-32 pt-6 px-4">
          
          {messages.length === 0 ? (
            <WelcomeScreen onStart={handleSendMessage} />
          ) : (
            <>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} />
            </>
          )}

        </div>
      </main>

      {/* Sticky Input Area */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-50 via-slate-50 to-transparent pt-10 pb-6 px-4 z-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-2 flex items-end gap-2 relative">
            
            {/* Action Buttons (Visual only for now) */}
            <div className="hidden sm:flex pb-2 pl-2 gap-1 text-slate-400">
               <button className="p-2 hover:bg-slate-100 rounded-full transition-colors" title="Attach image (demo)">
                 <ImageIcon className="w-5 h-5" />
               </button>
               <button className="p-2 hover:bg-slate-100 rounded-full transition-colors" title="Voice input (demo)">
                 <Mic className="w-5 h-5" />
               </button>
            </div>

            <textarea
              ref={textAreaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isLoading ? "Dr. Gemini is analyzing..." : "Describe your symptoms..."}
              className="w-full bg-transparent border-none text-slate-800 placeholder:text-slate-400 focus:ring-0 resize-none py-3 px-3 min-h-[48px] max-h-[120px] text-base"
              disabled={isLoading || !chatInitialized}
              rows={1}
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isLoading || !chatInitialized}
              className={`mb-1 p-3 rounded-xl flex-shrink-0 transition-all duration-200 ${
                inputText.trim() && !isLoading 
                  ? 'bg-medical-600 hover:bg-medical-700 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-300 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-center text-[10px] text-slate-400 mt-3">
             AI can make mistakes. Dr. Gemini is for informational purposes only and does not replace professional medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;