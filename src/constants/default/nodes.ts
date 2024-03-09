import { CustomNode } from '@/app/roadmap/post/components/roadmapInfo';

export const defaultNodes: CustomNode[] = [
  {
    id: '1',
    data: { label: '내용을 입력해주세요.' },
    position: { x: 100, y: 100 },
    type: 'textUpdater',
    style: {
      background: '#f4b4b4',
      border: '1px solid black',
      borderRadius: 15,
      fontSize: 24,
    },

    blogKeyword: '',
    detailedContent: '',
  },
  {
    id: '2',
    data: { label: '내용을 입력해주세요.' },
    position: { x: 100, y: 200 },
    positionAbsolute: { x: 100, y: 200 },
    type: 'textUpdater',
    style: {
      background: '#f4e9bc',
      border: '1px solid black',
      borderRadius: 15,
      fontSize: 24,
    },

    blogKeyword: '',
    detailedContent: '',
  },
];
