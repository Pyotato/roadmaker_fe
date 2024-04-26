import AuthButton from '@/app/auth/components/AuthButton';

export default {
  title: '회원가입/로그인하러 가기',
  component: AuthButton,
  args: { primary: true, label: '로그인하러 가기' },
  tags: ['autodocs'],
};

export const Default = {};
export const Secondary = { args: { primary: false } };
export const Large = { args: { size: 'large' } };
export const LargeSecondary = { args: { ...Large.args, ...Secondary.args } };
