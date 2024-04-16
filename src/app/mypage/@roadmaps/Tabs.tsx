'use client';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@mantine/core';
import { IconPencil, IconPhoto } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { getItem, setItem } from '@/utils/localStorage';

import CreatedRoadmapList from './created/CreatedRoadmaps';
import InProgressRoadmapList from './in-progress/InProgressRoadmaps';

export default function MyRoadmapsTabs() {
  const pathName = usePathname();
  const [activeTab, setActiveTab] = useState<string | null>(
    JSON.parse(
      `${getItem('roadmaker-mypage-tab') ? getItem('roadmaker-mypage-tab') : JSON.stringify({ tab: pathName === '/mypage' ? 'in-progress' : pathName.slice(pathName.lastIndexOf('/') + 1) })}`,
    )?.tab || 'in-progress',
  );

  useMemo(() => {
    if (pathName === '/mypage') {
      setActiveTab('in-progress');
      setItem('roadmaker-mypage-tab', {
        tab: 'in-progress',
      });
    } else if (pathName.slice(pathName.lastIndexOf('/') + 1)) {
      setActiveTab(pathName.slice(pathName.lastIndexOf('/') + 1));
      setItem('roadmaker-mypage-tab', {
        tab: pathName.slice(pathName.lastIndexOf('/') + 1),
      });
    }
  }, [pathName]);

  useEffect(() => {
    if (getItem('roadmaker-mypage-tab')) {
      const { tab } = JSON.parse(`${getItem('roadmaker-mypage-tab')}`);
      setActiveTab(tab);
    }
  }, []);

  return (
    <Tabs onChange={setActiveTab} value={activeTab}>
      <TabsList grow>
        <TabsTab
          value='in-progress'
          onClick={() => {
            setActiveTab('in-progress');
            setItem('roadmaker-mypage-tab', { tab: 'in-progress' });
            window.history.pushState({}, '', `/mypage/in-progress`);
          }}
        >
          <IconPhoto size='0.8rem' /> 진행 중인 로드맵
        </TabsTab>
        <TabsTab
          value='created'
          onClick={() => {
            setActiveTab('created');
            setItem('roadmaker-mypage-tab', { tab: 'created' });
            window.history.pushState({}, '', `/mypage/created`);
          }}
        >
          <IconPencil size='0.8rem' /> 내가 만든 로드맵
        </TabsTab>
      </TabsList>

      <TabsPanel value='in-progress'>
        <InProgressRoadmapList />
      </TabsPanel>
      <TabsPanel value='created'>
        <CreatedRoadmapList />
      </TabsPanel>
    </Tabs>
  );
}
