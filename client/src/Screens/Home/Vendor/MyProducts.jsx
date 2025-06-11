


















// import React, { useEffect, useState } from 'react';
// import { Table, Input, InputNumber, Select, Space, message, Spin, Modal, Form, Button, Tag } from 'antd';
// import { useAuth } from '../../../Context/AuthContext';

// const { Option } = Select;

// const MyProducts = () => {
//   const { user } = useAuth();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [form] = Form.useForm();

//   useEffect(() => {
//     if (!user) return;

//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`http://localhost:5000/products?vendorId=${user.id}`);
//         if (!res.ok) throw new Error('Failed to fetch products');
//         const data = await res.json();
//         setProducts(data);
//       } catch (err) {
//         console.error(err);
//         message.error('Failed to load products');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [user]);



//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     form.setFieldsValue(product);
//   };

//   const handleUpdate = async () => {
//     try {
//       const values = await form.validateFields();
//       const res = await fetch(`http://localhost:5000/products/${editingProduct.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ ...editingProduct, ...values }),

//       });
//       if (!res.ok) throw new Error('Failed to update product');

//       message.success('Product updated successfully');

//       // Refresh products
//       const updatedProducts = products.map(p =>
//         p.id === editingProduct.id ? { ...p, ...values } : p
//       );
//       setProducts(updatedProducts);
//       setEditingProduct(null);
//     } catch (err) {
//       console.error(err);
//       message.error('Failed to update product');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       // Call DELETE API
//       const res = await fetch(`http://localhost:5000/products/${id}`, {
//         method: 'DELETE',
//       });

//       if (!res.ok) throw new Error('Failed to delete product');

//       // Update state by filtering out deleted product
//       setProducts(products.filter(p => p.id !== id));

//       message.success('Product deleted successfully');
//     } catch (err) {
//       console.error(err);
//       message.error('Failed to delete product');
//     }
//   };




//   if (!user) return <p>Please log in to view your products.</p>;
//   if (loading) return <Spin tip="Loading your products..." style={{ display: 'block', marginTop: 100 }} />;
//   if (products.length === 0) return <p style={{ textAlign: 'center', marginTop: 50 }}>You haven’t added any products yet.</p>;

//   const columns = [
//     {
//     title: 'Image',
//     dataIndex: 'image',
//     key: 'image',
//     render: (image) => (
//       <img 
//         src={image} 
//         alt="product" 
//         style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }} 
//       />
//     ),
//   },
//     {
//       title: 'Name',
//       dataIndex: 'name',
//     },
    
//     {
//       title: 'Category',
//       dataIndex: 'category',
//       filters: Array.from(new Set(products.map(p => p.category))).map(category => ({
//         text: category,
//         value: category,
//       })),
//       onFilter: (value, record) => record.category === value,
//     },
//     {
//       title: 'Subcategory',
//       dataIndex: 'subcategory',
//       filters: Array.from(new Set(products.map(p => p.subcategory))).map(subcategory => ({
//         text: subcategory,
//         value: subcategory,
//       })),
//       onFilter: (value, record) => record.subcategory === value,
//     },
//     {
//       title: 'Price',
//       dataIndex: 'price',
//       sorter: (a, b) => a.price - b.price,
//       render: (price) => `₹${price}`,
//     },
// {
//   title: 'Status',
//   key: 'status',
//   filters: [
//     { text: 'Approved', value: 'approved' },
//     { text: 'Pending', value: 'pending' },
//     { text: 'Rejected', value: 'rejected' },
//   ],
//   onFilter: (value, record) => {
//     if (value === 'approved') return record.approved === true;
//     if (value === 'pending') return record.approved === false && record.reject !== true;
//     if (value === 'rejected') return record.reject === true;
//     return true;
//   },
//   render: (_, record) => {
//     if (record.reject) {
//       return <Tag color="red" style={{ minWidth: 80, textAlign: 'center' }}>Rejected</Tag>;
//     }
//     return record.approved ? (
//       <Tag color="green" style={{ minWidth: 80, textAlign: 'center' }}>Approved</Tag>
//     ) : (
//       <Tag color="orange" style={{ minWidth: 80, textAlign: 'center' }}>Pending</Tag>
//     );
//   },
// },


//     {
//       title: 'Actions',
//       render: (text, record) => (
//         <Space>
//           <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
//           <Button type="link" onClick={() => handleDelete(record.id)}>Delete</Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <>
//       <Table
//         columns={columns}
//         dataSource={products}
//         rowKey="id"
//         pagination={{ pageSize: 10 }}
//         style={{ marginTop: 20 }}
//         bordered={false}
//       />

//       <Modal
//         title="Edit Product"
//         open={!!editingProduct}
//         onCancel={() => setEditingProduct(null)}
//         onOk={handleUpdate}
//         okText="Save"
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="category" label="Category" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="subcategory" label="Subcategory" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="price"
//             label="Price"
//             rules={[{ required: true, type: 'number', min: 0, message: 'Enter a valid price' }]}
//           >
//             <InputNumber
//               min={0}
//               style={{ width: '100%' }}
//               formatter={(value) => `₹${value}`}
//               parser={(value) => value.replace(/₹\s?|(,*)/g, '')}
//             />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default MyProducts;






















import React, { useEffect, useState } from 'react';
import {
  Table, Input, InputNumber, Select, Space, message,
  Spin, Modal, Form, Button, Tag,
} from 'antd';
import { useSelector } from 'react-redux';

const { Option } = Select;

const MyProducts = () => {
  const user = useSelector((state) => state.auth.user);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!user) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/products?vendorId=${user.id}`);
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        message.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  const handleEdit = (product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const res = await fetch(`http://localhost:5000/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editingProduct, ...values }),
      });

      if (!res.ok) throw new Error('Failed to update product');

      message.success('Product updated successfully');
      const updated = products.map(p => p.id === editingProduct.id ? { ...p, ...values } : p);
      setProducts(updated);
      setEditingProduct(null);
    } catch (err) {
      console.error(err);
      message.error('Failed to update product');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete product');

      setProducts(products.filter(p => p.id !== id));
      message.success('Product deleted successfully');
    } catch (err) {
      console.error(err);
      message.error('Failed to delete product');
    }
  };

  if (!user) return <p>Please log in to view your products.</p>;
  if (loading) return <Spin tip="Loading your products..." style={{ display: 'block', marginTop: 100 }} />;
  if (products.length === 0) return <p style={{ textAlign: 'center', marginTop: 50 }}>You haven’t added any products yet.</p>;

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img src={image} alt="product" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }} />
      ),
    },
    { title: 'Name', dataIndex: 'name' },
    {
      title: 'Category',
      dataIndex: 'category',
      filters: Array.from(new Set(products.map(p => p.category))).map(c => ({ text: c, value: c })),
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Subcategory',
      dataIndex: 'subcategory',
      filters: Array.from(new Set(products.map(p => p.subcategory))).map(s => ({ text: s, value: s })),
      onFilter: (value, record) => record.subcategory === value,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price) => `₹${price}`,
    },
    {
      title: 'Status',
      key: 'status',
      filters: [
        { text: 'Approved', value: 'approved' },
        { text: 'Pending', value: 'pending' },
        { text: 'Rejected', value: 'rejected' },
      ],
      onFilter: (value, record) => {
        if (value === 'approved') return record.approved === true;
        if (value === 'pending') return record.approved === false && record.reject !== true;
        if (value === 'rejected') return record.reject === true;
        return true;
      },
      render: (_, record) => {
        if (record.reject) return <Tag color="red">Rejected</Tag>;
        return record.approved
          ? <Tag color="green">Approved</Tag>
          : <Tag color="orange">Pending</Tag>;
      },
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        pagination={false}
        style={{ marginTop: 20 }}
        bordered={false}
      />

      <Modal
        title="Edit Product"
        open={!!editingProduct}
        onCancel={() => setEditingProduct(null)}
        onOk={handleUpdate}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="subcategory" label="Subcategory" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, type: 'number', min: 0 }]}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              formatter={(value) => `₹${value}`}
              parser={(value) => value.replace(/₹\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MyProducts;






















