import { MantineProvider } from '@mantine/core';
import { Metadata } from 'next';

import Mainpage from '@/components/MainPage';

import { SITE_CONFIG } from '@/constants';
import Provider from '@/providers';

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

// const loadDataFromApi = async () => {
//   const roadmapPage = 1; // initial load
//   const [postData] = await Promise.all([
//     getApiResponse<Postdata>({
//       apiEndpoint: `${process.env.NEXT_PUBLIC_API}/roadmaps?page=${roadmapPage}&order-type=recent`,
//       revalidate: 60 * 12, // 30 mins cache
//     }),
//   ]);

//   return {
//     postData,
//   };
// };

// const AppHome = async () => {
const AppHome = () => {
  // const { postData } = await loadDataFromApi();
  return (
    <MantineProvider>
      <Provider>
        <Mainpage />
        {/* <Mainpage postData={postData} /> */}
      </Provider>
    </MantineProvider>
  );
};

export default AppHome;
