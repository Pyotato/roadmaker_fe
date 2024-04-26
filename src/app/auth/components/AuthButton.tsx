import { Box, Text } from '@mantine/core';

const AuthButton = ({ btnText, fn }: { btnText: string; fn: () => void }) => {
  return (
    <Box mt='lg'>
      <Text className='hvr txt' onClick={fn} size='sm' ta='center'>
        {btnText}
      </Text>
    </Box>
  );
};
export default AuthButton;
