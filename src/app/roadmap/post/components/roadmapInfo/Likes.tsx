import { PropsWithChildren } from 'react';

import { toTSXString } from '@/utils/shared';

import { AboutInfo } from '.';

interface LikeProps extends PropsWithChildren {
  likesInfo: {
    isLiked: AboutInfo['isLiked'];
    likeCount: AboutInfo['likeCount'];
  };
}

const Likes = ({ likesInfo }: LikeProps) => {
  const { isLiked, likeCount } = likesInfo;

  return (
    <>
      <h1>isliked: {toTSXString(isLiked)}</h1>
      <h3>like count: {toTSXString(likeCount)}</h3>
    </>
  );
};
export default Likes;
