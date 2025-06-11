

import React from 'react';
import { Form, Input } from 'antd';

const DEFAULT_STYLE = {
  padding: '8px 12px'
  // width: '100%',  
};

const InputField = ({ fields = [] }) => {
  return (
    <>
      {fields.map(({ name, label, type, rules, style = {}, ...rest }) => {
        const combinedStyle = { ...DEFAULT_STYLE, ...style };

        return (
          <Form.Item
            key={name}
            name={name}
            label={label}
            rules={rules || [{ required: true, message: `${label} is required` }]}
            
          >
            {type === 'password' ? (
              <Input.Password {...rest} style={combinedStyle} />
            ) : (
              <Input {...rest} style={combinedStyle} />
            )}
          </Form.Item>
        );
      })}
    </>
  );
};

export default InputField;
