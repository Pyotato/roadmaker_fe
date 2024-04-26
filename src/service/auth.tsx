import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { signIn } from 'next-auth/react';
import { Dispatch, SetStateAction } from 'react';

import { API_ROUTES, FAIL, SUCCESS } from '@/constants';
import { getApiResponse } from '@/utils/get-api-response';

export const signup = async ({
  email,
  nickname,
  password,
  setNickname,
  setEmail,
}: {
  email: string;
  nickname: string;
  password: string;
  setNickname: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
}) => {
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

export const signin = async ({
  email,
  password,
  setEmail,
  setPassword,
  showToast,
}: {
  email: string;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  showToast: () => void;
}) => {
  const res = await Promise.resolve(
    signIn('credentials', {
      email,
      password,
      redirect: false,
    }),
  );

  if (res?.error) {
    setEmail('');
    setPassword('');
    showToast();
  }
  return res;
};
