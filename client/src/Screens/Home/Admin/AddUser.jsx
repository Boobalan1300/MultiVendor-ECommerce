
import React, { useState } from 'react';
import { Form, Row, Col, Upload, message as antMessage } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import InputField from '../../../Components/InputField';
import Button from '../../../Components/Button';

const AddUser = ({ onUserAdded, role }) => {
  const [form] = Form.useForm();
  const userType = role || 'vendor';  
  const [imageUrl, setImageUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const commonFields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter email',
      rules: [
        { required: true, message: 'Please enter email' },
        { type: 'email', message: 'Enter a valid email' },
      ],
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter password',
      rules: [{ required: true, message: 'Please enter password' }],
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
      placeholder: 'Enter phone number',
      rules: [
        { required: true, message: 'Please enter phone number' },
        { pattern: /^\d{10}$/, message: 'Enter a valid 10-digit number' },
      ],
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      placeholder: 'Enter address',
      rules: [{ required: true, message: 'Please enter address' }],
    },
  ];

  const customerFields = [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter full name',
      rules: [{ required: true, message: 'Please enter full name' }],
    },
    ...commonFields,
  ];

  const vendorFields = [
    {
      name: 'companyName',
      label: 'Company Name',
      type: 'text',
      placeholder: 'Enter company name',
      rules: [{ required: true, message: 'Please enter company name' }],
    },
    {
      name: 'contactPerson',
      label: 'Contact Person',
      type: 'text',
      placeholder: 'Enter contact person',
      rules: [{ required: true, message: 'Please enter contact person name' }],
    },
    ...commonFields,
  ];

  const fieldsToRender = userType === 'vendor' ? vendorFields : customerFields;

  const handleUploadChange = (info) => {
    const file = info.fileList[0]?.originFileObj;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageUrl(null);
    }
  };

  const onFinish = async () => {
    if (submitting) return;

    try {
      const values = await form.validateFields();
      setSubmitting(true);

      const { profileImage, ...rest } = values;

      const newId = Date.now().toString();

      const newUser = {
        id: newId,
        email: rest.email,
        password: rest.password,
        name: userType === 'customer' ? rest.fullName : rest.contactPerson,
        address: rest.address,
        phone: rest.phone,
        role: userType,
        blocked: false,
        profileImage: imageUrl,
      };

      if (userType === 'customer') {
        newUser.cart = [];
      }

      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) throw new Error('Failed to add user');

      antMessage.success('User added successfully!');
      form.resetFields();
      setImageUrl(null);

      if (onUserAdded) {
        onUserAdded(newUser);
      }
    } catch (error) {
      console.error('Error adding user:', error);
      antMessage.error('Failed to add user. Please check the form.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ maxWidth: 950, margin: 'auto', padding: '24px', background: '#fff', borderRadius: 8 }}
    >
      <Row gutter={16}>
        {fieldsToRender.map((field) => (
          <Col key={field.name} xs={24} sm={24} md={12} lg={12} xl={6}>
            <InputField fields={[{ ...field, validateTrigger: 'onSubmit' }]} />
          </Col>
        ))}
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="profileImage"
            label="Profile Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload
              name="image"
              listType="picture"
              beforeUpload={() => false}
              maxCount={1}
              onChange={handleUploadChange}
            >
              <Button htmlType="button" icon={<UploadOutlined />}>
                Upload Image
              </Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item style={{ marginTop: 24 }}>
        <Button htmlType="button" loading={submitting} onClick={onFinish}>
          Add User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddUser;
