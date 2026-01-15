# Dr. Gemini - AI Medical Assistant Chatbot

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)

A modern, responsive medical assistant chatbot built with React, TypeScript, and Vite. Powered by Google's Gemini AI to help users understand their symptoms and health concerns.

## 🌐 Live Demo

**👉 [Try it live here](https://healthbridge-chatbot.vercel.app/)**

The application is deployed and ready to use. Visit the link above to interact with the AI medical assistant.

## Features

- 🤖 **AI-Powered Medical Assistant**: Uses Google Gemini AI for intelligent health consultations
- 💬 **Real-time Chat Interface**: Stream responses with a beautiful, modern UI
- 🎨 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔒 **Secure**: API keys stored in environment variables
- ⚡ **Fast**: Built with Vite for lightning-fast development and builds
- 🎯 **Type-Safe**: Full TypeScript support

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Google Gemini AI** - AI backend
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/gemini-chatbot-doctor.git
cd gemini-chatbot-doctor
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your API key to `.env`:
```
VITE_API_KEY=your_api_key_here
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
gemini-chatbot-doctor/
├── components/          # React components
│   ├── Header.tsx
│   ├── MessageBubble.tsx
│   └── WelcomeScreen.tsx
├── services/           # API services
│   └── geminiService.ts
├── src/               # Source files
│   ├── App.tsx        # Main app component
│   └── index.tsx      # Entry point
├── .env               # Environment variables (not committed)
├── .env.example       # Environment template
├── vercel.json        # Vercel deployment config
└── package.json       # Dependencies
```

## Deployment

### Live Application

🚀 **Live Application**: [https://healthbridge-chatbot.vercel.app/](https://healthbridge-chatbot.vercel.app/)

The application is currently deployed on Vercel and accessible at the link above.

### Deploy to Vercel

For detailed step-by-step deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

**Quick Steps:**
1. Push your code to GitHub/GitLab/Bitbucket
2. Import project in Vercel
3. Set environment variable `VITE_API_KEY` in Vercel dashboard
4. Deploy!

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_KEY` | Google Gemini API key | Yes |

## Important Notes

⚠️ **Security**: Never commit your `.env` file or API keys to version control.

⚠️ **Medical Disclaimer**: This is an AI assistant for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.

## License

This project is private and proprietary.

## Support

For deployment help, see [DEPLOYMENT.md](./DEPLOYMENT.md) or check Vercel's [documentation](https://vercel.com/docs).
