import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { convertToModelMessages, streamText, type UIMessage } from 'ai';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return new Response('Missing GEMINI_API_KEY', { status: 500 });
  }

  let body: { messages?: UIMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON payload', { status: 400 });
  }

  if (!Array.isArray(body.messages)) {
    return new Response('Invalid request body', { status: 400 });
  }

  const uiMessages = body.messages.map(({ id, ...message }) => {
    void id;
    return message;
  });

  const result = await streamText({
    model: google('models/gemini-2.0-flash-exp'),
    messages: convertToModelMessages(uiMessages),
    temperature: 0.3,
    maxOutputTokens: 2048,
  });

  return result.toUIMessageStreamResponse();
}
