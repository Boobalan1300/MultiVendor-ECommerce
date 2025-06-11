import React from 'react';
import { Layout, Row, Col, Typography, Input, Button, Space } from 'antd';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const FooterComponent = () => {
  return (
    <Footer style={{ backgroundColor: '#222', color: '#fff', padding: '40px 50px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <Row gutter={[32, 32]}>
          {/* About Us */}
          <Col xs={24} sm={12} md={8}>
            <Title level={4} style={{ color: '#fff' }}>About Us</Title>
            <Text style={{ color: '#bbb'}}>
              We are committed to providing the best products and excellent customer service. 
              Our mission is to bring quality and value to every customer.
            </Text>
            <div style={{ marginTop: 20 }}>
              <Space size="middle">
                <FacebookOutlined style={{ color: '#fff', fontSize: 24, cursor: 'pointer' }} />
                <TwitterOutlined style={{ color: '#fff', fontSize: 24, cursor: 'pointer' }} />
                <InstagramOutlined style={{ color: '#fff', fontSize: 24, cursor: 'pointer' }} />
                <LinkedinOutlined style={{ color: '#fff', fontSize: 24, cursor: 'pointer' }} />
                <YoutubeOutlined style={{ color: '#fff', fontSize: 24, cursor: 'pointer' }} />
              </Space>
            </div>
          </Col>

          {/* Customer Service */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: '#fff' }}>Customer Service</Title>
            <div>
              <Link href="/help" style={{ display: 'block', color: '#bbb', marginBottom: 8 }}>
                Help Center
              </Link>
              <Link href="/returns" style={{ display: 'block', color: '#bbb', marginBottom: 8 }}>
                Returns
              </Link>
              <Link href="/shipping" style={{ display: 'block', color: '#bbb', marginBottom: 8 }}>
                Shipping Info
              </Link>
              <Link href="/track-order" style={{ display: 'block', color: '#bbb' }}>
                Track Order
              </Link>
            </div>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: '#fff' }}>Quick Links</Title>
            <div>
              <Link href="/about" style={{ display: 'block', color: '#bbb', marginBottom: 8 }}>
                About Us
              </Link>
              <Link href="/contact" style={{ display: 'block', color: '#bbb', marginBottom: 8 }}>
                Contact Us
              </Link>
              <Link href="/privacy" style={{ display: 'block', color: '#bbb', marginBottom: 8 }}>
                Privacy Policy
              </Link>
              <Link href="/terms" style={{ display: 'block', color: '#bbb' }}>
                Terms of Service
              </Link>
            </div>
          </Col>

          {/* Newsletter Signup */}
          <Col xs={24} sm={12} md={4}>
            <Title level={4} style={{ color: '#fff' }}>Newsletter</Title>
            <Text style={{ color: '#bbb' }}>Subscribe to our newsletter to get the latest updates.</Text>
            <Input.Group compact style={{ marginTop: 12 }}>
              <Input
                style={{ width: '60%' }}
                placeholder="Your email address"
                aria-label="Email address for newsletter"
              />
              <Button type="primary" style={{ width: '40%' }}>
                Subscribe
              </Button>
            </Input.Group>
          </Col>
        </Row>

        <Row justify="center" style={{ marginTop: 40 }}>
          <Text style={{ color: '#777' }}>
            © {new Date().getFullYear()} Your Ecommerce Site. All rights reserved.
          </Text>
        </Row>
      </div>
    </Footer>
  );
};

export default FooterComponent;
