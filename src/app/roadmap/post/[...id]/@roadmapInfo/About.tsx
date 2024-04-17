import { Box, Container, Title } from '@mantine/core';
import { IconCalendarMonth } from '@tabler/icons-react';

import { toTSXString } from '@/utils/shared';

import Creator from './Creator';
import Join from './Join';
import Likes from './Likes';

import { AboutProps } from '@/types/post';

const About = ({ aboutInfo }: AboutProps) => {
  const {
    title,
    description,
    isLiked,
    likeCount,
    member,
    createdAt,
    isJoined,
    joinCount,
  } = aboutInfo;

  return (
    <Container px='xl' my='xl'>
      <Box className='title-wrap'>
        <Title order={1}>{toTSXString(title)}</Title>{' '}
      </Box>
      <Box my='md' className='txt-height'>
        {toTSXString(description)}
      </Box>
      <Box className='title-wrap gap1' mt='xs'>
        <Creator creatorInfo={{ member }} />
      </Box>
      <Box className='title-wrap gap1' my='xs'>
        <IconCalendarMonth />
        <Box>{toTSXString(createdAt)}</Box>
      </Box>
      <Box my='xs'>
        <Likes likesInfo={{ isLiked, likeCount }} />
      </Box>
      <Join joinInfo={{ isJoined, joinCount }} />
    </Container>
  );
};
export default About;
