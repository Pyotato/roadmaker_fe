import { Connection, Edge } from 'reactflow';

import { CustomEdge } from '@/types/reactFlow';

export const edgeType = 'smoothstep';

export const edgeOptions = {
  animated: true,
  style: {
    stroke: '#000000',
  },
};

export const defaultEdges: Edge<CustomEdge | Edge | Connection>[] = [
  {
    animated: true,
    id: 'reactflow__edge-bottom1-top2',
    source: '1',
    sourceHandle: 'bottom',
    style: { stroke: '#000000' },
    target: '2',
    targetHandle: 'top',
    type: 'smoothstep',
  },
];
