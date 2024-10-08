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
import ModalDeleteMerchant from "@/components/manage-partner/ModalDeleteMerchant";
import { useRouter } from 'next/router';
import {
  PartitionOutlined,
  PlusOutlined,
  CloseOutlined,
  EditOutlined,
  SearchOutlined,
  CheckOutlined
} from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { saveData } from '@/redux/actions.js';

const { Content } = Layout;

const App = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [modalText, setModalText] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dataDelete, setdataDelete] = useState({});
  const dispatch = useDispatch();

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
            onClick={() => editTerminal(record)}
          >
            Edit Terminal
          </Button>
          {record.status == "I" ? (
            <Button type="primary" icon={<CloseOutlined />} danger onClick={() => deleteTerminal(record)}>
              Inactive Mitra
            </Button>
          ) : (
            <Button type="primary" icon={<CheckOutlined />} onClick={() => deleteTerminal(record)}>
              Active Mitra
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const addTerminal = () => {
    router.push('/terminal/add');
  }

  const editTerminal = (record) => {
    dispatch(saveData(record));
    router.push('/terminal/edit');
  }

  const deleteTerminal = (record) => {
    // Implementasi logika penghapusan data merchant di sini
    setdataDelete(record);
    setVisible(true);
    if (record.status == "A") {
      setTitleModal("Inactive Terminal")
      setModalText("Are you sure you want to inactive this terminal?")
    }else{
      setTitleModal("Active Terminal")
      setModalText("Are you sure you want to active this terminal?")
    }
  }

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
      jenis_terminal: "Mobile",
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
              <Button type="primary" icon={<PlusOutlined />} onClick={() => addTerminal()}>
                Add Terminal
              </Button>
              <Table columns={columns} dataSource={data} />
            </div>
          </Content>
        </Layout>
      </Layout>
      <ModalDeleteMerchant visible={visible}
        confirmLoading={confirmLoading}
        titleModal={titleModal}
        modalText={modalText}
        setVisible={setVisible}
        setConfirmLoading={setConfirmLoading}
        setModalText={modalText}
        dataDelete={dataDelete}
        name="Nama Merchant"
      />
    </Layout>
  );
};

export default App;
