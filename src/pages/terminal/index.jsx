import { useState } from 'react';
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
} from 'antd';
import HeaderComponent from '@/components/HeaderComponent';
import SiderComponent from '@/components/SiderComponent';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import {
  PartitionOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined
} from '@ant-design/icons';

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
      title: "Nama Merchant",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Nama Mitra",
      dataIndex: "nama_mitra",
      key: "nama_mitra",
    },
    {
      title: "Nomor Seri",
      dataIndex: "nomor_seri",
      key: "nomor_seri",
    },
    {
      title: "Jenis Terminal",
      dataIndex: "jenis_terminal",
      key: "jenis_terminal",
    },
    {
      title: "Lokasi",
      dataIndex: "lokasi",
      key: "lokasi",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <>
          {status === "I" ? (
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
          <Button
            style={{
              backgroundColor: "#34c759",
              borderColor: "#34c759",
              color: "white",
            }}
            icon={<EditOutlined />}
            color="green-5"
            onClick={() => editUser(record)}
          >
            Edit Terminal
          </Button>
          <Button type="primary" icon={<DeleteOutlined />} danger onClick={() => deleteUser(record)}>
            Delete Terminal
          </Button>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      no: "1",
      name: "Toko ABC",
      nama_mitra: "Bank BCA",
      nomor_seri: "EDC12345678",
      jenis_terminal: "EDC",
      lokasi: "Kasir Utama",
      status: "I",
    },
    {
      key: "2",
      no: "2",
      name: "Resto ABC",
      nama_mitra: "Bank BCA",
      nomor_seri: "EDC12345678",
      jenis_terminal: "EDC",
      lokasi: "Kasir Utama",
      status: "A",
    },
    {
      key: "3",
      no: "3",
      name: "Agus Cell",
      nama_mitra: "OVO",
      nomor_seri: "MOBILE987654",
      jenis_terminal: "EDC",
      lokasi: "Kasir Cabang",
      status: "I",
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderComponent />
      <Layout>
        <SiderComponent collapsed={collapsed} />
        <Layout style={{ marginLeft: collapsed ? 80 : 130 }}>
          <BreadcrumbComponent icon={<PartitionOutlined />} menu="Maintenance Partner" submenu="Terminal" />
          <Typography.Title level={2} style={{ margin: 0 }}>
            Terminal
          </Typography.Title>
          <Content className="layout-content">
            <Card>
              <Form.Item label="Search">
                <Input placeholder="Search data terminal" />
              </Form.Item>
              <Row justify="space-between">
                <Col>
                  <Button type="default">Reset</Button>
                </Col>
                <Col>
                  <Button type="primary" icon={<SearchOutlined />}>
                    Search
                  </Button>
                </Col>
              </Row>
            </Card>
            <div className="content-wrapper">
              <Button type="primary" icon={<PlusOutlined />}>
                Add Terminal
              </Button>
              <Table columns={columns} dataSource={data} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
