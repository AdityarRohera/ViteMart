import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
   images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "img.icons8.com",
    },
  ],
},
};

export default nextConfig;
