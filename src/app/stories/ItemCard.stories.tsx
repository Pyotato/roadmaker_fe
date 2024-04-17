import ItemCard from '@/components/shared/ItemCard';
import { POST } from '@/constants';
import { omit } from '@/utils/shared';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const decorators = [
  (story: any) => (
    <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>
  ),
];

export default {
  title: '홈/게시물 카드',
  component: ItemCard,
  args: { article: POST },
  argTypes: {
    product: 'object',
    description: '로드맵 정보',
  },
  layout: 'fullscreen',
  tags: ['autodocs'],
  decorators,
};

export const Default = {};
export const NoImage = {
  args: { article: { ...omit(POST, 'thumbnailUrl'), thumbnailUrl: null } },
};
