import { Metadata } from 'next';

import Mainpage from '@/app/MainPage';

import { SITE_CONFIG } from '@/constants';

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_CONFIG.url}`),
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
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [`${SITE_CONFIG.url}/images/og.jpg`],
    creator: '@pyotato',
  },
};

const AppHome = () => {
  return <Mainpage />;
};

export default AppHome;
