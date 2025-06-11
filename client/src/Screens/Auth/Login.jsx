


// import React from 'react';
// import { Form, Typography, message, Card, Row, Col } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../Context/AuthContext';
// import InputField from '../../Components/InputField';
// import Button from '../../Components/Button';

// const { Title, Text } = Typography;

// const Login = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async (values) => {
//     const user = await login(values.email, values.password);

//     if (user) {
//       message.success('Login successful');

//       switch (user.role) {
//         case 'admin':
//           navigate('/admin-dashboard');
//           break;
//         case 'vendor':
//           navigate('/vendor-dashboard');
//           break;
//         case 'customer':
//           navigate('/');
//           break;
//         default:
//           navigate('/login');
//       }
//     } else {
//       message.error('Invalid credentials');
//     }
//   };

//   const loginFields = [
//     {
//       name: 'email',
//       label: 'Email',
//       type: 'text',
//       placeholder: 'Enter your email',
//     },
//     {
//       name: 'password',
//       label: 'Password',
//       type: 'password',
//       placeholder: 'Enter your password',
//     },
//   ];

//   return (
//     <Row justify="center" align="middle" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
//       <Col xs={22} sm={16} md={12} lg={8}>
//         <Card
//           style={{
//             borderRadius: 12,
//             boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//             padding: 24,
//             background: '#fff',
//           }}
//         >
//           <div style={{ textAlign: 'center', marginBottom: 32 }}>
//             <Title level={2}>Welcome Back</Title>
//             <Text type="secondary">Please log in to continue</Text>
//           </div>

//           <Form layout="vertical" onFinish={handleLogin}>
//             <InputField fields={loginFields} />

//             <Form.Item style={{ marginTop: 16 }}>
//               <Button type="primary" block>
//                 Login
//               </Button>
//             </Form.Item>

//             <div style={{ textAlign: 'center', marginTop: 8 }}>
//               <Text type="secondary">
//                 Forgot your password? <a href="/reset-password">Reset</a>
//               </Text>
//               <br />
//               <Text type="secondary">
//                 Don’t have an account? <a href="/register">Register now</a>
//               </Text>
//             </div>
//           </Form>
//         </Card>
//       </Col>
//     </Row>
//   );
// };

// export default Login;









import React from 'react';
import { Form, message, Card, Row, Col, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Redux/Reducer/authUser';
import InputField from '../../Components/InputField';
import Button from '../../Components/Button';

const { Title, Text } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((state) => state.auth);

  const handleLogin = async (values) => {
    const resultAction = await dispatch(loginUser(values));
    if (loginUser.fulfilled.match(resultAction)) {
      message.success('Login successful');

      const role = resultAction.payload.role;
      switch (role) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'vendor':
          navigate('/vendor-dashboard');
          break;
        default:
          navigate('/');
      }
    } else {
      message.error(resultAction.payload || 'Invalid credentials');
    }
  };

  const loginFields = [
    { name: 'email', label: 'Email', type: 'text', placeholder: 'Enter your email' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password' },
  ];

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Col xs={22} sm={16} md={12} lg={8}>
        <Card
          style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', padding: 24, background: '#fff' }}
        >
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Title level={2}>Welcome Back</Title>
            <Text type="secondary">Please log in to continue</Text>
          </div>

          <Form layout="vertical" onFinish={handleLogin}>
            <InputField fields={loginFields} />

            <Form.Item style={{ marginTop: 16 }}>
              <Button type="primary" block>
                Login
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <Text type="secondary">
                Forgot your password? <a href="/reset-password">Reset</a>
              </Text>
              <br />
              <Text type="secondary">
                Don’t have an account? <a href="/register">Register now</a>
              </Text>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
