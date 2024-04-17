'use client';
import { signIn, useSession } from 'next-auth/react';

import ProfileSkeleton from '@/components/shared/ProfileSkeleton';

import UserData from './components/Profile';

export default function DefaultInfo() {
  const { status } = useSession();

  if (status === 'unauthenticated') {
    return signIn();
  }
  if (status === 'loading') return <ProfileSkeleton />;
  if (status === 'authenticated') return <UserData />;
}
