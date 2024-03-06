import { PropsWithChildren } from 'react';

import { Member } from '@/components/MainPage';

import { toTSXString } from '@/utils/shared';

import { AboutInfo } from '.';

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
    // avatarUrl,
    // githubUrl,
    // blogUrl,
    // baekjoonId,
  } = member as Member;
  return (
    <>
      <h1>creator: {toTSXString(nickname)}</h1>
    </>
  );
};
export default Creator;
