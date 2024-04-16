'use client';

import { Box, Skeleton } from '@mantine/core';
import styled from 'styled-components';

const ProfileSkeleton = () => {
  return (
    <SkeletonWrap>
      <Skeleton circle height={84} />
      <Box w='80%'>
        <Skeleton height={24} mt='md' width='100%' />
        <Skeleton height={48} mt='md' width='100%' />
      </Box>
    </SkeletonWrap>
  );
};
export default ProfileSkeleton;
const SkeletonWrap = styled.div`
  display: inline-flex;
  width: 100%;
  align-items: center;
  gap: 1.5rem;
`;
