import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authenticateUser from '../middleware/authenticateUser';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../middleware/AuthContext';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const result = await authenticateUser();
      setIsAuthenticated(result);
      if (!result) {
        toast.error('Session expired. Please log in again.');
        navigate('/', { state: { from: location.pathname }, replace: true });
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [location.pathname, navigate, setIsAuthenticated]);

  if (isLoading) {
    return null; // Or any loading spinner
  }

  return isAuthenticated ? children : null;
};

export default PrivateRoute;
