'use client';
import { Text } from '@mantine/core';
import { Handle, HandleType, NodeProps, Position } from 'reactflow';
import { styled } from 'styled-components';

import { CustomNode } from '@/types/reactFlow';

type NodeData = {
  label: CustomNode['data']['label'];
};

export function QuadroHandleNode({ data }: NodeProps<NodeData>) {
  const positions = [
    Position.Right,
    Position.Bottom,
    Position.Left,
    Position.Top,
  ];
  const Handles = (type: HandleType) =>
    positions.map((v) => (
      <Handle className='handle' type={type} position={v} id={v} key={v} />
    ));
  return (
    <Wrap className='node'>
      {Handles('target')}
      <Text className='label-input'>{data.label}</Text>
      {Handles('source')}
    </Wrap>
  );
}
export default QuadroHandleNode;

const Wrap = styled.div`
  .react-flow__node.react-flow__node-custom {
    font-size: 1rem !important;
  }
  .handle {
    opacity: 0;
  }
`;
