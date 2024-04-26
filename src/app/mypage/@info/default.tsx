'use client';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import UserData from './components/Profile';

export default function DefaultInfo() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      return signIn();
    },
  });
  useEffect(() => {
    if (!session && status !== 'loading') {
      signIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <UserData />;
}
