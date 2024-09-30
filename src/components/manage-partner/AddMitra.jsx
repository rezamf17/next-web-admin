import { Button, Form, Input, Row, Col, Select } from "antd";
import { useRouter } from "next/router";

const { Option } = Select;

const AddMerchant = () => {
	const router = useRouter();

	const handleBack = () => {
		router.push("/mitra");
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
				label="Nama Mitra"
				name="nama_mitra"
				rules={[
					{
						required: true,
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
					},
				]}
			>
				<Select placeholder="Pilih Jenis Mitra" allowClear>
					<Option value="male">Marketplace</Option>
					<Option value="female">Processor</Option>
					<Option value="female">Bank</Option>
					<Option value="female">Payment Gateway</Option>
				</Select>
			</Form.Item>

			<Form.Item
				label="Kontak Person"
				name="kontak_person"
				rules={[
					{
						required: true,
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
				label="Website"
				name="website"
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
export default AddMerchant;
