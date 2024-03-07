'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
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
  const params = useParams<{ tag: string; item: string; id: string[] }>();
  const currPostId = params.id!;

  const loadDataFromApi = async ({ pageParam }: { pageParam: number }) => {
    const [comments] = await Promise.all([
      getApiResponse<CommentData>({
        apiEndpoint: `${process.env.NEXT_PUBLIC_API}/roadmaps/load-roadmap/${currPostId[0]}/comments?page=${pageParam}&size=5`,
        revalidate: 2 * 12, // 1 mins cache
      }),
    ]);

    return {
      comments,
    };
  };

  const {
    data: comments,
    error,
    // !!API need to update api :currently fetching all data
    fetchNextPage,
    hasNextPage,
    isError,
    status,
  } = useInfiniteQuery({
    queryKey: [`comments`],
    queryFn: loadDataFromApi,
    initialPageParam: 1,
    getNextPageParam: ({ comments }) => {
      const { next } = comments! as CommentData;
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

  if (comments)
    return (
      <>
        {comments.pages.map(({ comments }, i) => (
          <CommentHtml
            key={i}
            commentData={comments?.result || []}
            innerRef={ref}
          />
        ))}
      </>
    );
};
export default Comments;
