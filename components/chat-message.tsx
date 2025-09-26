import type { UIMessage } from 'ai';
import { cn } from '../lib/utils';

function extractText(message: UIMessage) {
  return message.parts
    .filter(
      (part): part is { type: 'text' | 'reasoning'; text: string } =>
        part.type === 'text' || part.type === 'reasoning'
    )
    .map((part) => part.text.trim())
    .filter(Boolean)
    .join('\n\n');
}

export function ChatMessage({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user';
  const textContent = extractText(message);
  const supplementalParts = message.parts.filter(
    (part) => part.type !== 'text' && part.type !== 'reasoning'
  );

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
      <div className="flex flex-1 flex-col gap-3">
        {textContent && (
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">{textContent}</p>
        )}
        {supplementalParts.length > 0 && (
          <div className="space-y-2 text-xs text-slate-500">
            {supplementalParts.map((part, index) => (
              <pre
                key={`${message.id}-part-${index}`}
                className="overflow-x-auto rounded-lg bg-slate-100 p-3 text-[11px] text-slate-700"
              >
                {JSON.stringify(part, null, 2)}
              </pre>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
