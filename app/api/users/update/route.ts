import { NextResponse, type NextRequest } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import type { ClerkClient } from '@clerk/backend';

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  const params = { firstName: 'John', lastName: 'Wick' };

  const maybeClient = clerkClient as unknown;
  const resolvedClerkClient: ClerkClient =
    typeof maybeClient === 'object' && maybeClient !== null && 'users' in (maybeClient as Record<string, unknown>)
      ? (maybeClient as ClerkClient)
      : await (clerkClient as () => Promise<ClerkClient>)();

  const user = await resolvedClerkClient.users.updateUser(userId, params);

  return NextResponse.json({ user });
}
