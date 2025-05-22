import { useState, useEffect } from 'react';

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
    // Check localStorage for user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const logout = () => {
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
