import { Suspense } from 'react';
import { auth } from '@clerk/nextjs/server';
import { LandingPage } from '../components/landing-page';

function LoadingLanding() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-10 text-slate-500">
      <p className="text-sm font-medium">Preparing your autonomous workspace…</p>
    </main>
  );
}

export default async function Page() {
  await auth.protect();

  return (
    <Suspense fallback={<LoadingLanding />}>
      <LandingPage />
    </Suspense>
  );
}
