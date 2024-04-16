import { Avatar, Title } from '@mantine/core';

import { CreatorProps } from '@/types/post';
import { Member } from '@/types/user';
import { randomAvartars } from '@/utils/avatars';
import { toTSXString } from '@/utils/shared';

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
      <Avatar
        src={avatarUrl || randomAvartars(id)}
        alt={toTSXString(avatarUrl)}
        radius='xl'
        size='sm'
      />
      <Title order={6}>{toTSXString(nickname)}</Title>
    </>
  );
};
export default Creator;
