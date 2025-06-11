// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

//   const login = async (email, password) => {
//     const res = await fetch(` https://multivendor-ecommerce-server-3.onrender.com/users?email=${email}&password=${password}`);
//     const data = await res.json();

//     if (data.length > 0) {
//       setUser(data[0]);
//       localStorage.setItem('user', JSON.stringify(data[0]));
//       return data[0];
//     }

//     return null;
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
