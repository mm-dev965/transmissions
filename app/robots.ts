import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin-portal', '/client-login', '/client-portal', '/api/'],
    },
    sitemap: 'https://www.transmissions.qa/sitemap.xml',
  };
}