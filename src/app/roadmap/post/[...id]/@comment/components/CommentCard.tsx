'use client';
import {
  Avatar,
  Group,
  Paper,
  Text,
  TypographyStylesProvider,
} from '@mantine/core';
import styled from 'styled-components';

import { randomAvartars, randomNum } from '@/utils/avatars';
import { toKorDateTime, toTSXString } from '@/utils/shared';

import { Comment } from '@/types/comment';

const CommentCard = ({
  comment,
  innerRef,
}: {
  comment: Comment | null;
  innerRef?: (node?: Element | null) => void;
}) => {
  return (
    <Wrap>
      <Paper withBorder radius='md' className='comment' ref={innerRef}>
        <Group>
          <Avatar
            src={comment?.member?.avatarUrl || randomAvartars(randomNum)}
            alt={comment?.member?.nickname}
            radius='xl'
          />
          <div>
            <Text fz='sm'>{comment?.member?.nickname}</Text>
            <Text fz='xs' c='dimmed'>
              {toKorDateTime(`${comment?.createdAt}`)}
            </Text>
          </div>
        </Group>
        <TypographyStylesProvider className='body'>
          <div
            className='content'
            dangerouslySetInnerHTML={{
              __html: toTSXString(comment?.content),
            }}
          />
        </TypographyStylesProvider>
      </Paper>
    </Wrap>
  );
};
export default CommentCard;
const Wrap = styled.div`
  .comment {
    padding: var(--mantine-spacing-lg) var(--mantine-spacing-xl);
    overflow: hidden !important;
  }

  .body {
    padding-left: 3.375rem; /** 3.375rem; rem(54px)*/
    padding-top: var(--mantine-spacing-sm);
    font-size: var(--mantine-font-size-sm);
  }

  .content {
    & > p:last-child {
      margin-bottom: 0;
    }
  }
`;
