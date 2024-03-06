import { PropsWithChildren } from 'react';

import { ReactFlowInfo } from '.';

interface ReactFlowProps extends PropsWithChildren {
  reactFlowInfo: ReactFlowInfo;
}

const ReactFlow = ({ reactFlowInfo }: ReactFlowProps) => {
  console.log(reactFlowInfo);
  return <>roadmapInfo</>;
};
export default ReactFlow;
