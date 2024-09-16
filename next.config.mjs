/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  babel: {
    plugins: ['inline-react-svg'],
  },
  externals: {
    echarts: 'echarts',
  },
  transpilePackages: ["antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip", "rc-tree", "rc-table"],
};

export default nextConfig;
