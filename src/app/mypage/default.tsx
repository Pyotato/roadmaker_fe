'use client';
import { signIn, useSession } from 'next-auth/react';

import { SkeletonCardsGrid } from '@/components/shared/SkeletonGrid';

import MyRoadmapsTabs from './@roadmaps/Tabs';

export default function MyPage() {
  const { status } = useSession();
  if (status === 'unauthenticated') {
    signIn();
  }
  if (status === 'loading') return <SkeletonCardsGrid />;
  if (status === 'authenticated') return <MyRoadmapsTabs />;
}
