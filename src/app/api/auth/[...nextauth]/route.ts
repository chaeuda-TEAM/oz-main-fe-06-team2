import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth();

export { handler as GET  };

const authOptions: any = {
  provider: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ]
}
const handler = NextAuth(authOptions)

export { authOptions, handler as GET };
