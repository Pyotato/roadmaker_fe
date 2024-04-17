import { Box, Text } from '@mantine/core';
import { signIn } from 'next-auth/react';

const LoginButton = () => {
  return (
    <Box mt='lg'>
      <Text className='hvr txt' onClick={() => signIn()} size='sm' ta='center'>
        로그인하러 가기
      </Text>
    </Box>
  );
};
export default LoginButton;
