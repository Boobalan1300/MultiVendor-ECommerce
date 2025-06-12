import React from 'react';
import { Row, Col, Card, Typography, Table, Tag, Space } from 'antd';

const { Title, Text } = Typography;

const AdminDashboard = () => {




  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        Dashboard Overview
      </Title>

      {/* Overview cards */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={6} >
          <Card hoverable style={{backgroundColor:"#ffedff"}}>
            <Title level={4}>Total Users</Title>
            <Text strong style={{ fontSize: 28 }}>1,234</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{backgroundColor:"#ffedff"}}>
            <Title level={4}>Products</Title>
            <Text strong style={{ fontSize: 28 }}>345</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{backgroundColor:"#ffedff"}}>
            <Title level={4}>Orders</Title>
            <Text strong style={{ fontSize: 28 }}>789</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable style={{backgroundColor:"#ffedff"}}>
            <Title level={4}>Revenue</Title>
            <Text strong style={{ fontSize: 28 }}>₹1,20,000</Text>
          </Card>
        </Col>
      </Row>


    </div>
  );
};

export default AdminDashboard;
