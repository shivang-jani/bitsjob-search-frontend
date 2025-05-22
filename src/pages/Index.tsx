import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, Link } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import SignUpForm from '@/components/auth/SignUpForm';
import { BriefcaseIcon, LinkedinIcon, UsersIcon, SearchIcon } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('login');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-mesh overflow-hidden">
      {/* Header */}
      <header className="py-6 px-6 sm:px-10 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-bits-blue to-bits-darkBlue flex items-center justify-center animate-pulse-glow shadow-lg">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white text-glow">BITS <span className="text-bits-blue">Job Portal</span></h1>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 container mx-auto px-6 py-12 relative">
        {/* Animated background elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-bits-blue/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-bits-red/10 rounded-full blur-3xl -z-10"></div>
        
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-white text-shadow leading-tight">
                Connect with <span className="text-bits-blue">BITS Alumni</span> for Exclusive Job Opportunities
              </h2>
              <p className="text-lg text-gray-300 max-w-lg">
                A dedicated platform for BITS alumni to share job openings exclusively for BITS students. Join our network today.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="glass-card p-5 rounded-xl animate-fade-in" style={{animationDelay: "0.1s"}}>
                <div className="w-12 h-12 rounded-lg bg-bits-blue/20 flex items-center justify-center text-bits-blue mb-3">
                  <BriefcaseIcon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-medium text-white">Job Listings</h3>
                <p className="mt-2 text-sm text-gray-300">Opportunities shared within the BITS network.</p>
              </div>
              
              <div className="glass-card p-5 rounded-xl animate-fade-in" style={{animationDelay: "0.2s"}}>
                <div className="w-12 h-12 rounded-lg bg-bits-blue/20 flex items-center justify-center text-bits-blue mb-3">
                  <UsersIcon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-medium text-white">Alumni Network</h3>
                <p className="mt-2 text-sm text-gray-300">Connect directly with BITS graduates working at top companies.</p>
              </div>
              
              <div className="glass-card p-5 rounded-xl animate-fade-in" style={{animationDelay: "0.3s"}}>
                <div className="w-12 h-12 rounded-lg bg-bits-blue/20 flex items-center justify-center text-bits-blue mb-3">
                  <LinkedinIcon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-medium text-white">Professional Growth</h3>
                <p className="mt-2 text-sm text-gray-300">Build your career with guidance from successful BITS alumni.</p>
              </div>
              
              <div className="glass-card p-5 rounded-xl animate-fade-in" style={{animationDelay: "0.4s"}}>
                <div className="w-12 h-12 rounded-lg bg-bits-blue/20 flex items-center justify-center text-bits-blue mb-3">
                  <SearchIcon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-medium text-white">Targeted Search</h3>
                <p className="mt-2 text-sm text-gray-300">Find roles perfectly suited to your skills and experience level.</p>
              </div>
            </div>
          </div>
          
          <div className="lg:pl-10 animate-floating">
            <Card className="glass-card p-8 backdrop-blur-xl border border-white/10 shadow-xl rounded-xl">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 mb-8 bg-white/10 border border-white/5">
                  <TabsTrigger value="login" className="data-[state=active]:text-white data-[state=active]:bg-bits-blue">Login</TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:text-white data-[state=active]:bg-bits-blue">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login" className="animate-fade-in">
                  <LoginForm />
                </TabsContent>
                <TabsContent value="signup" className="animate-fade-in">
                  <SignUpForm />
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/10 py-8 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400"> {new Date().getFullYear()} BITS Job Portal. For BITSians, By BITSians.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/about" className="text-gray-400 hover:text-bits-blue smooth-transition">About</Link>
              <a href= {import.meta.env.VITE_CONTACT_ME_URL} className="text-gray-400 hover:text-bits-blue smooth-transition" target="_blank" rel="noopener noreferrer">Contact</a>
              <a href= {import.meta.env.VITE_GITHUB_REPO_URL} className="text-gray-400 hover:text-bits-blue smooth-transition" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
