import {
  Avatar,
  Box,
  Group,
  Paper,
  SimpleGrid,
  Text,
  TypographyStylesProvider,
} from '@mantine/core';
import { PropsWithChildren } from 'react';

import classes from './CommentHtml.module.css';

import { CommentData } from '@/app/roadmap/post/[...id]/@comment/Comments';
import { randomAvartars, randomNum } from '@/constants/default/avatars';
import { toKorDateTime, toTSXString } from '@/utils/shared';

export interface CommentProps extends PropsWithChildren {
  commentData: CommentData['result'];
  innerRef?: (node?: Element | null) => void;
}

export function CommentHtml({ commentData, innerRef }: CommentProps) {
  if (commentData.length === 0) return <></>;
  const comments = commentData.map((v, i) =>
    i === commentData.length - 1 ? (
      <Paper
        withBorder
        radius='md'
        className={classes.comment}
        key={i}
        style={{ overflow: 'hidden' }}
        ref={innerRef}
      >
        <Group>
          <Avatar
            src={v?.member?.avatarUrl || randomAvartars(randomNum)}
            alt={v?.member?.nickname}
            radius='xl'
          />
          <div>
            <Text fz='sm'>{v?.member?.nickname}</Text>
            <Text fz='xs' c='dimmed'>
              {toTSXString(v?.createdAt)}
            </Text>
          </div>
        </Group>
        <TypographyStylesProvider className={classes.body}>
          <div
            className={classes.content}
            dangerouslySetInnerHTML={{
              __html: toTSXString(v?.content),
            }}
          />
        </TypographyStylesProvider>
      </Paper>
    ) : (
      <Paper
        withBorder
        radius='md'
        className={classes.comment}
        key={i}
        style={{ overflow: 'hidden' }}
      >
        <Group>
          <Avatar
            src={v?.member?.avatarUrl ?? randomAvartars(randomNum)}
            alt={v?.member?.nickname}
            radius='xl'
          />
          <div>
            <Text fz='sm'>{v?.member?.nickname}</Text>
            <Text fz='xs' c='dimmed'>
              {toKorDateTime(`${v?.createdAt}`)}
            </Text>
          </div>
        </Group>
        <TypographyStylesProvider className={classes.body}>
          <div
            className={classes.content}
            dangerouslySetInnerHTML={{
              __html: toTSXString(v?.content),
            }}
          />
        </TypographyStylesProvider>
      </Paper>
    ),
  );

  return (
    <Box pt='sm'>
      <SimpleGrid cols={{ base: 1, sm: 1 }}>{comments}</SimpleGrid>
    </Box>
  );
}
