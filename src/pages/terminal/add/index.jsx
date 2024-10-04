import { useState } from "react";
import { Layout, Typography } from "antd";
import HeaderComponent from "@/components/HeaderComponent";
import SiderComponent from "@/components/SiderComponent";
import AddTerminal from "@/components/manage-partner/AddTerminal";
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
						submenu="Add Terminal"
					/>
					<Typography.Title level={2} style={{ margin: 0 }}>
						Add Terminal
					</Typography.Title>
					<Content className="layout-content">
						<div className="content-wrapper">
							<AddTerminal />
						</div>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default App;
