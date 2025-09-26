import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Geminitor | Gemini Chatbot',
  description: 'Interact with a Gemini-powered assistant using the Vercel AI SDK.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-white text-slate-900">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
