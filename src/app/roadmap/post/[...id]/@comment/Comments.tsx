'use client';

import { Box } from '@mantine/core';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { CommentHtml } from '@/components/shared/list/CommentHtml';

import { getPageNum } from '@/utils/shared';
import { getApiResponse } from '@/utils/shared/get-api-response';

import { DataWithPages } from '@/types';

export interface Comment {
  roadmapId: number;
  content: string;
  nickname: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
export interface CommentData extends DataWithPages {
  result: Array<Comment | null>;
}

const Comments = () => {
  const { ref, inView } = useInView();
  const router = useRouter();
  const params = useParams<{ tag: string; item: string; id: string[] }>();

  if (!params.id) router.replace('/error');

  const currPostId = params.id;

  const loadDataFromApi = async ({ pageParam }: { pageParam: number }) => {
    const [comments] = await Promise.all([
      getApiResponse<CommentData>({
        apiEndpoint: `${process.env.NEXT_PUBLIC_API}/roadmaps/load-roadmap/${currPostId[0]}/comments?page=${pageParam}&size=5`,
        revalidate: 0, // 1 mins cache
      }),
    ]);

    return {
      comments,
    };
  };

  // !!API need to update api :currently fetching all data

  const {
    data: comments,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    status,
  } = useInfiniteQuery({
    queryKey: [`comments`, `${currPostId[0]}`],
    queryFn: loadDataFromApi,
    initialPageParam: 1,
    getNextPageParam: ({ comments }) => {
      if (comments?.next) return getPageNum(null);
      const { next } = comments! || null;
      const pageNum = getPageNum(next);
      return pageNum;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isError)
    return (
      <>
        oops something went wrong😑{status}, {error}
      </>
    );

  if (comments) {
    if (comments.pages[0].comments?.totalPage === 0)
      return <Box my='xl'>아직 댓글이 없습니다.</Box>;
    return (
      <Box py='xl'>
        {comments.pages.map(({ comments }, i) =>
          comments?.next ? (
            <CommentHtml
              key={i}
              commentData={comments?.result || []}
              innerRef={ref}
            />
          ) : (
            <CommentHtml key={i} commentData={comments?.result ?? []} />
          ),
        )}
      </Box>
    );
  }
};
export default Comments;
