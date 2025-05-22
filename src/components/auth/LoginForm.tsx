import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useToast } from '../ui/use-toast';
import { LogInIcon } from 'lucide-react';
import Cookies from 'js-cookie';
import { buildApiUrl, API_CONFIG } from '../../config/api';
import { handleApiError } from '../../utils/errorHandler';

const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Debug: Log the API URL
    const apiUrl = buildApiUrl('/v1/login');
    console.log('Attempting to login at:', apiUrl);
    
    try {
      console.log('Sending login request with email:', formData.email);
      
      // Check if the server is reachable
      console.log('Checking if server is reachable at:', API_CONFIG.baseUrl);
      try {
        const serverCheckResponse = await fetch(`${API_CONFIG.baseUrl}/health`, { 
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          signal: AbortSignal.timeout(5000)
        });
        
        console.log('Server check response status:', serverCheckResponse.status);
        if (serverCheckResponse.ok) {
          console.log('Server is reachable');
        } else {
          console.log('Server returned an error status:', serverCheckResponse.status);
        }
      } catch (serverCheckError) {
        const errorResponse = await handleApiError(serverCheckError);
        console.log(`Server check failed: ${errorResponse.message}`);
        
        if (serverCheckError instanceof Error) {
          console.log('Error name:', serverCheckError.name);
          console.log('Error message:', serverCheckError.message);
        }
      }
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });
      
      console.log('Login response status:', response.status);
      
      if (!response.ok) {
        const errorResponse = await handleApiError(null, response);
        throw new Error(errorResponse.message);
      }
      
      const data = await response.json();
      
      // Store user info in localStorage and cookies
      const userData = { 
        email: formData.email,
        name: data.name || 'BITS User',
        isAuthenticated: true,
        token: data.token
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      Cookies.set('user', JSON.stringify(userData), { expires: 7 }); // 7 days
      
      toast({
        title: "Login successful",
        description: "Welcome back to BITS Job Portal!",
      });
      
      // Redirect to my-jobs page
      navigate('/my-listings');
    } catch (error) {
      const errorResponse = await handleApiError(error);
      console.log('Login error:', errorResponse);
      
      toast({
        title: "Login failed",
        description: errorResponse.message || "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-300">Email</Label>
        <div className="relative">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            required
            value={formData.email}
            onChange={handleChange}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-bits-blue"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-gray-300">Password</Label>
          <a href="#" className="text-sm text-bits-blue hover:text-bits-glow transition-colors">
            Forgot password?
          </a>
        </div>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-bits-blue"
          />
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-bits-blue hover:bg-bits-blue/80 text-white group relative overflow-hidden mt-4"
        disabled={isLoading}
      >
        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out bg-gradient-to-r from-bits-blue via-bits-darkBlue to-bits-blue bg-size-200 bg-pos-0 group-hover:bg-pos-100"></span>
        <span className="relative flex items-center justify-center">
          {isLoading ? "Logging in..." : (
            <>
              <LogInIcon className="mr-2 h-4 w-4" /> Login
            </>
          )}
        </span>
      </Button>
    </form>
  );
};

export default LoginForm;
