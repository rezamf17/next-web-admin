import { Button, Form, Input, Row, Col, Select } from "antd";
import { useRouter } from "next/router";

const DetailReport = ({ data }) => {
	const router = useRouter();
	console.log('data props', data);
	
  const handleBack = () => {
    router.push("/report-transaction");
  };
  return (
    <Form
      name="wrap"
      labelCol={{
        flex: "210px",
      }}
      labelAlign="left"
      labelWrap
      wrapperCol={{
        flex: 4,
      }}
      colon={false}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        label="Id Log"
        name="id_log"
      >
        {data.id_log}
      </Form.Item>

      <Form.Item
        label="Response Code"
        name="rc"
      >
        {data.rc}
      </Form.Item>

      <Form.Item
        label="TID"
        name="tid"
      >
        {data.tid}
      </Form.Item>

      <Form.Item
        label="MID"
        name="mid"
      >
        {data.mid}
      </Form.Item>

      <Form.Item
        label="Amount"
        name="amount"
      >
				{data.amount}
      </Form.Item>

      <Form.Item
        label="Stan"
        name="stan"
      >
				{data.stan}
      </Form.Item>

      <Form.Item
        label="Retrieval Reference Number"
        name="rrn"
      >
        {data.rrn}
      </Form.Item>

      <Form.Item
        label="Card Number"
        name="card_number"
      >
        {data.card_number}
      </Form.Item>

			<Form.Item
        label="Description"
        name="description"
      >
        {data.description}
      </Form.Item>

      <Form.Item label=" ">
        <Row justify="space-between">
          <Col>
            <Button onClick={handleBack}>Kembali</Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              Export PDF
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};
export default DetailReport;
