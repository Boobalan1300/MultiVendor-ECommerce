
import React from 'react';
import { Button as AntdButton} from 'antd';

const Button = ({
  children,
  type = 'primary',
  htmlType = 'submit',
  block = true,
  style = {},
  loading = false,
  ...rest
}) => {
  return (
    <AntdButton
      type={type}
      htmlType={htmlType}
      block={block}
      style={style}
      loading={loading}
      {...rest}
    >
      {children}
    </AntdButton>
  );
};

export default Button;
