import { Layout, Menu, Breadcrumb, Dropdown, Button } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import MenuComponent from '@/components/MenuComponent';
import styles from './dashboard.module.css';
import { useRouter } from 'next/router';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

export default function Dashboard() {
    const router = useRouter();

    const handleMenuClick = (e) => {
        if (e.key === 'profile') {
          router.push('/profile'); // Pindah ke halaman profile
        } else if (e.key === 'logout') {
          // Logic untuk logout, contoh redirect ke halaman login
          router.push('/');
        }
      };
    
      const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="profile">
            Profile
          </Menu.Item>
          <Menu.Item key="logout">
            Logout
          </Menu.Item>
        </Menu>
      );

  return (
    <>
      <Header className={styles.header} theme="light">
        <div className={styles.rightMenu}>
          <Dropdown overlay={menu} placement="bottomRight">
            <Button className={styles.rightMenuButton}>User Menu</Button>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider width={256} className="site-layout-background">
            <MenuComponent />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            Content Goes Here
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
