import { Button, Form, Input, Row, Col, Select } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";

const { Option } = Select;

const EditTerminal = ({ data }) => {
	const router = useRouter();
	const [form] = Form.useForm();
	console.log('props',data);

	const dataTerminal = data || {};
	useEffect(() => {
    if (dataTerminal) {
      form.setFieldsValue({
				name: dataTerminal.name,
				address: dataTerminal.address,
				phone_number: dataTerminal.phone_number,
				business_type: dataTerminal.business_type,
				account_number: dataTerminal.account_number,
				email: dataTerminal.email,
				bank_name: dataTerminal.bank_name,
        status: dataTerminal.status === "A" ? "active" : "inactive", // Sesuaikan dengan status aktif/inaktif
      });
    }
  }, [dataTerminal, form]);
	
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
			initialValues={dataTerminal}
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
					<Option value="A">Active</Option>
					<Option value="I">InActive</Option>
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
export default EditTerminal;
