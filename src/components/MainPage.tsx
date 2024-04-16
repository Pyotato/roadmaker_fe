'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { PropsWithChildren, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { API_ROUTES } from '@/constants';
import { getApiResponse } from '@/utils/get-api-response';
import { getPageNum } from '@/utils/shared';

import { ArticlesCardsGrid } from './shared/grid/ArticlesCardsGrid';
import { SkeletonCardsGrid } from './shared/grid/SkeletonGrid';

import { DataWithPages } from '@/types';

export interface Member {
  id: number;
  email: string;
  nickname: string;
  bio: string;
  avatarUrl: null | string;
  githubUrl: null | string;
  blogUrl: null | string;
  baekjoonId: null | string;
}
export interface Post {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: typeof url;
  likeCount: number;
  joinCount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  member: Member;
}
export const url = `${API_ROUTES.roadmapPaged}2&order-type=recent`;

export interface Postdata extends DataWithPages {
  result: Array<Post | null>;
}

export interface PageProps extends PropsWithChildren {
  postData: Postdata | null;
}
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
              <ArticlesCardsGrid
                key={index}
                postData={postData?.result}
                innerRef={ref}
              />
            ) : (
              <ArticlesCardsGrid
                key={index}
                postData={postData?.result || []}
              />
            ),
          )}
        </section>
      </main>
    );
}
