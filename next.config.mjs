/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      { hostname: 'i.ibb.co' }
    ],
  },
};
export default nextConfig;
