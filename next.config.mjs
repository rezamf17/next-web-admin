/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  babel: {
    plugins: ['inline-react-svg'],
  },
  externals: {
    echarts: 'echarts',
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
        config.resolve.fallback = {
            fs: false,
            dns: false,
            net: false,
            tls: false,
            child_process: false,
            readline: false,
            module: false,
            path: false,
            
            // Add other Node.js modules that you want to ignore here
        };
    }
    return config;
  },
  transpilePackages: ["antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip", "rc-tree", "rc-table"],
};

export default nextConfig;
