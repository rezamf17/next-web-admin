import { useState } from 'react';
import { Layout } from 'antd';
import HeaderComponent from '@/components/HeaderComponent';
import SiderComponent from '@/components/SiderComponent';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import { PartitionOutlined } from '@ant-design/icons';

const { Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderComponent />
      <Layout>
        <SiderComponent collapsed={collapsed} />
        <Layout style={{ marginLeft: collapsed ? 80 : 130 }}>
          <BreadcrumbComponent icon={<PartitionOutlined />} menu="Maintenance Partner" submenu="Terminal" />
          <Content className="layout-content">
            <div className="content-wrapper">
              {/* Main content goes here */}
              This is the main content area.
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
