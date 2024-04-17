import { MantineProvider } from '@mantine/core';

import { withThemeFromJSXProvider } from '@storybook/addon-themes';

import React from 'react';
import { GlobalStyle } from '../src/styles/globalStyle';

import { ModalsProvider } from '@mantine/modals';
import '@mantine/tiptap/styles.css';
import 'reactflow/dist/style.css';
import { ThemeProvider } from 'styled-components';
import SessionWrapper from '../src/providers/SessionProvider';
import StyledComponentsProvider from '../src/providers/StyledComponentsProvider';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

const GlobalStyles = GlobalStyle;

export const decorators = [
  (renderStory: any) => (
    <MantineProvider>
      <SessionWrapper>
        <ModalsProvider>
          <StyledComponentsProvider>{renderStory()}</StyledComponentsProvider>
        </ModalsProvider>
      </SessionWrapper>
    </MantineProvider>
  ),
  withThemeFromJSXProvider({
    Provider: ThemeProvider,
    GlobalStyles,
  }),
];
