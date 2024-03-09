'use client';
// eslint-disable-next-line simple-import-sort/imports
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

import PanelItem from '@/app/roadmap/create/components/PanelControl';
import TextUpdaterNode from '@/app/roadmap/create/components/reactFlow/custom/TextUpdaterNode';
import { defaultEdges, defaultNodes, edgeOptions } from '@/constants';
import { CustomEdge, CustomNode } from '../post/components/roadmapInfo';

const proOptions = { hideAttribution: true };

const nodeTypes = { textUpdater: TextUpdaterNode };
const edgeTypes = { bezierEdge: BezierEdge };

const Flow = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState(defaultEdges);

  const onAddNode = useCallback(() => {
    let nodeId = Number(nodes[nodes.length - 1]?.id) || 0;

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
        background: '#f4e9bc',
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
        backgroundColor: '#0d0729',
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
        // onNodeClick={(e) => console.log('node click', e)}
      >
        <Panel position='top-right'>
          <PanelItem onAddNode={onAddNode} nodes={nodes} edges={edges} />
        </Panel>
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
