import { ReactNode } from 'react';

import StyledComponentsProvider from './StyledComponentsProvider';
import TanstackProvider from './TanstackProvider';

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <TanstackProvider>
      <StyledComponentsProvider>{children}</StyledComponentsProvider>
    </TanstackProvider>
  );
};

export default Provider;
