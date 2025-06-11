// import React, { useState } from 'react';
// import {
//     MenuFoldOutlined,
//     MenuUnfoldOutlined,
//     UserOutlined,
//     ShopOutlined,
//     UploadOutlined,
//     LogoutOutlined,
//     DashboardOutlined,
// } from '@ant-design/icons';
// import { Menu, Layout, Button } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../Context/AuthContext';
// import { Outlet } from 'react-router-dom';
// import { Content } from 'antd/es/layout/layout';

// const { Header, Sider } = Layout;

// function getItem(label, key, icon, children, onClick) {
//     return {
//         key,
//         icon,
//         children,
//         label,
//         onClick,
//     };
// }

// const Sidebar = ({ role }) => {
//     const [collapsed, setCollapsed] = useState(false);
//     const navigate = useNavigate();
//     const { logout } = useAuth();

//     const handleLogout = () => {
//         logout();
//         navigate('/login');
//     };

//     // Menu items based on role
//     const menuItems = role === 'admin'
//         ? [
//             getItem('Dashboard', '1', <DashboardOutlined />, null, () => navigate('/admin-dashboard')),
//             getItem('Requests', '2', <UploadOutlined />, null, () => navigate('/admin-dashboard/requests')),
//             getItem('Users', 'sub1', <UserOutlined />, [
//                 getItem('Add User', '3', null, null, () => navigate('/admin-dashboard/add-user')),
//                 getItem('User List', '4', null, null, () => navigate('/admin-dashboard/user-list')),
//                 getItem('Vendor List', '5', null, null, () => navigate('/admin-dashboard/vendor-list')),
//             ]),
//             getItem('Products', 'sub3', <ShopOutlined />, [
//                 getItem('Approved', '8', null, null, () => navigate('/admin-dashboard/approved-products')),
//                 getItem('Top Sellers', '9', null, null, () => navigate('/admin-dashboard/products/top-sellers')),
//             ]),
//             getItem('Orders', 'sub2', <ShopOutlined />, [
//                 getItem('Order Placed', '6', null, null, () => navigate('/admin-dashboard/orders/placed')),
//                 getItem('Status', '7', null, null, () => navigate('/admin-dashboard/orders/status')),
//             ]),
//             getItem('Logout', 'logout', <LogoutOutlined />, null, handleLogout),
//         ]
//         : role === 'vendor'
//             ? [
//                 getItem('Dashboard', '1', <DashboardOutlined />, null, () => navigate('/vendor-dashboard')),
//                 getItem('Add Product', '2', <UploadOutlined />, null, () => navigate('/vendor-dashboard/add-product')),
//                 getItem('My Products', '3', <ShopOutlined />, null, () => navigate('/vendor-dashboard/my-products')),
//                 getItem('Order Requests', '4', <UserOutlined />, null, () => navigate('/vendor-dashboard/order-requests')),
//                 getItem('Reset Password', '5', <UserOutlined />, null, () => navigate('/vendor-dashboard/reset-password')),
//                 getItem('Logout', 'logout', <LogoutOutlined />, null, handleLogout),
//             ]
//             : [];

//     return (
//         <Layout style={{ minHeight: '97vh', position: "sticky" }}>
//             <Sider collapsible collapsed={collapsed} trigger={null}>
//                 <Menu
//                     mode="inline"
//                     defaultSelectedKeys={['1']}
//                     items={menuItems}
//                     inlineCollapsed={collapsed}
//                 />
//             </Sider>

//             <Layout>
//                 <Header style={{ padding: '0 16px', background: '#fff', display: 'flex', alignItems: 'center' }}>
//                     <Button
//                         type="text"
//                         icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//                         onClick={() => setCollapsed(!collapsed)}
//                         aria-label="Toggle sidebar"
//                     />
//                     {/* You can add other header content here */}
//                 </Header>
//                 <Content
//                     style={{
//                         margin: '24px 16px 16px',
//                         padding: 24,
//                         minHeight: 280,
//                         backgroundColor: '#ffffff',
//                         borderRadius: 8,
//                         boxShadow: '0 2px 8px rgb(0 0 0 / 0.1)',
//                         overflowY: 'auto',
//                         flexGrow: 1,
//                         height: 0,
//                     }}
//                 >
//                     <Outlet />
//                 </Content>
//             </Layout>
//         </Layout>
//     );
// };

// export default Sidebar;









import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ShopOutlined,
  UploadOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Menu, Layout, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/Reducer/authUser';
import styles from './Sidebar.module.css';

const { Header, Sider } = Layout;

function getItem(label, key, icon, children, onClick) {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  };
}

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const role = user?.role;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems =
    role === 'admin'
      ? [
          getItem('Dashboard', '1', <DashboardOutlined />, null, () =>
            navigate('/admin-dashboard')
          ),
          getItem('Requests', '2', <UploadOutlined />, null, () =>
            navigate('/admin-dashboard/requests')
          ),
          getItem('Users', 'sub1', <UserOutlined />, [
            getItem('User List', '4', null, null, () =>
              navigate('/admin-dashboard/user-list')
            ),
            getItem('Vendor List', '5', null, null, () =>
              navigate('/admin-dashboard/vendor-list')
            ),
          ]),
          getItem('Products', 'sub3', <ShopOutlined />, [
            getItem('Approved', '8', null, null, () =>
              navigate('/admin-dashboard/approved-products')
            ),
            getItem('Top Sellers', '9', null, null, () =>
              navigate('/admin-dashboard/products/top-sellers')
            ),
          ]),
          getItem('Orders', 'sub2', <ShopOutlined />, [
            getItem('Order Placed', '6', null, null, () =>
              navigate('/admin-dashboard/orders/placed')
            ),
            getItem('Status', '7', null, null, () =>
              navigate('/admin-dashboard/orders/status')
            ),
          ]),
          getItem('Logout', 'logout', <LogoutOutlined />, null, handleLogout),
        ]
      : role === 'vendor'
      ? [
          getItem('Dashboard', '1', <DashboardOutlined />, null, () =>
            navigate('/vendor-dashboard')
          ),
          getItem('Add Product', '2', <UploadOutlined />, null, () =>
            navigate('/vendor-dashboard/add-product')
          ),
          getItem('My Products', '3', <ShopOutlined />, null, () =>
            navigate('/vendor-dashboard/my-products')
          ),
          getItem('Order Requests', '4', <UserOutlined />, null, () =>
            navigate('/vendor-dashboard/order-requests')
          ),
          getItem('Reset Password', '5', <UserOutlined />, null, () =>
            navigate('/vendor-dashboard/reset-password')
          ),
          getItem('Logout', 'logout', <LogoutOutlined />, null, handleLogout),
        ]
      : [];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={200}
        className={styles.sider}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuItems}
          inlineCollapsed={collapsed}
          className={styles.menu}
        />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: 'margin-left 0.2s ease-in-out',
        }}
      >
        <Header className={styles.header}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle sidebar"
          />
        </Header>

        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
