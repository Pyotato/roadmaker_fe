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
import { IconAt, IconCheck, IconPassword, IconUser } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import styled from 'styled-components';

import { API_ROUTES, FAIL, SUCCESS } from '@/constants';
import { getApiResponse } from '@/utils/get-api-response';

import LoginButton from './components/LoginButton';

export default function AuthPage() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [email, setEmail] = useState('');
  const { status } = useSession();
  const router = useRouter();

  if (status === 'authenticated') {
    router.replace('/');
  }

  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/g;

  const postResponseFromApi = async () => {
    const res = await Promise.resolve(
      getApiResponse<undefined>({
        requestData: JSON.stringify({
          email: email,
          nickname: nickname,
          password: password,
        }),
        apiEndpoint: `${API_ROUTES.signup}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    );
    if (res?.httpStatus === 409) {
      notifications.show({
        id: FAIL['409'].id,
        withCloseButton: true,
        autoClose: 6000,
        title: FAIL['409'].title,
        message: res.message,
        color: FAIL['409'].color,
        icon: <IconCheck className='icon' />,
      });

      if (res.errorCode === 'NicknameAlreadyRegistered') {
        setNickname('');
        return;
      }
      if (res.errorCode === 'EmailAlreadyRegistered') {
        setEmail('');
        return;
      }
    }
    if (res?.httpStatus === 201) {
      notifications.show({
        id: SUCCESS.signup.id,
        withCloseButton: true,
        autoClose: 6000,
        title: SUCCESS.signup.title,
        message: res.message,
        color: SUCCESS.signup.color,
        icon: <IconCheck className='icon' />,
      });
      await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/',
      });
    }
  };

  return (
    <PageWrap>
      <Box className='auth-box' p='xl'>
        <Box p='xl' className='login-box'>
          <Title order={1} mb='lg' className='txt'>
            회원 가입
          </Title>
          <TextInput
            value={nickname}
            label='닉네임'
            type='text'
            autoFocus={!nickname}
            withAsterisk={!nickname}
            description={
              nickname.length < 2 ? '닉네임은 2글자 이상이어야합니다.' : null
            }
            placeholder='myNickname'
            onChange={(event) => setNickname(event.currentTarget.value)}
            leftSection={<IconUser size={16} />}
            pb='md'
          />
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
            description={
              //   (!password || !password.match(regex)) &&
              '비밀번호는 영문, 숫자, 특수문자(@, $, !, %, *, ?, &) 하나 이상 조합해서 8자 이상 입력해주세요.'
            }
            placeholder='myPasswordCheck'
            onChange={(event) => setPassword(event.currentTarget.value)}
            leftSection={<IconPassword size={16} />}
            pb='md'
          />
          <PasswordInput
            label='비밀번호 확인'
            value={passwordCheck}
            type='password'
            autoFocus={!passwordCheck}
            withAsterisk={!passwordCheck}
            description={
              !passwordCheck
                ? '비밀번호를 재입력해주세요.'
                : passwordCheck !== password
                  ? '비밀번호가 일치하지 않습니다.'
                  : null
            }
            placeholder='myPasswordCheck'
            onChange={(event) => setPasswordCheck(event.currentTarget.value)}
            leftSection={<IconPassword size={16} />}
            pb='md'
          />
          <div className='flex-right'>
            <Button
              disabled={
                !nickname ||
                !password ||
                !email ||
                !passwordCheck ||
                !password.match(regex) ||
                password !== passwordCheck
              }
              onClick={() => {
                if (
                  !nickname ||
                  !password ||
                  !email ||
                  !passwordCheck ||
                  !password.match(regex) ||
                  password !== passwordCheck
                ) {
                  return;
                }
                postResponseFromApi();
              }}
            >
              submit
            </Button>
          </div>
          <Divider my='xs' label='or' labelPosition='center' />
          <LoginButton />
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
