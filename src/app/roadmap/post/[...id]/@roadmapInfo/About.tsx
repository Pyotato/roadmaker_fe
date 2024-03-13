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
    <>
      <h1>{toTSXString(title)}</h1>
      <div>만든 날짜: {toTSXString(createdAt)}</div>
      <h3>{toTSXString(description)}</h3>
      <div>
        <Likes likesInfo={{ isLiked, likeCount }} />
      </div>
      <div>
        <Creator creatorInfo={{ member }} />
      </div>
      <div>
        <Join joinInfo={{ isJoined, joinCount }} />
      </div>
    </>
  );
};
export default About;
