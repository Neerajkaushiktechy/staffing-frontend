import React from 'react';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/routes';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import 'flowbite';
import { BrowserRouter, useLocation } from 'react-router';
import { useAuth } from './middleware/AuthContext';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

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
