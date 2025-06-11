



// import React, { useState } from 'react';
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UserOutlined,
//   ShopOutlined,
//   UploadOutlined,
//   LogoutOutlined,
//   DashboardOutlined,
// } from '@ant-design/icons';
// import { useAuth } from '../../Context/AuthContext';
// import { Button, Layout, Menu } from 'antd';
// import { Outlet, useNavigate } from 'react-router-dom';
// import styles from './adminDashboardLayout.module.css'

// const { Header, Sider, Content } = Layout;

// function getItem(label, key, icon, children, onClick) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     onClick,
//   };
// }

// const AdminDashboardLayout = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const navigate = useNavigate();
//     const { logout } = useAuth();

//     const handleLogout = () => {
//     logout();            
//     navigate('/login'); 
//   };

// const menuItems = [
//   getItem('Dashboard', '1', <DashboardOutlined />, null, () => navigate('/admin-dashboard')),

//   getItem('Requests', '2', <UploadOutlined />, null, () => navigate('/admin-dashboard/requests')),

//   getItem('Users', 'sub1', <UserOutlined />, [
//     getItem('Add User', '3', null, null, () => navigate('/admin-dashboard/add-user')),
//     getItem('User List', '4', null, null, () => navigate('/admin-dashboard/user-list')),
//     getItem('Vendor List', '5', null, null, () => navigate('/admin-dashboard/vendor-list')),
//   ]),


//   getItem('Products', 'sub3', <ShopOutlined />, [
//     getItem('Approved', '8', null, null, () => navigate('/admin-dashboard/approved-products')),
//     getItem('Top Sellers', '9', null, null, () => navigate('/admin-dashboard/products/top-sellers')),
//   ]),
  
//   getItem('Orders', 'sub2', <ShopOutlined />, [
//     getItem('Order Placed', '6', null, null, () => navigate('/admin-dashboard/orders/placed')),
//     getItem('Status', '7', null, null, () => navigate('/admin-dashboard/orders/status')),
//   ]),

//    getItem('Logout', 'logout', <LogoutOutlined />, null, handleLogout),
// ];


//   return (
//     <Layout className={styles.adminLayout}>
//       <Sider
//         collapsible
//         collapsed={collapsed}
//         trigger={null}
//         className={styles.adminSider}
//       >
//         <Menu
//           mode="inline"
//           defaultSelectedKeys={['1']}
//           items={menuItems}
//           inlineCollapsed={collapsed}
//           className={styles.adminMenu}
//         />
//       </Sider>

//       <Layout className={styles.siteLayout}>
//         <Header className={styles.adminHeader}>
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             className={styles.adminHeaderButton}
//             aria-label="Toggle sidebar"
//           />
//         </Header>

//         <Content className={styles.adminContent}>
//           <Outlet />
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default AdminDashboardLayout;
