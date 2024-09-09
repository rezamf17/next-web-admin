import React from "react";
import { Button, Form, Input, Row, Col, Select } from "antd";
import { useRouter } from "next/router";

const { Option } = Select;

const AddUser = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/manage-user");
  };
  return (
    <Form
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
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
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
          },
        ]}
      >
        <Select placeholder="Pilih Role" allowClear>
          <Option value="male">Admin</Option>
          <Option value="female">Operator</Option>
        </Select>
      </Form.Item>

			<Form.Item
        label="Status"
        name="status"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Pilih Status" allowClear>
          <Option value="male">Active</Option>
          <Option value="female">InActive</Option>
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
export default AddUser;
