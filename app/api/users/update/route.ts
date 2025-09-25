import { NextResponse, type NextRequest } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import type { ClerkClient } from '@clerk/backend';

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  const params = { firstName: 'John', lastName: 'Wick' };

  const user = await (clerkClient as unknown as ClerkClient).users.updateUser(userId, params);

  return NextResponse.json({ user });
}
