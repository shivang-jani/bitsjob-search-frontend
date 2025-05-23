import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useToast } from '../ui/use-toast';
import Cookies from 'js-cookie';
import { buildApiUrl, API_CONFIG } from '../../config/api';
import { handleApiError } from '../../utils/errorHandler';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    bitsId: '',
    email: '',
    password: '',
    confirmPassword: '',
    linkedInUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Debug: Log the API URL
    const apiUrl = buildApiUrl('/v1/signup');
    console.log('Attempting to call API at:', apiUrl);
    
    try {
      console.log('Sending signup request with data:', {
        ...formData,
        password: '[REDACTED]',
        confirmPassword: '[REDACTED]'
      });
      
      // Add a delay to make sure console logs are visible
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if the server is reachable - using a more reliable approach
      console.log('Checking if server is reachable at:', API_CONFIG.baseUrl);
      try {
        // Use a simple GET request instead of HEAD with no-cors
        const serverCheckResponse = await fetch(`${API_CONFIG.baseUrl}/health`, { 
          method: 'GET',
          // Don't use no-cors as it limits the response usability
          headers: {
            'Accept': 'application/json',
          },
          // Set a timeout to avoid hanging
          signal: AbortSignal.timeout(5000)
        });
        
        console.log('Server check response status:', serverCheckResponse.status);
        if (serverCheckResponse.ok) {
          console.log('Server is reachable');
        } else {
          console.log('Server returned an error status:', serverCheckResponse.status);
        }
      } catch (serverCheckError) {
        // Use our custom error handler instead of console.error
        const errorResponse = await handleApiError(serverCheckError);
        console.log(`Server check failed: ${errorResponse.message}`);
        
        // Log more details about the error for debugging
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
          fullName: formData.fullName,
          bitsId: formData.bitsId,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          linkedInUrl: formData.linkedInUrl
        }),
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        // Use our custom error handler instead of console.error
        const errorResponse = await handleApiError(null, response);
        throw new Error(errorResponse.message);
      }
      
      const data = await response.json();
      console.log('Sign up successful, received data:', data);
      
      // Store user info in localStorage and cookies
      const userData = { 
        email: formData.email,
        name: formData.fullName,
        isAuthenticated: true,
        token: data.token
      };
      
      // Log the token for debugging
      console.log('Token received from signup:', data.token);
      console.log('User data being stored:', userData);
      
      // Store in both localStorage and cookies for consistency with login
      localStorage.setItem('user', JSON.stringify(userData));
      Cookies.set('user', JSON.stringify(userData), { expires: 7 }); // 7 days
      
      toast({
        title: "Account created",
        description: "Welcome to BITS Job Portal!",
      });
      
      // Redirect to jobs page
      navigate('/jobs');
    } catch (error) {
      const errorResponse = await handleApiError(error);
      toast({
        title: "Sign up failed",
        description: errorResponse.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          placeholder="John Doe"
          required
          value={formData.fullName}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bitsId">BITS ID</Label>
        <Input
          id="bitsId"
          name="bitsId"
          placeholder="eg: 2020B2A32449H"
          required
          value={formData.bitsId}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="linkedInUrl">LinkedIn URL</Label>
        <Input
          id="linkedInUrl"
          name="linkedInUrl"
          type="url"
          placeholder="https://www.linkedin.com/in/yourprofile"
          required
          value={formData.linkedInUrl}
          onChange={handleChange}
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-bits-blue hover:bg-bits-darkBlue"
        disabled={isLoading}
      >
        {isLoading ? "Creating Account..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignUpForm;
