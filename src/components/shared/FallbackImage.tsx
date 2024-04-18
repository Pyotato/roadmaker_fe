'use client';
import { AspectRatio, Image } from '@mantine/core';

const FallbackImage = () => {
  return (
    <AspectRatio ratio={1920 / 1080}>
      <Image
        radius={'md'}
        src={null}
        alt={`이미지 없음`}
        fallbackSrc='https://placehold.co/600x400?text=No Image'
      />
    </AspectRatio>
  );
};
export default FallbackImage;
