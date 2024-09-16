import { useState } from "react";
import { Layout, Typography } from "antd";
import HeaderComponent from "@/components/HeaderComponent";
import SiderComponent from "@/components/SiderComponent";
import EditMerchant from "@/components/manage-partner/EditMerchant";
import BreadcrumbComponent from "../../../components/BreadcrumbComponent";
import { PartitionOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Content } = Layout;

const App = () => {
	const [collapsed, setCollapsed] = useState(false);
	 const session = useSelector((state) => state.data.data);
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<HeaderComponent />
			<Layout>
				<SiderComponent collapsed={collapsed} />
				<Layout style={{ marginLeft: collapsed ? 80 : 130 }}>
					<BreadcrumbComponent
						icon={<PartitionOutlined />}
						menu="Maintenance Partner"
						submenu="Add Merchant"
					/>
					<Typography.Title level={2} style={{ margin: 0 }}>
						Edit Merchant
					</Typography.Title>
					<Content className="layout-content">
						<div className="content-wrapper">
							<EditMerchant data={session} />
						</div>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default App;
