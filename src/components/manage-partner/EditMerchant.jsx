import { Button, Form, Input, Row, Col, Select } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";

const { Option } = Select;

const EditMerchant = ({ data }) => {
	const router = useRouter();
	const [form] = Form.useForm();
	// console.log('props',data);

	const dataMerchant = data || {};
	useEffect(() => {
    if (dataMerchant) {
      form.setFieldsValue({
				merchant_name: dataMerchant.merchant_name,
				address: dataMerchant.address,
				phone_number: dataMerchant.phone_number,
				business_type: dataMerchant.business_type,
				account_number: dataMerchant.account_number,
				email: dataMerchant.email,
				bank_name: dataMerchant.bank_name,
        status: dataMerchant.status === "A" ? "active" : "inactive", // Sesuaikan dengan status aktif/inaktif
      });
    }
  }, [dataMerchant, form]);
	
	const handleBack = () => {
		router.push("/merchant");
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
			initialValues={dataMerchant}
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
				<Input type="text" />
			</Form.Item>

			<Form.Item
				label="Alamat"
				name="address"
				rules={[
					{
						required: true,
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Nomor HP"
				name="phone_number"
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
				label="Jenis Usaha"
				name="business_type"
				rules={[
					{
						required: true,
					},
				]}
			>
				<Select placeholder="Pilih Jenis Usaha" allowClear>
					<Option value="male">Admin</Option>
					<Option value="female">Operator</Option>
				</Select>
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

			<Form.Item
				label="Nomor Rekening"
				name="account_number"
				rules={[
					{
						required: true,
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
export default EditMerchant;
