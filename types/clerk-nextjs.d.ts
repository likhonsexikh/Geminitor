import type { ClerkClient } from '@clerk/backend';

declare module '@clerk/nextjs/server' {
  export const clerkClient: ClerkClient;
}
