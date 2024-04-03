'use client';

import * as React from 'react';

import NotFound from '@/components/NotFound';

import { consoleLog } from '@/utils/shared/console-log';

export default function ErrorPage({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  React.useEffect(() => {
    consoleLog('error.tsx', error);
  }, [error]);
  const title = 'Oops, something went wrong!';
  const { message } = error;

  return (
    <main>
      <NotFound title={title} message={message} reset={reset} />
    </main>
  );
}
