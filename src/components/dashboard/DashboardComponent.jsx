import { Layout, Row, Col, Card, Typography, Space } from "antd";
import {
  PieChartOutlined,
  CreditCardOutlined,
  DollarOutlined,
} from "@ant-design/icons";
const circleStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  border: "2px solid",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  textAlign: "center",
  fontSize: "24px",
};
const { Content } = Layout;
const { Title, Text } = Typography;
const DashboardComponent = () => {
  return (
    <Content className="layout-content">
      <div className="content-wrapper">
        <div style={{ padding: "20px", background: "#fff" }}>
          <Row gutter={16} justify="center">
            <Col span={8}>
              <Card bordered={false}>
                <Space direction="vertical" align="center">
                  <div
                    style={{
                      ...circleStyle,
                      borderColor: "#ff6666",
                      color: "#ff6666",
                    }}
                  >
                    5
                  </div>
                  <Text strong style={{ fontSize: 14 }}>
                    MITRA
                  </Text>
                  <Text type="secondary">(OF 10)</Text>
                </Space>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                <Space direction="vertical" align="center">
                  <div
                    style={{
                      ...circleStyle,
                      borderColor: "#00bfff",
                      color: "#00bfff",
                    }}
                  >
                    45
                  </div>
                  <Text strong style={{ fontSize: 14 }}>
                    MERCHANT
                  </Text>
                  <Text type="secondary" style={{ color: "#00bfff" }}>
                    (OF 125)
                  </Text>
                </Space>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                <Space direction="vertical" align="center">
                  <div
                    style={{
                      ...circleStyle,
                      borderColor: "#ff9900",
                      color: "#ff9900",
                    }}
                  >
                    93
                  </div>
                  <Text strong style={{ fontSize: 14 }}>
                    TERMINAL
                  </Text>
                  <Text type="secondary" style={{ color: "red" }}>
                    (OF 170)
                  </Text>
                </Space>
              </Card>
            </Col>
          </Row>

          <Row gutter={16} justify="center" style={{ marginTop: "20px" }}>
            <Col span={8}>
              <Card bordered={false}>
                <Space direction="vertical">
                  <PieChartOutlined
                    style={{ fontSize: "24px", color: "#00bfff" }}
                  />
                  <Text strong style={{ fontSize: 14 }}>
                    Jumlah Transaksi
                  </Text>
                  <Title level={2}>878</Title>
                </Space>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                <Space direction="vertical">
                  <DollarOutlined style={{ fontSize: "24px", color: "gold" }} />
                  <Text strong style={{ fontSize: 14 }}>
                    Nominal Transaksi
                  </Text>
                  <Title level={2}>Rp. 122.500.000</Title>
                </Space>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                <Space direction="vertical">
                  <CreditCardOutlined
                    style={{ fontSize: "24px", color: "red" }}
                  />
                  <Text strong style={{ fontSize: 14 }}>
                    Jumlah Card Used
                  </Text>
                  <Title level={2}>260</Title>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </Content>
  );
};

export default DashboardComponent;
