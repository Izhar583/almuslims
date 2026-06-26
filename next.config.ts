
import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'al-muslims.netlify.app',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      }

    ],
  },
};

export default nextConfig;