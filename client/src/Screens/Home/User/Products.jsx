import React, { useEffect, useState } from 'react';
import { Col, Row, Spin, Alert } from 'antd';
import VerticalCard from '../../../Components/VerticalCard';
import { products as defaultProducts } from '../../../Utils/TopCategories';

const Products = () => {
  const [products, setProducts] = useState(defaultProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();

        const approvedProducts = data.filter((product) => product.approved);

        // Optional: Prevent duplicates based on product ID
        const existingIds = new Set(defaultProducts.map(p => p.id));
        const newProducts = approvedProducts.filter(p => !existingIds.has(p.id));

        // Merge default and new products
        setProducts([...defaultProducts, ...newProducts]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 16 }}>
      {loading && <Spin size="large" style={{ display: 'block', margin: '30px auto' }} />}
      {error && <Alert message="Error" description={error} type="error" showIcon />}
      
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
