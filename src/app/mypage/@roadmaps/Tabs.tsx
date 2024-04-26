'use client';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@mantine/core';
import { IconPencil, IconPhoto } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';

import { SkeletonCardsGrid } from '@/components/shared/SkeletonGrid';

import { ROADMAKER_MYPAGE_TAB } from '@/constants';
import { CREATED_TAB, IN_PROGRESS_TAB } from '@/constants/tabs';
import { getItem, setItem } from '@/utils/localStorage';
import { pushShallowUrl } from '@/utils/push-shallow-url';

import CreatedRoadmapList from './created/CreatedRoadmaps';
import InProgressRoadmapList from './in-progress/InProgressRoadmaps';

export default function MyRoadmapsTabs() {
  const pathName = usePathname();
  const [activeTab, setActiveTab] = useState<string | null>(
    JSON.parse(
      `${getItem(ROADMAKER_MYPAGE_TAB) ? getItem(ROADMAKER_MYPAGE_TAB) : JSON.stringify({ tab: pathName === '/mypage' ? IN_PROGRESS_TAB : pathName.slice(pathName.lastIndexOf('/') + 1) })}`,
    )?.tab || IN_PROGRESS_TAB,
  );

  useMemo(() => {
    if (pathName === '/mypage') {
      setActiveTab(IN_PROGRESS_TAB);
      setItem(ROADMAKER_MYPAGE_TAB, {
        tab: IN_PROGRESS_TAB,
      });
    } else if (pathName.slice(pathName.lastIndexOf('/') + 1)) {
      setActiveTab(pathName.slice(pathName.lastIndexOf('/') + 1));
      setItem(ROADMAKER_MYPAGE_TAB, {
        tab: pathName.slice(pathName.lastIndexOf('/') + 1),
      });
    }
  }, [pathName]);

  useEffect(() => {
    if (getItem(ROADMAKER_MYPAGE_TAB)) {
      const { tab } = JSON.parse(`${getItem(ROADMAKER_MYPAGE_TAB)}`);
      setActiveTab(tab);
    }
  }, []);

  return (
    <Tabs onChange={setActiveTab} value={activeTab}>
      <TabsList grow>
        <TabsTab
          value={IN_PROGRESS_TAB}
          onClick={() => {
            setActiveTab(IN_PROGRESS_TAB);
            setItem(ROADMAKER_MYPAGE_TAB, { tab: IN_PROGRESS_TAB });
            pushShallowUrl(`/mypage/${IN_PROGRESS_TAB}`);
            // window.history.pushState({}, '', `/mypage/${IN_PROGRESS_TAB}`);
          }}
        >
          <IconPhoto size='0.8rem' /> 진행 중인 로드맵
        </TabsTab>

        <TabsTab
          value={CREATED_TAB}
          onClick={() => {
            setActiveTab(CREATED_TAB);
            setItem(ROADMAKER_MYPAGE_TAB, { tab: CREATED_TAB });
            pushShallowUrl(`/mypage/${CREATED_TAB}`);
          }}
        >
          <IconPencil size='0.8rem' /> 내가 만든 로드맵
        </TabsTab>
      </TabsList>

      <TabsPanel value={IN_PROGRESS_TAB}>
        <InProgressRoadmapList />
      </TabsPanel>
      <TabsPanel value={CREATED_TAB}>
        <Suspense fallback={<SkeletonCardsGrid />}>
          <CreatedRoadmapList />
        </Suspense>
      </TabsPanel>
    </Tabs>
  );
}
