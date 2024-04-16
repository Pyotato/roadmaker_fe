'use client';

import { Drawer, ScrollArea } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  ConnectionLineType,
  Edge,
  Node,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import styled from 'styled-components';

import CustomBezierEdge from '@/components/reactflow/custom/edge/BezierEdge';
import { QuadroHandleNode } from '@/components/reactflow/custom/node/QuadroHandleNode';

import NodeDetails from '@/app/roadmap/post/[...id]/@roadmapInfo/reactFlow/TiptapEditor';
import { DEFAULT_EDGE_OPTIONS } from '@/constants';

import { DetailedContent, ReactFlowProps } from '@/types/post';
import { CustomEdge, ReactFlowInfo } from '@/types/reactFlow';

const proOptions = { hideAttribution: true };

const ReactFlowRoadmap = ({ reactFlowInfo }: ReactFlowProps) => {
  const { nodes, edges } = reactFlowInfo;
  const [isOpen, setIsOpen] = useState(false);
  const [openNode, setOpenNode] = useState<DetailedContent>({
    id: '',
    detailedContent: '',
  });

  const [nodeState, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edgeState, setEdges, onEdgesChange] = useEdgesState<
    CustomEdge[] | Edge[]
  >([]);
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
    `${obj.max - obj.min + offset}px`;

  const nodeTypes = useMemo(() => ({ custom: QuadroHandleNode }), []);

  const edgeTypes = useMemo(() => ({ smoothstep: CustomBezierEdge }), []);
  const detailedContent: DetailedContent[] = nodes.map((v) => {
    return { id: v.id, detailedContent: v.detailedContent };
  });

  useEffect(() => {
    const customNodes = nodes as unknown as Node<Node[], string | undefined>[];
    const customEdges = edges.reduce(
      (acc, curr) => {
        const temp = curr;
        const regex = /left|right|top|bottom/g;
        const handles = temp.id.match(regex);

        if (handles) {
          temp['sourceHandle'] = `${handles[0]}`;
          temp['targetHandle'] = `${handles[1]}`;
        }
        acc.push(temp);

        return acc;
      },
      [] as Array<CustomEdge | Edge>,
    ) as Array<Edge>;

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
          fitView
          defaultEdgeOptions={DEFAULT_EDGE_OPTIONS}
          connectionLineType={ConnectionLineType.SmoothStep}
          connectionLineStyle={{ stroke: DEFAULT_EDGE_OPTIONS.style.stroke }}
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
          onNodeClick={(_e, n) => {
            setIsOpen(true);
            setOpenNode(detailedContent.filter((v) => v.id == n.id)[0]);
          }}
        ></ReactFlow>
        <Drawer.Root
          opened={isOpen}
          scrollAreaComponent={ScrollArea.Autosize}
          onClose={() => {
            setIsOpen(false);
          }}
          position='right'
          keepMounted
          closeOnEscape
          lockScroll={false}
        >
          <Drawer.Content>
            <Drawer.CloseButton mr='1rem' mt='1rem' ml='1rem' />
            <Drawer.Body p='1rem' style={{ height: '100vh', width: '27.6rem' }}>
              <NodeDetails details={openNode} />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      </ReactFlowProvider>
    </Wrap>
  );
};

const Wrap = styled.div`
  .react-flow__node.react-flow__node-custom {
    max-width: 15rem !important;
    width: fit-content !important;
    overflow-wrap: anywhere !important;
    :hover {
      cursor: pointer;
    }
  }
`;
export default ReactFlowRoadmap;
