import { useState, useEffect } from "react";
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
  Grid,
  message,
  Spin,
} from "antd";
import HeaderComponent from "@/components/HeaderComponent";
import SiderComponent from "@/components/SiderComponent";
import ModalDelete from "@/components/manage-user/ModalDelete";
import BreadcrumbComponent from "../../components/BreadcrumbComponent";
import {
  UserSwitchOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { updateUser } from '@/redux/actions.js';
import api from '@/lib/api';

const { Content } = Layout;
const { useBreakpoint } = Grid;

const App = () => {
  const router = useRouter();
  const screens = useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dataDeleteUser, setdataDeleteUser] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  // Auto-collapse sidebar on small screens
  useEffect(() => {
    if (screens.xs || (!screens.md && !screens.lg)) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [screens]);

  // Fetch users on mount
  useEffect(() => {
    fetchUsers("");
  }, []);

  const fetchUsers = async (search) => {
    setLoading(true);
    try {
      const response = await api.get(`/users/get?search=${search}`);
      const users = response.data?.data || response.data || [];
      const formatted = users.map((user, index) => ({
        key: user.id || index + 1,
        no: index + 1,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
        isActive: user.isActive,
        ...user,
      }));
      setData(formatted);
    } catch (error) {
      message.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchUsers(searchValue);
  };

  const handleReset = () => {
    setSearchValue("");
    fetchUsers("");
  };

  const addUser = () => {
    router.push("/manage-user/add");
  };

  const editUser = (record) => {
    dispatch(updateUser(record));
    router.push("/manage-user/edit");
  };

  const deleteUser = (record) => {
    setdataDeleteUser(record);
    setVisible(true);
  };

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
      title: "Role",
      dataIndex: "role",
      key: "role",
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
            Edit User
          </Button>
          <Button type="primary" icon={<DeleteOutlined />} danger onClick={() => deleteUser(record)}>
            Delete User
          </Button>
        </Space>
      ),
    },
  ];

  // Responsive columns - hide some on mobile
  const responsiveColumns = screens.xs
    ? columns.filter((col) => ["name", "role", "action"].includes(col.key))
    : screens.sm && !screens.md
    ? columns.filter((col) => col.key !== "no" && col.key !== "username")
    : columns;

  // Responsive action buttons for small screens
  const actionColumn = responsiveColumns.find((col) => col.key === "action");
  if (actionColumn && screens.xs) {
    actionColumn.render = (_, record) => (
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <Button
          size="small"
          style={{
            backgroundColor: "#34c759",
            borderColor: "#34c759",
            color: "white",
          }}
          icon={<EditOutlined />}
          onClick={() => editUser(record)}
        >
          Edit
        </Button>
        <Button
          size="small"
          type="primary"
          icon={<DeleteOutlined />}
          danger
          onClick={() => deleteUser(record)}
        >
          Delete
        </Button>
      </Space>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderComponent />
      <Layout>
        <SiderComponent collapsed={collapsed} />
        <Layout
          style={{
            marginLeft: collapsed ? 80 : (screens.md ? 260 : 80),
            transition: "margin-left 0.2s",
          }}
        >
          <BreadcrumbComponent
            icon={<UserSwitchOutlined />}
            menu="Maintenance User"
            submenu="Manage User"
          />
          <div style={{ padding: screens.xs ? "0 8px" : "0 16px" }}>
            <Typography.Title
              level={screens.xs ? 4 : 2}
              style={{ margin: 0 }}
            >
              Manage User
            </Typography.Title>
          </div>
          <Content className="layout-content">
            <Card styles={{ body: { padding: screens.xs ? 12 : 24 } }}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={16} lg={18}>
                  <Form.Item label="Search" style={{ marginBottom: 0 }}>
                    <Input
                      placeholder="Search data user"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onPressEnter={handleSearch}
                    />
                  </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={4} lg={3}>
                  <Button type="default" block onClick={handleReset}>
                    Reset
                  </Button>
                </Col>
                <Col xs={12} sm={12} md={4} lg={3}>
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    block
                    onClick={handleSearch}
                    loading={loading}
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </Card>
            <div
              className="content-wrapper"
              style={{ padding: screens.xs ? 12 : 24 }}
            >
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={addUser}
                style={{ marginBottom: 16 }}
              >
                Add User
              </Button>
              <Table
                columns={responsiveColumns}
                dataSource={data}
                scroll={{ x: 600 }}
                size={screens.xs ? "small" : "middle"}
                loading={loading}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
      <ModalDelete
        visible={visible}
        confirmLoading={confirmLoading}
        titleModal="Delete User"
        modalText="Are you sure you want to delete this user?"
        setVisible={setVisible}
        setConfirmLoading={setConfirmLoading}
        setModalText="Are you sure you want to delete this user?"
        dataDelete={dataDeleteUser}
      />
    </Layout>
  );
};

export default App;
