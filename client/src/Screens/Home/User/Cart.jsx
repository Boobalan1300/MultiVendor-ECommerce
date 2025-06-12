

import React, { useState } from 'react';
import { Row, Col, Typography, Divider, Image, Empty, Input, message } from 'antd';
import {
    DeleteOutlined,
    PlusOutlined,
    MinusOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import Button from '../../../Components/Button';
import cartData from '../../../Utils/cartItems';

const { Title, Text, Link } = Typography;

const Cart = () => {
    const [cartItems, setCartItems] = useState(cartData);
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const navigate = useNavigate();

    const SHIPPING_COST = 50;

    const updateQuantity = (id, type) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantity:
                            type === 'inc'
                                ? item.quantity + 1
                                : item.quantity > 1
                                    ? item.quantity - 1
                                    : 1,
                    }
                    : item
            )
        );
    };

    const removeItem = id => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const applyCoupon = () => {
        if (coupon.toLowerCase() === 'save10') {
            setDiscount(0.1); // 10% discount
            message.success('Coupon applied successfully!');
        } else {
            setDiscount(0);
            message.error('Invalid coupon code');
        }
    };

    const discountedPrice = totalPrice * (1 - discount);
    const totalCost = (discountedPrice + SHIPPING_COST).toFixed(2);

    const handleCheckout = () => {
        message.success('Proceeding to checkout...');
        navigate('/payment');
    };

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Title level={3}>
                <ShoppingCartOutlined style={{ marginRight: 8 }} />
                Shopping Cart ({totalItems} items)
            </Title>

            <Divider />

            {cartItems.length === 0 ? (
                <Empty description="Your cart is empty" />
            ) : (
                <>

                    <Row justify="start" style={{ marginBottom: 24 }}>
                        <Col>
                            <Link onClick={() => navigate('/products')}>← Continue Shopping</Link>
                        </Col>
                    </Row>

                  
                    <Row gutter={[24, 24]}>
                        {/* Cart Items Column */}
                        <Col xs={24} lg={16}>
                            {cartItems.map(item => (
                                <Row
                                    key={item.id}
                                    gutter={[16, 16]}
                                    align="middle"
                                    style={{
                                        marginBottom: 16,
                                        paddingBottom: 16,
                                        borderBottom: '1px solid #f0f0f0',
                                    }}
                                >
                                    <Col xs={6} sm={4}>
                                        <Image src={item.image} alt={item.title} width={80} />
                                    </Col>

                                    <Col xs={10} sm={6}>
                                        <Text strong>{item.title}</Text>
                                    </Col>

                                    <Col xs={6} sm={6}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Button
                                                icon={<MinusOutlined />}
                                                type="default"
                                                htmlType="button"
                                                block={false}
                                                onClick={() => updateQuantity(item.id, 'dec')}
                                            />
                                            <span style={{ minWidth: 24, textAlign: 'center' }}>{item.quantity}</span>
                                            <Button
                                                icon={<PlusOutlined />}
                                                type="default"
                                                htmlType="button"
                                                block={false}
                                                onClick={() => updateQuantity(item.id, 'inc')}
                                            />
                                        </div>
                                    </Col>

                                    <Col xs={8} sm={3}>
                                        <Text>Rs.{item.price}</Text>
                                    </Col>

                                    <Col xs={8} sm={3}>
                                        <Text strong>Rs.{(item.quantity * item.price).toFixed(2)}</Text>
                                    </Col>

                                    <Col xs={6} sm={2}>
                                        <Button
                                            icon={<DeleteOutlined />}
                                            danger
                                            type="danger"
                                            htmlType="button"
                                            block={false}
                                            onClick={() => removeItem(item.id)}
                                        />
                                    </Col>
                                </Row>
                            ))}
                        </Col>

                        {/* Order Summary Column */}
                        <Col xs={24} lg={8}>
                            <Title level={4}>Order Summary</Title>

                            <Row justify="space-between">
                                <Text>Subtotal</Text>
                                <Text>Rs.{totalPrice.toFixed(2)}</Text>
                            </Row>

                            <Row justify="space-between">
                                <Text>Shipping</Text>
                                <Text>Rs.{SHIPPING_COST.toFixed(2)}</Text>
                            </Row>

                            <Row justify="space-between">
                                <Text>Discount</Text>
                                <Text>- Rs.{(totalPrice * discount).toFixed(2)}</Text>
                            </Row>

                            <Divider />

                            <Input
                                placeholder="Enter coupon"
                                value={coupon}
                                onChange={e => setCoupon(e.target.value)}
                                style={{ marginBottom: 8 }}
                            />
                            <Button type="primary" block onClick={applyCoupon}>
                                Apply
                            </Button>

                            <Divider />

                            <Row justify="space-between">
                                <Text strong>Total</Text>
                                <Text strong>Rs.{totalCost}</Text>
                            </Row>

                            <Button
                                type="primary"
                                block
                                style={{ marginTop: 16 }}
                                onClick={handleCheckout}
                            >
                                Checkout
                            </Button>
                        </Col>
                    </Row>

                </>
            )}
        </div>
    );
};

export default Cart;
