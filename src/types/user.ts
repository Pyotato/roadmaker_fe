import { ReactNode } from 'react';

export interface UserData {
  avatarUrl?: null | string;
  baekjoonId?: null | string;
  bio?: null | string;
  blogUrl?: null | string;
  email: null | string;
  githubUrl?: null | string;
  id: number;
  nickname: string;
}

export interface Member {
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

// interface Member {
//   id: number;
//   email: string;
//   nickname: string;
// bio?: null | string;
// avatarUrl?: null | string;
// githubUrl?: null | string;
// blogUrl?: null | string;
// baekjoonId?: null | string;
// provider?: string;
// accessToken?: string;
// }

export interface UserDataResponse {
  userData: UserData | null;
}

export interface MyPageProps {
  info: ReactNode;
  roadmaps: ReactNode;
}

export interface AboutInfo {
  [key: string]: unknown;
  isJoined: boolean;
  isLiked: boolean;
  joinCount: number;
  likeCount: number;
  member: Member;
  updatedAt: string;
}
