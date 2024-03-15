import { Box, Image, Title } from '@mantine/core';
import { PropsWithChildren } from 'react';

import { Member } from '@/components/MainPage';

import { toTSXString } from '@/utils/shared';

import { AboutInfo } from './page';

interface CreatorProps extends PropsWithChildren {
  creatorInfo: {
    member: AboutInfo['member'];
  };
}

const Creator = ({ creatorInfo }: CreatorProps) => {
  const { member } = creatorInfo;
  const {
    // id,
    // email,
    nickname,
    // bio,
    avatarUrl,
    // githubUrl,
    // blogUrl,
    // baekjoonId,
  } = member as Member;
  return (
    <>
      <Box style={{ width: '24px' }}>
        <Image
          src={
            avatarUrl ||
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png'
          }
          alt={toTSXString(avatarUrl)}
          radius='xl'
          style={{ width: '24px' }}
        />
      </Box>
      <Title order={6}>{toTSXString(nickname)}</Title>
    </>
  );
};
export default Creator;
