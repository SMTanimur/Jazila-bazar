import { metaKeywords } from './keywords';
import type { Metadata } from 'next';
import { siteConfig } from './site';

export const defaultMetadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Zazila-bazaar  - Zazila-Bazaar: Your Ultimate Multi-Vendor Marketplace',
    template: 'Zazila-bazaar  | %s',
  },
  description:
    'Zazila-bazaar is a social media platform for Muslims to connect with other Muslims, share Islamic knowledge, and find Islamic resources.',
  keywords: metaKeywords.join(', '),
  creator: 'SM Tanimur Rahman',
  publisher: 'SM Tanimur Rahman',
  applicationName: 'Zazila-bazaar ',
  viewport: 'width=device-width, initial-scale=1.0',
  colorScheme: 'light',
  category: 'Zazila-Bazaar: Your Ultimate Multi-Vendor Marketplace',
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
  themeColor: '#ffffff',
  appLinks: {
    web: {
      url: siteConfig.url,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: 'Zazila-bazaar',
    title: 'Zazila-bazaar - Zazila-Bazaar: Your Ultimate Multi-Vendor Marketplace',
    description:
      'Zazila-bazaar is a social media platform for Muslims to connect with other Muslims, share Islamic knowledge, and find Islamic resources.',
    images: [
      {
        url: `${siteConfig.url}/images/seo_image.png`,
        width: 800,
        height: 600,
        alt: 'Zazila-bazaar - Zazila-Bazaar: Your Ultimate Multi-Vendor Marketplace',
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
    site: '@Zazila-bazaar',
    card: 'summary_large_image',
    title: 'Zazila-bazaar - Zazila-Bazaar: Your Ultimate Multi-Vendor Marketplace',
    description:
      'Zazila-bazaar is a social media platform for Muslims to connect with other Muslims, share Islamic knowledge, and find Islamic resources.',
    images: [
      {
        url: `${siteConfig.url}/images/seo_image.png`,
        width: 800,
        height: 600,
        alt: 'Zazila-bazaar - Zazila-Bazaar: Your Ultimate Multi-Vendor Marketplace',
      },
    ],
  },
} as Metadata;
