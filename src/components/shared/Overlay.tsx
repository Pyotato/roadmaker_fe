'use client';
import { Box, LoadingOverlay } from '@mantine/core';

import { theme } from '@/styles/theme';

const OverLay = () => {
  return (
    <>
      <Box pos='relative' h='100vh'>
        <LoadingOverlay
          visible={true}
          zIndex={100000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{
            color: theme.colors.color_grey2,
            type: 'bars',
          }}
        />
      </Box>
    </>
  );
};
export default OverLay;
