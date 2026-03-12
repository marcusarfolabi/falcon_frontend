import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.falconmail.online",
        port: "",
        pathname: "/api/v1/mail/download/**",
      },
      {
        protocol: "https",
        hostname: "africanmarkethub.ca",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.honourworld.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ix-marketing.imgix.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
