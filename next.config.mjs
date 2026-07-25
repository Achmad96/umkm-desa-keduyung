/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['7cf6-36-73-223-104.ngrok-free.app'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qlrwbstgczhdgxjlobzz.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
