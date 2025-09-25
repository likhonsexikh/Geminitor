'use client';

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useChat } from '@ai-sdk/ui/react';
import { ChatMessage } from '../components/chat-message';

const starterPrompts = [
  'Explain the MDX-first architecture used by v0.',
  'How does the Vercel AI SDK help build chatbots?',
  'Suggest accessibility best practices for AI chat UIs.',
];

export default function Page() {
  const { messages, sendMessage, status, error, clearError } = useChat();
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const isLoading = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (error) {
      clearError?.();
    }
    setInput(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = input.trim();
    if (value.length === 0 || isLoading) {
      return;
    }

    try {
      await sendMessage({ text: value });
      setInput('');
    } catch (sendError) {
      console.error('Failed to send message', sendError);
    }
  };

  const handleStarterPromptClick = (prompt: string) => {
    if (isLoading) {
      return;
    }

    clearError?.();
    setInput('');
    void sendMessage({ text: prompt });
  };

  return (
    <main className="flex min-h-screen flex-col items-center px-4 pb-20 pt-16">
      <section className="mx-auto w-full max-w-4xl space-y-10">
        <header className="space-y-3 text-center">
          <p className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
            Gemini-powered assistant
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Build with confidence using the Vercel AI SDK
          </h1>
          <p className="text-lg text-slate-600">
            Ask Geminitor about AI Elements, the Vercel AI SDK, or best practices for crafting multi-modal MDX experiences.
          </p>
        </header>

        <div className="flex flex-wrap gap-2" aria-label="Suggested prompts">
          {starterPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleStarterPromptClick(prompt)}
              className="rounded-full border border-purple-200 bg-white/80 px-4 py-2 text-sm text-purple-700 shadow-sm transition hover:-translate-y-0.5 hover:border-purple-300 hover:bg-white hover:shadow-md"
            >
              {prompt}
            </button>
          ))}
        </div>

        <section className="relative flex h-[60vh] min-h-[420px] flex-col gap-4 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 p-6 shadow-xl shadow-purple-100/50 backdrop-blur">
          <div className="flex-1 space-y-4 overflow-y-auto pr-2" role="log" aria-live="polite">
            {messages.length === 0 && (
              <div className="grid h-full place-content-center gap-3 text-center text-slate-500">
                <p className="text-base font-semibold text-slate-600">Start a conversation</p>
                <p className="text-sm">
                  Geminitor understands the reverse-engineered v0 prompt, AI Elements, and the Vercel AI SDK.
                </p>
              </div>
            )}
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="h-2 w-2 animate-ping rounded-full bg-purple-500" aria-hidden />
                Thinking…
              </div>
            )}
            {error && <p className="text-sm text-red-500">{error.message}</p>}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-inner"
          >
            <label htmlFor="prompt" className="text-sm font-medium text-slate-600">
              Ask Geminitor anything
            </label>
            <textarea
              id="prompt"
              name="prompt"
              value={input}
              onChange={handleInputChange}
              placeholder="How do I stream responses from Gemini using the AI SDK?"
              className="h-24 w-full resize-none rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
              required
            />
            <button
              type="submit"
              disabled={isLoading || input.trim().length === 0}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:from-purple-500 hover:to-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? 'Sending…' : 'Send'}
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}
