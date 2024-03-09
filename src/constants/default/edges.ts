import { Connection, Edge } from 'reactflow';

import { CustomEdge } from '@/app/roadmap/post/components/roadmapInfo';

export const edgeType = 'smoothstep';

export const edgeOptions = {
  animated: true,
  style: {
    stroke: '#D3D2E5',
  },
};

export const defaultEdges: Edge<CustomEdge | Edge | Connection>[] = [
  {
    animated: true,
    id: 'reactflow__edge-bottom1-top2',
    source: '1',
    sourceHandle: 'bottom',
    style: { stroke: '#D3D2E5' },
    target: '2',
    targetHandle: 'top',
    type: 'smoothstep',
  },
];
