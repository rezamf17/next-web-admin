import { Button, Form, Input, Row, Col, Select } from "antd";
import { useRouter } from "next/router";

const { Option } = Select;

const AddMerchant = () => {
	const router = useRouter();

	const handleBack = () => {
		router.push("/merchant");
	};

	const onFinish = (values) => {
		console.log("Form values:", values);
		// TODO: call API insert merchant
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
				label="Nama Merchant"
				name="merchant_name"
				rules={[
					{
						required: true,
						message: "Nama Merchant wajib diisi",
					},
				]}
			>
				<Input type="text" />
			</Form.Item>

			<Form.Item
				label="Alamat"
				name="address"
				rules={[
					{
						required: true,
						message: "Alamat wajib diisi",
					},
				]}
			>
				<Input.TextArea rows={3} />
			</Form.Item>

			<Form.Item
				label="Nomor HP"
				name="phone_number"
				rules={[
					{
						required: true,
						message: "Nomor HP wajib diisi",
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
						message: "Email wajib diisi",
					},
					{
						type: "email",
						message: "Format email tidak valid",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Jenis Usaha"
				name="business_type"
				rules={[
					{
						required: true,
						message: "Jenis Usaha wajib dipilih",
					},
				]}
			>
				<Select placeholder="Pilih Jenis Usaha" allowClear>
					<Option value="retail">Retail</Option>
					<Option value="fnb">Food & Beverage</Option>
					<Option value="fashion">Fashion</Option>
					<Option value="jasa">Jasa</Option>
					<Option value="lainnya">Lainnya</Option>
				</Select>
			</Form.Item>

			<Form.Item
				label="MID"
				name="mid"
				rules={[
					{
						required: true,
						message: "Merchant ID (MID) wajib diisi",
					},
				]}
			>
				<Input placeholder="Merchant ID dari bank/mitra" />
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

			<Form.Item
				label="Nomor Rekening"
				name="account_number"
				rules={[
					{
						required: true,
						message: "Nomor Rekening wajib diisi",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Nama Bank"
				name="bank_name"
				rules={[
					{
						required: true,
						message: "Nama Bank wajib diisi",
					},
				]}
			>
				<Input />
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
export default AddMerchant;
