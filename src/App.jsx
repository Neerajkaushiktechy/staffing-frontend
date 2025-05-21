import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/routes';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import 'flowbite';
import { BrowserRouter, useLocation } from 'react-router';
import { checkAuthentication } from './services/chech_authentication';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  // Function to update authentication state
  const updateAuthentication = async () => {
    const authStatus = await checkAuthentication();
    setIsAuthenticated(authStatus);
  };

  useEffect(() => {
    // Check authentication on component mount
    updateAuthentication();

    // Listen for changes in localStorage (e.g., login/logout)
    const handleStorageChange = () => {
      updateAuthentication();
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Check authentication whenever the route changes
    updateAuthentication();
  }, [location]);

  return (
    <>
      {isAuthenticated && (
        <>
          <Sidebar />
          <Navbar />
        </>
      )}
      <div className={`${isAuthenticated ? 'ml-64 pt-16' : ''} ${isLoginPage ? 'h-screen' : 'min-h-screen'}`}>
        <AppRoutes />
      </div>
      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
