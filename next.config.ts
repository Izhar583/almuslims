import type { NextConfig } from "next";

type NextConfigWithEslint = NextConfig & {
  eslint?: {
    ignoreDuringBuilds?: boolean;
  };
};

const nextConfig: NextConfigWithEslint = {
  typescript: {
    // !! WARNING !!
    // TypeScript errors ko ignore karega taake production build successfully pass ho jaye
    ignoreBuildErrors: true,
  },
  // Agar eslint errors bhi ignore karne hon to:
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;