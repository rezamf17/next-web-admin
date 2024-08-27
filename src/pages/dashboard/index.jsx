import { useState } from 'react';
import HeaderComponent from '@/components/HeaderComponent';
import SiderComponent from '@/components/SiderComponent';

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <HeaderComponent />
      <SiderComponent collapsed={collapsed} />
    </div>
  );
};

export default App;