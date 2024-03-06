import { PropsWithChildren } from 'react';

import { toTSXString } from '@/utils/shared';

import { AboutInfo } from '.';
import Creator from './Creator';
import Likes from './Likes';

interface AboutProps extends PropsWithChildren {
  aboutInfo: AboutInfo;
}

const About = ({ aboutInfo }: AboutProps) => {
  const { title, description, isLiked, likeCount, member } = aboutInfo;

  return (
    <>
      <h1>{toTSXString(title)}</h1>
      <h3>{toTSXString(description)}</h3>
      <div>
        <Likes likesInfo={{ isLiked, likeCount }} />
      </div>
      <div>
        <Creator creatorInfo={{ member }} />
      </div>
    </>
  );
};
export default About;
