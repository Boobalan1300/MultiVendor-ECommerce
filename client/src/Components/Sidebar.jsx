// src/components/Sidebar.jsx
import React from 'react';
import { Layout, Menu } from 'antd';
import styles from './Sidebar.module.css';

const { Sider } = Layout;

const Sidebar = ({ collapsed, onToggle, menuItems, defaultSelectedKeys = ['1'], className = '' }) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className={`${styles.sidebar} ${className}`}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={defaultSelectedKeys}
        items={menuItems}
        className={styles.menu}
        inlineCollapsed={collapsed}
      />
    </Sider>
  );
};

export default Sidebar;




