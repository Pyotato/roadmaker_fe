import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { ReactNode } from 'react';

import Providers from '@/providers/StyledComponentsProvider';
import { GlobalStyle } from '@/styles/globalStyle';

import SessionWrapper from './SessionProvider';
import StyledComponentsProvider from './StyledComponentsProvider';
import TanstackProvider from './TanstackProvider';

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <Providers>
      <GlobalStyle />
      <MantineProvider>
        <TanstackProvider>
          <SessionWrapper>
            <ModalsProvider>
              <StyledComponentsProvider>{children}</StyledComponentsProvider>
            </ModalsProvider>
          </SessionWrapper>
        </TanstackProvider>
      </MantineProvider>
    </Providers>
  );
};

export default Provider;
