'use client';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
const AuthButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
        <button onClick={() => router.replace('/mypage')}>
          {session?.user?.email} 내 페이지로 이동
        </button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};
export default AuthButton;
