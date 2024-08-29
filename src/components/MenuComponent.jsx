import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  UserSwitchOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
const items = [
  {
    key: 'sub1',
    label: 'Dashboard',
    icon: <DashboardOutlined />,
    children: [
      {
        key: '5',
        label: 'Layanan Transaksi',
      },
      {
        key: '6',
        label: 'Trend Transaksi',
      },
    ],
  },
  {
    key: 'sub2',
    label: 'Maintenance User',
    icon: <UserSwitchOutlined />,
    children: [
      {
        key: '9',
        label: 'Manage User',
      },
      {
        key: '10',
        label: 'Manage Role',
      },
    ],
  },
];
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      style={{
        width: 256,
      }}
    >
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
export default App;