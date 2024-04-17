import { MantineProvider } from '@mantine/core';

import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { addons } from '@storybook/preview-api';

import React from 'react';
import { GlobalStyle } from '../src/styles/globalStyle';

import { ModalsProvider } from '@mantine/modals';
import '@mantine/tiptap/styles.css';
import { QueryCache } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import 'reactflow/dist/style.css';
import { ThemeProvider } from 'styled-components';
import SessionWrapper from '../src/providers/SessionProvider';
import StyledComponentsProvider from '../src/providers/StyledComponentsProvider';
import { theme as colortheme } from '../src/styles/theme';

const queryCache = new QueryCache();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

const channel = addons.getChannel();

const GlobalStyles = GlobalStyle;
const session = useSession();

export const decorators = [
  (renderStory: any) => (
    <ThemeProvider theme={colortheme}>
      <MantineProvider>
        <SessionWrapper>
          <ModalsProvider>
            <StyledComponentsProvider>{renderStory()}</StyledComponentsProvider>
          </ModalsProvider>
        </SessionWrapper>
      </MantineProvider>
    </ThemeProvider>
  ),
  withThemeFromJSXProvider({
    Provider: ThemeProvider,
    GlobalStyles,
  }),
];
