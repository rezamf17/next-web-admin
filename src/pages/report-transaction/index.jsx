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
  DatePicker
} from 'antd';
import HeaderComponent from '@/components/HeaderComponent';
import SiderComponent from '@/components/SiderComponent';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import ModalDeleteMerchant from "@/components/manage-partner/ModalDeleteMerchant";
import {
  PartitionOutlined,
  PlusOutlined,
  DeleteOutlined,
  FileOutlined,
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

  const startChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const endChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "ID Log",
      dataIndex: "id_log",
      key: "id_log",
    },
    {
      title: "Response Code",
      dataIndex: "rc",
      key: "rc",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "TID",
      dataIndex: "tid",
      key: "tid",
    },
    {
      title: "MID",
      dataIndex: "mid",
      key: "mid",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Stan",
      dataIndex: "stan",
      key: "stan",
    },
    {
      title: "RRN",
      dataIndex: "rrn",
      key: "rrn",
    },
    {
      title: "Card Number",
      dataIndex: "card_number",
      key: "card_number",
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
            icon={<FileOutlined />}
            color="green-5"
            onClick={() => editMerchant(record)}
          >
            Detail
          </Button>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      no: "1",
      id_log: "443",
      rc: "00",
      tid: "TIDEDC01",
      mid: "MIDEDC0123TEST ",
      amount: "40000",
      stan: "000154",
      rrn: "000000000425",
      card_number: "8888303713520011",
    },
    {
      key: "2",
      no: "2",
      id_log: "443",
      rc: "00",
      tid: "TIDEDC01",
      mid: "MIDEDC0123TEST ",
      amount: "40000",
      stan: "000154",
      rrn: "000000000425",
      card_number: "8888303713520011",
    },
    {
      key: "3",
      no: "3",
      id_log: "443",
      rc: "00",
      tid: "TIDEDC01",
      mid: "MIDEDC0123TEST ",
      amount: "40000",
      stan: "000154",
      rrn: "000000000425",
      card_number: "8888303713520011",
    },
    {
      key: "4",
      no: "4",
      id_log: "443",
      rc: "00",
      tid: "TIDEDC01",
      mid: "MIDEDC0123TEST ",
      amount: "40000",
      stan: "000154",
      rrn: "000000000425",
      card_number: "8888303713520011",
    },
    {
      key: "5",
      no: "5",
      id_log: "443",
      rc: "00",
      tid: "TIDEDC01",
      mid: "MIDEDC0123TEST ",
      amount: "40000",
      stan: "000154",
      rrn: "000000000425",
      card_number: "8888303713520011",
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderComponent />
      <Layout>
        <SiderComponent collapsed={collapsed} />
        <Layout style={{ marginLeft: collapsed ? 80 : 130 }}>
          <BreadcrumbComponent icon={<PartitionOutlined />} menu="Report and Summary" submenu="Report Transaction" />
          <Typography.Title level={2} style={{ margin: 0 }}>
            Report Transaction
          </Typography.Title>
          <Content className="layout-content">
            <Card>
              <Form.Item label="Search">
                <Input placeholder="Search data merchant" />
              </Form.Item>
              <Form.Item label="Periode">
                <DatePicker onChange={startChange} /> - <DatePicker onChange={endChange} />
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
        name="Nama Merchant"
      />
    </Layout>
  );
};

export default App;
