'use client';
import { signIn, useSession } from 'next-auth/react';

import OverLay from '@/components/shared/Overlay';

import MyRoadmapsTabs from '../Tabs';

export default function CreatedRoadmap() {
  const { status } = useSession();
  if (status === 'unauthenticated') {
    signIn();
  }
  if (status === 'loading') <OverLay />;
  return <MyRoadmapsTabs />;
}
