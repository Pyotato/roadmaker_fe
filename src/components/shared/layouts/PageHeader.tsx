'use client';
import { Box, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconExclamationCircle } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';

import Header from './components/Header';
import OverLay from '../Overlay';

const PageHeader = () => {
  const { status, data: session } = useSession();

  const openModal = (fn: () => void) =>
    modals.openConfirmModal({
      title: '페이지를 벗어나시겠습니까?',
      children: (
        <Box display='inline-flex'>
          <IconExclamationCircle />
          <Text size='sm' pl='sm'>
            페이지를 벗어나면 작업 내용을 잃을 수 있습니다.
          </Text>
        </Box>
      ),
      labels: { confirm: '확인', cancel: '취소' },
      onConfirm: fn,
    });
  if (status === 'loading') {
    return <OverLay />;
  }
  return <Header openModal={openModal} session={session} status={status} />;
};

export default PageHeader;
