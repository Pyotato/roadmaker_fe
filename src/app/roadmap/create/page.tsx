'use client';

// eslint-disable-next-line simple-import-sort/imports
import { Box, Drawer, ScrollArea } from '@mantine/core';
import { IconCircleChevronRight } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  BezierEdge,
  Connection,
  ConnectionLineType,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  Panel,
  ReactFlowProvider,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';

import TextUpdaterNode from '@/components/reactflow/custom/edge/TextUpdaterNode';

import {
  defaultEdges,
  defaultNodes,
  edgeOptions,
  randomNodeColor,
} from '@/constants';

import DetailContentEditor from './components/panel/DetailContentEditor';
import NodeColorPicker from './components/panel/NodeColorPicker';
import PanelItem from './components/panel/PanelControl';

import { CustomEdge, CustomNode } from '@/types/reactFlow';

const proOptions = { hideAttribution: true };

const nodeTypes = { textUpdater: TextUpdaterNode };
const edgeTypes = { bezierEdge: BezierEdge };

const Flow = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState(defaultEdges);
  const [isOpen, setIsOpen] = useState(false);

  const [clickedNode, setClickedNode] = useState<Node | null>(null);

  const onAddNode = useCallback(() => {
    let nodeId = Number(nodes[nodes.length - 1]?.id) || 0;
    const randomColorPickerIndex = Math.floor(
      Math.random() * randomNodeColor.length,
    );
    const id = `${++nodeId}`;
    const newNode = {
      id,
      data: { label: '내용을 입력해주세요.' },
      position: {
        x: nodes[nodes.length - 1]?.position?.x + 100 || 0,
        y: nodes[nodes.length - 1]?.position?.y + 100 || 0,
        zoom: 0.45,
      },
      positionAbsolute: {
        x: nodes[nodes.length - 1]?.position?.x + 100 || 0,
        y: nodes[nodes.length - 1]?.position?.y + 100 || 0,
      },
      type: 'textUpdater',
      style: {
        background: randomNodeColor[randomColorPickerIndex],
        border: '1px solid black',
        borderRadius: 15,
        fontSize: 24,
      },
      blogKeyword: '',
      detailedContent: '',
    } as Node | CustomNode;

    const temp = [...nodes, newNode] as Node[];
    setNodes(temp);
  }, [setNodes, nodes]);

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = {
        ...connection,
        type: 'smoothstep',
        id: `reactflow__edge-${connection.sourceHandle}${connection.source}-${connection.targetHandle}${connection.target}`,
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
      } as Edge | Connection | CustomEdge;
      setEdges((eds) => {
        return addEdge(edge, eds);
      });
    },
    [setEdges],
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  useEffect(() => {
    const temp = defaultNodes as Node[];
    setNodes(temp);
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '96vh',
        backgroundColor: '#EFEFEF',
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        defaultEdgeOptions={edgeOptions}
        connectionLineStyle={{ stroke: edgeOptions.style.stroke }}
        fitView
        zoomOnDoubleClick
        elevateNodesOnSelect
        snapToGrid
        connectionLineType={ConnectionLineType.SmoothStep}
        proOptions={proOptions}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(e, node: Node) => {
          setClickedNode(node);
          setIsOpen(true);
        }}
      >
        <Panel position='top-right'>
          <PanelItem onAddNode={onAddNode} nodes={nodes} edges={edges} />
        </Panel>
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
            <Drawer.CloseButton
              mr='1rem'
              mt='1rem'
              ml='1rem'
              icon={<IconCircleChevronRight size={26} stroke={1.5} />}
            />
            <Drawer.Body p='1rem' style={{ height: '100vh' }}>
              {clickedNode && (
                <Box pb='sm'>
                  <Box pb='sm'>
                    <Box py='sm'>노드 색상 변경</Box>
                    <NodeColorPicker
                      clickedNode={clickedNode}
                      setClickedNode={setClickedNode}
                      setNodes={setNodes}
                      nodes={nodes}
                    />
                  </Box>
                  <Box mt='sm'>
                    <Box py='sm'>노드 상세 내용</Box>
                    <DetailContentEditor
                      clickedNode={clickedNode}
                      setClickedNode={setClickedNode}
                      setNodes={setNodes}
                      nodes={nodes}
                    />
                  </Box>
                </Box>
              )}
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
        <Background gap={16} />
        <Controls position='bottom-right' />
        <MiniMap zoomable pannable position='bottom-left' />
      </ReactFlow>
    </div>
  );
};

export default function RoadmapEditorPage() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
