import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ItemsCardsGrid } from '@/components/shared/ItemsCardsGrid';

import { Stories } from '@/types/stories';

const queryClient = new QueryClient();

export const Decorators = [
  (story: Stories) => (
    <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>
  ),
];

export default {
  title: '홈/게시물 카드 리스트',
  component: ItemsCardsGrid,
  args: {},
  argTypes: {
    product: 'object',
    description: '로드맵 정보',
  },
  layout: 'fullscreen',
  tags: ['autodocs'],
  decorators: Decorators,
};

export const Default = {};
