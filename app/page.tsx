'use client';

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useChat } from '@ai-sdk/react';
import { ChatMessage } from '../components/chat-message';

const starterPrompts = [
  'Explain the MDX-first architecture used by v0.',
  'How does the Vercel AI SDK help build chatbots?',
  'Suggest accessibility best practices for AI chat UIs.',
];

export default function Page() {
  const { messages, sendMessage, status, error } = useChat();
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const isLoading = status === 'submitted' || status === 'streaming';

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (trimmed.length === 0 || isLoading) {
      return;
    }

    try {
      await sendMessage({ text: trimmed });
      setInput('');
    } catch (sendError) {
      console.error('Failed to send message', sendError);
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),_transparent_55%)]" />
      <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col gap-16 px-4 pb-24 pt-20 md:px-8">
        <header className="grid gap-10 text-center md:grid-cols-[1.1fr_0.9fr] md:items-center md:text-left">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
              Autonomy for All
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Build software that runs itself—<span className="bg-gradient-to-r from-indigo-300 via-sky-200 to-purple-200 bg-clip-text text-transparent">10× more autonomous</span> with Geminitor.
            </h1>
            <p className="max-w-xl text-base text-slate-200 sm:text-lg">
              Geminitor is your always-on software house: plan, generate, and ship AI-native products with agents that test, fix, and relaunch until it&apos;s done. Prototype faster, iterate longer, and never lose momentum.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-start">
              <a
                href="#chat"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
              >
                Start building with agents
              </a>
              <p className="text-sm text-slate-300">Automate. Delegate. Accelerate.</p>
            </div>
          </div>

          <div className="relative flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-2xl shadow-indigo-900/30 backdrop-blur">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200/80">Agent Capabilities</div>
            <dl className="grid grid-cols-1 gap-4 text-sm text-slate-200 sm:grid-cols-2">
              <div>
                <dt className="text-indigo-200">App Testing</dt>
                <dd className="text-slate-300">Run. Fix. Retest. Agents orchestrate CI loops with longer runtime horizons.</dd>
              </div>
              <div>
                <dt className="text-indigo-200">Agent Generation</dt>
                <dd className="text-slate-300">Spin up specialized squads with their own Git history and context.</dd>
              </div>
              <div>
                <dt className="text-indigo-200">Workflow Autonomy</dt>
                <dd className="text-slate-300">Delegate complex builds end-to-end with Plan/Act execution.</dd>
              </div>
              <div>
                <dt className="text-indigo-200">Continuous Shipping</dt>
                <dd className="text-slate-300">Deploy faster with Stack-secured environments ready out of the box.</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="grid gap-10 text-left md:grid-cols-[1.2fr_0.8fr] md:items-start">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Infinitely more possibilities</h2>
            <p className="text-slate-200">
              From whiteboard to production, Geminitor keeps shipping. Use natural language to launch projects, spin up UI experiments with shadcn/ui, and sync changes to version control automatically. Agents coordinate code reviews, accessibility sweeps, and observability setup while you stay focused on vision.
            </p>
            <ul className="grid gap-4 text-sm text-slate-200 sm:grid-cols-2">
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-indigo-900/20">
                <p className="text-sm font-semibold text-white">Plan → Act → Ship</p>
                <p className="mt-1 text-slate-300">Autonomous sprints that scope work, pair program, and merge when tests pass.</p>
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-indigo-900/20">
                <p className="text-sm font-semibold text-white">Stack-native security</p>
                <p className="mt-1 text-slate-300">Secrets, environments, and telemetry wired from prompt to production.</p>
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-indigo-900/20">
                <p className="text-sm font-semibold text-white">Human-in-the-loop checkpoints</p>
                <p className="mt-1 text-slate-300">Approve major milestones while agents keep iterating in the background.</p>
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-indigo-900/20">
                <p className="text-sm font-semibold text-white">Multi-modal expertise</p>
                <p className="mt-1 text-slate-300">Design, docs, and code updates aligned across every touchpoint.</p>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-900/40">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-200/80">Run. Run. Done.</p>
            <p className="mt-4 text-lg font-semibold text-white">Agents execute layered test plans, debug failures, and retry automatically until the build ships.</p>
            <p className="mt-3 text-sm text-slate-300">When you say &ldquo;Ship the analytics dashboard,&rdquo; Geminitor sets up the repo, provisions Neon &amp; Upstash, scaffolds shadcn/ui screens, and keeps iterating until everything passes.</p>
          </div>
        </div>

        <div id="chat" className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-white">Ask Geminitor anything</h2>
              <p className="text-sm text-slate-300">Break down tough problems, explore new subjects, or co-build full-stack apps step-by-step.</p>
            </div>
            <div className="flex flex-wrap gap-2" aria-label="Suggested prompts">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => {
                    setInput('');
                    void sendMessage({ text: prompt });
                  }}
                  className="rounded-full border border-indigo-300/60 bg-white/10 px-4 py-2 text-xs font-medium text-indigo-100 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white/20 hover:text-white"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <section className="relative flex h-[60vh] min-h-[420px] flex-col gap-4 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-indigo-900/40 backdrop-blur">
            <div className="flex-1 space-y-4 overflow-y-auto pr-2" role="log" aria-live="polite">
              {messages.length === 0 && (
                <div className="grid h-full place-content-center gap-3 text-center text-slate-300">
                  <p className="text-base font-semibold text-white">Start a conversation</p>
                  <p className="text-sm">Geminitor understands the reverse-engineered v0 prompt, AI Elements, and the Vercel AI SDK.</p>
                </div>
              )}
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="h-2 w-2 animate-ping rounded-full bg-indigo-400" aria-hidden />
                  Thinking…
                </div>
              )}
              {error && <p className="text-sm text-red-400">{error.message}</p>}
              <div ref={endRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-inner shadow-indigo-900/30"
            >
              <label htmlFor="prompt" className="text-sm font-medium text-slate-200">
                Describe what you need
              </label>
              <textarea
                id="prompt"
                name="prompt"
                value={input}
                onChange={handleInputChange}
                placeholder="How do I stream responses from Gemini using the AI SDK?"
                className="h-24 w-full resize-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-100 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                required
              />
              <button
                type="submit"
                disabled={isLoading || input.trim().length === 0}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-900/40 transition hover:from-indigo-400 hover:to-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? 'Sending…' : 'Send'}
              </button>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}
