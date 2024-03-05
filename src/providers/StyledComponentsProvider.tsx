'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';

import StyledComponentsRegistry from '@/registry';
import { theme } from '@/styles/theme';

const StyledComponentsProvider = (props: React.PropsWithChildren) => {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </StyledComponentsRegistry>
  );
};

export default StyledComponentsProvider;
