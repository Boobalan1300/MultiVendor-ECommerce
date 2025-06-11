


// import React, { useEffect, useState } from 'react';
// import { Table, Image, message, Tag, Space } from 'antd';
// import Button from '../../../Components/Button'; 

// const VendorList = () => {
//   const [vendors, setVendors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [actionVendorId, setActionVendorId] = useState(null);

//   const fetchVendors = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:5000/users');
//       if (!response.ok) {
//         throw new Error('Failed to fetch vendors');
//       }
//       const data = await response.json();
//       const vendorOnly = data.filter((user) => user.role === 'vendor');
//       setVendors(vendorOnly);
//     } catch (error) {
//       console.error(error);
//       message.error('Error loading vendors');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVendors();
//   }, []);

//   const handleToggleBlock = async (vendor) => {
//     setActionVendorId(vendor.id);
//     try {
//       const res = await fetch(`http://localhost:5000/users/${vendor.id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ blocked: !vendor.blocked }),
//       });

//       if (!res.ok) throw new Error('Failed to update vendor status');

//       message.success(
//         `${vendor.name} has been ${vendor.blocked ? 'unblocked' : 'blocked'}`
//       );
//       fetchVendors();
//     } catch (err) {
//       console.error(err);
//       message.error('Failed to update vendor status');
//     } finally {
//       setActionVendorId(null);
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
//         blocked ? (
//           <Tag color="red" style={{ minWidth: 80, textAlign: 'center' }}>
//             Blocked
//           </Tag>
//         ) : (
//           <Tag color="green" style={{ minWidth: 80, textAlign: 'center' }}>
//             Active
//           </Tag>
//         ),
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_, vendor) => (
//         <Space>
//           <Button
//             type={vendor.blocked ? 'default' : 'primary'}
//             danger={vendor.blocked}
//             loading={actionVendorId === vendor.id}
//             onClick={() => handleToggleBlock(vendor)}
//             block={false}
//             style={{ minWidth: 100, textAlign: 'center' }}
//           >
//             {vendor.blocked ? 'Unblock' : 'Block'}
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Vendor List</h2>
//       <Table
//         dataSource={vendors}
//         columns={columns}
//         rowKey="id"
//         loading={loading}
//         pagination={{ pageSize: 5 }}
//       />
//     </div>
//   );
// };

// export default VendorList;



import React, { useEffect, useState } from 'react';
import { Table, Image, message, Tag, Space, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Button from '../../../Components/Button'; // Reuse your custom Button
import AddUser from './AddUser'; // Make sure this path is correct

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionVendorId, setActionVendorId] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/users');
      if (!response.ok) {
        throw new Error('Failed to fetch vendors');
      }
      const data = await response.json();
      const vendorOnly = data.filter((user) => user.role === 'vendor');
      setVendors(vendorOnly);
    } catch (error) {
      console.error(error);
      message.error('Error loading vendors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleToggleBlock = async (vendor) => {
    setActionVendorId(vendor.id);
    try {
      const res = await fetch(`http://localhost:5000/users/${vendor.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blocked: !vendor.blocked }),
      });

      if (!res.ok) throw new Error('Failed to update vendor status');

      message.success(
        `${vendor.name} has been ${vendor.blocked ? 'unblocked' : 'blocked'}`
      );
      fetchVendors();
    } catch (err) {
      console.error(err);
      message.error('Failed to update vendor status');
    } finally {
      setActionVendorId(null);
    }
  };

  const columns = [
    {
      title: 'Profile Image',
      dataIndex: 'profileImage',
      key: 'profileImage',
      render: (url) =>
        url ? (
          <Image src={url} alt="Profile" width={50} height={50} />
        ) : (
          <span>No Image</span>
        ),
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
      render: (_, vendor) => (
        <Space>
          <Button
            type={vendor.blocked ? 'default' : 'primary'}
            danger={vendor.blocked}
            loading={actionVendorId === vendor.id}
            onClick={() => handleToggleBlock(vendor)}
            block={false}
            style={{ minWidth: 100, textAlign: 'center' }}
          >
            {vendor.blocked ? 'Unblock' : 'Block'}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <h2>Vendor List</h2>
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

      <Table
        dataSource={vendors}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Drawer
        title="Add New Vendor"
        placement="right"
        width={720}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        destroyOnClose
      >
        <AddUser
          role="vendor" // 👈 Forces AddUser to show the vendor form
          onUserAdded={() => {
            setDrawerVisible(false);
            fetchVendors();
          }}
        />
      </Drawer>
    </div>
  );
};

export default VendorList;
