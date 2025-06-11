import React from 'react';
import { Card } from 'antd';

const BlogCard = ({
  children,
  title = 'Blog Title',
  author = 'Admin',
  timeAgo = '23 hr ago',
  content = 'This is a sample blog content. It can be a short summary or excerpt from the full blog post.',
  image,
  bordered = true,
  imageHeight = 140,
}) => {
  return (
    <Card
      bordered={bordered}
      bodyStyle={{ padding: 16, textAlign: 'center', position: 'relative' }}
      style={{ cursor: 'default' }}
    >
      {image && (
        <div
          style={{
            overflow: 'hidden',
            height: imageHeight,
            borderRadius: 4,
            marginBottom: 12,
          }}
        >
          <img
            src={image}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }}
          />
        </div>
      )}

      <div style={{ marginBottom: 8, color: '#999', fontSize: 12 }}>
        Added by {author} -- {timeAgo}
      </div>

      <h3 style={{ marginBottom: 12, fontWeight: 600 }}>{title}</h3>

      {children ? (
        <div>{children}</div>
      ) : (
        <p style={{ marginBottom: 0, fontSize: 14, color: '#555' }}>{content}</p>
      )}
    </Card>
  );
};

export default BlogCard;
