import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import MyRoadmapsTabs from '../Tabs';

const queryClient = new QueryClient();

export const decorators = [
  (story: any) => (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>
    </SessionProvider>
  ),
];

export default {
  title: '마이페이지/내 로드맵',
  component: MyRoadmapsTabs,
  args: {},
  layout: 'fullscreen',
  tags: ['autodocs'],
  decorators,
};

export const Default = {};
