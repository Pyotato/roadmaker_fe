'use client';
import { signIn, useSession } from 'next-auth/react';

import MyRoadmapsTabs from './@roadmaps/Tabs';

export default function MyPage() {
  const { status } = useSession();
  if (status === 'unauthenticated') {
    signIn();
  }
  if (status === 'loading') <>loading...</>;
  if (status === 'authenticated') return <MyRoadmapsTabs />;
}
