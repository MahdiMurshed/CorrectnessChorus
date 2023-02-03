import prisma from '@lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session: async ({ session, user }: any) =>
      session?.user
        ? {
            ...session,
            user: {
              ...session.user,
              id: user.id,
            },
          }
        : session,

    async redirect({ url, baseUrl }) {
      return `http://localhost:3000/docs`;
    },
  },
};
export default NextAuth(authOptions);
