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

export interface UserDataResponse {
  userData: UserData | null;
}
