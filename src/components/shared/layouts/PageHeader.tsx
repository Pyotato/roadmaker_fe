'use client';
import { useSession } from 'next-auth/react';

import Header from './components/Header';
import OverLay from '../Overlay';

const PageHeader = () => {
  const { status } = useSession();
  if (status === 'loading') {
    return <OverLay />;
  }
  return <Header />;
};

export default PageHeader;
