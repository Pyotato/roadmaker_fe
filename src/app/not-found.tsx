import { Metadata } from 'next';

import NotFound from '@/components/NotFound';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFoundPage() {
  const title = 'Something is not right...';
  const message =
    'Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL. If you think this is an error contact support.';
  return (
    <main>
      <NotFound title={title} message={message} />
    </main>
  );
}
