'use client';

import {
  ActionIcon,
  Box,
  Group,
  Image,
  Text,
  Textarea,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import {
  IconExclamationCircle,
  IconFileCheck,
  IconLayersIntersect2,
  IconLayoutDistributeHorizontal,
  IconLayoutDistributeVertical,
  IconPencil,
  IconPhotoPlus,
  IconPlus,
  IconTriangleSquareCircle,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Edge, Node } from 'reactflow';

import { omit } from '@/utils/shared';
import { getApiResponse } from '@/utils/shared/get-api-response';

import { CustomEdge, CustomNode } from '@/types/reactFlow';

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
  const ref = useRef<HTMLImageElement | null>(null);
  const [formData, setFormData] = useState<FormData | null>();
  const [isToggled, setIsToggled] = useState(true);

  useMemo(() => {
    const tempFormData = new FormData();
    tempFormData.append('file', files[0]);
    setFormData(tempFormData);
  }, [files]);

  const previews = files.map((file) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        ref={ref}
        key={`${file.name}`}
        src={imageUrl}
        alt={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  const onChangeShape = () => {};

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
        type: 'custom',
        targetPosition: curr?.targetPosition ?? 'left',
        sourcePosition: curr?.sourcePosition ?? 'right',
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
    <Box style={{ backgroundColor: 'white', borderRadius: '0.2rem' }} p='md'>
      <Tooltip.Group>
        <Group>
          <Tooltip
            label={`${isToggled ? '숨기기' : '펼치기'}`}
            position='bottom'
          >
            <div>
              <ActionIcon
                variant='default'
                onClick={() => setIsToggled(!isToggled)}
              >
                <IconPencil data-disabled size='1rem' />
              </ActionIcon>
            </div>
          </Tooltip>
          <Tooltip label='add node' position='bottom'>
            <ActionIcon variant='default' onClick={onAddNode}>
              <IconPlus data-disabled size='1rem' />
            </ActionIcon>
          </Tooltip>
          <Tooltip label='shift + drag 으로 그룹하기' position='bottom'>
            <ActionIcon variant='default'>
              <IconLayersIntersect2 data-disabled size='1rem' />
            </ActionIcon>
          </Tooltip>
          <Tooltip label='horizontal layout' position='bottom'>
            <ActionIcon variant='default'>
              <IconLayoutDistributeVertical data-disabled size='1rem' />
            </ActionIcon>
          </Tooltip>
          <Tooltip label='horizontal layout' position='bottom'>
            <ActionIcon variant='default'>
              <IconLayoutDistributeHorizontal data-disabled size='1rem' />
            </ActionIcon>
          </Tooltip>
          <Tooltip label='change shape' position='bottom'>
            <ActionIcon variant='default' onClick={onChangeShape}>
              <IconTriangleSquareCircle data-disabled size='1rem' />
            </ActionIcon>
          </Tooltip>

          <Tooltip
            label={
              !title || !description || !files[0]
                ? '로드맵 정보를 추가해주세요'
                : '제출'
            }
            position='bottom'
          >
            <ActionIcon
              variant='default'
              onClick={() => {
                if (!title || !description || !files[0]) {
                  setIsToggled(true);
                  return;
                }
                onSubmitRoadmap();
              }}
            >
              <IconFileCheck data-disabled size='1rem' />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Tooltip.Group>
      {isToggled && (
        <Box>
          <Box>
            <Box>
              <Box py='sm' style={{ display: 'inline-flex' }}>
                제목{' '}
                {!title && (
                  <IconExclamationCircle
                    data-disabled
                    size='1rem'
                    color='red'
                    fill='white'
                  />
                )}
              </Box>
              <TextInput
                value={title}
                autoFocus={!title || !description || !files[0]}
                placeholder='프론트엔드 개발자 로드맵'
                onChange={(event) => setTitle(event.currentTarget.value)}
              />
            </Box>
            <Box py='xs'>
              <Box py='sm' style={{ display: 'inline-flex' }}>
                설명
                {!description && (
                  <IconExclamationCircle
                    data-disabled
                    size='1rem'
                    color='red'
                    fill='white'
                  />
                )}
              </Box>

              <Textarea
                value={description}
                autosize
                minRows={2}
                autoFocus={title !== '' && (!description || !files[0])}
                placeholder='이 로드맵은 신입 프론트엔드 개발자가 되기 위한 학습 로드맵입니다.'
                onChange={(event) => setDescription(event.currentTarget.value)}
              />
            </Box>
          </Box>
          <Box py='sm' style={{ display: 'inline-flex' }}>
            썸네일
            {!files[0] && (
              <IconExclamationCircle
                data-disabled
                size='1rem'
                color='red'
                fill='white'
              />
            )}
          </Box>
          <Box style={{ border: '1px solid #ced4da' }} className='hvr hvrImg'>
            <Dropzone
              accept={IMAGE_MIME_TYPE}
              onDrop={(e) => {
                setFiles(e);
              }}
            >
              {previews.length > 0 ? (
                <Tooltip.Floating label='이미지 변경하기'>
                  <Box>{previews}</Box>
                </Tooltip.Floating>
              ) : (
                <Box
                  style={{
                    height: '100%',
                    width: '100%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderRadius: '0.2rem',
                  }}
                  py='sm'
                  className='input-text'
                >
                  <Text ta='center'>
                    <IconPhotoPlus data-disabled size='3rem' />
                  </Text>
                  <Text ta='center'>Drop images here</Text>
                </Box>
              )}
            </Dropzone>
          </Box>
        </Box>
      )}
      {(!title || !files[0] || !description) && (
        <div
          style={{
            position: 'absolute',
            top: '0.6rem',
            translate: '120%',
            zIndex: 900,
          }}
        >
          <IconExclamationCircle
            data-disabled
            size='1rem'
            color='red'
            fill='white'
          />
        </div>
      )}
    </Box>
  );
};
export default PanelItem;
