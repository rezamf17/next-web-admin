import { useState } from "react";
import { Layout, Typography } from "antd";
import HeaderComponent from "@/components/HeaderComponent";
import SiderComponent from "@/components/SiderComponent";
import AddUser from "@/components/manage-user/AddUser";
import BreadcrumbComponent from "../../../components/BreadcrumbComponent";
import { UserSwitchOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

const { Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const session = useSelector((state) => state.user);
    console.log('edit seession',session);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderComponent />
      <Layout>
        <SiderComponent collapsed={collapsed} />
        <Layout style={{ marginLeft: collapsed ? 80 : 130 }}>
          <BreadcrumbComponent
            icon={<UserSwitchOutlined />}
            menu="Maintenance User"
            submenu="Edit User"
          />
          <Typography.Title level={2} style={{ margin: 0 }}>
            Edit User
          </Typography.Title>
          <Content className="layout-content">
            <div className="content-wrapper">
							<AddUser />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
