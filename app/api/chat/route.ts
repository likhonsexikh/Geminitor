import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, type ChatRequestBody } from 'ai';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return new Response('Missing GEMINI_API_KEY', { status: 500 });
  }

  let body: ChatRequestBody;
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON payload', { status: 400 });
  }

  if (!Array.isArray(body.messages)) {
    return new Response('Invalid request body', { status: 400 });
  }

  const result = await streamText({
    model: google('models/gemini-2.0-flash-exp'),
    messages: body.messages,
    temperature: 0.3,
    maxOutputTokens: 2048,
  });

  return result.toDataStreamResponse();
}
