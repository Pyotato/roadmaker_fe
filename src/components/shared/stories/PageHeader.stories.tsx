import { GlobalStyle } from '@/styles/globalStyle';
import { theme } from '@/styles/theme';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { SessionProvider } from 'next-auth/react';
import PageHeader from '../layouts/PageHeader';

export const decorators = [
  (story: any) => <SessionProvider>{story()}</SessionProvider>,
  withThemeFromJSXProvider({
    GlobalStyles: GlobalStyle,
    themes: theme,
  }),
];

export default {
  title: '공통/헤더',
  component: PageHeader,
  args: {},
  tags: ['autodocs'],
  decorators,
};

export const Default = {};
