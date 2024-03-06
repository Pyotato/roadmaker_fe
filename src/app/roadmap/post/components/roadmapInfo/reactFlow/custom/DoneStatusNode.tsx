'use client';
import { Handle, NodeProps, Position } from 'reactflow';
import { styled } from 'styled-components';

import { CustomNode } from '@/app/roadmap/post/components/roadmapInfo';

type NodeData = {
  label: CustomNode['data']['label'];
};

export function DoneStatusNode({ data }: NodeProps<NodeData>) {
  return (
    <Wrap
      className='node'
      style={{
        width: 'fit-content',
        fontSize: '1rem',
        padding: '1rem',
      }}
    >
      <Handle style={{ opacity: 0 }} type='target' position={Position.Left} />
      <Handle style={{ opacity: 0 }} type='target' position={Position.Top} />
      {data.label}
      <Handle style={{ opacity: 0 }} type='source' position={Position.Right} />
      <Handle style={{ opacity: 0 }} type='source' position={Position.Bottom} />
    </Wrap>
  );
}
export default DoneStatusNode;

const Wrap = styled.div`
  .react-flow__node.react-flow__node-custom {
    font-size: 1rem !important;
  }
`;
