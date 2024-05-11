import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenRegex = /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/;
    const tokenMatch = document.cookie.match(tokenRegex);
    const token = tokenMatch ? tokenMatch[1] : null;
    const checkLoggedIn = () => {
      setIsLoggedIn(token && token.trim() !== '');
    };

    checkLoggedIn();

    const getUserInfo = async () => {
      if (token && token.trim() !== '') {
        const userData = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/user/info`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setUserInfo({ ...userData?.data, token: token });
      }
    };

    getUserInfo();
  }, []);
  const logout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsLoggedIn(false);
    toast.success("You've been logged out successfully!");
    navigate('/auth/login');
  };
  return { isLoggedIn, logout, userInfo };
};
