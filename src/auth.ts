import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
export const { handlers, auth } = NextAuth({
  providers: [GitHub, CredentialsProvider],
});
