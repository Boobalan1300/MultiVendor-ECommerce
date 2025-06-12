
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Space,
  Typography,
  Button,
  Drawer,
  Grid,
} from 'antd';
import {
  ShoppingCartOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined,
  MenuOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { logout } from '../Redux/Reducer/authUser';

const { Header } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();

  const user = useSelector((state) => state.auth.user);
  const [drawerVisible, setDrawerVisible] = useState(false);

  if (!user && location.pathname === '/login') return null;

  const isCustomer = user?.role === 'customer';
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'U';

  const onMenuClick = ({ key }) => {
    if (key === 'logout') {
      dispatch(logout());
      navigate('/login');
      setDrawerVisible(false);
    } else {
      navigate(key);
      setDrawerVisible(false);
    }
  };

  const menuItems = [
    { label: 'Home', key: '/', icon: <HomeOutlined /> },
    { label: 'Products', key: '/products', icon: <AppstoreOutlined /> },
    { label: 'Cart', key: '/cart', icon: <ShoppingCartOutlined /> },
    { label: 'Orders', key: '/orders', icon: <UnorderedListOutlined /> },
  ];

  const profileMenu = (
    <Menu onClick={onMenuClick}>
      <Menu.Item key="logout" icon={<UserOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000, backgroundColor: '#222', padding: 0
    }}>
      <div
        style={{
          maxWidth: '1450px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
        }}
      >
        {screens.md ? (
          <>
            <Menu
              theme="dark"
              mode="horizontal"
              selectable={false}
              items={menuItems}
              onClick={onMenuClick}
              style={{ backgroundColor: '#222', flex: 1, userSelect: 'none' }}
            />
            {isCustomer ? (
              <Dropdown overlay={profileMenu} trigger={['click']}>
                <Space style={{ cursor: 'pointer' }}>
                  <Avatar style={{ backgroundColor: '#87d068' }} size="large">
                    {userInitial}
                  </Avatar>
                  <Text style={{ color: 'white', userSelect: 'none' }}>{user.email}</Text>
                </Space>
              </Dropdown>
            ) : (
              <Button type="primary" onClick={() => navigate('/login')} style={{ marginLeft: 16 }}>
                Login
              </Button>
            )}
          </>
        ) : (
          <>
            <Button
              type="text"
              icon={<MenuOutlined style={{ color: 'white', fontSize: 24 }} />}
              onClick={() => setDrawerVisible(true)}
            />
            <div style={{ flex: 1 }} />
            {isCustomer ? (
              <Dropdown overlay={profileMenu} trigger={['click']}>
                <Space style={{ cursor: 'pointer' }}>
                  <Avatar style={{ backgroundColor: '#87d068' }} size="large">
                    {userInitial}
                  </Avatar>
                </Space>
              </Dropdown>
            ) : (
              <Button type="primary" onClick={() => navigate('/login')}>
                Login
              </Button>
            )}
            <Drawer
              title="Menu"
              placement="top"
              onClose={() => setDrawerVisible(false)}
              open={drawerVisible}
              bodyStyle={{ padding: 0 }}
              height="auto"
            >
              <Menu
                mode="inline"
                selectable={false}
                items={menuItems}
                onClick={onMenuClick}
              />
            </Drawer>
          </>
        )}
      </div>
    </Header>
  );
};

export default Navbar;
