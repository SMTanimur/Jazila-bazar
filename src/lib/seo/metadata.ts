import { metaKeywords } from './keywords';
import type { Metadata, Viewport } from 'next';
import { siteConfig } from './site';

export const defaultMetadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      'Jazila-bazar  - Jazila-bazar: Your Ultimate Multi-Vendor Marketplace',
    template: 'Jazila-bazar  | %s',
  },
  description:
    'Welcome to Jazila-bazar, your ultimate online shopping destination! We are your one-stop marketplace for a diverse range of products, all conveniently curated from a multitude of trusted sellers. ',
  keywords: metaKeywords.join(', '),
  creator: 'SM Tanimur Rahman',
  publisher: 'SM Tanimur Rahman',
  applicationName: 'Jazila-bazar ',
  category: 'Jazila-bazar: Your Ultimate Multi-Vendor Marketplace',
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [
    {
      name: 'SM Tanimur Rahman',
      url: 'https://smtanimur.vercel.app/',
    },
  ],
  appLinks: {
    web: {
      url: siteConfig.url,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: 'Jazila-bazar',
    title:
      'Jazila-bazar - Jazila-bazar: Your Ultimate Multi-Vendor Marketplace',
    description:
      'Welcome to Jazila-bazar, your ultimate online shopping destination! We are your one-stop marketplace for a diverse range of products, all conveniently curated from a multitude of trusted sellers. ',
    images: [
      {
        url: `${siteConfig.url}/images/seo_image.png`,
        width: 800,
        height: 600,
        alt: 'Jazila-bazar - Jazila-bazar: Your Ultimate Multi-Vendor Marketplace',
      },
    ],
    emails: ['mushfiqurtanim@gmail.com'],
    phoneNumbers: ['+880 1648138404'],
    countryName: 'Bangladesh',
  },
  // icons: {
  //   // TODO: Add icons
  //   icon: {},
  // },
  twitter: {
    creator: '@smtanimur',
    site: '@Jazila-bazar',
    card: 'summary_large_image',
    title:
      'Jazila-bazar - Jazila-bazar: Your Ultimate Multi-Vendor Marketplace',
    description:
      'Welcome to Jazila-bazar, your ultimate online shopping destination! We are your one-stop marketplace for a diverse range of products, all conveniently curated from a multitude of trusted sellers. ',
    images: [
      {
        url: `${siteConfig.url}/images/seo_image.png`,
        width: 800,
        height: 600,
        alt: 'Jazila-bazar - Jazila-bazar: Your Ultimate Multi-Vendor Marketplace',
      },
    ],
  },
} as Metadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  colorScheme: 'light',
  themeColor: '#ffffff',
};
