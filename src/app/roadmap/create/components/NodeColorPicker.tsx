'use client';
import { Box, ColorPicker } from '@mantine/core';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { Node, useUpdateNodeInternals } from 'reactflow';

import { DEFAULT_NODES } from '@/constants';
import { omit } from '@/utils/shared';

const NodeColorPicker = ({
  clickedNode,
  setNodes,
  nodes,
  setClickedNode,
}: {
  clickedNode: Node;
  setClickedNode: Dispatch<SetStateAction<Node | null>>;
  setNodes: Dispatch<SetStateAction<Node[]>>;
  nodes: Node[];
}) => {
  const [colorValue, setColorValue] = useState(
    clickedNode?.style?.background ?? DEFAULT_NODES[0].style.background,
  );
  const updateNodeInternals = useUpdateNodeInternals();

  useMemo(() => {
    const newBackground = `${clickedNode.style?.background}`;
    setColorValue(newBackground);
  }, [clickedNode]);

  useMemo(() => {
    updateNodeInternals(clickedNode.id);
  }, [clickedNode.id, updateNodeInternals]);

  return (
    <Box>
      <ColorPicker
        format='rgba'
        value={`${colorValue}`}
        onChange={(e) => {
          setColorValue(e);
          const newStyle = {
            background: `${e}`,
            border: '1px solid black',
            borderRadius: 15,
            fontSize: 24,
          };

          const currNode = nodes.filter((v) => v.id == clickedNode.id);
          const temp = {
            ...omit(currNode[0], 'style'),
            style: newStyle,
          } as Node;
          setClickedNode(temp);
          const newNodes = nodes.reduce((acc, curr) => {
            if (curr.id === temp.id) {
              acc.push(temp);
              return acc;
            } else {
              acc.push(curr);
            }
            return acc;
          }, [] as Node[]);
          setNodes([...newNodes]);
        }}
      />
    </Box>
  );
};

export default NodeColorPicker;
