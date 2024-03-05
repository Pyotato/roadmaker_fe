'use client';
import { useRouter } from 'next/navigation';
const PageHeader = () => {
  // const loadDataFromApi = async () => {
  //   const roadmapPage = 1; // initial load
  //   const [postData] = await Promise.all([
  //     getApiResponse<Postdata>({
  //       apiEndpoint: `${process.env.NEXT_PUBLIC_API}/roadmaps?page=${roadmapPage}&order-type=recent`,
  //       revalidate: 60 * 12, // 30 mins cache
  //     }),
  //   ]);

  //   return {
  //     postData,
  //   };
  // };

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
