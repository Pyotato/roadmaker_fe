import { Box, Container, Title } from '@mantine/core';
import { IconCalendarMonth } from '@tabler/icons-react';
import { PropsWithChildren } from 'react';

import { toTSXString } from '@/utils/shared';

import Creator from './Creator';
import Join from './Join';
import Likes from './Likes';
import { AboutInfo } from './page';

interface AboutProps extends PropsWithChildren {
  aboutInfo: AboutInfo;
}

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
      <Box
        style={{ display: 'inline-flex', alignItems: 'center', width: '100%' }}
      >
        <Title order={1}>{toTSXString(title)}</Title>{' '}
      </Box>
      <Box my='md' className='txt-height'>
        {toTSXString(description)}
      </Box>
      <Box
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          width: '100%',
          gap: '1rem',
        }}
        mt='xs'
      >
        <Creator creatorInfo={{ member }} />
      </Box>
      <Box
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '1rem',
        }}
        my='xs'
      >
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
