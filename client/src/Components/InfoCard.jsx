import React from 'react';
import { Card } from 'antd';

// /**
//  * Props:
//  * - image: string - image URL
//  * - content: ReactNode - content to overlay
//  * - justify: 'start' | 'center' | 'end' - flex position
//  * - textAlign: 'left' | 'center' | 'right'
//  * - height: number - height of image container
//  */
const InfoCard = ({
  image,
  content,
  justify = 'center',
  textAlign = 'center',
  height = 200,
  bordered = true,
}) => {
  return (
    <Card
      bordered={bordered}
      bodyStyle={{ padding: 0, position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'relative', height }}>
        {/* Background Image */}
        <img
          src={image}
          alt="Info"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Absolute Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent:
              justify === 'start'
                ? 'flex-start'
                : justify === 'end'
                ? 'flex-end'
                : 'center',
            alignItems: 'center',
            textAlign: textAlign,
            color: '#fff',
            background: 'rgba(0, 0, 0, 0.3)', // optional dark overlay
            padding: 16,
          }}
        >
          <div style={{ width: '100%' }}>{content}</div>
        </div>
      </div>
    </Card>
  );
};

export default InfoCard;
