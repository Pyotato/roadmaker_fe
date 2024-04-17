'use client';

import { Box } from '@mantine/core';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { getApiResponse } from '@/utils/get-api-response';
import { getPageNum } from '@/utils/shared';

import CommentGrid from './CommentGrid';

import { CommentData } from '@/types/comment';

const Comments = () => {
  const { ref, inView } = useInView();
  const router = useRouter();
  const params = useParams<{ tag: string; item: string; id: string[] }>();

  if (!params.id) router.replace('/error');

  const currPostId = params.id;

  const loadDataFromApi = async ({ pageParam }: { pageParam: number }) => {
    const [comments] = await Promise.all([
      getApiResponse<CommentData>({
        apiEndpoint: `${process.env.NEXT_PUBLIC_API}/roadmaps/${currPostId[0]}/comments?lastCommentId=${pageParam}&size=20`,
        revalidate: 0, // 1 mins cache
      }),
    ]);

    return {
      comments,
    };
  };

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
        {/* 
        // !! need to update api response : 
        // !! needs to include following fields: totalPage, previous, next
            // !! totalPage: 28, 
            // !! previous: null,
            // !! next: '/api/roadmaps/1/comments?lastCommentId=1&size=20
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
        )} */}

        {/* {comments.pages[0].comments.map(() =>
          comments?.next ? (
            <CommentHtml
              key={i}
              commentData={comments?.result || []}
              innerRef={ref}
            />
          ) : (
            <CommentHtml key={i} commentData={comments?.result ?? []} />
          ),
        )} */}
        {/* {comments.pages[0].comments.map((v, i) => (
          // <div key={v.id}>
          //   <div>{v.id} </div>
          //   <div>{v.content} </div>
          // </div>
          <CommentHtml key={i} commentData={ ?? []} />
        ))} */}

        {/* {comments.pages.map(({ comments }, i) =>
          comments?.next ? (
            <CommentHtml
              key={i}
              innerRef={ref}
              commentData={comments.pages[0].comments ?? []}
            />
          ) : (
            <CommentHtml
              key={i}
              commentData={comments.pages[0].comments ?? []}
            />
          ),
        )} */}
        <CommentGrid
          commentData={comments.pages[0].comments ?? []}
          innerRef={ref}
        />
      </Box>
    );
  }
};
export default Comments;
