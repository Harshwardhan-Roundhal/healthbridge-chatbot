import React from 'react';
import type { Message } from '../types';
import { User, Bot} from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isStreaming = message.isStreaming;

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[90%] md:max-w-[80%] lg:max-w-[70%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-sm ${
          isUser ? 'bg-indigo-600' : 'bg-medical-600'
        }`}>
          {isUser ? <User className="w-5 h-5 text-white" /> : <Bot className="w-6 h-6 text-white" />}
        </div>

        {/* Bubble */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-5 py-3.5 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words ${
            isUser 
              ? 'bg-indigo-600 text-white rounded-tr-sm' 
              : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'
          }`}>
            {message.text}
            {isStreaming && (
              <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-medical-500 animate-pulse"></span>
            )}
          </div>
          
          {/* Metadata */}
          <span className="text-[10px] text-slate-400 mt-1 px-1">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            {!isUser && isStreaming && <span className="ml-2 text-medical-600 font-medium">Dr. Gemini is typing...</span>}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;