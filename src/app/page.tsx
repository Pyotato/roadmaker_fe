import { Metadata } from 'next';

import Mainpage from '@/components/MainPage';

import { SITE_CONFIG } from '@/constants';
import { getApiResponse } from '@/utils/shared/get-api-response';

import { NpmData, PageParams } from '@/types';

export const metadata: Metadata = {
  metadataBase: new URL('http://roadmaker.site/'),
  title: {
    default: `${SITE_CONFIG.title}💜💜💜💜`,
    template: `%s | ${SITE_CONFIG.title}`,
  },
  description: SITE_CONFIG.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.title,
    images: [`${SITE_CONFIG.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [`${SITE_CONFIG.url}/images/og.jpg`],
    creator: '@pyotato',
  },
};

const loadDataFromApi = async (slug?: string) => {
  if (slug === 'testError500') {
    throw new Error('This is mock a ssr 500 test error');
  }

  // Fetch & cache data from 2 remote APIs test
  const [reactNpmData, nextJsNpmData] = await Promise.all([
    getApiResponse<NpmData>({
      apiEndpoint: 'https://registry.npmjs.org/react/latest',
      revalidate: 60 * 60 * 24, // 24 hours cache
    }),
    getApiResponse<NpmData>({
      apiEndpoint: 'https://registry.npmjs.org/next/latest',
      revalidate: 0, // no cache
    }),
  ]);

  return {
    reactNpmData,
    nextJsNpmData,
  };
};

const AppHome = async ({ searchParams }: PageParams) => {
  const slug = searchParams?.slug;
  const { reactNpmData, nextJsNpmData } = await loadDataFromApi(slug);

  return (
    <Mainpage
      reactVersion={reactNpmData?.version}
      nextJsVersion={nextJsNpmData?.version}
    />
  );
};

export default AppHome;
