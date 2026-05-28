/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com', // YouTube thumbnails ka domain
      },
    ],
  },
};

module.exports = nextConfig;