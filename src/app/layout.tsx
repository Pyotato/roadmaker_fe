import { ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Metadata } from 'next';
import * as React from 'react';

import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import 'reactflow/dist/style.css';

import PageFooter from '@/components/shared/layouts/PageFooter';
import PageHeader from '@/components/shared/layouts/PageHeader';

import { SITE_CONFIG } from '@/constants';
import Provider from '@/providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://roadmaker-fe.vercel.app/'),
  title: {
    default: SITE_CONFIG.title,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Provider>
          <PageHeader />
          <Notifications
            className='description title closeButton notification'
            position='bottom-right'
          />
          {children}
          <PageFooter />
        </Provider>
      </body>
    </html>
  );
}
