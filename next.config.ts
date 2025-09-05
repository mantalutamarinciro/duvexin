
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      // Ajout du domaine pour les photos de profil des avis Google
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      }
    ],
  },
  env: {
    WORDPRESS_API_KEY: process.env.WORDPRESS_API_KEY,
    WORDPRESS_SITE_URL: process.env.WORDPRESS_SITE_URL,
    // Exposition des variables d'environnement Google au serveur Next.js
    GOOGLE_ACCOUNT_ID: process.env.GOOGLE_ACCOUNT_ID,
    GOOGLE_LOCATION_ID: process.env.GOOGLE_LOCATION_ID,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  }
};

export default nextConfig;
