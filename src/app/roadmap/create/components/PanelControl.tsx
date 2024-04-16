'use client';

import {
  ActionIcon,
  Box,
  Group,
  Image,
  Kbd,
  Text,
  Textarea,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconCheck,
  IconExclamationCircle,
  IconExclamationMark,
  IconFileCheck,
  IconLayersIntersect2,
  IconLayoutDistributeHorizontal,
  IconLayoutDistributeVertical,
  IconPencil,
  IconPhotoPlus,
  IconPlus,
  IconSitemap,
  IconX,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { JWT } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Connection, Edge, Node } from 'reactflow';

import { API_ROUTES, SUCCESS, WARNING } from '@/constants';
import { getApiResponse } from '@/utils/get-api-response';
import { getItem, removeItem, setItem } from '@/utils/localStorage';
import { omit } from '@/utils/shared';

import { Args } from '@/types';
import { WarningKeys } from '@/types/alert';
import { CustomEdge, CustomNode } from '@/types/reactFlow';

const PanelItem = ({
  onAddNode,
  nodes,
  edges,
  getLayoutedElements,
  undo,
  canUndo,
  redo,
  canRedo,
  setEdges,
  flow,
  setNodes,
}: {
  nodes: Node[];
  edges: Edge[];
  onAddNode: () => void;
  getLayoutedElements: (args: Args) => void;
  undo: () => void;
  canUndo: boolean;
  redo: () => void;
  canRedo: boolean;
  flow: {
    nodes: Node[];
    edges: Edge[];
  };
  setNodes: Dispatch<SetStateAction<Node[]>>;
  setEdges: Dispatch<SetStateAction<Edge<CustomEdge | Connection | Edge>[]>>;
}) => {
  const router = useRouter();

  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [thumbnail, setThumbnail] = useState(getItem('thumbnail') || null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [formData, setFormData] = useState<FormData | null>();
  const [isToggled, setIsToggled] = useState(true);
  const [accessToken, setAccessToken] = useState<JWT['token']>(null);
  const { data: token } = useSession();

  useMemo(() => {
    const aToken = token as unknown as JWT;
    setAccessToken(aToken?.token);
  }, [token]);

  useMemo(() => {
    const tempFormData = new FormData();
    tempFormData.append('file', files[0]);
    setFormData(tempFormData);
  }, [files]);

  const handleUseUndoable = useCallback(() => {
    setNodes(flow.nodes);
    setEdges(flow.edges);
  }, [flow, setNodes, setEdges]);

  const previews = useCallback(() => {
    const url = thumbnail;
    return files.map((file) => {
      const imageUrl = URL.createObjectURL(file);

      return (
        <Image
          key={`${file.name}`}
          src={url}
          alt={`${url}`}
          onLoad={() => URL.revokeObjectURL(imageUrl)}
        />
      );
    });
  }, [files, thumbnail]);

  const onSubmitRoadmap = useCallback(async () => {
    if (!formData || !files || !thumbnail) {
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
        apiEndpoint: `${API_ROUTES.roadmaps}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }),
    ]);
    if (!response) {
      notifications.show({
        id: 'roadmap-post-fail',
        withCloseButton: true,
        autoClose: 5000,
        title: '로드맵 생성 실패',
        message: '🥲 로드맵 생성에 실패했습니다',
        color: 'red',
        icon: <IconX style={{ width: '20rem', height: '20rem' }} />,
        className: 'my-notification-class',
        loading: false,
      });
      return;
    }

    await Promise.all([
      getApiResponse<undefined>({
        requestData: formData,
        apiEndpoint: `${API_ROUTES.roadmapsSlash}${response}/thumbnails`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      getApiResponse<undefined>({
        requestData: JSON.stringify({}),
        apiEndpoint: `${API_ROUTES.roadmapsSlash}${response}/join`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }),
      notifications.show({
        id: SUCCESS.roadmaps.id,
        withCloseButton: false,
        autoClose: 1000,
        title: SUCCESS.roadmaps.title,
        message: `🎉 로드맵 ${response}생성에 성공했습니다 🎉`,
        color: SUCCESS.roadmaps.color,
        icon: <IconCheck style={{ width: '20rem', height: '20rem' }} />,
        className: 'my-notification-class notification',
        loading: true,
      }),
      removeItem('thumbnail'),
      setTimeout(() => {
        router.replace(`/roadmap/post/${response}`);
      }, 1100),
    ]);
  }, [
    nodes,
    edges,
    files,
    title,
    description,
    thumbnail,
    formData,
    router,
    accessToken,
  ]);

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
          <Tooltip
            label={
              <Box p='xs'>
                <Kbd>Shift</Kbd> + 드래그해서 그룹하기
              </Box>
            }
            position='bottom'
          >
            <ActionIcon variant='default'>
              <IconLayersIntersect2 data-disabled size='1rem' />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label='space out nodes'
            position='bottom'
            onClick={() => getLayoutedElements({})}
          >
            <ActionIcon variant='default'>
              <IconSitemap data-disabled size='1rem' />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label='vertical layout'
            position='bottom'
            onClick={() =>
              getLayoutedElements({
                'elk.algorithm': 'layered',
                'elk.direction': 'RIGHT',
              })
            }
          >
            <ActionIcon variant='default'>
              <IconLayoutDistributeVertical data-disabled size='1rem' />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label='horizontal layout'
            position='bottom'
            onClick={() =>
              getLayoutedElements({
                'elk.algorithm': 'layered',
                'elk.direction': 'DOWN',
              })
            }
          >
            <ActionIcon variant='default'>
              <IconLayoutDistributeHorizontal data-disabled size='1rem' />
            </ActionIcon>
          </Tooltip>
          <Tooltip label='undo' position='bottom'>
            <ActionIcon
              variant='default'
              disabled={!canUndo}
              onClick={() => {
                undo();
                handleUseUndoable();
              }}
            >
              <IconArrowBackUp data-disabled size='1rem' />
            </ActionIcon>
          </Tooltip>
          <Tooltip label='redo' position='bottom'>
            <ActionIcon
              variant='default'
              disabled={!canRedo}
              onClick={() => {
                redo();
                handleUseUndoable();
              }}
            >
              <IconArrowForwardUp data-disabled size='1rem' />
            </ActionIcon>
          </Tooltip>
          {/* <Tooltip label='change shape' position='bottom'>
            <ActionIcon variant='default' onClick={onChangeShape}>
              <IconTriangleSquareCircle data-disabled size='1rem' />
            </ActionIcon>
          </Tooltip> */}

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
                if (!title || !description || !files[0] || !thumbnail) {
                  setIsToggled(true);
                  const alerts = [] as WarningKeys[];
                  !title && alerts.push('title');
                  !description && alerts.push('description');
                  (!thumbnail || !files[0]) && alerts.push('thumbnail');

                  alerts.forEach((v: WarningKeys, index) => {
                    setTimeout(() => {
                      notifications.show({
                        title: `${WARNING[v].title}`,
                        withCloseButton: true,
                        autoClose: 1000,
                        message: ` ${WARNING[v].message}`,
                        icon: (
                          <IconExclamationMark
                            style={{ width: '20rem', height: '20rem' }}
                          />
                        ),
                        color: WARNING[v].color,
                      });
                    }, 200 * index);
                  });

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
                const fr = new FileReader();
                fr.readAsDataURL(e[0]);
                fr.onloadend = () => {
                  const url = fr.result as string;
                  setItem('thumbnail', url);
                  setThumbnail(url);
                };
              }}
            >
              {files.length > 0 ? (
                <Tooltip.Floating label='이미지 변경하기'>
                  <Box>{previews()}</Box>
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
