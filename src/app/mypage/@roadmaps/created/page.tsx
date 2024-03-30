'use client';
import { signIn, useSession } from 'next-auth/react';

import MyRoadmapsTabs from '../Tabs';

export default function CreatedRoadmap() {
  const { status } = useSession();
  if (status === 'unauthenticated') {
    signIn();
  }
  if (status === 'loading') <>loading...</>;
  return <MyRoadmapsTabs />;
}
