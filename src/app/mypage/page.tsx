'use client';
import { signIn, useSession } from 'next-auth/react';

import OverLay from '@/components/shared/Overlay';

import MyRoadmapsTabs from './@roadmaps/Tabs';

export default function MyPage() {
  const { status } = useSession();
  if (status === 'unauthenticated') {
    signIn();
  }
  if (status === 'loading') <OverLay />;
  if (status === 'authenticated') return <MyRoadmapsTabs />;
}
