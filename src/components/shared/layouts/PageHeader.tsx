'use client';
import { useRouter } from 'next/navigation';
const PageHeader = () => {
  const router = useRouter();
  return (
    <section>
      <button type='button' onClick={() => router.push('/')}>
        home
      </button>
      <button type='button' onClick={() => router.push('/auth')}>
        sign in
      </button>
      <button type='button' onClick={() => router.push('/roadmap/create')}>
        create roadmap
      </button>
    </section>
  );
};

export default PageHeader;
