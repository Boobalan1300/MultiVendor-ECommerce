import React from 'react';
import { Card, Rate } from 'antd';
import { HeartOutlined, ShoppingOutlined } from '@ant-design/icons';

const VerticalCard = ({
  product,
  imageHeight = 140,
  fontSize = 'text-md',
  fontWeight = 'font-medium',
  showExtras = true,
  showActionIcons = true,
  bordered = true,
}) => {
  return (
    <Card
      bordered={bordered}
      bodyStyle={{ padding: 8, position: 'relative' }}
    >
      <div
        style={{
          overflow: 'hidden',
          height: imageHeight,
          borderRadius: 4,
          marginBottom: 8,
        }}
      >
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

      <h3 className={` ${fontSize} ${fontWeight}`} style={{ marginBottom: 4 }}>
        {product.title}
      </h3>

      <div style={{ color: '#e91e63', fontWeight: 'bold', marginBottom: showExtras ? 4 : 0 }}>
        Rs.{product.price}
      </div>

      {showExtras && (
        <div style={{ color: '#999', marginBottom: 8 }}>
          <Rate
            disabled
            defaultValue={product.rating}
            style={{
              fontSize: 12,
              color: '#faad14',
              letterSpacing: '-1px',
            }}
          />
        </div>
      )}

      {showActionIcons && (
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            display: 'flex',
            gap: 6,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              // backgroundColor: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <HeartOutlined style={{ color: '#e91e63', fontSize: 14 }} />
          </div>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              backgroundColor: '#1DA57A',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <ShoppingOutlined style={{ color: '#ffffff', fontSize: 14 }} />
          </div>
        </div>
      )}
    </Card>
  );
};

export default VerticalCard;
