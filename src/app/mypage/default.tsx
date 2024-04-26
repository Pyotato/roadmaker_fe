'use client';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import MyRoadmapsTabs from './@roadmaps/Tabs';

export default function MyPage() {
  const { status, data: session } = useSession();
  useEffect(() => {
    // console.log(session);
    if (!session) {
      signIn();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(session);
  // if (status === 'loading') return <SkeletonCardsGrid />;
  if (status === 'authenticated') return <MyRoadmapsTabs />;
}
