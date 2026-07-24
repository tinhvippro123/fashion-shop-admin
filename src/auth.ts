import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Mock authentication check
        if (
          credentials?.email === "admin@luxefashion.com" &&
          credentials?.password === "admin123"
        ) {
          return { 
            id: "1", 
            name: "Admin Luxe Fashion", 
            email: "admin@luxefashion.com",
            role: "ADMIN"
          };
        }
        
        return null; // Return null if user data could not be retrieved
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.sub;
        // @ts-ignore
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.role = user.role;
      }
      return token;
    }
  },
  secret: process.env.AUTH_SECRET,
});
