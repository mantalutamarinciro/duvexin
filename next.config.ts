import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  ...(!isDev
    ? [
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
      ]
    : []),
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin-allow-popups',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.google.com https://*.gstatic.com https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Google Ads image fallbacks and the French audience endpoint observed in production.
      "img-src 'self' blob: data: https://picsum.photos https://images.unsplash.com https://lh3.googleusercontent.com https://i.pravatar.cc https://*.googleusercontent.com https://firebasestorage.googleapis.com https://www.googletagmanager.com https://www.google.com https://www.google.fr https://www.googleadservices.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      isDev
        ? "connect-src 'self' ws: wss: http: https: https://*.firebaseio.com https://*.googleapis.com https://*.data.gouv.fr https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://www.google.com"
        : "connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://*.data.gouv.fr https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://www.google.com https://stats.g.doubleclick.net https://ad.doubleclick.net https://www.googleadservices.com",
      "frame-src 'self' https://*.firebaseapp.com https://accounts.google.com https://*.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      ...(isDev ? [] : ["frame-ancestors 'none'"]),
      "upgrade-insecure-requests",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  async redirects() {
    return [
      // Exact legacy URLs reported by Search Console on 2026-09-13.
      // Do not redirect missing towns or obsolete WordPress assets wholesale.
      ...[
        ['/demenagement-idf-lyon', '/demenagement-ile-de-france-lyon'],
        ['/demenagement-idf-bordeaux', '/demenagement-ile-de-france-bordeaux'],
        ['/demenagement-idf-lille', '/demenagement-ile-de-france-lille'],
        ['/demenagement-idf-strasbourg', '/demenagement-ile-de-france-strasbourg'],
        ['/demenagement-idf-toulouse', '/demenagement-ile-de-france-toulouse'],
        ['/demenagement-paris-marseille', '/demenagement-ile-de-france-marseille'],
        ['/demenagement-paris-nice', '/demenagement-ile-de-france-nice'],
        ['/blog/emballer-objets-fragiles-demenagement', '/blog/le-guide-ultime-pour-emballer-vos-objets-fragiles'],
        ['/blog/demenager-avec-enfants-transition-douce', '/blog/demenager-avec-des-enfants-nos-conseils-pour-une-transition-en-douceur'],
        ['/blog/checklist-demenagement-30j-7j-48h-jour-j', '/blog/checklist-demenagement'],
        ['/demenagement-verneuil-d-avre-et-d-iton-27130', '/demenagement-verneuil-davre-et-diton-27130'],
        ['/demenagement-transport-objets-lourds', '/demenagement-objets-lourds'],
        ['/formules-demenagement', '/formules-de-demenagement'],
        ['/calcul-volume-demenagement', '/calculateur-volume'],
        ['/demenagement-val-d-oise', '/demenagement-val-d-oise-95'],
        ['/demenagement-local-val-d-oise', '/demenagement-val-d-oise-95'],
        ['/demenagement-oeuvres-d-art', '/demenagement-oeuvres-art'],
        ['/devis', '/demande-devis'],
        ['/politique-de-confidentialite', '/politique-confidentialite'],
        ['/stockage-garde-meubles-val-d-oise', '/demenagement-garde-meubles'],
        ['/duvexin2025/services', '/services'],
      ].map(([source, destination]) => ({ source, destination, permanent: true })),
      {
        source: '/demande-de-devis',
        destination: '/demande-devis',
        permanent: true,
      },
      {
        source: '/zones',
        destination: '/zones-intervention',
        permanent: true,
      },
      {
        source: '/demenagement-enghien-95880',
        destination: '/demenagement-enghien-les-bains-95880',
        permanent: true,
      },
      {
        source: "/demenagement-l'isle-adam-95290",
        destination: '/demenagement-lisle-adam-95290',
        permanent: true,
      },
      {
        source: '/dashboard/cabinets/new',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
