import { Layout } from 'antd';
const { Sider } = Layout;
import MenuComponent from './MenuComponent';

const SiderComponent = ({ collapsed }) => {
  return (
    <Sider width={256} collapsed={collapsed}>
      <MenuComponent />
    </Sider>
  );
};

export default SiderComponent;