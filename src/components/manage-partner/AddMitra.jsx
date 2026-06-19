import { Button, Form, Input, Row, Col, Select } from "antd";
import { useRouter } from "next/router";

const { Option } = Select;

const AddMitra = () => {
	const router = useRouter();

	const handleBack = () => {
		router.push("/mitra");
	};

	const onFinish = (values) => {
		console.log("Form values:", values);
		// TODO: call API insert mitra
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
				label="Nama Mitra"
				name="nama_mitra"
				rules={[
					{
						required: true,
						message: "Nama Mitra wajib diisi",
					},
				]}
			>
				<Input type="text" />
			</Form.Item>

			<Form.Item
				label="Jenis Mitra"
				name="jenis_mitra"
				rules={[
					{
						required: true,
						message: "Jenis Mitra wajib dipilih",
					},
				]}
			>
				<Select placeholder="Pilih Jenis Mitra" allowClear>
					<Option value="marketplace">Marketplace</Option>
					<Option value="processor">Processor</Option>
					<Option value="bank">Bank</Option>
					<Option value="payment_gateway">Payment Gateway</Option>
				</Select>
			</Form.Item>

			<Form.Item
				label="Alamat"
				name="alamat"
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
				label="Kontak Person"
				name="kontak_person"
				rules={[
					{
						required: true,
						message: "Kontak Person wajib diisi",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Nomor Telepon"
				name="nomor_telepon"
				rules={[
					{
						required: true,
						message: "Nomor Telepon wajib diisi",
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
				label="Website"
				name="website"
			>
				<Input placeholder="https://..." />
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
export default AddMitra;
