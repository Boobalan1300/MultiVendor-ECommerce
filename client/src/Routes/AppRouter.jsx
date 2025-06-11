



// import { createHashRouter, RouterProvider } from 'react-router-dom';
// import Home from '../Screens/User/Home';
// import Login from '../Screens/Auth/Login';
// import MainLayout from '../Layout/MainLayout';


// import { PrivateRoute, RootRedirect, AuthRedirectRoute } from './PrivateRouter';


// // Admin Screens
// import AdminDashboardLayout from '../Screens/Admin/AdminDashboardLayout';
// import AdminDashboard from '../Screens/Admin/AdminDashboard';
// import UserManagement from '../Screens/Admin/UserManagement';
// import VendorManagement from '../Screens/Admin/VendorManagement';
// import AddUser from '../Screens/Admin/AddUser';
// import UserList from '../Screens/Admin/UserList';
// import VendorList from '../Screens/Admin/VendorList';
// import Requests from '../Screens/Admin/Requests';

// // Vendor Screens
// import VendorDashboardLayout from '../Screens/Vendor/VendorDasboardLayout';
// import VendorDashboard from '../Screens/Vendor/VendorDashboard';
// import MyProducts from '../Screens/Vendor/MyProducts';
// import AddProducts from '../Screens/Vendor/AddProducts';
// import OrderRequests from '../Screens/Vendor/OrderRequests';

// // Public Auth Screens
// import ForgotPassword from '../Screens/Auth/ForgotPassword';
// import ResetPassword from '../Screens/Auth/ResetPassword';
// import Products from '../Screens/User/Products';
// import Cart from '../Screens/User/Cart';
// import Payment from '../Screens/User/Payment';
// import Orders from '../Screens/User/Orders';
// import ApprovedProducts from '../Screens/Admin/ApprovedProducts';









// const router = createHashRouter([
//   {
//     path: '/',
//     element: <MainLayout />,
//     children: [
//       //  Public routes
//       { path: '', element:  <RootRedirect /> },
//       { path: 'login', element: <AuthRedirectRoute> <Login /></AuthRedirectRoute>  },
//       { path: 'forgot-password', element: <ForgotPassword /> },
//       { path: 'reset-password', element: <ResetPassword /> },

//       { path: 'products', element: <Products/> },
//       { path: 'cart', element: <Cart/> },
//       { path: 'payment', element: <Payment/> },
//       { path: 'orders', element: <Orders/> },

//       // Admin protected routes
//       {
//         element: <PrivateRoute allowedRoles={['admin']} />,
//         children: [
//           {
//             path: 'admin-dashboard',
//             element: <AdminDashboardLayout />,
//             children: [
//               { path: '', element: <AdminDashboard /> },
//               { path: 'requests', element: <Requests/> },
//               { path: 'add-user', element: <AddUser /> },
//               { path: 'user-list', element: <UserList /> },
//               { path: 'vendor-list', element: <VendorList /> },
//               { path: 'approved-products', element: <ApprovedProducts /> },
              
//             ],
//           },
//         ],
//       },


//       // Vendor protected routes
//       {
//         element: <PrivateRoute allowedRoles={['vendor']} />,
//         children: [
//           {
//             path: 'vendor-dashboard',
//             element: <VendorDashboardLayout />,
//             children: [
//               { path: '', element: <VendorDashboard/> },
//               { path: 'my-products', element: <MyProducts /> },
//               { path: 'add-product', element: <AddProducts /> },
//               { path: 'order-requests', element: <OrderRequests /> },
//             ],
//           },
//         ],
//       },
//       // catch unmatched nested paths
//       {
//         path: '*',
//         element: <h1 style={{ textAlign: 'center', marginTop: '20%' }}>404 - Page Not Found</h1>,
//       },
//     ],
//   },


//   {
//     path: '*',
//     element: <h1 style={{ textAlign: 'center', marginTop: '20%' }}>404 - Page Not Found</h1>,
//   },
// ]);

// const AppRouter = () => <RouterProvider router={router} />;
// export default AppRouter;










import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from '../Screens/Home/User/Home';
import Login from '../Screens/Auth/Login';
import MainLayout from '../Layout/MainLayout';


import { PrivateRoute, RootRedirect, AuthRedirectRoute } from './PrivateRouter';


// Admin Screens
import AdminDashboard from '../Screens/Home/Admin/AdminDashboard';
import AddUser from '../Screens/Home/Admin/AddUser';
import UserList from '../Screens/Home/Admin/UserList';
import VendorList from '../Screens/Home/Admin/VendorList';
import Requests from '../Screens/Home/Admin/Requests';

// Vendor Screens
import VendorDashboard from '../Screens/Home/Vendor/VendorDashboard';
import MyProducts from '../Screens/Home/Vendor/MyProducts';
import AddProducts from '../Screens/Home/Vendor/AddProducts';
import OrderRequests from '../Screens/Home/Vendor/OrderRequests';

// Public Auth Screens
import ForgotPassword from '../Screens/Auth/ForgotPassword';
import ResetPassword from '../Screens/Auth/ResetPassword';
import Products from '../Screens/Home/User/Products';
import Cart from '../Screens/Home/User/Cart';
import Payment from '../Screens/Home/User/Payment';
import Orders from '../Screens/Home/User/Orders';
import ApprovedProducts from '../Screens/Home/Admin/ApprovedProducts';




const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      //  Public routes
      { path: '', element:  <RootRedirect /> },
      { path: 'login', element: <AuthRedirectRoute> <Login /></AuthRedirectRoute>  },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password', element: <ResetPassword /> },

      { path: 'products', element: <Products/> },
      { path: 'cart', element: <Cart/> },
      { path: 'payment', element: <Payment/> },
      { path: 'orders', element: <Orders/> },

      // Admin protected routes
      {
  element: <PrivateRoute allowedRoles={['admin']} />,
  children: [
    { path: 'admin-dashboard', element: <AdminDashboard /> },
    { path: 'admin-dashboard/requests', element: <Requests /> },
    { path: 'admin-dashboard/add-user', element: <AddUser /> },
    { path: 'admin-dashboard/user-list', element: <UserList /> },
    { path: 'admin-dashboard/vendor-list', element: <VendorList /> },
    { path: 'admin-dashboard/approved-products', element: <ApprovedProducts /> },
  ],
},



      // Vendor protected routes
      {
  element: <PrivateRoute allowedRoles={['vendor']} />,
  children: [
    { path: 'vendor-dashboard', element: <VendorDashboard /> },
    { path: 'vendor-dashboard/my-products', element: <MyProducts /> },
    { path: 'vendor-dashboard/add-product', element: <AddProducts /> },
    { path: 'vendor-dashboard/order-requests', element: <OrderRequests /> },
  ],
},

      // catch unmatched nested paths
      {
        path: '*',
        element: <h1 style={{ textAlign: 'center', marginTop: '20%' }}>404 - Page Not Found</h1>,
      },
    ],
  },


  {
    path: '*',
    element: <h1 style={{ textAlign: 'center', marginTop: '20%' }}>404 - Page Not Found</h1>,
  },
]);

const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;
