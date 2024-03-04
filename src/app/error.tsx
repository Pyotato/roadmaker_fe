'use client'; // Error components must be Client Components

import * as React from 'react';

import { consoleLog } from '@/utils/shared/console-log';

export default function Error({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  React.useEffect(() => {
    consoleLog('error.tsx', error);
  }, [error]);

  return (
    <main>
      <section>
        <div>
          <h1>Oops, something went wrong!</h1>
          <h5>change this in app/error.tsx</h5>
          <h4>{error.message}</h4>
          <div>
            <button onClick={reset}>Try again</button>
          </div>
          <a href='/?slug=homepage'>Back to home</a>
        </div>
      </section>
    </main>
  );
}
