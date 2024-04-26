'use client';

import { useEffect } from 'react';

import NotFound from '@/components/NotFound';

import { consoleLog } from '@/utils/console-log';

export default function ErrorPage({
  error,
  // reset,
}: Readonly<{
  error: Error & { digest?: string };
  // reset: () => void;
}>) {
  useEffect(() => {
    consoleLog('error.tsx', error);
  }, [error]);
  const title = 'Oops, something went wrong!';
  const { message } = error;

  return (
    <main>
      <NotFound title={title} message={message} />
    </main>
  );
}
