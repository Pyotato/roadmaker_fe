import { Connection } from 'reactflow';

export interface Position {
  x: number;
  y: number;
}
export interface Viewport extends Position {
  zoom: number;
}
export interface CustomEdge extends Connection {
  id: string;
  source: string;
  type: string;
  style?: { stroke: string };
  animated: boolean;
}

export interface NodeStyle {
  [key: string]: unknown;
  background: string;
  border: string;
  borderRadius: number | string;
  fontSize: number;
}
export interface CustomNode {
  [key: string]: unknown;
  id: string;
  data: {
    label: string;
  };
  position: Viewport | Position;
  positionAbsolute?: Viewport | Position;
  type: string;
  sourcePosition?: string | null;
  targetPosition?: string | null;
  style: NodeStyle;
  width?: number | string;
  height?: number | string;
  done?: boolean;
  detailedContent?: string;
  blogKeyword?: string;
}
