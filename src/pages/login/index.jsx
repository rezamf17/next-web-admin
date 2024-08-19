import LockOutlined from "@ant-design/icons/LockOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined";
import { Button, Checkbox, Form, Input, Flex, Card, Row, Col } from "antd";

export default function LoginPage() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col span={10} style={{ display: "flex", justifyContent: "center" }}>
        <Card
          title="Default size card"
          extra={<a href="#">More</a>}
          style={{ width: 400 }}
        >
          <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ maxWidth: 360 }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="">Forgot password</a>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
              or <a href="">Register now!</a>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
