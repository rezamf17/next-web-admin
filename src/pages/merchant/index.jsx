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
import {
  PartitionOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  CheckOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/router';
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
  const [dataDeleteUser, setdataDeleteUser] = useState({});
  const dispatch = useDispatch();


  const addMerchant = () => {
    router.push("/merchant/add");
  }

  const editMerchant = (record) => {
    dispatch(saveData(record));
    router.push("/merchant/edit");
  }

  const deleteMerchant = (record) => {
    // Implementasi logika penghapusan data merchant di sini
    setdataDeleteUser(record);
    setVisible(true);
    if (record.status == "A") {
      setTitleModal("Inactive Merchant")
      setModalText("Are you sure you want to inactive this merchant?")
    }else{
      setTitleModal("Active Merchant")
      setModalText("Are you sure you want to active this merchant?")
    }
  }

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Nama Merchant",
      dataIndex: "merchant_name",
      key: "merchant_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Alamat",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Nomor HP",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Jenis Usaha",
      dataIndex: "business_type",
      key: "business_type",
    },
    {
      title: "Nomor Rekening",
      dataIndex: "account_number",
      key: "account_number",
    },
    {
      title: "Nama Bank",
      dataIndex: "bank_name",
      key: "bank_name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <>
          {status === "A" ? (
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
            onClick={() => editMerchant(record)}
          >
            Edit Merchant
          </Button>
          {record.status == "I" ? (
            <Button type="primary" icon={<CloseOutlined />} danger onClick={() => deleteMerchant(record)}>
              Inactive Merchant
            </Button>
          ) : (
            <Button type="primary" icon={<CheckOutlined />} onClick={() => deleteMerchant(record)}>
              Active Merchant
            </Button>
          )}
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      no: "1",
      merchant_name: "Toko ABC",
      address: "Jl. Sudirman No. 123, Jakarta Selatan",
      phone_number: "021-12345678",
      business_type: "Ritel",
      account_number: "1234567890",
      email: "test@gmail.com",
      bank_name: "BCA",
      status: "I",
    },
        {
      key: "2",
      no: "2",
      merchant_name: "Restoran XYZ",
      address: "Jl. Gatot Subroto No. 456, Jakarta Pusat",
      phone_number: "021-12345678",
      business_type: "Jasa",
      account_number: "9876543210",
      email: "test@gmail.com",
      bank_name: "Mandiri",
      status: "A",
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderComponent />
      <Layout>
        <SiderComponent collapsed={collapsed} />
        <Layout style={{ marginLeft: collapsed ? 80 : 130 }}>
          <BreadcrumbComponent icon={<PartitionOutlined />} menu="Maintenance Partner" submenu="Merchant" />
          <Typography.Title level={2} style={{ margin: 0 }}>
            Merchant
          </Typography.Title>
          <Content className="layout-content">
            <Card>
              <Form.Item label="Search">
                <Input placeholder="Search data merchant" />
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
              <Button type="primary" icon={<PlusOutlined />} onClick={addMerchant}>
                Add Merchant
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
        dataDelete={dataDeleteUser}
      />
    </Layout>
  );
};

export default App;
