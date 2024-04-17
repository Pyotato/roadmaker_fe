import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Mainpage from '../MainPage';

const queryClient = new QueryClient();

export const decorators = [
  (story: any) => (
    <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>
  ),
];

export default {
  title: '홈/게시물 리스트',
  component: Mainpage,
  args: {},
  layout: 'fullscreen',
  tags: ['autodocs'],
  decorators,
};

export const Default = {};
