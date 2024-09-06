import { useState } from "react";
import {
  Layout,
  Typography,
  Table,
  Space,
  Tag,
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
} from "antd";
import HeaderComponent from "@/components/HeaderComponent";
import SiderComponent from "@/components/SiderComponent";
import BreadcrumbComponent from "../../components/BreadcrumbComponent";
import { UserSwitchOutlined, PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";

const { Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Is Active",
      key: "isActive",
      dataIndex: "isActive",
      render: (_, { isActive }) => (
        <>
          {isActive === "A" ? (
            <Tag color="volcano">INACTIVE</Tag>
          ) : (
            <Tag color="green">ACTIVE</Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button style={{ backgroundColor: '#34c759', borderColor: '#34c759', color : 'white' }} icon={<EditOutlined />} color="green-5">
            Edit User
          </Button>
          <Button type="primary" icon={<DeleteOutlined />} danger>
            Delete User
          </Button>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      no: "1",
      name: "John Brown",
      email: "test@gmail.com",
      username: "test123",
      isActive: "I",
    },
    {
      key: "2",
      no: "2",
      name: "Jim Green",
      email: "test@gmail.com",
      username: "test123",
      isActive: "A",
    },
    {
      key: "3",
      no: "3",
      name: "Joe Black",
      email: "test@gmail.com",
      username: "test123",
      isActive: "I",
    },
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderComponent />
      <Layout>
        <SiderComponent collapsed={collapsed} />
        <Layout style={{ marginLeft: collapsed ? 80 : 130 }}>
          <BreadcrumbComponent
            icon={<UserSwitchOutlined />}
            menu="Maintenance User"
            submenu="Manage User"
          />
          <Typography.Title level={2} style={{ margin: 0 }}>
            Manage User
          </Typography.Title>
          <Content className="layout-content">
            <Card>
              <Form.Item label="Search">
                <Input placeholder="Search data user" />
              </Form.Item>
              <Row justify="space-between">
                <Col>
                  <Button type="default">Reset</Button>
                </Col>
                <Col>
                  <Button type="primary" icon={<SearchOutlined />}>Search</Button>
                </Col>
              </Row>
            </Card>
            <div className="content-wrapper">
              <Button type="primary" icon={<PlusOutlined />}>
                Add User
              </Button>
              <Table columns={columns} dataSource={data} />;
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
