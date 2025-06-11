


// import React, { useState } from 'react';
// import { Form, Input, Select, Row, Col, Upload, message as antMessage } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import Button from '../../../Components/Button';
// import { useAuth } from '../../../Context/AuthContext';


// const { TextArea } = Input;
// const { Option } = Select;

// const AddProduct = () => {
//   const { user } = useAuth();
//   const [form] = Form.useForm();
//   const [imageBase64, setImageBase64] = useState(null);
//   const [submitting, setSubmitting] = useState(false);

//   // Convert file to Base64 string
//   const getBase64 = (file) =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });

//   const handleUploadChange = async (info) => {
//     if (info.fileList.length > 0) {
//       const file = info.fileList[0].originFileObj;
//       try {
//         const base64 = await getBase64(file);
//         setImageBase64(base64);
//       } catch (error) {
//         antMessage.error('Failed to read image file');
//         setImageBase64(null);
//       }
//     } else {
//       setImageBase64(null);
//     }
//   };

//   const onFinish = async () => {
//     if (submitting) return;

//     try {
//       const values = form.getFieldsValue();

//       // Basic validation
//       if (!values.name || !values.category || !values.subcategory || !values.description || !values.price) {
//         antMessage.error('Please fill all required fields');
//         return;
//       }
//       if (!imageBase64) {
//         antMessage.error('Please upload a product image');
//         return;
//       }

//       setSubmitting(true);

//       // Fetch existing products to ensure unique ID
//       const res = await fetch('http://localhost:5000/products');
//       const products = await res.json();
//       const existingIds = new Set(products.map(p => p.id));

//       let newId;
//       do {
//         newId = Date.now().toString();
//       } while (existingIds.has(newId));

//       const newProduct = {
//         id: newId,
//         name: values.name,
//         category: values.category,
//         subcategory: values.subcategory,
//         description: values.description,
//         price: Number(values.price),
//         approved: false,
//        vendorId: user?.id ||'',
//         image: imageBase64,
//       };

//       const response = await fetch('http://localhost:5000/products', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newProduct),
//       });

//       if (!response.ok) throw new Error('Failed to add product');
//       antMessage.success('Product added successfully!');
//       form.resetFields();
//       setImageBase64(null);
//     } catch (error) {
//       console.error('Error adding product:', error);
//       antMessage.error('Failed to add product. Please check your input.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Form
//       form={form}
//       layout="vertical"
//       style={{ maxWidth: 600, margin: 'auto', padding: 24, background: '#fff', borderRadius: 8 }}
//     >
//       <Row gutter={16}>
//         <Col xs={24}>
//           <Form.Item
//             name="name"
//             label="Product Name"
//             rules={[{ required: true, message: 'Please enter product name' }]}
//           >
//             <Input placeholder="Enter product name" />
//           </Form.Item>
//         </Col>

//         <Col xs={24} sm={12}>
//           <Form.Item
//             name="category"
//             label="Category"
//             rules={[{ required: true, message: 'Please select category' }]}
//           >
//             <Select placeholder="Select category">
//               <Option value="electronics">Electronics</Option>
//               <Option value="fashion">Fashion</Option>
//               <Option value="home">Home</Option>
//               <Option value="books">Books</Option>
//               <Option value="other">Other</Option>
//             </Select>
//           </Form.Item>
//         </Col>

//         <Col xs={24} sm={12}>
//           <Form.Item
//             name="subcategory"
//             label="Subcategory"
//             rules={[{ required: true, message: 'Please enter subcategory' }]}
//           >
//             <Input placeholder="Enter subcategory" />
//           </Form.Item>
//         </Col>

//         <Col xs={24}>
//           <Form.Item
//             name="description"
//             label="Description"
//             rules={[{ required: true, message: 'Please enter description' }]}
//           >
//             <TextArea rows={4} placeholder="Describe the product" />
//           </Form.Item>
//         </Col>

//         <Col xs={24}>
//           <Form.Item
//             name="price"
//             label="Price (₹)"
//             rules={[{ required: true, message: 'Please enter price' }]}
//           >
//             <Input type="number" min={0} placeholder="Enter price" />
//           </Form.Item>
//         </Col>

//         <Col xs={24}>
//           <Form.Item
//             name="image"
//             label="Product Image"
//             valuePropName="fileList"
//             getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
//             rules={[{ required: true, message: 'Please upload an image' }]}
//           >
//             <Upload
//               name="image"
//               listType="picture"
//               beforeUpload={() => false}
//               maxCount={1}
//               onChange={handleUploadChange}
//             >
//               <Button htmlType="button" icon={<UploadOutlined />}>Upload Image</Button>
//             </Upload>
//           </Form.Item>
//         </Col>

//         <Col xs={24}>
//           <Button
//             type="primary"
//             htmlType="button"
//             loading={submitting}
//             onClick={onFinish}
//             style={{ width: '100%' }}
//           >
//             Add Product
//           </Button>
//         </Col>
//       </Row>
//     </Form>
//   );
// };

// export default AddProduct;




import React, { useState } from 'react';
import { Form, Input, Select, Row, Col, Upload, message as antMessage } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Button from '../../../Components/Button';
import { useSelector } from 'react-redux';


const { TextArea } = Input;
const { Option } = Select;

const AddProduct = () => {
 const user = useSelector((state) => state.auth.user);
  const [form] = Form.useForm();
  const [imageBase64, setImageBase64] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Convert file to Base64 string
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleUploadChange = async (info) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      try {
        const base64 = await getBase64(file);
        setImageBase64(base64);
      } catch (error) {
        antMessage.error('Failed to read image file');
        setImageBase64(null);
      }
    } else {
      setImageBase64(null);
    }
  };

  const onFinish = async () => {
    if (submitting) return;

    try {
      const values = form.getFieldsValue();

      // Basic validation
      if (!values.name || !values.category || !values.subcategory || !values.description || !values.price) {
        antMessage.error('Please fill all required fields');
        return;
      }
      if (!imageBase64) {
        antMessage.error('Please upload a product image');
        return;
      }

      setSubmitting(true);

      // Fetch existing products to ensure unique ID
      const res = await fetch('http://localhost:5000/products');
      const products = await res.json();
      const existingIds = new Set(products.map(p => p.id));

      let newId;
      do {
        newId = Date.now().toString();
      } while (existingIds.has(newId));

      const newProduct = {
        id: newId,
        name: values.name,
        category: values.category,
        subcategory: values.subcategory,
        description: values.description,
        price: Number(values.price),
        approved: false,
       vendorId: user?.id ||'',
        image: imageBase64,
      };

      const response = await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error('Failed to add product');
      antMessage.success('Product added successfully!');
      form.resetFields();
      setImageBase64(null);
    } catch (error) {
      console.error('Error adding product:', error);
      antMessage.error('Failed to add product. Please check your input.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ maxWidth: 600, margin: 'auto', padding: 24, background: '#fff', borderRadius: 8 }}
    >
      <Row gutter={16}>
        <Col xs={24}>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select category' }]}
          >
            <Select placeholder="Select category">
              <Option value="electronics">Electronics</Option>
              <Option value="fashion">Fashion</Option>
              <Option value="home">Home</Option>
              <Option value="books">Books</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            name="subcategory"
            label="Subcategory"
            rules={[{ required: true, message: 'Please enter subcategory' }]}
          >
            <Input placeholder="Enter subcategory" />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <TextArea rows={4} placeholder="Describe the product" />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item
            name="price"
            label="Price (₹)"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <Input type="number" min={0} placeholder="Enter price" />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item
            name="image"
            label="Product Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[{ required: true, message: 'Please upload an image' }]}
          >
            <Upload
              name="image"
              listType="picture"
              beforeUpload={() => false}
              maxCount={1}
              onChange={handleUploadChange}
            >
              <Button htmlType="button" icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Button
            type="primary"
            htmlType="button"
            loading={submitting}
            onClick={onFinish}
            style={{ width: '100%' }}
          >
            Add Product
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddProduct;
