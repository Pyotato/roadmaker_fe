// 'use client';

// import { useIsFetching, useQuery } from '@tanstack/react-query';
// import { PropsWithChildren } from 'react';

// import { getApiResponse } from '@/utils/shared/get-api-response';

// import { ArticlesCardsGrid } from './shared/grid/ArticlesCardsGrid';
// export interface Member {
//   id: number;
//   email: string;
//   nickname: string;
//   bio: string;
//   avatarUrl: null | string;
//   githubUrl: null | string;
//   blogUrl: null | string;
//   baekjoonId: null | string;
// }
// export interface Post {
//   id: number;
//   title: string;
//   description: string;
//   thumbnailUrl: typeof url;
//   likeCount: number;
//   joinCount: number;
//   createdAt: Date | string;
//   updatedAt: Date | string;
//   member: Member;
// }
// export const url = `${process.env.NEXT_PUBLIC_API}/roadmaps?page=2&order-type=recent`;
// export type Postdata = {
//   totalPage: number;
//   next: typeof url;
//   previous: null;
//   result: Array<Post | null>;
// };

// export interface PageProps extends PropsWithChildren {
//   postData: Postdata | null;
// }

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

// export default function Mainpage() {
//   const isFetching = useIsFetching();
//   const { data, isLoading, isError, isSuccess } = useQuery({
//     queryKey: ['mainPosts'],
//     queryFn: async () => await loadDataFromApi(),
// select: (posts) => // 특정 데이터만 고를 때
//   posts.map((post: Post) => ({ id: post.id, title: post.title })),
// enabled: !!someOtherFetchData // someOtherFetchData 동기 (예를 들면 로드맵 보이고 => 댓글 가져오기)
//   });

//   if (isLoading) return <div>is loading</div>;
//   if (isError) return <div>oops something went wrong!🥲</div>;
//   if (data === null) {
//     return (
//       <main>
//         <section>
//           <div>main</div>empty
//         </section>
//       </main>
//     );
//   }
//   if (isSuccess)
//     return (
//       <main>
//         <section>
//           <div>main</div>
//           <ArticlesCardsGrid postData={data?.postData} />
//         </section>
//       </main>
//     );
// }
