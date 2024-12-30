import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const BASEURL = process.env.NEXT_PUBLIC_BASEURL;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string, 
    }),
  ],
  pages: {
    signIn: `${BASEURL}/api/auth/google/login/dev`,
  },
  session: {
    strategy: 'jwt', 
    maxAge: 60 * 60 * 24 // JWT 방식으로 세션 관리
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
