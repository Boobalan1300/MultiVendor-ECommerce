import React from 'react';
import { Card, Row, Col, Typography, Divider, Tag } from 'antd';

const { Title, Text } = Typography;

import {order} from '../../../Utils/ordersData'

const Orders = () => {
  if (!order) {
    return <Text>No order data available.</Text>;
  }

  const {
    shipping,
    payment,
    items,
    subtotal,
    shippingCost,
    discount,
    total,
    status,
    orderNumber,
    placedAt,
  } = order;

  return (
    <Card
      title={`Order #${orderNumber}`}
      style={{ maxWidth: 800, margin: 'auto', padding: 24 }}
    >
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={4}>Order Summary</Title>
        </Col>
        <Col>
          <Tag color={status === 'Delivered' ? 'green' : 'blue'}>{status}</Tag>
        </Col>
      </Row>

      <Text type="secondary">Placed on: {new Date(placedAt).toLocaleString()}</Text>

      <Divider />

      <Title level={5}>Shipping Information</Title>
      <Text><b>Name:</b> {shipping.fullName}</Text><br />
      <Text><b>Phone:</b> {shipping.phone}</Text><br />
      <Text><b>Address:</b> {shipping.address}, {shipping.city}, {shipping.zipCode}</Text>

      <Divider />

      <Title level={5}>Payment Information</Title>
      <Text><b>Cardholder Name:</b> {payment.cardholderName}</Text><br />
      <Text><b>Card Number:</b> **** **** **** {payment.cardLast4}</Text><br />
      <Text><b>Auto Recharge:</b> {payment.autoRecharge ? 'Enabled' : 'Disabled'}</Text>

      <Divider />

      <Title level={5}>Items</Title>
      {items.map((item, idx) => (
        <Row key={idx} justify="space-between" style={{ padding: '4px 0' }}>
          <Text>{item.name} x {item.quantity}</Text>
          <Text>Rs.{(item.price * item.quantity).toFixed(2)}</Text>
        </Row>
      ))}

      <Divider />

      <Row justify="space-between">
        <Text>Subtotal</Text>
        <Text>Rs.{subtotal.toFixed(2)}</Text>
      </Row>
      <Row justify="space-between">
        <Text>Shipping</Text>
        <Text>Rs.{shippingCost.toFixed(2)}</Text>
      </Row>
      <Row justify="space-between">
        <Text>Discount</Text>
        <Text>- Rs.{discount.toFixed(2)}</Text>
      </Row>
      <Divider />
      <Row justify="space-between">
        <Text strong>Total</Text>
        <Text strong>Rs.{total.toFixed(2)}</Text>
      </Row>
    </Card>
  );
};

export default Orders;
