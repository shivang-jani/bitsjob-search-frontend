import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface User {
  bitsId?: string;
  name: string;
  email: string;
  isAuthenticated: boolean;
  token?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check cookies first, then localStorage as fallback
    const cookieUser = Cookies.get('user');
    const storedUser = localStorage.getItem('user');
    
    if (cookieUser) {
      setUser(JSON.parse(cookieUser));
    } else if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      // Also set the cookie for future sessions
      Cookies.set('user', JSON.stringify(parsedUser), { expires: 7 }); // 7 days
    }
    
    setLoading(false);
  }, []);

  const logout = () => {
    Cookies.remove('user');
    localStorage.removeItem('user');
    setUser(null);
  };

  return {
    user,
    loading,
    logout,
    isAuthenticated: !!user?.isAuthenticated,
  };
};
