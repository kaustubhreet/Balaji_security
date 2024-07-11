import React, { createContext, useState, useContext, useEffect } from 'react';


export const AuthContext = createContext(null);

// Create a custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to manage authentication state
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialize authentication state
  const [account, setAccount] = useState(null); // Initialize user account state
  const [adrole, setAdrole] = useState("user");
  const [dpPhoto,setDpPhoto]=useState("/images/dpimage.jpeg");
   
  useEffect(() => {
    // Check if there's an authentication token in session storage
    const token = sessionStorage.getItem('token');
    const role=localStorage.getItem('role');

    if (token) {
      setIsAuthenticated(true);
      
  }
    if(role==="admin"){
      setAdrole("admin");
    }

  }, []);




  const login = (token, userAccount) => {
    // Save token to session storage
    sessionStorage.setItem('token', token);
    setIsAuthenticated(true);
    setAccount(userAccount);
  };

  const logout = () => {
    // Remove token from session storage
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
    setAccount(null);
    // Clear session storage or perform any other cleanup tasks
    sessionStorage.removeItem('expirationTime');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, account, logout, setIsAuthenticated,adrole,setAdrole,dpPhoto,setDpPhoto}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;