



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
// import styles from './vendorDashboardLayout.module.css'

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

// const VendorDashboardLayout = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const navigate = useNavigate();
//     const { logout } = useAuth();

//     const handleLogout = () => {
//     logout();            
//     navigate('/login'); 
//   };

// const menuItems = [
//   getItem('Dashboard', '1', <DashboardOutlined />, null, () => navigate('/vendor-dashboard')),
//    getItem('Add Product', '2', <UploadOutlined />, null, () => navigate('/vendor-dashboard/add-product')),
//   getItem('My Products', '3', <ShopOutlined />, null, () => navigate('/vendor-dashboard/my-products')),
//   getItem('Order Requests', '4', <UserOutlined />, null, () => navigate('/vendor-dashboard/order-requests')),
//   getItem('Reset Password', '5', <UserOutlined />, null, () => navigate('/vendor-dashboard/reset-password')),
//   getItem('Logout', 'logout', <LogoutOutlined />, null, handleLogout),
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

// export default  VendorDashboardLayout;
