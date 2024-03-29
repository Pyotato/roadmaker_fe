'use client';
import ELK from 'elkjs/lib/elk.bundled.js';
import { ElkExtendedEdge, ElkNode } from 'elkjs/lib/elk-api';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Connection,
  ConnectionLineType,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  Panel,
  useReactFlow,
  XYPosition,
} from 'reactflow';

import CustomBezierEdge from '@/components/reactflow/custom/edge/BezierEdge';
import TextUpdaterNode from '@/components/reactflow/custom/node/TextUpdaterNode';

import {
  defaultEdges,
  defaultNodes,
  edgeOptions,
  randomNodeColor,
} from '@/constants';

import PanelItem from './panel/PanelControl';

import { CustomEdge, CustomNode } from '@/types/reactFlow';

interface CustomElkNode extends ElkNode {
  id: Node['id'];
  data: Node['data'];
  position: XYPosition;
}

const proOptions = { hideAttribution: true };

const nodeTypes = { textUpdater: TextUpdaterNode };
const edgeTypes = { bezierEdge: CustomBezierEdge };

const elk = new ELK();

const Flow = ({
  nodes,
  edges,
  setNodes,
  setEdges,
  setIsOpen,
  setClickedNode,
}: {
  nodes: Node[];
  edges: Edge<CustomEdge | Connection | Edge>[];
  setNodes: Dispatch<SetStateAction<Node[]>>;
  setEdges: Dispatch<SetStateAction<Edge<CustomEdge | Connection | Edge>[]>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setClickedNode: Dispatch<SetStateAction<Node | null>>;
}) => {
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

  const useLayoutedElements = () => {
    const { getNodes, setNodes, getEdges, fitView, setEdges } = useReactFlow();

    const getLayoutedElements = useCallback(
      (options: { [key: string]: unknown }) => {
        const defaultOptions = {
          'elk.algorithm': 'layered',
          'elk.layered.spacing.nodeNodeBetweenLayers': 100,
          'elk.spacing.nodeNode': 80,
        };
        const layoutOptions = { ...defaultOptions, ...options };
        const graph = {
          id: 'root',
          layoutOptions: layoutOptions,
          children: getNodes(),
          edges: getEdges() as unknown as Edge[],
        } as unknown as ElkExtendedEdge;

        elk.layout(graph).then(({ children, edges }) => {
          if (children) {
            const chrn = children as CustomElkNode[];
            chrn.forEach((node) => {
              node.position = { x: node.x, y: node.y } as XYPosition;
            });
            setNodes(chrn);
          }

          if (edges) {
            const eds = edges as unknown as Edge[];
            eds.forEach((edge) => {
              let temp = edge.id;
              if (options['elk.direction']) {
                if (options['elk.direction'] === 'RIGHT') {
                  edge.sourceHandle = 'right';
                  edge.targetHandle = 'left';
                  temp = edge.id
                    .replace('bottom', 'right')
                    .replace('top', 'left');
                } else if (options['elk.direction'] === 'DOWN') {
                  edge.sourceHandle = 'bottom';
                  edge.targetHandle = 'top';
                  temp = edge.id
                    .replace('left', 'top')
                    .replace('right', 'bottom');
                }
                edge.id = temp;
              }
            });

            setEdges(eds);
          }

          window.requestAnimationFrame(() => {
            fitView();
          });
        });
      },
      [getNodes, getEdges, setNodes, setEdges, fitView],
    );

    return { getLayoutedElements };
  };

  const { getLayoutedElements } = useLayoutedElements();

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
    const tempNodes = defaultNodes as Node[];
    const tempEdge = defaultEdges as Edge[];
    setNodes(tempNodes);
    setEdges(tempEdge);
  }, [setNodes, setEdges]);

  return (
    <div
      style={{
        width: '100vw',
        height: '96vh',
        backgroundColor: '#EFEFEF',
      }}
    >
      <ReactFlow
        fitView
        defaultEdgeOptions={edgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{ stroke: edgeOptions.style.stroke }}
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        edgeTypes={edgeTypes}
        proOptions={proOptions}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        zoomOnDoubleClick
        elevateNodesOnSelect
        snapToGrid
        onConnect={onConnect}
        onNodeClick={(e, node: Node) => {
          setClickedNode(node);
          if ('className' in e.target && e.target?.className === 'label-wrap')
            setIsOpen(true);
        }}
      >
        <Panel position='top-right'>
          <PanelItem
            onAddNode={onAddNode}
            nodes={nodes}
            edges={edges}
            getLayoutedElements={getLayoutedElements}
            setEdges={setEdges}
            setNodes={setNodes}
          />
        </Panel>
        <Background gap={16} />
        <Controls position='bottom-right' />
        <MiniMap zoomable pannable position='bottom-left' />
      </ReactFlow>
    </div>
  );
};

export default Flow;
