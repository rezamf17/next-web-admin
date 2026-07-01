import { useState } from "react";
import { Layout, Typography } from "antd";
import HeaderComponent from "@/components/HeaderComponent";
import SiderComponent from "@/components/SiderComponent";
import AddMerchant from "@/components/manage-partner/AddMerchant";
import BreadcrumbComponent from "../../../components/BreadcrumbComponent";
import { PartitionOutlined } from "@ant-design/icons";

const { Content } = Layout;

const App = () => {
	const [collapsed, setCollapsed] = useState(false);

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
						Add Merchant
					</Typography.Title>
					<Content className="layout-content">
						<div className="content-wrapper">
							<AddMerchant />
						</div>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default App;
