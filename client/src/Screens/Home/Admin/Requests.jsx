import React, { useEffect, useState } from 'react';
import {
  Table,
  Tag,
  Image,
  message,
  Spin,
  Button,
  Popconfirm,
  Modal,
  Row,
  Col,
  Typography,
  Space,
} from 'antd';

const { Title, Text } = Typography;

const Requests = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [approving, setApproving] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [vendorDetails, setVendorDetails] = useState(null);
  const [vendorLoading, setVendorLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/products?approved=false');
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleApprove = async (product) => {
    setApproving(product.id);
    try {
      const res = await fetch(`http://localhost:5000/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: true, reject: false }),
      });

      if (!res.ok) throw new Error('Failed to approve product');
      message.success(`${product.name} approved`);
      fetchProducts();
    } catch (err) {
      console.error(err);
      message.error('Approval failed');
    } finally {
      setApproving(null);
    }
  };

  const handleReject = async (product) => {
    try {
      const res = await fetch(`http://localhost:5000/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reject: true, approved: false }),
      });

      if (!res.ok) throw new Error('Failed to reject product');
      message.success(`${product.name} rejected`);
      fetchProducts();
    } catch (err) {
      console.error(err);
      message.error('Rejection failed');
    }
  };

  const fetchVendorDetails = async (vendorId) => {
    setVendorLoading(true);
    setVendorDetails(null);

    try {
      const res = await fetch(`http://localhost:5000/users/${vendorId}`);
      if (!res.ok) throw new Error('Failed to fetch vendor details');
      const data = await res.json();
      setVendorDetails(data);
    } catch (err) {
      console.error(err);
      message.error('Failed to load vendor details');
    } finally {
      setVendorLoading(false);
    }
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setViewModalVisible(true);
    fetchVendorDetails(product.vendorId);
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (img) => (
        <Image
          src={img}
          alt="product"
          width={60}
          height={60}
          style={{ objectFit: 'cover', borderRadius: 8 }}
          preview={false}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Subcategory',
      dataIndex: 'subcategory',
      key: 'subcategory',
    },
    {
      title: 'Price (₹)',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `₹${price.toFixed(2)}`,
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => {
        if (record.reject) {
          return <Tag color="red" style={{ minWidth: 80, textAlign: 'center' }}>Rejected</Tag>;
        }
        return <Tag color="orange" style={{ minWidth: 80, textAlign: 'center' }}>Pending</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Approve this product?"
            onConfirm={() => handleApprove(record)}
            okText="Yes"
            cancelText="No"
            disabled={record.reject}
          >
            <Button
              type="primary"
              loading={approving === record.id}
              disabled={approving === record.id || record.reject}
            >
              Approve
            </Button>
          </Popconfirm>

          <Popconfirm
            title="Reject this product?"
            onConfirm={() => handleReject(record)}
            okText="Yes"
            cancelText="No"
            disabled={record.reject}
          >
            <Button danger disabled={record.reject}>
              Reject
            </Button>
          </Popconfirm>

          <Button onClick={() => handleViewDetails(record)}>View More</Button>
        </Space>
      ),
    },
  ];

  if (loading) {
    return <Spin tip="Loading pending products..." fullscreen />;
  }

  if (products.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: 50 }}>No pending product requests.</p>;
  }

  return (
    <div style={{ padding: 24 }}>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        pagination={{ pageSize: 8 }}
        bordered
        size="middle"
      />

      <Modal
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        title="Product & Vendor Details"
        width={700}
      >
        {selectedProduct && (
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Row gutter={[24, 24]}>
              <Col span={10} style={{ textAlign: 'center' }}>
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  width={180}
                  style={{ borderRadius: 8, objectFit: 'contain' }}
                  preview={false}
                />
              </Col>

              <Col span={14}>
                <Title level={4}>{selectedProduct.name}</Title>
                <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
                  Product ID: <Text code>{selectedProduct.id}</Text>
                </Text>

                <Text strong>Description:</Text>
                <Text
                  style={{
                    display: 'block',
                    marginBottom: 16,
                    whiteSpace: 'pre-wrap',
                    color: '#555',
                  }}
                >
                  {selectedProduct.description || 'No description provided.'}
                </Text>

                <Row gutter={16} style={{ marginBottom: 16 }}>
                  <Col span={12}>
                    <Text strong>Category:</Text> <Text>{selectedProduct.category}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Subcategory:</Text> <Text>{selectedProduct.subcategory}</Text>
                  </Col>
                </Row>

                <Text strong>Price:</Text> <Text>₹{selectedProduct.price.toFixed(2)}</Text>

                <div style={{ marginTop: 16 }}>
                  <Tag color={
                    selectedProduct.reject
                      ? 'red'
                      : selectedProduct.approved
                      ? 'green'
                      : 'orange'
                  }>
                    {selectedProduct.reject
                      ? 'Rejected'
                      : selectedProduct.approved
                      ? 'Approved'
                      : 'Pending'}
                  </Tag>
                </div>
              </Col>
            </Row>

            <div>
              <Title level={4}>Vendor Information</Title>
              {vendorLoading ? (
                <Spin />
              ) : vendorDetails ? (
                <Space direction="vertical" size="small">
                  <Text>
                    <Text strong>Name:</Text> {vendorDetails.name || 'N/A'}
                  </Text>
                  <Text>
                    <Text strong>Email:</Text> {vendorDetails.email || 'N/A'}
                  </Text>
                  <Text>
                    <Text strong>Phone:</Text> {vendorDetails.phone || 'N/A'}
                  </Text>
                  <Text>
                    <Text strong>Address:</Text> {vendorDetails.address || 'N/A'}
                  </Text>
                </Space>
              ) : (
                <Text type="danger">Vendor information not found.</Text>
              )}
            </div>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default Requests;
