import { useState } from "react";
import { Layout, Row, Col, Card, Typography, Space } from "antd";
import HeaderComponent from "@/components/HeaderComponent";
import SiderComponent from "@/components/SiderComponent";
import BreadcrumbComponent from "../../components/BreadcrumbComponent";
import {
  DashboardOutlined
} from "@ant-design/icons";
import DashboardComponent from "@/components/dashboard/DashboardComponent";
import { dashboardToday } from "@/lib/utility";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const todayFormatted = dashboardToday(new Date());

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderComponent />
      <Layout>
        <SiderComponent collapsed={collapsed} />
        <Layout style={{ marginLeft: collapsed ? 80 : 120 }}>
          <BreadcrumbComponent
            icon={<DashboardOutlined />}
            menu="Dashboard"
            submenu="Layanan Transaksi"
          />
          <Typography.Title level={2} style={{ margin: 0 }}>
            Dashboard
          </Typography.Title>
          <Typography.Title level={5} style={{ margin: 0 }}>
            {todayFormatted}
          </Typography.Title>
          <DashboardComponent />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
