import { useState } from 'react';
import { Layout, Typography, Select, Col, Row } from 'antd';
import HeaderComponent from '@/components/HeaderComponent';
import SiderComponent from '@/components/SiderComponent';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import TrendTransaksiComponent from '@/components/dashboard/TrendTransaksiComponent';
import { DashboardOutlined } from '@ant-design/icons';
const { Option } = Select;
const { Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderComponent />
      <Layout>
        <SiderComponent collapsed={collapsed} />
        <Layout style={{ marginLeft: collapsed ? 80 : 130 }}>
          <BreadcrumbComponent icon={<DashboardOutlined />} menu="Dashboard" submenu="Trend Transaksi" />
          <Typography.Title level={2} style={{ margin: 0 }}>
            Trend Transaksi
          </Typography.Title>
          <Content className="layout-content">
            <div className="content-wrapper">
              <Row justify="end">
                <Col span={1}>Periode</Col>
                <Col span={4}>
                  <Select
                    placeholder="Pilih Periode"
                    allowClear
                  >
                    <Option value="male">Harian</Option>
                    <Option value="female">Mingguan</Option>
                    <Option value="other">Tahunan</Option>
                  </Select>
                </Col>
              </Row>
              {/* Main content goes here */}
              <TrendTransaksiComponent />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
