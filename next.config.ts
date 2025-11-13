/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'site-api.flamingoitstudio.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
