import { Layout } from 'antd';
const { Sider } = Layout;
import MenuComponent from './MenuComponent';

const SiderComponent = ({ collapsed }) => {
  return (
    <Sider
      width={256}
      collapsed={collapsed}
      breakpoint="md"
      collapsedWidth={80}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 64,
        bottom: 0,
        zIndex: 10,
      }}
    >
      <MenuComponent />
    </Sider>
  );
};

export default SiderComponent;