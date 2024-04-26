'use client';

import {
  Box,
  Button,
  Divider,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import { IconAt, IconPassword, IconUser } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import styled from 'styled-components';

import { signup } from '@/service/auth';

import AuthButton from './components/AuthButton';

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
            description='비밀번호는 영문, 숫자, 특수문자(@, $, !, %, *, ?, &) 하나 이상 조합해서 8자 이상 입력해주세요.'
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
                signup({ email, nickname, password, setNickname, setEmail });
              }}
            >
              submit
            </Button>
          </div>
          <Divider my='xs' label='or' labelPosition='center' />
          <AuthButton btnText='로그인 하러가기' fn={() => signIn()} />
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
