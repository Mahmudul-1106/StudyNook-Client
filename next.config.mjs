/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all HTTPS images
      },
      {
        protocol: "http",
        hostname: "**", // Allows all HTTP images (like your 'http://uhbh' error)
      },
    ],
  },
};

export default nextConfig;
