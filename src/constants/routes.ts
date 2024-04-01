export const apiRoutes = {
  roadmaps: `${process.env.NEXT_PUBLIC_API}/roadmaps`,
  roadmapsSlash: `${process.env.NEXT_PUBLIC_API}/roadmaps/`,
  roadmapPaged: `${process.env.NEXT_PUBLIC_API}/roadmaps?page=`,
  comments: `${process.env.NEXT_PUBLIC_API}/comments`,
  likes: `${process.env.NEXT_PUBLIC_API}/likes/like-roadmap/`,
  signin: `${process.env.NEXT_PUBLIC_API}/members/signin`,
  signup: `${process.env.NEXT_PUBLIC_API}/members/signup`,
  userInfoSlash: `${process.env.NEXT_PUBLIC_API}/members/`,
  memberInfoUpdate: `${process.env.NEXT_PUBLIC_API}/members/save-profile`,
  memberAvatarUpdate: `${process.env.NEXT_PUBLIC_API}/members/me/avatar`,
};

export const siteRoutes = {
  signIn: '/api/auth/signin?callbackUrl=https://roadmaker-fe.vercel.app/',
  signInDev: `/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F`,
};
