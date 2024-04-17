'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { API_ROUTES } from '@/constants';
import { getApiResponse } from '@/utils/get-api-response';
import { getPageNum } from '@/utils/shared';

import { ItemsCardsGrid } from '../components/shared/ItemsCardsGrid';
import { SkeletonCardsGrid } from '../components/shared/SkeletonGrid';

import { Postdata } from '@/types/post';

const loadDataFromApi = async ({ pageParam }: { pageParam: number }) => {
  const [postData] = await Promise.all([
    getApiResponse<Postdata>({
      apiEndpoint: `${API_ROUTES.roadmapPaged}${pageParam}&order-type=recent`,
      revalidate: 60 * 12, // 30 mins cache
    }),
  ]);

  return {
    postData,
  };
};

export default function Mainpage() {
  const { ref, inView } = useInView();

  const {
    data: posts,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['mainPosts'],
    queryFn: loadDataFromApi,
    initialPageParam: 1,
    getNextPageParam: ({ postData }) => {
      if (!postData?.next) return getPageNum(null);
      const { next } = postData as Postdata;
      const pageNum = getPageNum(next);
      return pageNum;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isError) {
    return (
      <>
        oops something went wrong😑{status}, {error}
      </>
    );
  }
  if (isLoading) return <SkeletonCardsGrid />;

  if (posts)
    return (
      <main>
        <section>
          {posts.pages.map(({ postData }, index) =>
            postData?.next ? (
              <ItemsCardsGrid
                key={index}
                postData={postData?.result}
                innerRef={ref}
              />
            ) : (
              <ItemsCardsGrid key={index} postData={postData?.result || []} />
            ),
          )}
        </section>
      </main>
    );
}
