import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Mainpage from '../MainPage';

import { Stories } from '@/types/stories';

const queryClient = new QueryClient();

export const Decorators = [
  (story: Stories) => (
    <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>
  ),
];

export default {
  title: '홈/게시물 리스트',
  component: Mainpage,
  args: {},
  layout: 'fullscreen',
  tags: ['autodocs'],
  decorators: Decorators,
};

export const Default = {};
