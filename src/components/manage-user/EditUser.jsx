import { useState, useEffect } from "react";
import { Button, Form, Input, Row, Col, Select, message } from "antd";
import { useRouter } from "next/router";
import api from "@/lib/api";

const { Option } = Select;

const EditUser = ({ data }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);

  const userData = data?.user || {};

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        name: userData.name || "",
        email: userData.email || "",
        username: userData.username || "",
        id_role: userData.id_role || undefined,
        status: userData.status || undefined,
      });
    }
  }, [userData, form]);

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

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const payload = {
        id: userData.id,
        name: values.name,
        username: values.username,
        email: values.email,
        id_role: values.id_role,
        status: values.status,
      };

      // Only include password if user filled it in
      if (values.password) {
        payload.password = values.password;
      }

      const response = await api.put("/users/update", payload);
      if (response.data?.code === "00") {
        message.success("User updated successfully");
        router.push("/manage-user");
      }
    } catch (error) {
      const errMsg = error.response?.data?.error || "Failed to update user";
      message.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      name="editUser"
      labelCol={{ flex: "110px" }}
      labelAlign="left"
      labelWrap
      wrapperCol={{ flex: 1 }}
      colon={false}
      style={{ maxWidth: 600 }}
      onFinish={handleFinish}
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
          { min: 6, message: "Password must be at least 6 characters" },
        ]}
        extra="Leave blank to keep current password"
      >
        <Input.Password placeholder="Enter new password (optional)" />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!getFieldValue("password") || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match"));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm new password" />
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
          <Option value="A">Active</Option>
          <Option value="I">Inactive</Option>
        </Select>
      </Form.Item>

      <Form.Item label=" ">
        <Row justify="space-between">
          <Col>
            <Button onClick={handleBack}>Kembali</Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default EditUser;
