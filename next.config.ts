import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // 添加 Cloudinary 的域名
  },
};

export default nextConfig;
