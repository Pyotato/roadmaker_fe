'use client';
import {
  Box,
  Button,
  Divider,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconAt, IconPassword, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FAIL } from '@/constants';
import { signin } from '@/service/auth';

import AuthButton from '../auth/components/AuthButton';

export default function Signin() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [status, router]);

  return (
    <PageWrap>
      <Box className='auth-box' p='xl'>
        <Box p='xl' className='login-box'>
          <Title order={1} mb='lg' className='txt'>
            로그인
          </Title>

          <TextInput
            label='이메일'
            withAsterisk={!email}
            autoFocus={!email}
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            type='email'
            placeholder='YourEmail@naver.com'
            leftSection={<IconAt size={16} />}
            pb='md'
          />
          <PasswordInput
            label='비밀번호'
            value={password}
            type='password'
            autoFocus={!password}
            withAsterisk={!password}
            placeholder='myPasswordCheck'
            onChange={(event) => setPassword(event.currentTarget.value)}
            leftSection={<IconPassword size={16} />}
            pb='md'
          />

          <div className='flex-right'>
            <Button
              disabled={!password || !email}
              onClick={() => {
                if (!password || !email) {
                  return;
                }
                signin({
                  email,
                  password,
                  setEmail,
                  setPassword,
                  showToast: () =>
                    notifications.show({
                      id: 'login-fail',
                      withCloseButton: true,
                      autoClose: 5000,
                      title: '로그인 실패',
                      message: `🥲 해당 이메일로 등록한 회원이 없거나 비밀번호가 틀렸습니다.`,
                      color: FAIL[401].color,
                      icon: <IconX className='icon' />,
                      className: 'my-notification-class',
                      loading: false,
                    }),
                });
              }}
            >
              submit
            </Button>
          </div>
          <Divider my='xs' label='or' labelPosition='center' />
          <AuthButton
            btnText='회원 가입하러 가기'
            fn={() => router.push('/auth')}
          />
        </Box>
      </Box>
    </PageWrap>
  );
}

const PageWrap = styled.div`
  display: inline-flex;
  justify-content: center;
  height: 100vh;
  width: 100%;

  .auth-box {
    display: inline-flex;
    height: 100%;
    align-items: center;
  }
  .txt {
    text-align: center;
  }
`;
