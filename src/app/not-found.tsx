import { Metadata } from 'next';

import NotFound from '@/components/NotFound';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFoundPage() {
  return (
    <main>
      <NotFound title={`${metadata?.title}` || 'Something is not right...'} />
    </main>
  );
}
