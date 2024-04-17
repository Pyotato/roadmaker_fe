import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { SessionProvider } from 'next-auth/react';

import { GlobalStyle } from '@/styles/globalStyle';
import { theme } from '@/styles/theme';

import PageHeader from '../layouts/PageHeader';

import { Stories } from '@/types/stories';

export const Decorators = [
  (story: Stories) => <SessionProvider>{story()}</SessionProvider>,
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
  decorators: Decorators,
};

export const Default = {};
