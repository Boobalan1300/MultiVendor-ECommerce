


// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../Context/AuthContext';
// import Home from '../Screens/Home/User/Home';
// import Login from '../Screens/Auth/Login';

// export const PrivateRoute = ({ allowedRoles }) => {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!allowedRoles.includes(user.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// };


// export const AuthRedirectRoute = ({ children }) => {
//   const { user } = useAuth();

//   if (user) {
//     switch (user.role) {
//       case 'admin':
//         return <Navigate to="/admin-dashboard" replace />;
//       case 'vendor':
//         return <Navigate to="/vendor-dashboard" replace />;
//       default:
//         return <Navigate to="/" replace />;
//     }
//   }

//   return children;
// };


// export const RootRedirect = () => {
//   const { user } = useAuth();

//   if (user) {
//     switch (user.role) {
//       case 'admin':
//         return <Navigate to="/admin-dashboard" replace />;
//       case 'vendor':
//         return <Navigate to="/vendor-dashboard" replace />;
//       case 'customer':
//       default:
//         return <Home />;
//     }
//   }

//   return <Home />;
// };










import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Home from '../Screens/Home/User/Home';
import Login from '../Screens/Auth/Login';
import { useSelector } from 'react-redux';


export const PrivateRoute = ({ allowedRoles }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};


export const AuthRedirectRoute = ({ children }) => {
 const user = useSelector((state) => state.auth.user);

  if (user) {
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin-dashboard" replace />;
      case 'vendor':
        return <Navigate to="/vendor-dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};


export const RootRedirect = () => {
  const user = useSelector((state) => state.auth.user);

  if (user) {
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin-dashboard" replace />;
      case 'vendor':
        return <Navigate to="/vendor-dashboard" replace />;
      case 'customer':
      default:
        return <Home />;
    }
  }

  return <Home />;
};
