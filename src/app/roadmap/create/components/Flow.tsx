'use client';
import ELK from 'elkjs/lib/elk.bundled.js';
import { ElkExtendedEdge } from 'elkjs/lib/elk-api';
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
import useUndoable from 'use-undoable';

import CustomBezierEdge from '@/app/roadmap/BezierEdge';
import TextUpdaterNode from '@/app/roadmap/create/components/TextUpdaterNode';
import {
  DEFAULT_EDGE_OPTIONS,
  DEFAULT_EDGES,
  DEFAULT_NODES,
  RANDOM_NODE_COLORS,
} from '@/constants';

import PanelItem from './PanelControl';

import { CustomEdge, CustomElkNode, CustomNode } from '@/types/reactFlow';

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
  const [flow, setFlow, { undo, canUndo, redo, canRedo }] = useUndoable<{
    nodes: Node[];
    edges: Edge[];
  }>({ nodes, edges });

  const onAddNode = useCallback(() => {
    let nodeId = Number(nodes[nodes.length - 1]?.id) || 0;
    const randomColorPickerIndex = Math.floor(
      Math.random() * RANDOM_NODE_COLORS.length,
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
        background: RANDOM_NODE_COLORS[randomColorPickerIndex],
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
      setFlow({ nodes, edges });
    },
    [setNodes, edges, nodes, setFlow],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
      setFlow({ nodes, edges });
    },
    [setEdges, edges, nodes, setFlow],
  );

  useEffect(() => {
    const tempNodes = DEFAULT_NODES as Node[];
    const tempEdge = DEFAULT_EDGES as Edge[];
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
        defaultEdgeOptions={DEFAULT_EDGE_OPTIONS}
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{ stroke: DEFAULT_EDGE_OPTIONS.style.stroke }}
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
            undo={undo}
            canUndo={canUndo}
            redo={redo}
            canRedo={canRedo}
            setEdges={setEdges}
            flow={flow}
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
