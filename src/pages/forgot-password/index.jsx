import MailOutlined from "@ant-design/icons/MailOutlined";
import { Button, Checkbox, Form, Input, Flex, Card, Row, Col } from "antd";
import Image from 'next/image'
import Logo from "@/styles/image/next-js-seeklogo.svg";
import Link from "next/link";

export default function LoginPage() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <Row justify="center" align="middle" style={{ height: "100vh",display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Image src={Logo} alt="Logo" width={100} height={100}  style={{ marginBottom: "20px" }} />
      <Col span={10} style={{ display: "flex", justifyContent: "center" }}>
        <Card
          title="Login Web Admin"
          style={{ width: 400, textAlign : "center", height: "fit-content" }}
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
                { required: true, message: "Please input your Email!" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item>
              <Flex justify="end" align="center">
                <Link href="/">Sign in</Link>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Send New Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
    </>
  );
}
