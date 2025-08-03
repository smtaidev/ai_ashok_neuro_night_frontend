import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    username: string | null;
  }

  interface Session {
    user: User & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    username: string | null;
  }
}
