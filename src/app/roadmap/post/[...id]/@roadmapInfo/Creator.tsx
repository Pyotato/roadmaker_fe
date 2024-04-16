import { Avatar, Box, Title } from '@mantine/core';
import { PropsWithChildren } from 'react';

import { Member } from '@/app/MainPage';

import { randomAvartars } from '@/utils/avatars';
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
    id,
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
        <Avatar
          src={avatarUrl || randomAvartars(id)}
          alt={toTSXString(avatarUrl)}
          radius='xl'
          size='sm'
        />
      </Box>
      <Title order={6}>{toTSXString(nickname)}</Title>
    </>
  );
};
export default Creator;
