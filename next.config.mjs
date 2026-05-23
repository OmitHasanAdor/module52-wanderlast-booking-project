/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
images: {
  remotePatterns: [
    {
      protocol: 'http',
      hostname: '**',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: '**',
      pathname: '/**',
    },
  ],
},
};

export default nextConfig;
