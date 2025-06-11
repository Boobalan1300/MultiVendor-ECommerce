import React from 'react';
import { Col, Row } from 'antd';
import VerticalCard from '../../../Components/VerticalCard';
import { products } from '../../../Utils/TopCategories';


const Products = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 16 }}>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={12} md={8} lg={4}>
            <VerticalCard
              product={product}
              fontSize="text-xl"
              imageHeight={180}
              showDetails={false}
              showExtras={true}
              showActionIcons={true}
              bordered
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Products;
