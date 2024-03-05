'use client';
import { useRouter } from 'next/navigation';
const PageHeader = () => {
  const router = useRouter();
  return (
    <section>
      {/* <AuthButton /> */}
      <button type='button' onClick={() => router.push('/auth')}>
        sign in
      </button>
    </section>
  );
};

export default PageHeader;
