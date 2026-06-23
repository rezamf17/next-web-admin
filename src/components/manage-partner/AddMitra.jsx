import { Button, Form, Input, Row, Col, Select, message } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

const { Option } = Select;

const AddMitra = () => {
	const router = useRouter();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const handleBack = () => {
		router.push("/mitra");
	};

	const onFinish = async (values) => {
		setLoading(true);
		try {
			const token = localStorage.getItem("token");
			const response = await fetch("/api/partner/mitra/insert", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(values),
			});

			const result = await response.json();

			if (response.ok && result.code === "00") {
				message.success("Mitra berhasil ditambahkan");
				router.push("/mitra");
			} else {
				message.error(result.error || "Gagal menambahkan mitra");
			}
		} catch (error) {
			console.error("Error:", error);
			message.error("Terjadi kesalahan saat menambahkan mitra");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form
			form={form}
			name="addMitra"
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
					<Option value="Marketplace">Marketplace</Option>
					<Option value="Processor">Processor</Option>
					<Option value="Bank">Bank</Option>
					<Option value="Payment Gateway">Payment Gateway</Option>
				</Select>
			</Form.Item>

			<Form.Item label="Alamat" name="alamat">
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

			<Form.Item label="Website" name="website">
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
					<Option value="A">Active</Option>
					<Option value="I">Inactive</Option>
				</Select>
			</Form.Item>

			<Form.Item label=" ">
				<Row justify="space-between">
					<Col>
						<Button onClick={handleBack}>Kembali</Button>
					</Col>
					<Col>
						<Button type="primary" htmlType="submit" loading={loading}>
							Submit
						</Button>
					</Col>
				</Row>
			</Form.Item>
		</Form>
	);
};

export default AddMitra;
