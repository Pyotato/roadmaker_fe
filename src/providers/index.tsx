import { ModalsProvider } from '@mantine/modals';
import { ReactNode } from 'react';

import SessionWrapper from './SessionProvider';
import StyledComponentsProvider from './StyledComponentsProvider';
import TanstackProvider from './TanstackProvider';

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <TanstackProvider>
      <SessionWrapper>
        <ModalsProvider>
          <StyledComponentsProvider>{children}</StyledComponentsProvider>
        </ModalsProvider>
      </SessionWrapper>
    </TanstackProvider>
  );
};

export default Provider;
