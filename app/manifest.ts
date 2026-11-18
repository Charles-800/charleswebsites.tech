import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Charles Websites — Web & AI Agency',
    short_name: 'Charles Websites',
    description:
      'Web Development, Android & iOS Mobile Apps, AI Engineering, and SEO agency.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#111111',
    icons: [
      {
        src: '/assets/aistudio/CHARLES_WEBSITES_91d4851c.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
