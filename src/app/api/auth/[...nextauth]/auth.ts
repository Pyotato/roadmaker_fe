import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

import { apiRoutes } from '@/constants';
import { omit } from '@/utils/shared';
import { consoleLog } from '@/utils/shared/console-log';
import { getApiResponse } from '@/utils/shared/get-api-response';
export const runtime = 'edge';

interface Member {
  id: number;
  email: string;
  nickname: string;
  bio?: null | string;
  avatarUrl?: null | string;
  githubUrl?: null | string;
  blogUrl?: null | string;
  baekjoonId?: null | string;
  provider?: string;
  accessToken?: string;
}

interface AuthResponse {
  member?: Member | null;
  tokenInfo?: { accessToken: string };
}
export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_AUTH_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_AUTH_GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'myEmail@email.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'my password',
        },
      },
      async authorize(credentials) {
        try {
          const res = await Promise.resolve(
            getApiResponse<AuthResponse | null>({
              requestData: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              headers: { 'Content-Type': 'application/json' },
              apiEndpoint: `${apiRoutes.signin}`,
              method: 'POST',
            }),
          );
          const user = {
            ...res?.member,
            ...res?.tokenInfo,
            provider: 'Credentials',
          };
          if (res) {
            return user;
          } else {
            return null;
          }
        } catch (e) {
          consoleLog(`${e}`);
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (user) {
        const customUser = user as unknown as Member;
        token.accessToken = customUser?.accessToken;
        token.id = user?.id;
        (token.email = user?.email), (token.nickname = customUser?.nickname);
        token.bio = customUser?.bio;
        token.picture = customUser?.avatarUrl;
        token.avatarUrl = customUser?.avatarUrl;
        token.githubUrl = customUser?.githubUrl;
        token.blogUrl = customUser?.blogUrl;
        token.provider = customUser?.provider;
      }
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.provider === 'Credentials')
        return {
          ...session,
          token: token.accessToken,
          user: omit(token, 'accessToken'),
        };
      return { ...session, token: token.accessToken };
    },
  },
});
