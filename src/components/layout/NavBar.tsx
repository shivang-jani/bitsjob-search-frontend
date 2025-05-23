import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 dark:bg-gray-800 dark:border-b dark:border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/BITS_Pilani-Logo.svg.png" 
            alt="BITS Pilani Logo" 
            className="h-10 w-auto"
          />
          <h1 className="text-2xl font-bold text-bits-darkBlue dark:text-white">BITS Job Portal</h1>
        </Link>
        
        <div>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 dark:text-gray-300">Welcome, {user?.name || user?.bitsId}</span>
              <Button 
                variant="outline"
                className="border-bits-red text-bits-red hover:bg-bits-red hover:text-white"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Link to="/">
                <Button variant="link" className="text-bits-blue hover:text-bits-red mr-4">
                  Login
                </Button>
              </Link>
              <Link to="/">
                <Button 
                  variant="outline" 
                  className="border-bits-blue text-bits-blue hover:bg-bits-blue hover:text-white"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
