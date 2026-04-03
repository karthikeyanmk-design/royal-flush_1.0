/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NODE_ENV === "production" ? { output: "export" } : {}),
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
