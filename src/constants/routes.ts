export const API_ROUTES = {
  roadmaps: `${process.env.NEXT_PUBLIC_API}/roadmaps`,
  roadmapsSlash: `${process.env.NEXT_PUBLIC_API}/roadmaps/`,
  roadmapPaged: `${process.env.NEXT_PUBLIC_API}/roadmaps?page=`,
  comments: `${process.env.NEXT_PUBLIC_API}/comments`,
  likes: `${process.env.NEXT_PUBLIC_API}/likes/like-roadmap/`,
  signin: `${process.env.NEXT_PUBLIC_API}/auth/login`,
  signup: `${process.env.NEXT_PUBLIC_API}/auth/signup`,
  userInfoSlash: `${process.env.NEXT_PUBLIC_API}/members/`,
  memberInfoUpdate: `${process.env.NEXT_PUBLIC_API}/members/profile`,
  memberAvatarUpdate: `${process.env.NEXT_PUBLIC_API}/members/profile/avatar`,
};

export const SITE_ROUTES = {
  CREATE_ROADMAP: '/roadmap/create',
  signIn: '/api/auth/signin?callbackUrl=https://roadmaker-fe.vercel.app/',
  signInDev: `/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F`,
};
