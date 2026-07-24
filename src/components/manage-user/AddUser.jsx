import { useState, useEffect } from "react";
import { Button, Form, Input, Row, Col, Select, message } from "antd";
import { useRouter } from "next/router";
import api from "@/lib/api";

const { Option } = Select;

const AddUser = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await api.get("/roles/get");
      setRoles(response.data?.data || []);
    } catch (error) {
      message.error("Failed to fetch roles");
    }
  };

  const handleBack = () => {
    router.push("/manage-user");
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
        id_role: values.id_role,
        status: values.status,
      };

      const response = await api.post("/users/insert", payload);
      if (response.data?.code === "00") {
        message.success("User created successfully");
        router.push("/manage-user");
      }
    } catch (error) {
      const errMsg = error.response?.data?.error || "Failed to create user";
      message.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      name="addUser"
      labelCol={{ flex: "110px" }}
      labelAlign="left"
      labelWrap
      wrapperCol={{ flex: 1 }}
      colon={false}
      style={{ maxWidth: 600 }}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input name" }]}
      >
        <Input placeholder="Enter name" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input placeholder="Enter email" />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input username" }]}
      >
        <Input placeholder="Enter username" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input password" },
          { min: 6, message: "Password must be at least 6 characters" },
        ]}
      >
        <Input.Password placeholder="Enter password" />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match"));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm password" />
      </Form.Item>

      <Form.Item
        label="Role"
        name="id_role"
        rules={[{ required: true, message: "Please select a role" }]}
      >
        <Select placeholder="Select Role" allowClear>
          {roles.map((role) => (
            <Option key={role.id} value={role.id}>
              {role.role_name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: "Please select status" }]}
      >
        <Select placeholder="Select Status" allowClear>
          <Option value="1">Active</Option>
          <Option value="0">Inactive</Option>
        </Select>
      </Form.Item>

      <Form.Item label=" ">
        <Row justify="space-between">
          <Col>
            <Button onClick={handleBack}>Kembali</Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddUser;
