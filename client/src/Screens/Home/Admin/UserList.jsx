
// import React, { useEffect, useState } from 'react';
// import { Table, Image, message, Tag, Space } from 'antd';
// import Button from '../../Components/Button';

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [actionUserId, setActionUserId] = useState(null);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:5000/users');
//       if (!response.ok) {
//         throw new Error('Failed to fetch users');
//       }
//       const data = await response.json();
//       setUsers(data);
//     } catch (error) {
//       console.error(error);
//       message.error('Error loading users');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleToggleBlock = async (user) => {
//     setActionUserId(user.id);
//     try {
//       const res = await fetch(`http://localhost:5000/users/${user.id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ blocked: !user.blocked }),
//       });

//       if (!res.ok) throw new Error('Failed to update user status');

//       message.success(
//         `${user.name} has been ${user.blocked ? 'unblocked' : 'blocked'}`
//       );
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       message.error('Failed to update user status');
//     } finally {
//       setActionUserId(null);
//     }
//   };

//   const columns = [
//     {
//       title: 'Profile Image',
//       dataIndex: 'profileImage',
//       key: 'profileImage',
//       render: (url) =>
//         url ? (
//           <Image src={url} alt="Profile" width={50} height={50} />
//         ) : (
//           <span>No Image</span>
//         ),
//     },
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Role',
//       dataIndex: 'role',
//       key: 'role',
//     },
//     {
//       title: 'Email',
//       dataIndex: 'email',
//       key: 'email',
//     },
//     {
//       title: 'Phone',
//       dataIndex: 'phone',
//       key: 'phone',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'blocked',
//       key: 'blocked',
//       render: (blocked) =>
//     blocked ? (
//       <Tag color="red" style={{ minWidth: 80, textAlign: 'center' }}>Blocked</Tag>
//     ) : (
//       <Tag color="green" style={{ minWidth: 80, textAlign: 'center' }}>Active</Tag>
//     ),
// },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_, user) => (
//         <Space>
//           <Button
//             type={user.blocked ? 'default' : 'primary'}
//             danger={user.blocked}
//             loading={actionUserId === user.id}
//             onClick={() => handleToggleBlock(user)}
//             block={false}
//               style={{ minWidth: 100, textAlign: 'center' }}
//           >
//             {user.blocked ? 'Unblock' : 'Block'}
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>User List</h2>
//       <Table
//         dataSource={users.filter((user) => user.role === 'customer')}
//         columns={columns}
//         rowKey="id"
//         loading={loading}
//         pagination={{ pageSize: 5 }}
//       />
//     </div>
//   );
// };

// export default UserList;





import React, { useEffect, useState } from 'react';
import { Table, Image, message, Tag, Space, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Button from '../../../Components/Button';
import AddUser from './AddUser'; // Make sure this path is correct

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionUserId, setActionUserId] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Fetch users from the backend
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      message.error('Error loading users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Toggle block/unblock
  const handleToggleBlock = async (user) => {
    setActionUserId(user.id);
    try {
      const res = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blocked: !user.blocked }),
      });

      if (!res.ok) throw new Error('Failed to update user status');

      message.success(`${user.name} has been ${user.blocked ? 'unblocked' : 'blocked'}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
      message.error('Failed to update user status');
    } finally {
      setActionUserId(null);
    }
  };

  // Table columns
  const columns = [
    {
      title: 'Profile Image',
      dataIndex: 'profileImage',
      key: 'profileImage',
      render: (url) =>
        url ? <Image src={url} alt="Profile" width={50} height={50} /> : <span>No Image</span>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Status',
      dataIndex: 'blocked',
      key: 'blocked',
      render: (blocked) =>
        blocked ? (
          <Tag color="red" style={{ minWidth: 80, textAlign: 'center' }}>
            Blocked
          </Tag>
        ) : (
          <Tag color="green" style={{ minWidth: 80, textAlign: 'center' }}>
            Active
          </Tag>
        ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, user) => (
        <Space>
          <Button
            type={user.blocked ? 'default' : 'primary'}
            danger={user.blocked}
            loading={actionUserId === user.id}
            onClick={() => handleToggleBlock(user)}
            block={false}
            style={{ minWidth: 100, textAlign: 'center' }}
          >
            {user.blocked ? 'Unblock' : 'Block'}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <h2>User List</h2>
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={() => setDrawerVisible(true)}
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            width: 40,
            height: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </div>

      {/* Table showing only customers */}
      <Table
        dataSource={users.filter((user) => user.role === 'customer')}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      {/* Drawer with AddUser Form (restricted to customer only) */}
      <Drawer
        title="Add New Customer"
        placement="right"
        width={720}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        destroyOnClose
      >
        <AddUser
          role="customer" // 👈 Ensures the customer form shows
          onUserAdded={() => {
            setDrawerVisible(false);
            fetchUsers();
          }}
        />
      </Drawer>
    </div>
  );
};

export default UserList;
