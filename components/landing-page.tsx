'use client';

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import { useChat } from '@ai-sdk/ui/react';
import { ChatMessage } from './chat-message';

const starterPrompts = [
  'Generate a launch plan for an autonomous software house.',
  'How can Plan/Act modes accelerate shipping web apps?',
  'Draft MCP tooling to connect Git + filesystem servers.',
];

const capabilityHighlights = [
  {
    title: '10× more autonomous',
    description:
      'Agent 3 maximizes autonomy with longer run times, deeper task queues, and self-supervised execution.',
  },
  {
    title: 'Test · Fix · Retest',
    description:
      'Automated browser testing loops catch issues while you build, complete with video replays.',
  },
  {
    title: 'Run · Run · Done',
    description:
      'Delegate complex builds from prototype to production-ready delivery with agent-generated code.',
  },
  {
    title: 'Automate · Delegate · Accelerate',
    description:
      'Spin up domain-specific agents that orchestrate prompts, files, and deployments for you.',
  },
];

const learningHighlights = [
  {
    title: 'Learn anything, step by step',
    description:
      'Break down new stacks or frameworks into digestible lessons generated just for you.',
  },
  {
    title: 'Practice with quizzes',
    description:
      'Create flashcards and adaptive quizzes to reinforce new topics on demand.',
  },
  {
    title: 'Get homework help',
    description:
      'Tackle tough problems with simple explanations, real code, and contextual hints.',
  },
  {
    title: 'Explore new subjects',
    description:
      'Dive into anything you are curious about with quick, clear answers and curated resources.',
  },
];

const workflowSteps = [
  {
    title: 'Plan mode',
    description:
      'Scope releases, prioritize tickets, and share intent before touching the code. The agent keeps a running task list and chain-of-thought notes for teammates.',
  },
  {
    title: 'Act mode',
    description:
      'Agent writes code, modifies files, executes terminals, and commits to git-backed sandboxes so you can review diffs before merging.',
  },
  {
    title: 'Iterate mode',
    description:
      'Target specific snippets with precision, enforce accessibility, and re-run automated QA until the experience shines on every device.',
  },
];

const buildOptions = [
  {
    title: 'Build the entire app',
    subtitle: '20+ mins',
    description:
      'Let Agent assemble full-stack experiences from the outset, including database, auth, and deployment.',
  },
  {
    title: 'Start with a design',
    subtitle: '3 mins',
    description:
      'Preview an interactive front-end prototype, then extend it into a production build when you are ready.',
  },
];

const integrationHighlights = [
  {
    title: 'Neon + Postgres',
    description:
      'Provision cloud Postgres instances instantly and connect with DATABASE_URL, PGHOST, and other secrets managed by Vercel.',
  },
  {
    title: 'Upstash Redis',
    description:
      'Stream session memory and job queues with KV_REST tokens, REDIS_URL, and zero-maintenance serverless caching.',
  },
  {
    title: 'Stack Auth',
    description:
      'Protect dashboards with STACK_SECRET_SERVER_KEY and publishable client keys that work across environments.',
  },
  {
    title: 'Grok + Groq APIs',
    description:
      'Experiment with XAI and Groq models using project-wide API keys while routing traffic through the AI SDK.',
  },
];

const vibeStatements = [
  'Vibe coding has changed how software gets built.',
  'Tools like Geminitor turn ideas into working prototypes in seconds.',
  'shadcn/ui components snap together from natural-language prompts, giving every screen polish out of the box.',
];

const toolHighlights = [
  {
    title: 'App Testing',
    description:
      'Enable autonomous tests that navigate your UI like a real user, logging issues and suggested fixes.',
  },
  {
    title: 'Max Autonomy (Beta)',
    description:
      'Increase run times up to 200 minutes so agents can scope, build, and validate features end to end.',
  },
  {
    title: 'Agents & Automations',
    description:
      'Deploy Slack bots, Telegram assistants, and scheduled workflows powered by the same agent core.',
  },
];

function CodeBlock({
  title,
  meta,
  code,
}: {
  title: string;
  meta: string;
  code: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-950/90 text-slate-100 shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/70 px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-300">
        <span>{title}</span>
        <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10px] text-slate-200">{meta}</span>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function LandingPage() {
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
    <main className="flex min-h-screen flex-col gap-20 bg-slate-50 pb-24">
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-950 via-purple-900 to-indigo-900 px-6 pb-28 pt-24 text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
              Autonomy for all
            </span>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Thinking longer for better answers. Building faster for bigger ideas.
            </h1>
            <p className="text-lg text-slate-200">
              Geminitor is your AI-powered coding assistant developed by Vercel. Generate responsive interfaces, wire up MCP tools, and orchestrate autonomous agents that run design-to-deploy workflows without leaving chat.
            </p>
            <ul className="space-y-2 text-sm text-slate-200/80">
              {vibeStatements.map((statement) => (
                <li key={statement} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-300" />
                  <span>{statement}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-100/80">
              <Link
                href="#agent-chat"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-purple-500/30 transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Launch agent workspace
              </Link>
              <Link
                href="https://chat-sdk.dev/docs/customization/artifacts"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Explore docs
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilityHighlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:-translate-y-1 hover:border-white/20"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-100/80">
                  {highlight.title}
                </h3>
                <p className="mt-2 text-sm text-slate-200/80">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 -bottom-40 h-72 bg-gradient-to-t from-slate-50 to-transparent" aria-hidden />
      </section>

      <section className="px-6" id="agent-chat">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
          <div className="space-y-8">
            <header className="space-y-3">
              <p className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                Make · test · iterate
              </p>
              <h2 className="text-3xl font-semibold text-slate-900">
                Agent chat interface with build options designed for autonomy
              </h2>
              <p className="text-base text-slate-600">
                Use natural language to build, test, and ship. Attach files, capture webpages, or hand off terminal commands—Geminitor keeps context across multi-file codebases like a dedicated software house with its own git.
              </p>
            </header>

            <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-purple-100">
              <div className="flex flex-wrap gap-3 text-sm">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleStarterPromptClick(prompt)}
                    className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-slate-700 transition hover:-translate-y-0.5 hover:border-purple-200 hover:bg-purple-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="rounded-2xl border border-slate-200/70 bg-gradient-to-b from-white via-white to-slate-50 p-5 shadow-inner">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <div className="inline-flex items-center gap-2 font-medium text-slate-700">
                    <span className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase">
                      Build
                    </span>
                    Make, test, iterate…
                  </div>
                  <div className="flex items-center gap-3 text-xl text-slate-400">
                    <span aria-hidden>⌘</span>
                    <span aria-hidden>⌥</span>
                    <span aria-hidden>↩︎</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-600">
                  To communicate your request to Agent, enter a prompt in the text area. Attach files, copy web pages, or launch terminal executions directly in chat.
                </p>
              </div>

              <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm">
                {buildOptions.map((option) => (
                  <div
                    key={option.title}
                    className="flex flex-col gap-2 rounded-xl border border-slate-200/80 bg-slate-50 p-4 text-sm text-slate-700"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900">{option.title}</h3>
                      <span className="text-xs uppercase tracking-wide text-slate-500">{option.subtitle}</span>
                    </div>
                    <p>{option.description}</p>
                  </div>
                ))}
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:from-purple-500 hover:to-indigo-400"
                >
                  Start building
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {toolHighlights.map((tool) => (
                <div
                  key={tool.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-slate-900">{tool.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-2xl shadow-purple-100">
            <header className="space-y-1">
              <h3 className="text-lg font-semibold text-slate-900">Agent console</h3>
              <p className="text-sm text-slate-500">
                Stream UI updates as the agent plans, executes tools, and synthesizes answers.
              </p>
            </header>

            <div className="flex-1 space-y-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 p-4">
              <div className="flex h-[420px] flex-col gap-3 overflow-y-auto pr-2" role="log" aria-live="polite">
                {messages.length === 0 && !isLoading && (
                  <div className="grid flex-1 place-content-center gap-3 text-center text-slate-500">
                    <p className="text-base font-semibold text-slate-600">Start a conversation</p>
                    <p className="text-sm">
                      Geminitor generates UI and code snippets from natural language prompts and understands multi-file context.
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

              <form onSubmit={handleSubmit} className="grid gap-3">
                <label htmlFor="prompt" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Prompt the agent
                </label>
                <textarea
                  id="prompt"
                  name="prompt"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Automate QA with MCP tools and terminal execution"
                  className="h-28 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
                  required
                />
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Attach files, terminal transcripts, or screenshots to enrich the context.</span>
                  <span className="font-medium text-purple-600">Shift ⌘ ↩ to send</span>
                </div>
                <button
                  type="submit"
                  disabled={isLoading || input.trim().length === 0}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:from-purple-500 hover:to-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? 'Sending…' : 'Send message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 rounded-3xl border border-slate-200 bg-white/90 p-10 shadow-xl shadow-purple-100">
          <header className="space-y-3">
            <h2 className="text-3xl font-semibold text-slate-900">Handle complex tasks from start to finish</h2>
            <p className="text-base text-slate-600">
              From sourcing the perfect product to building spreadsheet automations, Geminitor treats every request like a project—planning, executing, and iterating until the job is done.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {workflowSteps.map((step) => (
              <div key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{step.title}</h3>
                <p className="mt-3 text-base text-slate-700">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {learningHighlights.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6">
        <div className="mx-auto grid w-full max-w-6xl gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-purple-100 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-900">Wire up MCP tools & multimodal models</h2>
            <p className="text-base text-slate-600">
              The AI SDK offers a lightweight client that retrieves tools from MCP servers. Combine outputs from stdio, SSE, and StreamableHTTP transports, then close connections gracefully after use.
            </p>
            <p className="text-base text-slate-600">
              Integrate Groq, Gemini, or your own endpoints. Generate UI-ready responses, trigger terminal executions, and let agents maintain their own git-backed worktrees.
            </p>
          </div>
          <div className="grid gap-6">
            <CodeBlock
              title="MCP client setup"
              meta='```ts project="Geminitor" file="lib/mcp-client.ts" type="code"'
              code={`import { experimental_createMCPClient, stepCountIs, generateText } from 'ai';
import { Experimental_StdioMCPTransport } from 'ai/mcp-stdio';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp';
import { openai } from '@ai-sdk/openai';

const stdioClient = new StdioClientTransport({
  command: 'node',
  args: ['src/stdio/dist/server.js'],
});

const client = await experimental_createMCPClient({
  transport: stdioClient,
});

const response = await generateText({
  model: openai('gpt-4o'),
  tools: await client.tools(),
  stopWhen: stepCountIs(5),
  messages: [
    { role: 'user', content: [{ type: 'text', text: 'Find products under $100' }] },
  ],
});

await client.close();`}
            />
            <CodeBlock
              title="Streaming with Groq"
              meta='```ts project="Geminitor" file="lib/stream-groq.ts" type="code"'
              code={`import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

const result = streamText({
  model: groq('deepseek-r1-distill-llama-70b'),
  prompt: 'Invent a new holiday and describe its traditions.',
});

for await (const textPart of result.textStream) {
  process.stdout.write(textPart);
}`}
            />
          </div>
        </div>
      </section>

      <section className="px-6">
        <div className="mx-auto w-full max-w-6xl space-y-10 rounded-3xl border border-slate-200 bg-white/95 p-10 shadow-xl shadow-purple-100">
          <header className="space-y-3 text-center">
            <h2 className="text-3xl font-semibold text-slate-900">Your stack, wired by default</h2>
            <p className="mx-auto max-w-3xl text-base text-slate-600">
              Sync environment secrets from Neon, Upstash, Stack, and Grok so every generated workspace mirrors production. Geminitor keeps credentials safe while agents automate provisioning.
            </p>
          </header>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {integrationHighlights.map((integration) => (
              <div key={integration.title} className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-900">{integration.title}</h3>
                  <p>{integration.description}</p>
                </div>
                <span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-wide text-purple-600">Ready for autonomous runs</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-purple-900 to-indigo-900 p-10 text-center text-white shadow-2xl shadow-purple-200/50">
          <h2 className="text-4xl font-semibold">Autonomy for every team, from concept to launch</h2>
          <p className="text-base text-slate-100/80">
            Launch a protected agent workspace, spin up a fresh git branch, and watch as Geminitor plans, acts, tests, and iterates. Ready to build your autonomous software house?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link
              href="#agent-chat"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-purple-500/40 transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Open the agent console
            </Link>
            <Link
              href="https://chat-sdk.dev/docs"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Read the build guide
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
