/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com', // YouTube thumbnails
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Mock image thumbnails
      },
    ],
  },
};

module.exports = nextConfig;