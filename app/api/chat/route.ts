import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { convertToCoreMessages, streamText, type UIMessage } from 'ai';

type ChatRequestBody = {
  messages: UIMessage[];
};

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return new Response('Missing GEMINI_API_KEY', { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON payload', { status: 400 });
  }

  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return new Response('Invalid request body', { status: 400 });
  }

  const chatBody = body as ChatRequestBody;

  if (!Array.isArray(chatBody.messages)) {
    return new Response('Invalid request body', { status: 400 });
  }

  const messagesWithoutIds = chatBody.messages.map((message) => {
    const { id, ...rest } = message;
    void id;
    return rest;
  });

  const result = await streamText({
    model: google('models/gemini-2.0-flash-exp'),
    messages: convertToCoreMessages(messagesWithoutIds),
    temperature: 0.3,
    maxOutputTokens: 2048,
  });

  return result.toUIMessageStreamResponse();
}
