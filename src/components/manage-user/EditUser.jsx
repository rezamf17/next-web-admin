import React, { useEffect } from 'react';
import { Button, Form, Input, Row, Col, Select, message } from "antd";
import { useRouter } from "next/router";

const { Option } = Select;

const EditUser = ({ data }) => {
  const router = useRouter();
  const [form] = Form.useForm();

  // Cek apakah data tersedia dan ambil data dari user
  const userData = data?.user || {};
  console.log('Props data:', userData);

  useEffect(() => {
    if (userData) {
      console.log('Setting form values:', userData);
      form.setFieldsValue({
        name: userData.name || '',
        email: userData.email || '',
        username: userData.username || '',
        role: userData.role || '',
        status: userData.isActive === "A" ? "active" : "inactive", // Sesuaikan dengan status aktif/inaktif
      });
    }
  }, [userData, form]);

  const handleBack = () => {
    router.push("/manage-user");
  };

  const handleFinish = async (values) => {
    try {
      // Kirim data ke backend
      const response = await fetch('/api/users/edit', {
        method: 'PUT', // atau POST jika sesuai
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, id: userData.key }), // Sertakan id user
      });

      if (response.ok) {
        message.success('User data updated successfully!');
        handleBack();
      } else {
        message.error('Failed to update user data.');
      }
    } catch (error) {
      message.error('An error occurred while updating user data.');
    }
  };

  return (
    <Form
      form={form}
      name="wrap"
      labelCol={{
        flex: "110px",
      }}
      labelAlign="left"
      labelWrap
      wrapperCol={{
        flex: 1,
      }}
      colon={false}
      style={{
        maxWidth: 600,
      }}
      initialValues={userData} // Menetapkan nilai awal
      onFinish={handleFinish} // Submit handler
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input the name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input the email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input the username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Role"
        name="role"
        rules={[
          {
            required: true,
            message: 'Please select a role!',
          },
        ]}
      >
        <Select placeholder="Pilih Role" allowClear>
          <Option value="Admin">Admin</Option>
          <Option value="Operator">Operator</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        rules={[
          {
            required: true,
            message: 'Please select a status!',
          },
        ]}
      >
        <Select placeholder="Pilih Status" allowClear>
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      </Form.Item>

      <Form.Item label=" ">
        <Row justify="space-between">
          <Col>
            <Button onClick={handleBack}>Kembali</Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default EditUser;
