import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PartitionOutlined,
  UserSwitchOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useRouter } from 'next/router';
const items = [
  {
    key: 'sub1',
    label: 'Dashboard',
    icon: <DashboardOutlined />,
    children: [
      {
        key: '5',
        label: 'Layanan Transaksi',
        url : '/dashboard',
      },
      {
        key: '6',
        label: 'Trend Transaksi',
        url : '/trend-transaksi',
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
        url : '/manage-user',
      },
      {
        key: '10',
        label: 'Manage Role',
        url : '/manage-role',
      },
    ],
  },
  {
    key: 'sub3',
    label: 'Maintenance Partner',
    icon: <PartitionOutlined />,
    children: [
      {
        key: '11',
        label: 'Merchant',
        url : '/merchant',
      },
      {
        key: '12',
        label: 'Terminal',
        url : '/terminal',
      },
      {
        key: '13',
        label: 'Mitra',
        url : '/mitra',
      },
    ],
  },
];

const getItemPageUrl = (itemKey) => {
  const findItem = (arr) => {
    for (const item of arr) {
      if (item.key === itemKey) {
        return item.url;
      }
      if (item.children) {
        const foundUrl = findItem(item.children);
        if (foundUrl) {
          return foundUrl;
        }
      }
    }
    return null;
  };
  const url = findItem(items);
  return url ? url : '/';
};

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const router = useRouter();

  const handleMenuClick = (item) => {
    const e = window.event; // Get the event object
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault(); // Call preventDefault only if it's a function
    }
    const pageUrl = getItemPageUrl(item.key);
    router.push(pageUrl);
  };

  return (
    <div
      style={{
        width: 256,
      }}
    >
      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={handleMenuClick}
      />
    </div>
  );
};
export default App;