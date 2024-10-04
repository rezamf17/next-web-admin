import { Button, Form, Input, Row, Col, Select } from "antd";
import { useRouter } from "next/router";

const { Option } = Select;

const AddTerminal = () => {
	const router = useRouter();

	const handleBack = () => {
		router.push("/terminal");
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
				label="Nama Merchant"
				name="merchant_name"
				rules={[
					{
						required: true,
					},
				]}
			>
				<Select placeholder="Pilih Merchant" allowClear>
					<Option value="male">Active</Option>
					<Option value="female">InActive</Option>
				</Select>
			</Form.Item>

			<Form.Item
				label="Nama Terminal"
				name="terminal_name"
				rules={[
					{
						required: true,
					},
				]}
			>
            <Select placeholder="Pilih Terminal" allowClear>
					<Option value="male">Active</Option>
					<Option value="female">InActive</Option>
				</Select>
			</Form.Item>

			<Form.Item
				label="Nomor Seri"
				name="nomor_seri"
				rules={[
					{
						required: true,
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Jenis Terminal"
				name="jenis_terminal"
				rules={[
					{
						required: true,
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Lokasi"
				name="lokasi"
				rules={[
					{
						required: true,
					},
				]}
			>
				<Input />
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
export default AddTerminal;
