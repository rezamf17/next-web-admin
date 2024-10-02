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
import { useRouter } from 'next/router';
import HeaderComponent from '@/components/HeaderComponent';
import SiderComponent from '@/components/SiderComponent';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import { useDispatch } from "react-redux";
import { saveData } from '@/redux/actions.js';
import {
  PartitionOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined
} from '@ant-design/icons';

const { Content } = Layout;

const App = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  const addMitra = () => {
    router.push('/mitra/add');
  }

  const editMitra = (record) => {
    console.log('edit mitra',record);
    
    dispatch(saveData(record));
    router.push("/mitra/edit");
  }

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Nama Mitra",
      dataIndex: "nama_mitra",
      key: "nama_mitra",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Jenis Mitra",
      dataIndex: "jenis_mitra",
      key: "jenis_mitra",
    },
    {
      title: "Kontak Person",
      dataIndex: "kontak_person",
      key: "kontak_person",
    },
    {
      title: "Nomor Telepon",
      dataIndex: "nomor_telepon",
      key: "nomor_telepon",
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
            onClick={() => editMitra(record)}
          >
            Edit Mitra
          </Button>
          <Button type="primary" icon={<DeleteOutlined />} danger onClick={() => deleteUser(record)}>
            Delete Mitra
          </Button>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      no: "1",
      mitra_id: "PG001",
      nama_mitra: "GoPay",
      jenis_mitra: "Payment Gateway",
      kontak_person: "Andi",
      nomor_telepon: "081234567890",
      email: "test123@gmail.com",
      website: "gopay.co.id",
      created : "2022-11-01",
      status: "I",
    },
    {
      key: "2",
      no: "2",
      mitra_id: "B001",
      nama_mitra: "Bank BCA",
      jenis_mitra: "Bank",
      kontak_person: "Budi",
      nomor_telepon: "021-99999999",
      email: "test123@gmail.com",
      website: "bca.co.id",
      created : "2022-12-15",
      status: "I",
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderComponent />
      <Layout>
        <SiderComponent collapsed={collapsed} />
        <Layout style={{ marginLeft: collapsed ? 80 : 130 }}>
          <BreadcrumbComponent icon={<PartitionOutlined />} menu="Maintenance Partner" submenu="Mitra" />
          <Typography.Title level={2} style={{ margin: 0 }}>
            Mitra
          </Typography.Title>
          <Content className="layout-content">
            <Card>
              <Form.Item label="Search">
                <Input placeholder="Search data mitra" />
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
              <Button type="primary" icon={<PlusOutlined />} onClick={addMitra}>
                Add Mitra
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
