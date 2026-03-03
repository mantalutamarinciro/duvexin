import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard/', 
        '/login', 
        '/track/', 
        '/crew/',
        '/api/'
      ],
    },
    sitemap: 'https://demenagementduvexin.fr/sitemap.xml',
  }
}
