


import React from 'react';
import Title from '../../../Components/Title';
import HorizontalCard from '../../../Components/HorizontalCard';
import { Col, Row, List } from 'antd';
import { hotproducts, moreProducts } from '../../../Utils/HotDeals';
import { categories, products } from '../../../Utils/TopCategories';
import VerticalCard from '../../../Components/VerticalCard';
import BlogCard from '../../../Components/BlogCard';
import { blogPosts } from '../../../Utils/blog';
import InfoCard from '../../../Components/InfoCard';
import { img } from '../../../Utils/images';

const Home = () => {


  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
      <Title>Deals Hot Of The Day</Title>

      <Row gutter={[16, 16]} style={{ padding: '16px 0px' }}>
        {hotproducts.map((product) => (
          <Col xs={24} md={12} key={product.id}>
            <HorizontalCard
              product={product}
              showDetails={true}
              imageHeight={220}
              fontSize="text-xl"
              fontWeight="font-semibold"
            />

          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ padding: "50px" }}>
        {moreProducts.map((product) => (
          <Col xs={24} sm={12} md={12} lg={6} key={product.id}>
            <HorizontalCard
              product={product}
              showDetails={false}
              imageHeight={120}
              bordered={false}
              fontSize="text-xl"
            />
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 24]}>


        <Col xs={24} sm={24} md={12} lg={8}>
          <InfoCard
            image={img.trend4}
            justify="end"
            textAlign="right"
            content={<h3 style={{ color: 'white' }}>Join Our Startup Community →</h3>}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={8}>
          <InfoCard
            image={img.trend5}
            justify="center"
            textAlign="center"
            content={<h2>Empower Your Ideas with Tech</h2>}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={8}>
          <InfoCard
            image={img.trend3}
            justify="start"
            textAlign="left"
            content={
              <p style={{ color: '#fff', fontWeight: 500 }}>
                Collaboration is the key to success.
              </p>
            }
          />
        </Col>
      </Row>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
        <Title>Top Categories & Products</Title>

        <Row gutter={24}>

          <Col xs={24} sm={8} md={6} lg={5}>
            <List
              size="small"
              header={<div style={{ fontWeight: 'bold', fontSize: 18 }}>Categories</div>}
              bordered
              dataSource={categories}
              renderItem={(item) => (
                <List.Item style={{ cursor: 'pointer', padding: '8px 16px' }}>
                  {item}
                </List.Item>
              )}
            />
          </Col>


          <Col xs={24} sm={16} md={18} lg={19}>
            <Row gutter={[16, 16]}>
              {products.map((product) => (
                <Col key={product.id} xs={12} sm={12} md={8} lg={6}>
                  <VerticalCard
                    product={product}
                    fontSize="text-xl"

                    imageHeight={180}
                    showDetails={false}
                    showExtras={false}
                    showActionIcons={true} // show heart , button
                    bordered
                  />
                </Col>
              ))}
            </Row>
          </Col>

        </Row>
      </div>

      <Row gutter={[16, 24]}>


        <Col xs={24} sm={24} md={12} lg={12}>
          <InfoCard
            image={img.trend4}
            justify="end"
            textAlign="right"
            content={<h3 style={{ color: 'white' }}>Join Our Startup Community →</h3>}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <InfoCard
            image={img.trend5}
            justify="center"
            textAlign="center"
            content={<h2>Empower Your Ideas with Tech</h2>}
          />
        </Col>

      </Row>



      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <Title>Latest Blog Posts</Title>
        <p style={{ fontSize: '16px', color: '#666', marginTop: '8px' }}>
          Stay updated with our latest news and articles
        </p>

        <Row gutter={[16, 24]}>
          {blogPosts.map(({ id, ...post }) => (
            <Col key={id} xs={24} sm={12} lg={8} xl={6}>
              <BlogCard {...post} />
            </Col>
          ))}
        </Row>


      </div>




      <Row gutter={[16, 24]}>


        <Col xs={24}>
          <InfoCard
            image={img.trend5}
            justify="center"
            textAlign="center"
            content={<h2>Empower Your Ideas with Tech</h2>}
          />
        </Col>

      </Row>


    </div>


  );
};

export default Home;
