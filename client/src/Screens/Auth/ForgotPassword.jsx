import { Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = async ({ email }) => {
    try {
      const res = await fetch(`http://localhost:5000/users?email=${email}`);
      const data = await res.json();

      if (data.length > 0) {
        localStorage.setItem('resetUser', JSON.stringify(data[0]));
        message.success('Email found. Proceed to reset password.');
        navigate('/reset-password');
      } else {
        message.error('Email not found');
      }
    } catch (error) {
      message.error('Something went wrong');
    }
  };

  return (
    <Form onFinish={handleSubmit} style={{ maxWidth: 400, margin: 'auto', marginTop: 50 }}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please enter your email' }]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>
      <Form.Item>
         <Button>Login</Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPassword;
