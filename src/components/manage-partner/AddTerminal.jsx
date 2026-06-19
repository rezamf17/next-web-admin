import { Button, Form, Input, Row, Col, Select } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const { Option } = Select;

const AddTerminal = () => {
	const router = useRouter();
	const [merchants, setMerchants] = useState([]);

	useEffect(() => {
		// TODO: fetch merchants from API
		// fetch("/api/partner/merchant/get")
		//   .then(res => res.json())
		//   .then(data => setMerchants(data));
	}, []);

	const handleBack = () => {
		router.push("/terminal");
	};

	const onFinish = (values) => {
		console.log("Form values:", values);
		// TODO: call API insert terminal
	};

	return (
		<Form
			name="wrap"
			labelCol={{
				flex: "150px",
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
			onFinish={onFinish}
		>
			<Form.Item
				label="Merchant"
				name="merchant_id"
				rules={[
					{
						required: true,
						message: "Merchant wajib dipilih",
					},
				]}
			>
				<Select placeholder="Pilih Merchant" allowClear showSearch optionFilterProp="children">
					{merchants.map((m) => (
						<Option key={m.id} value={m.id}>
							{m.merchant_name}
						</Option>
					))}
				</Select>
			</Form.Item>

			<Form.Item
				label="Nama Terminal"
				name="terminal_name"
				rules={[
					{
						required: true,
						message: "Nama Terminal wajib diisi",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="TID"
				name="tid"
				rules={[
					{
						required: true,
						message: "Terminal ID (TID) wajib diisi",
					},
				]}
			>
				<Input placeholder="Terminal ID dari bank/mitra" />
			</Form.Item>

			<Form.Item
				label="Nomor Seri"
				name="nomor_seri"
				rules={[
					{
						required: true,
						message: "Nomor Seri wajib diisi",
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
						message: "Jenis Terminal wajib dipilih",
					},
				]}
			>
				<Select placeholder="Pilih Jenis Terminal" allowClear>
					<Option value="mobile">Mobile</Option>
					<Option value="edc">EDC</Option>
					<Option value="pos">POS</Option>
				</Select>
			</Form.Item>

			<Form.Item
				label="Lokasi"
				name="lokasi"
				rules={[
					{
						required: true,
						message: "Lokasi wajib diisi",
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
						message: "Status wajib dipilih",
					},
				]}
			>
				<Select placeholder="Pilih Status" allowClear>
					<Option value="active">Active</Option>
					<Option value="inactive">InActive</Option>
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
