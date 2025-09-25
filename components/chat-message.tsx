import type { Message } from 'ai';
import { cn } from '../lib/utils';

export function ChatMessage({ message }: { message: Message }) {
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
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
        {message.content}
      </p>
    </div>
  );
}
