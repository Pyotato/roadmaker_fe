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
    <>
      <button type='button'>{isJoined ? '참여중' : '참여하기'}</button>
      <h3>참여인원: {toTSXString(joinCount)}명</h3>
    </>
  );
};
export default Join;
