import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.falconmail.online',
        port: '',
        pathname: '/api/v1/mail/download/**',
      },
    ],
  },
};

export default nextConfig;
