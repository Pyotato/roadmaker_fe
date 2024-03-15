import { Box, Button, Title } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { PropsWithChildren } from 'react';

import { toTSXString } from '@/utils/shared';

import { AboutInfo } from './page';

interface JoinProps extends PropsWithChildren {
  joinInfo: {
    isJoined: AboutInfo['isJoined'];
    joinCount: AboutInfo['joinCount'];
  };
}

const Join = ({ joinInfo }: JoinProps) => {
  const { isJoined, joinCount } = joinInfo;

  return (
    <Box
      my='xs'
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Box
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <Box>
          <IconUser />
        </Box>
        <Box>
          <Title order={6}>참여인원: {toTSXString(joinCount)}명</Title>
        </Box>
      </Box>
      <Button type='button'>{isJoined ? '참여중' : '참여하기'}</Button>
    </Box>
  );
};
export default Join;
