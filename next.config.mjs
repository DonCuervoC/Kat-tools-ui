/** @type {import('next').NextConfig} */
// const path = require('path');

const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                crypto: false,
                stream: false,
                util: false,
                url: false,
                zlib: false,
                http: false,
                https: false,
            };
        }

        config.module.rules.push({
            test: /tesseract.js.+worker.js/,
            use: {
                loader: 'worker-loader',
                options: {
                    filename: 'static/[hash].worker.js',
                    publicPath: '/_next/',
                },
            },
        });

        return config;
    },
};

export default nextConfig;

