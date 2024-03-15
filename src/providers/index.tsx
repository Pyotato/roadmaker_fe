import { ReactNode } from 'react';

import SessionWrapper from './SessionProvider';
import StyledComponentsProvider from './StyledComponentsProvider';
import TanstackProvider from './TanstackProvider';

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <TanstackProvider>
      <SessionWrapper>
        <StyledComponentsProvider>{children}</StyledComponentsProvider>
      </SessionWrapper>
    </TanstackProvider>
  );
};

export default Provider;
