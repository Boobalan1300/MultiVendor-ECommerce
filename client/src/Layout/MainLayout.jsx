// import { Outlet } from 'react-router-dom';
// import { Layout } from 'antd';
// import { useAuth } from '../Context/AuthContext';
// import Navbar from './Navbar';
// import FooterComponent from './Footer';

// const { Content } = Layout;

// const MainLayout = () => {
//   const { user } = useAuth();

//   // Show Navbar if user role is 'guest' or 'customer'
//   const showNavbar = !user || user.role === '' || user.role === 'customer';

//   return (
//     <Layout>
//       {showNavbar && <Navbar />}

//       <Content style={{ backgroundColor: '#fff' }}>
//         <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
//           <Outlet />
//         </div>
//       </Content>

//       <FooterComponent/>
//     </Layout>
//   );
// };

// export default MainLayout;


import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import FooterComponent from './Footer';

const { Content } = Layout;

const MainLayout = () => {
  const user = useSelector((state) => state.auth.user);
  const role = user?.role || 'guest';

  const showSidebar = role === 'admin' || role === 'vendor';
  const showNavbar = role === 'customer' || role === 'guest';
  const showFooter = role === 'customer' || role === 'guest';

  return (
    <Layout>
      {showSidebar ? (
        <Sidebar />
      ) : (
        <>
          {showNavbar && <Navbar />}
          <Content style={{ backgroundColor: '#fff', padding: '24px 0' }}>
            <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 24px' }}>
              <Outlet />
            </div>
          </Content>
          {showFooter && <FooterComponent />}
        </>
      )}
    </Layout>
  );
};

export default MainLayout;
