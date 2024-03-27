declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    user: {
      id: string | number;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      message?: IAuthenticationErrror | null;
      user: Users | null;
      token?: string | null;
      nickname?: string | null;
      bio?: null | string;
      avatarUrl?: null | string;
      githubUrl?: null | string;
      blogUrl?: null | string;
      baekjoonId?: null | string;
      provider?: string;
      accessToken?: string;
    };
    token?: string | null;
  }
}
