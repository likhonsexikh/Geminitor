# Geminitor

Geminitor is a Gemini-powered chatbot starter built with Next.js 14 and the Vercel AI SDK. It demonstrates how to stream responses from Google Gemini models using the unified `ai` package together with a minimal chat user interface.

## Prerequisites

- Node.js 18 or later
- A `GEMINI_API_KEY` environment variable (or Vercel AI Gateway key configured for Gemini)

## Getting Started

```bash
npm install
cp .env.example .env.local # add GEMINI_API_KEY
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) to chat with Geminitor.

## Project Structure

- `app/page.tsx` – Client-side chat experience powered by the `useChat` hook.
- `app/api/chat/route.ts` – Streaming API route that proxies requests to Gemini via the AI SDK.
- `components/chat-message.tsx` – Message bubbles with simple styling.
- `lib/utils.ts` – Utility helpers.

## Environment Variables

Create an `.env.local` file with the following entry:

```bash
GEMINI_API_KEY="your-google-generative-ai-key"
```

If you use the [Vercel AI Gateway](https://vercel.com/docs/ai-gateway), replace the key with the gateway token.

## Linting

```bash
npm run lint
```

This project uses Next.js ESLint rules for type-safe, accessible React applications.
