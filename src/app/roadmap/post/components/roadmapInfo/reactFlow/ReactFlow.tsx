'use client';

import { PropsWithChildren, useEffect } from 'react';
import ReactFlow, {
  Edge,
  Node,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import styled from 'styled-components';

import 'reactflow/dist/style.css';

import { ReactFlowInfo } from '@/app/roadmap/post/components/roadmapInfo';
import TipTapEditor from '@/app/roadmap/post/components/roadmapInfo/TiptapEditor';

import CustomEdge from './custom/BezierEdge';
import { DoneStatusNode } from './custom/DoneStatusNode';

interface ReactFlowProps extends PropsWithChildren {
  reactFlowInfo: ReactFlowInfo;
}

const proOptions = { hideAttribution: true };

const ReactFlowRoadmap = ({ reactFlowInfo }: ReactFlowProps) => {
  const { nodes, edges } = reactFlowInfo;

  const [nodeState, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edgeState, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const getMinMax = <T extends ReactFlowInfo['nodes']>(obj: T, arg: string) =>
    obj.reduce(
      (acc, curr) => {
        const currVal = arg === 'height' ? curr.position.y : curr.position.x;
        if (Math.min(acc.min, currVal) === currVal) acc.min = currVal;
        if (Math.max(acc.max, currVal) === currVal) acc.max = currVal;
        return acc;
      },
      { max: -Infinity, min: Infinity },
    );

  const getHeight = getMinMax(nodes, 'height');
  const getWidth = getMinMax(nodes, 'width');

  const getRangePx = (obj: { max: number; min: number }, offset: number) =>
    `${obj.max + obj.min + offset}px`;

  const nodeTypes = { custom: DoneStatusNode };

  const edgeTypes = {
    smoothstep: CustomEdge,
  };

  useEffect(() => {
    const customNodes = nodes as unknown as Node<Node[], string | undefined>[];
    const customEdges = edges as unknown as Edge<Edge[]>[];
    setNodes(customNodes);
    setEdges(customEdges);
  }, [nodes, edges, setEdges, setNodes]);

  return (
    <Wrap
      style={{
        height: `${getRangePx(getHeight, 300)}`,
        width: `${getRangePx(getWidth, 396)}`,
        padding: '1rem',
        overflowX: 'visible',
      }}
    >
      <ReactFlowProvider>
        <ReactFlow
          preventScrolling={false}
          nodes={nodeState}
          nodeTypes={nodeTypes}
          edges={edgeState}
          edgeTypes={edgeTypes}
          proOptions={proOptions}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          elementsSelectable={true}
          nodesConnectable={false}
          nodesDraggable={false}
          zoomOnScroll={false}
          panOnScroll={false}
          zoomOnDoubleClick={false}
          panOnDrag={false}
          attributionPosition='top-right'
        ></ReactFlow>
        <TipTapEditor />
      </ReactFlowProvider>
    </Wrap>
  );
};

const Wrap = styled.div`
  .react-flow__node.react-flow__node-custom {
    max-width: 15rem !important;
    width: fit-content !important;

    :hover {
      cursor: pointer;
    }
  }
`;
export default ReactFlowRoadmap;
