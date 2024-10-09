
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  swcMinify: true,
  experimental: {
    esmExternals: true,
    serverComponentsExternalPackages: ['tesseract.js'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack(config, { isServer }) {
    // Alias para resolver la ruta correcta del worker de tesseract.js
    if (!isServer) {
      config.resolve.alias['tesseract.js/worker'] = path.resolve(
        'node_modules/tesseract.js/src/worker-script/index.js'
      );
    }

    return config;
  },
};

export default nextConfig;


