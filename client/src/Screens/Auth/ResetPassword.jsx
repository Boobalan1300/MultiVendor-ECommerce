import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Get stored user data from localStorage
    const storedUser = localStorage.getItem('resetUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      message.error('No user found for password reset');
    }
  }, []);

  const onFinish = async (values) => {
    if (!user) {
      message.error('User data is missing');
      return;
    }

    try {
      setLoading(true);

      // 2. Update password using user ID
      const res = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: values.password })
      });

      if (res.ok) {
        message.success('Password updated successfully');
        localStorage.removeItem('resetUser'); // 3. Remove from localStorage
      } else {
        message.error('Failed to update password');
      }

    } catch (err) {
      console.error(err);
      message.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 400, margin: 'auto', marginTop: 100 }}
    >
      <h2>Reset Password</h2>
      <Form.Item
        name="password"
        label="New Password"
        rules={[{ required: true, message: 'Please input your new password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResetPassword;
