// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyUser } from "@/lib/utility"; // Fungsi verifikasi (dijelaskan di bawah)

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "your_username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Lakukan verifikasi user di sini
        const user = await verifyUser(credentials.username, credentials.password);
        
        // Jika verifikasi berhasil, kembalikan objek user
        if (user) {
          return user;
        }
        // Jika gagal, kembalikan null
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      session.user = user; // Menyimpan user ke session
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});
