/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
      {
        protocol: 'https',
        hostname: 'old.anokhihomes.com',
      },
    ],
  },
  allowedDevOrigins: ['192.168.0.202'],
};

export default nextConfig;
