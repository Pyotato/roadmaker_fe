// 'use client';
import { ActionIcon, Image, SimpleGrid, Text, TextInput } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import {
  IconBinaryTree,
  IconFileCheck,
  IconInfoCircle,
  IconPlus,
  IconSchema,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { Edge, Node } from 'reactflow';

import { omit } from '@/utils/shared';
import { getApiResponse } from '@/utils/shared/get-api-response';

import { CustomEdge, CustomNode } from '../../post/components/roadmapInfo';

const PanelItem = ({
  onAddNode,
  nodes,
  edges,
}: {
  nodes: Node[];
  edges: Edge[];
  onAddNode: () => void;
}) => {
  const router = useRouter();

  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [formData, setFormData] = useState<FormData | null>();

  useMemo(() => {
    const tempFormData = new FormData();
    tempFormData.append('file', files[0]);
    setFormData(tempFormData);
  }, [files]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        alt={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  const onSubmitRoadmap = useCallback(async () => {
    if (!formData || !files) {
      alert('썸네일은 필수입니다.');
      return;
    }
    const tempNodes = nodes.reduce((acc, curr) => {
      const tempNodes = {
        ...omit(
          curr,
          'dragging',
          'selected',
          'type',
          'targetPosition',
          'sourcePosition',
        ),
        blogKeyword: '',
        detailedContent: '',
        type: 'custom',
        targetPosition: curr?.targetPosition || 'left',
        sourcePosition: curr?.sourcePosition || 'right',
        positionAbsolute: { x: curr.position.x, y: curr.position.y },
      } as CustomNode;
      if (acc.length !== 0) acc = [...acc, tempNodes];
      else acc = [tempNodes];
      return acc;
    }, [] as CustomNode[]);

    const tempEdges = edges.reduce((acc, curr) => {
      const temp = {
        ...omit(curr, 'type', 'style'),
        type: 'smoothstep',
      } as CustomEdge;
      if (acc.length !== 0) acc = [...acc, temp];
      else acc = [temp];
      return acc;
    }, [] as CustomEdge[]);

    const [response] = await Promise.all([
      getApiResponse<undefined>({
        requestData: JSON.stringify({
          roadmap: {
            title: title,
            description: description,
          },
          nodes: tempNodes,
          edges: tempEdges,
          viewport: { x: 0, y: 0, zoom: 0.45 },
        }),
        apiEndpoint: `${process.env.NEXT_PUBLIC_API}/roadmaps`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }),
    ]);
    if (!response) {
      alert('failed to create roadmap');
      return;
    }

    await Promise.all([
      getApiResponse<undefined>({
        requestData: formData,
        apiEndpoint: `${process.env.NEXT_PUBLIC_API}/roadmaps/${response}/thumbnails`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_ACCESS_TOKEN}`,
        },
      }),
      getApiResponse<undefined>({
        requestData: JSON.stringify({}),
        apiEndpoint: `${process.env.NEXT_PUBLIC_API}/roadmaps/${response}/join`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }),
      alert(`${response} 포스팅 성공!`),
      router.replace(`/roadmap/post/${response}`),
    ]);
  }, [nodes, edges, files, title, description, formData, router]);
  return (
    <>
      {/* <Tooltip label='tootip'>
        <MyBadge color='red' />
      </Tooltip> */}
      {/* <Tooltip.Group openDelay={500} closeDelay={100}>
        <Group justify='center'>
          <Tooltip label='Tooltip 1'>
            <Button>Button 1</Button>
          </Tooltip>
          <Tooltip label='Tooltip 2'>
            <Button>Button 2</Button>
          </Tooltip>
          <Tooltip label='Tooltip 3'>
            <Button>Button 3</Button>
          </Tooltip>
        </Group>
      </Tooltip.Group> */}
      <div style={{ backgroundColor: 'green', padding: '1rem' }}>
        로드맵 제목 :{' '}
        <TextInput
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
        로드맵 설명 :{' '}
        <TextInput
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
        />
      </div>
      <div style={{ backgroundColor: 'red' }}>
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          onDrop={(e) => {
            setFiles(e);
          }}
        >
          <Text ta='center'>Drop images here</Text>
        </Dropzone>

        <SimpleGrid
          cols={{ base: 1, sm: 4 }}
          mt={previews.length > 0 ? 'xl' : 0}
        >
          {previews}
        </SimpleGrid>
      </div>
      <ActionIcon variant='default'>
        <IconSchema data-disabled size='1rem' />
      </ActionIcon>
      <ActionIcon variant='default'>
        <IconBinaryTree data-disabled size='1rem' />
      </ActionIcon>
      <ActionIcon variant='default' onClick={onSubmitRoadmap}>
        <IconFileCheck data-disabled size='1rem' />
      </ActionIcon>
      <ActionIcon variant='default'>
        <IconInfoCircle data-disabled size='1rem' />
      </ActionIcon>
      <ActionIcon variant='default' onClick={onAddNode}>
        <IconPlus data-disabled size='1rem' />
      </ActionIcon>
    </>
  );
};
export default PanelItem;
