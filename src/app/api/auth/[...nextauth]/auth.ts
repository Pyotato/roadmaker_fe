import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// import GithubProvider from 'next-auth/providers/github';
import { API_ROUTES } from '@/constants';
import { consoleLog } from '@/utils/console-log';
import { getApiResponse } from '@/utils/get-api-response';
import { omit } from '@/utils/shared';

import { Member } from '@/types/user';
export const runtime = 'edge';

interface AuthResponse {
  member?: Member | null;
  tokenInfo?: { accessToken: string };
}
export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    // GithubProvider({
    //   clientId: process.env.NEXT_PUBLIC_AUTH_GITHUB_ID,
    //   clientSecret: process.env.NEXT_PUBLIC_AUTH_GITHUB_SECRET,
    // }),
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
              apiEndpoint: `${API_ROUTES.signin}`,
              method: 'POST',
            }),
          );

          if (res.id) {
            const userInfo = await Promise.resolve(
              getApiResponse<AuthResponse | null>({
                headers: { 'Content-Type': 'application/json' },
                apiEndpoint: `${API_ROUTES.userInfoSlash}${res?.id}`,
              }),
            );
            const user = {
              id: res?.id,
              ...userInfo,
              accessToken: res?.accessToken,
              provider: 'Credentials',
            } as unknown as User;
            return user;
          } else return res;
        } catch (e) {
          consoleLog(`${e}`);
        }
      },
    }),
  ],
  secret: process.env.SECRET || process.env.NEXTAUTH_SECRET,
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
