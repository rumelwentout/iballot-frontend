import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = () => {
      const tokenRegex = /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/;
      const tokenMatch = document.cookie.match(tokenRegex);
      const token = tokenMatch ? tokenMatch[1] : null;
      setIsLoggedIn(token && token.trim() !== '');
    };

    checkLoggedIn();

    return () => {};
  }, []);
  const logout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsLoggedIn(false);
    toast.success("You've been logged out successfully!");
    navigate('/auth/login');
  };
  return { isLoggedIn, logout };
};
