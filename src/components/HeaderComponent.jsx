import { Button, Dropdown, Menu } from 'antd';
import { useRouter } from 'next/router';
import { Layout } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './HeaderComponent.module.css';
const { Header } = Layout;


const HeaderComponent = () => {

    const router = useRouter();

    const handleMenuClick = (e) => {
      if (e.key === 'profile') {
        router.push('/profile'); // Pindah ke halaman profile
      } else if (e.key === 'logout') {
        router.push('/login'); // Logic untuk logout
      }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="profile">Profile</Menu.Item>
          <Menu.Item key="logout">Logout</Menu.Item>
        </Menu>
      );

  return (
    <Header className={styles.header}>
        <Dropdown.Button
          overlay={menu}
          placement="bottomRight"
          icon={<DownOutlined />}
          className={styles.rightMenu}
        >
          User Menu
        </Dropdown.Button>
    </Header>
  );
};

export default HeaderComponent;