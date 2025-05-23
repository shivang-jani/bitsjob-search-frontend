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
    
    // Debug: Log what we're finding in storage
    console.log('Cookie user data:', cookieUser);
    console.log('LocalStorage user data:', storedUser);
    
    if (cookieUser) {
      const parsedCookieUser = JSON.parse(cookieUser);
      console.log('Using user data from cookie with token:', parsedCookieUser.token);
      setUser(parsedCookieUser);
    } else if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log('Using user data from localStorage with token:', parsedUser.token);
      setUser(parsedUser);
      // Also set the cookie for future sessions
      Cookies.set('user', JSON.stringify(parsedUser), { expires: 7 }); // 7 days
    } else {
      console.log('No user data found in cookies or localStorage');
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
