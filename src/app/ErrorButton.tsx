'use client';

import { Button } from '@mantine/core';
import { ReactNode } from 'react';

const ErrorButton = ({
  reset,
  errorMsg,
  navigate,
}: {
  reset?: () => void;
  errorMsg: string | ReactNode;
  navigate?: () => void;
}) => {
  return (
    <Button
      variant='default'
      size='md'
      mt='xl'
      className='control'
      onClick={() => {
        if (reset) reset();
        else if (navigate) navigate();
      }}
      mr='lg'
    >
      {errorMsg}
    </Button>
  );
};

export default ErrorButton;
