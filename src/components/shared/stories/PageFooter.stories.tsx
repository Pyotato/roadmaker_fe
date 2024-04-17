import type { Meta, StoryObj } from '@storybook/react';

import { GlobalStyle } from '@/styles/globalStyle';
import { theme } from '@/styles/theme';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { SessionProvider } from 'next-auth/react';
import PageFooter from '../layouts/PageFooter';

export const decorators = [
  (story: any) => <SessionProvider>{story()}</SessionProvider>,
  withThemeFromJSXProvider({
    GlobalStyles: GlobalStyle,
    themes: theme,
  }),
];

export default {
  title: '공통/푸터',
  component: PageFooter,
  parameters: {
    layout: 'fullscreen',
    // nextjs: {
    //   appDirectory: true,
    // },
  },
  // args: { primary: true, label: '로그인하러 가기' },
  tags: ['autodocs'],
  decorators,
};

export const meta: Meta<typeof PageFooter> = {
  component: PageFooter,
};

type Story = StoryObj<typeof PageFooter>;

export const Default = {
  args: {},
};
// export const Secondary = { args: { primary: false } };
// export const Large = { args: { size: 'large' } };
// export const LargeSecondary = { args: { ...Large.args, ...Secondary.args } };
