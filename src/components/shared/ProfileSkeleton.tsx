'use client';

import { Box, Skeleton } from '@mantine/core';

const ProfileSkeleton = () => {
  return (
    <Box
      style={{
        display: 'inline-flex',
        width: '100%',
        alignItems: 'center',
        gap: '1.5rem',
      }}
    >
      <Skeleton circle height={84} />

      <Box w='80%'>
        <Skeleton height={24} mt='md' width='100%' />
        <Skeleton height={48} mt='md' width='100%' />
      </Box>
    </Box>
  );
};
export default ProfileSkeleton;
