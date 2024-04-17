'use client';

import { Box, Drawer, ScrollArea } from '@mantine/core';
import { IconCircleChevronRight } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Edge, Node, ReactFlowProvider } from 'reactflow';

import { IS_PROD, SITE_ROUTES } from '@/constants';

import DetailContentEditor from './components/DetailContentEditor';
import Flow from './components/Flow';
import NodeColorPicker from './components/NodeColorPicker';

export default function RoadmapEditorPage() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedNode, setClickedNode] = useState<Node | null>(null);
  const { status } = useSession();
  const router = useRouter();

  if (status === 'unauthenticated') {
    return router.replace(IS_PROD ? SITE_ROUTES.signIn : SITE_ROUTES.signInDev);
  }

  if (status === 'loading') {
    return <></>;
  }

  return (
    <ReactFlowProvider>
      <Flow
        nodes={nodes}
        setNodes={setNodes}
        edges={edges}
        setEdges={setEdges}
        setIsOpen={setIsOpen}
        setClickedNode={setClickedNode}
      />
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
          <Drawer.Body p='1rem' className='drawer-body'>
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
                {/* 
                  // 백엔드 api 변경 필요!
                  <Box mt='sm'>
                    <Box py='sm'>노드 모양 변경</Box>
                    <NodeShapePicker
                      clickedNode={clickedNode}
                      setClickedNode={setClickedNode}
                      setNodes={setNodes}
                      nodes={nodes}
                    />
                  </Box> */}
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
    </ReactFlowProvider>
  );
}
