import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Form,
    Input,
    Button,
    Steps,
    Checkbox,
    Row,
    Col,
    Typography,
    message,
    Divider
} from 'antd';

const { Step } = Steps;
const { Title, Text } = Typography;


const Payment = () => {
    const [current, setCurrent] = useState(0);
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0.1); // 10% default
    const [totalPrice, setTotalPrice] = useState(500);
    const SHIPPING_COST = 50;

    const totalCost = (totalPrice + SHIPPING_COST - (totalPrice * discount)).toFixed(2);

    const navigate = useNavigate();

    const next = () => setCurrent(current + 1);
    const prev = () => setCurrent(current - 1);

    const handleFinish = () => {
        message.success('Proceeding to checkout...');
        setTimeout(() => {
            navigate('/orders');
        }, 1000);
    };

    const applyCoupon = () => {
        message.success(`Coupon "${coupon}" applied`);
        setDiscount(0.15);
    };


    return (
        <div style={{ maxWidth: 1400, margin: 'auto' }}>


            <Row gutter={32}>


                {/* LEFT: FORM SECTION */}
                <Col xs={24} md={16}>

                    <Steps current={current} style={{ marginBottom: 40 }}>
                        <Step title="Shipping" />
                        <Step title="Payment" />
                        <Step title="Review" />
                    </Steps>
                    {current === 0 && (
                        <>
                            <Title level={4} >Shipping</Title>
                            <Form layout="vertical">
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="First Name" name="firstName">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Last Name" name="lastName">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item label="Phone Number" name="phone">
                                    <Input />
                                </Form.Item>

                                <Form.Item label="Address" name="address">
                                    <Input />
                                </Form.Item>

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="City" name="city">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Zip Code" name="zip">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Button type="primary" onClick={next} block style={{marginBottom:"20px"}}>
                                    Continue to Payment
                                </Button>
                            </Form>
                        </>
                    )}

                    {current === 1 && (
                        <>
                            <Title level={4}>Payment</Title>
                            <Form layout="vertical">
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="VAT Number" name="vat">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="PO Number" name="po">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item label="Cardholder Name" name="cardholder">
                                    <Input />
                                </Form.Item>

                                <Form.Item label="Card Number" name="cardNumber">
                                    <Input />
                                </Form.Item>

                                <Text type="secondary">
                                    Credit card payment may take up to 24h to proceed
                                </Text>

                                <Divider />

                                <Checkbox>Save my payment details for future purchases</Checkbox>
                                <br />
                                <Checkbox checked>
                                    Enable recurring payment <Text type="success">(Highly recommended)</Text>
                                </Checkbox>

                                <Divider />

                                <Title level={5}>Never run out of balance</Title>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="When balance is below" name="balanceBelow">
                                            <Input placeholder="e.g. $10" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Automatically recharge" name="autoRecharge">
                                            <Input placeholder="e.g. $25" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row justify="space-between" gutter={16} style={{marginBottom:"20px"}}>
                                    <Col>
                                        <Button onClick={prev}>Return to Shipping</Button>
                                    </Col>
                                    <Col>
                                        <Button type="primary" onClick={next}>
                                            Review Order
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </>
                    )}

                    {current === 2 && (
                        <>
                            <Title level={4}>Review</Title>
                            <Text>Review all details you've provided before completing the order.</Text>
                            <Divider />

                            {/* Example summary placeholders */}
                            <Text strong>Shipping Info:</Text>
                            <p>John Doe, +91 1234567890, 123 Main St, Mumbai, 400001</p>

                            <Text strong>Payment Info:</Text>
                            <p>Cardholder: John Doe, Ending in 1234, Auto-recharge: On</p>

                            <Divider />

                            <Row justify="space-between" style={{marginBottom:"20px"}}>
                                <Col>
                                    <Button onClick={prev}>Back to Payment</Button>
                                </Col>
                                <Col>
                                    <Button type="primary" onClick={handleFinish}>
                                        Confirm and Checkout
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    )}
                </Col>

                {/* RIGHT: ORDER SUMMARY */}
                <Col xs={24} md={8} style={{backgroundColor:"#f6fff2",padding:20,borderRadius:20}}>
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


                </Col>
            </Row>
        </div>
    );
};

export default Payment;
