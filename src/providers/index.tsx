import { ReactNode } from 'react';

import QueryProvider from './QueryProvider';
import StyledComponentsProvider from './StyledComponentsProvider';
import TanstackProvider from './TanstackProvider';

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <TanstackProvider>
      {/* <SessionProvider> */}
      <QueryProvider>
        <StyledComponentsProvider>{children}</StyledComponentsProvider>
        {/* </SessionProvider> */}
      </QueryProvider>
    </TanstackProvider>
  );
};

export default Provider;
