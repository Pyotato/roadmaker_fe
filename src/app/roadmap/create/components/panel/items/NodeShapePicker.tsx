'use client';
import { ActionIcon, Box, Group } from '@mantine/core';
import { IconCircleFilled, IconRectangleFilled } from '@tabler/icons-react';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { Node, useUpdateNodeInternals } from 'reactflow';

import { defaultNodes } from '@/constants';
import { omit, pick } from '@/utils/shared';

import { NodeStyle } from '@/types/reactFlow';

const NodeShapePicker = ({
  clickedNode,
  setClickedNode,
  setNodes,
  nodes,
}: {
  clickedNode: Node;
  setClickedNode: Dispatch<SetStateAction<Node | null>>;
  setNodes: Dispatch<SetStateAction<Node[]>>;
  nodes: Node[];
}) => {
  const updateNodeInternals = useUpdateNodeInternals();

  useMemo(() => {
    updateNodeInternals(clickedNode.id);
  }, [clickedNode.id, updateNodeInternals]);

  return (
    <Box>
      <Group>
        <ActionIcon
          variant='default'
          onClick={() => {
            const temp = pick(clickedNode, 'style') as { style: NodeStyle };
            const styleWithoutBorderRadius = omit(
              temp.style,
              'borderRadius',
            ) as Omit<NodeStyle, 'borderRadius'>;
            const defaultStyle = {
              ...styleWithoutBorderRadius,
              borderRadius: defaultNodes[0].style.borderRadius,
              aspectRatio: 'auto',
            };
            const currNode = nodes.filter((v) => v.id == clickedNode.id);
            const tempCurrNode = {
              ...omit(currNode[0], 'style'),
              style: defaultStyle,
            } as Node;
            setClickedNode(tempCurrNode);
            const newNodes = nodes.reduce((acc, curr) => {
              if (curr.id === tempCurrNode.id) {
                acc.push(tempCurrNode);
                return acc;
              } else {
                acc.push(curr);
              }
              return acc;
            }, [] as Node[]);
            setNodes([...newNodes]);
          }}
        >
          <IconRectangleFilled data-disabled size='1rem' />
        </ActionIcon>
        <ActionIcon
          variant='default'
          onClick={() => {
            const temp = pick(clickedNode, 'style') as { style: NodeStyle };
            const styleWithoutBorderRadius = omit(
              temp.style,
              'borderRadius',
            ) as Omit<NodeStyle, 'borderRadius'>;
            const circleStyle = {
              ...styleWithoutBorderRadius,
              borderRadius: '100%',
              aspectRatio: 1,
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.3rem',
            };
            const currNode = nodes.filter((v) => v.id == clickedNode.id);
            const tempCurrNode = {
              ...omit(currNode[0], 'style'),
              style: circleStyle,
            } as Node;
            setClickedNode(tempCurrNode);
            const newNodes = nodes.reduce((acc, curr) => {
              if (curr.id === tempCurrNode.id) {
                acc.push(tempCurrNode);
                return acc;
              } else {
                acc.push(curr);
              }
              return acc;
            }, [] as Node[]);
            setNodes([...newNodes]);
          }}
        >
          <IconCircleFilled data-disabled size='1rem' />
        </ActionIcon>
      </Group>
    </Box>
  );
};

export default NodeShapePicker;
