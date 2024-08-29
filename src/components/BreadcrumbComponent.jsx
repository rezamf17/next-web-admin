import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const BreadcrumbComponent = ({icon, menu, submenu}) => {
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item><HomeOutlined /> Home</Breadcrumb.Item>
      <Breadcrumb.Item>{icon} {menu}</Breadcrumb.Item>
      <Breadcrumb.Item>{submenu}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;