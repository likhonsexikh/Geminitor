import type { UIMessage } from 'ai';
import { cn } from '../lib/utils';

type MessagePart = UIMessage['parts'][number];

function isTextLikePart(part: MessagePart): part is MessagePart & { text: string } {
  return 'text' in part && typeof part.text === 'string';
}

export function ChatMessage({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user';
  return (
    <div
      className={cn(
        'flex w-full gap-3 rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm backdrop-blur transition hover:shadow-md',
        isUser ? 'border-primary/20 bg-primary/10' : 'border-slate-200'
      )}
      aria-live="polite"
    >
      <div
        className={cn(
          'flex h-10 w-10 flex-none items-center justify-center rounded-full text-sm font-semibold text-white shadow-inner',
          isUser ? 'bg-slate-900' : 'bg-purple-600'
        )}
        aria-hidden
      >
        {isUser ? 'You' : 'AI'}
      </div>
      <div className="flex-1 space-y-2 text-sm leading-relaxed text-slate-800">
        {message.parts.map((part, index) => {
          if (isTextLikePart(part)) {
            return (
              <p key={index} className="whitespace-pre-wrap">
                {part.text}
              </p>
            );
          }

          if (part.type === 'step-start') {
            return (
              <p key={index} className="text-xs uppercase tracking-wide text-slate-500">
                Step started…
              </p>
            );
          }

          if (part.type.startsWith('tool-') || part.type === 'dynamic-tool') {
            return (
              <p key={index} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
                {`Tool update (${part.type.replace('tool-', '')})`}
              </p>
            );
          }

          return (
            <p key={index} className="text-xs text-slate-500">
              {`[${part.type} content not displayed]`}
            </p>
          );
        })}
      </div>
    </div>
  );
}
