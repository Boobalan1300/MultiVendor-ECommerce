
import React from 'react';
import { Card, Rate, Row, Col } from 'antd';
import Button from './Button';
import { HeartOutlined } from '@ant-design/icons';

const HorizontalCard = ({
    product,
    showDetails = true,
    imageHeight = 220,
    bordered = true,
    fontSize = 'text-md',   
    fontWeight = 'font-medium' // ✅ Default font weight
}) => {
    return (
        <Card bordered={bordered} bodyStyle={{ padding: 7 }}>
            <Row gutter={[16, 0]} align="middle">
                {/* Image Section */}
                <Col span={10}>
                    <div style={{ width: '100%', height: imageHeight, overflow: 'hidden' }}>
                        <img
                            src={product.image}
                            alt={product.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: 4,
                            }}
                        />
                    </div>
                </Col>

                {/* Content Section */}
                <Col span={14}>
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <h3 className={`mb-2 ${fontSize} ${fontWeight}`}>
                                {product.title}
                            </h3>

                            <div className="text-sm mb-2" style={{ color: '#999' }}>
                                <Rate
                                    disabled
                                    defaultValue={product.rating}
                                    style={{
                                         fontSize: 8,
                                        color: '#faad14',
                                    }}
                                />
                                <div style={{ marginLeft: 6 }}>(1 review)</div>
                            </div>

                            <div className={`mb-2 ${fontSize} font-bold`} style={{ color: 'black' }}>
                                Rs.{product.price}
                            </div>

                            {showDetails && (
                                <div className="text-sm mb-3" style={{ color: '#777' }}>
                                    <p style={{ margin: 0, whiteSpace: 'pre-line' }}>
                                        Lorem ipsum dolor sit amet,
                                        consectetur adipiscing elit,
                                        sed do eiusmod tempor.
                                    </p>
                                </div>
                            )}
                        </div>

                        {showDetails && (
                            <div style={{ display: 'flex', gap: 8 }}>
                                <Button type="primary" style={{ flex: 1 }}>
                                    Add to Cart
                                </Button>
                                <Button type="default" icon={<HeartOutlined />} />
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default HorizontalCard;






