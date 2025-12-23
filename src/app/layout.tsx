import { Analytics } from '@vercel/analytics/next';
import { Geist_Mono } from 'next/font/google';

import type { Metadata, Viewport } from 'next';

import './globals.css';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DinBuilds Terminal Outro | Cinematic Branding Experience',
  description:
    'A cinematic terminal-style outro animation for DinBuilds — designed for screen recordings, demos, and branding.',
  metadataBase: new URL('https://outro.dinbuilds.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'DinBuilds Terminal Outro | Cinematic Branding Experience',
    description:
      'A cinematic terminal-style outro animation for DinBuilds — designed for screen recordings, demos, and branding.',
    url: 'https://outro.dinbuilds.com',
    siteName: 'DinBuilds Terminal Outro',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'DinBuilds Terminal Outro - Cinematic Branding Experience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DinBuilds Terminal Outro | Cinematic Branding Experience',
    description:
      'A cinematic terminal-style outro animation for DinBuilds — designed for screen recordings, demos, and branding.',
    images: ['/og.png'],
    creator: '@dinbuilds',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#050505' },
    { media: '(prefers-color-scheme: dark)', color: '#050505' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'DinBuilds Terminal Outro',
              description:
                'A cinematic terminal-style outro animation for DinBuilds — designed for screen recordings, demos, and branding.',
              url: 'https://outro.dinbuilds.com',
              author: {
                '@type': 'Person',
                name: 'Dinesh',
                url: 'https://links.dineshd.dev',
              },
              applicationCategory: 'DesignApplication',
              operatingSystem: 'Any',
            }),
          }}
        />
      </head>
      <body className={`${geistMono.variable} antialiased`}>{children}</body>
      <Analytics />
    </html>
  );
}
