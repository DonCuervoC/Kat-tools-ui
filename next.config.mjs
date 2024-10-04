// /** @type {import('next').NextConfig} */
// const path = require('path');

// const nextConfig = {
//     // serverExternalPackages: ['tesseract.js'],
//     webpack: (config, { isServer }) => {
//         if (!isServer) {
//             config.resolve.fallback = {
//                 ...config.resolve.fallback,
//                 fs: false,
//                 crypto: false,
//                 stream: false,
//                 util: false,
//                 url: false,
//                 zlib: false,
//                 http: false,
//                 https: false,
//             };
//         }

//         config.module.rules.push({
//             test: /tesseract.js.+worker.js/,
//             use: {
//                 loader: 'worker-loader',
//                 options: {
//                     filename: 'static/[hash].worker.js',
//                     publicPath: '/_next/',
//                 },
//             },
//         });

//         return config;
//     },
// };

// const nextConfig = {
//     experimental: {
//       serverComponentsExternalPackages: ['tesseract.js'],
//       outputFileTracingIncludes: {
//         '/api/**/*': ['./node_modules/**/*.wasm', './node_modules/**/*.proto']
//       }
//     }
//   };

// export default nextConfig;



// import path from 'path';

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   output: 'standalone',
//   swcMinify: true,
//   experimental: {
//     appDir: true,
//     esmExternals: true,
//     serverComponentsExternalPackages: ['tesseract.js'],
//   },
//   images: {
//     domains: ['lh3.googleusercontent.com'],
//   },
//   webpack(config, { isServer, dev }) {
//     config.experiments = {
//       asyncWebAssembly: true,
//       layers: true,
//     };

//     // Alias para resolver la ruta correcta del worker de tesseract.js
//     if (!isServer) {
//       config.resolve.alias['tesseract.js/worker'] = path.resolve(
//         'node_modules/tesseract.js/src/worker-script/index.js'
//       );
//     }

//     if (!dev && isServer) {
//       config.output.webassemblyModuleFilename = 'chunks/[id].wasm';
//       config.plugins.push(new WasmChunksFixPlugin());
//     }

//     return config;
//   },
// };

// class WasmChunksFixPlugin {
//   apply(compiler) {
//     compiler.hooks.thisCompilation.tap('WasmChunksFixPlugin', (compilation) => {
//       compilation.hooks.processAssets.tap(
//         { name: 'WasmChunksFixPlugin' },
//         (assets) =>
//           Object.entries(assets).forEach(([pathname, source]) => {
//             if (!pathname.match(/\.wasm$/)) return;
//             compilation.deleteAsset(pathname);

//             const name = pathname.split('/')[1];
//             const info = compilation.assetsInfo.get(pathname);
//             compilation.emitAsset(name, source, info);
//           })
//       );
//     });
//   }
// }

// export default nextConfig;



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
    domains: ['lh3.googleusercontent.com'],
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

