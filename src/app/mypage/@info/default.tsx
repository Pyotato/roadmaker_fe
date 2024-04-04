'use client';
import { signIn, useSession } from 'next-auth/react';

import UserData from './components/Profile';

export default function DefaultInfo() {
  const { status } = useSession();

  if (status === 'unauthenticated') {
    return signIn();
  }
  if (status === 'loading') return <></>;
  if (status === 'authenticated') return <UserData />;
}
