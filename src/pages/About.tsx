import React from 'react';
import Navbar from '@/components/layout/NavBar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-bits-gray/30 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-6 py-8 relative">
        {/* Animated background elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-bits-blue/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-bits-red/10 rounded-full blur-3xl -z-10"></div>
        
        {/* Back button */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="flex items-center text-bits-blue hover:text-bits-darkBlue dark:text-white dark:hover:text-bits-blue transition-colors"
            onClick={() => navigate('/jobs')}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Jobs
          </Button>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* About This App Card */}
          <Card className="p-6 backdrop-blur-xl border border-white/20 shadow-xl rounded-xl hover:shadow-2xl transition-all animate-floating hover:border-bits-blue/30 bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/80 dark:to-gray-900/40" style={{animationDelay: "0s"}}>
            <div className="w-12 h-12 rounded-full bg-bits-blue/20 flex items-center justify-center text-bits-blue mb-4">
              👋
            </div>
            <h1 className="text-3xl font-bold text-bits-darkBlue dark:text-white mb-4">About This App</h1>
            <p className="text-gray-700 dark:text-gray-300">
              Welcome! This app is a modern, full-stack web project built to show how powerful and easy it can be to develop and deploy cloud-based applications using popular technologies. It's a blend of performance, scalability, and clean architecture.
            </p>
          </Card>

          {/* The Idea Card */}
          <Card className="p-6 backdrop-blur-xl border border-white/20 shadow-xl rounded-xl hover:shadow-2xl transition-all  animate-floating hover:border-bits-blue/30 bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/80 dark:to-gray-900/40" style={{animationDelay: "0.1s"}}>
            <div className="w-12 h-12 rounded-full bg-bits-red/20 flex items-center justify-center text-bits-red mb-4">
              💡
            </div>
            <h2 className="text-2xl font-bold text-bits-blue mb-4">The Idea</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We wanted to create a real-world full-stack application using widely-used tools — not just as a demo, but as a foundation for scalable and maintainable projects.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The goals were simple:
            </p>
            <ul className="list-none space-y-2">
              <li className="text-gray-700 dark:text-gray-300 flex items-center">
                <span className="text-green-500 mr-2">✅</span> Build with React for a fast, responsive UI
              </li>
              <li className="text-gray-700 dark:text-gray-300 flex items-center">
                <span className="text-green-500 mr-2">✅</span> Use Spring Boot for solid backend logic and REST APIs
              </li>
              <li className="text-gray-700 dark:text-gray-300 flex items-center">
                <span className="text-green-500 mr-2">✅</span> Store data in MongoDB Atlas, a flexible, cloud-hosted NoSQL database
              </li>
              <li className="text-gray-700 dark:text-gray-300 flex items-center">
                <span className="text-green-500 mr-2">✅</span> Host everything with modern deployment tools (Vercel + Render)
              </li>
            </ul>
          </Card>

          {/* How We Built It Card */}
          <Card className="p-6 backdrop-blur-xl border border-white/20 shadow-xl rounded-xl hover:shadow-2xl transition-all animate-floating hover:border-bits-blue/30 bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/80 dark:to-gray-900/40" style={{animationDelay: "0.2s"}}>
            <div className="w-12 h-12 rounded-full bg-bits-blue/20 flex items-center justify-center text-bits-blue mb-4">
              🛠️
            </div>
            <h2 className="text-2xl font-bold text-bits-blue mb-4">How We Built It</h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-white/30 dark:bg-gray-800/30 rounded-lg border border-white/10 hover:border-bits-blue/20 transition-colors">
                <h3 className="text-xl font-semibold text-bits-darkBlue dark:text-white mb-2 flex items-center">
                  <span className="mr-2">🎨</span> Frontend — React + Vercel
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The frontend is built with React, styled with modern CSS, and deployed to Vercel for fast global delivery and auto-deployment on every push.
                </p>
              </div>

              <div className="p-4 bg-white/30 dark:bg-gray-800/30 rounded-lg border border-white/10 hover:border-bits-blue/20 transition-colors">
                <h3 className="text-xl font-semibold text-bits-darkBlue dark:text-white mb-2 flex items-center">
                  <span className="mr-2">⚙️</span> Backend — Spring Boot + Render
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The backend uses Spring Boot, exposing secure and scalable REST APIs. We host it on Render, which handles deployment directly from our GitHub repo.
                </p>
              </div>

              <div className="p-4 bg-white/30 dark:bg-gray-800/30 rounded-lg border border-white/10 hover:border-bits-blue/20 transition-colors">
                <h3 className="text-xl font-semibold text-bits-darkBlue dark:text-white mb-2 flex items-center">
                  <span className="mr-2">🗄️</span> Database — MongoDB Atlas
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Data is stored in MongoDB Atlas, a cloud-hosted NoSQL solution that's reliable, flexible, and integrates seamlessly with Spring Boot.
                </p>
              </div>

              <div className="p-4 bg-white/30 dark:bg-gray-800/30 rounded-lg border border-white/10 hover:border-bits-blue/20 transition-colors">
                <h3 className="text-xl font-semibold text-bits-darkBlue dark:text-white mb-2 flex items-center">
                  <span className="mr-2">🔄</span> CI/CD — GitHub Integration
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Everything is version-controlled on GitHub, and both Vercel and Render are set to auto-deploy changes on every commit. No manual deploys needed!
                </p>
              </div>
            </div>
          </Card>

          {/* Why We Built It Card */}
          <Card className="p-6 backdrop-blur-xl border border-white/20 shadow-xl rounded-xl hover:shadow-2xl transition-all animate-floating hover:border-bits-blue/30 bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/80 dark:to-gray-900/40" style={{animationDelay: "0.3s"}}>
            <div className="w-12 h-12 rounded-full bg-bits-red/20 flex items-center justify-center text-bits-red mb-4">
              🎯
            </div>
            <h2 className="text-2xl font-bold text-bits-blue mb-4">Why We Built It</h2>
            <p className="text-gray-700 dark:text-gray-300">
              This project is more than a tech demo — it's a reference architecture for building real apps. Whether you're launching a startup, learning full-stack development, or experimenting with cloud tools, this setup gives you a solid starting point.
            </p>
          </Card>

          {/* What's Next Card */}
          <Card className="p-6 backdrop-blur-xl border border-white/20 shadow-xl rounded-xl hover:shadow-2xl transition-all animate-floating hover:border-bits-blue/30 bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/80 dark:to-gray-900/40" style={{animationDelay: "0.4s"}}>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bits-blue to-bits-glow flex items-center justify-center text-white mb-4">
              🚀
            </div>
            <h2 className="text-2xl font-bold text-bits-blue mb-4">What's Next?</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We've laid the foundation — now it's time to build on it! Here's what's coming up:
            </p>
            <ul className="list-none space-y-4">
              <li className="text-gray-700 dark:text-gray-300 p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg border border-white/10 hover:border-bits-blue/20 transition-colors">
                <span className="font-semibold flex items-center">
                  <span className="mr-2">📝</span> Make the "Apply" button functional
                </span>
                <p className="mt-1 text-sm">Users will soon be able to apply for jobs, triggering backend workflows and saving their submissions to the database.</p>
              </li>
              <li className="text-gray-700 dark:text-gray-300 p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg border border-white/10 hover:border-bits-blue/20 transition-colors">
                <span className="font-semibold flex items-center">
                  <span className="mr-2">📩</span> Send email alerts
                </span>
                <p className="mt-1 text-sm">Automatically notify users via email when a new job matching their interests is posted.</p>
              </li>
              <li className="text-gray-700 dark:text-gray-300 p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg border border-white/10 hover:border-bits-blue/20 transition-colors">
                <span className="font-semibold flex items-center">
                  <span className="mr-2">👋</span> User onboarding & offboarding
                </span>
                <p className="mt-1 text-sm">Smooth experiences for both new and departing users, with personalized welcome flows and account cleanup.</p>
              </li>
              <li className="text-gray-700 dark:text-gray-300 p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg border border-white/10 hover:border-bits-blue/20 transition-colors">
                <span className="font-semibold flex items-center">
                  <span className="mr-2">📣</span> Spread the word
                </span>
                <p className="mt-1 text-sm">Share the app with more users to gather feedback, test features, and build community traction.</p>
              </li>
              <li className="text-gray-700 dark:text-gray-300 p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg border border-white/10 hover:border-bits-blue/20 transition-colors">
                <span className="font-semibold flex items-center">
                  <span className="mr-2">🧪</span> Advanced features
                </span>
                <p className="mt-1 text-sm">Add filters, search, job categories, and saved jobs for a more personalized experience.</p>
              </li>
            </ul>
          </Card>
        </div>
      </main>
      
      <footer className="bg-bits-darkBlue text-white py-6 mt-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>{new Date().getFullYear()} BITS Job Portal. For BITSians, By BITSians.</p>
            <div className="mt-4 md:mt-0">
              <a href="/about" className="text-white hover:text-bits-red mr-4">About</a>
              <a href={import.meta.env.VITE_CONTACT_ME_URL} className="text-white hover:text-bits-red mr-4" target="_blank" rel="noopener noreferrer">Contact</a>
              <a href={import.meta.env.VITE_GITHUB_REPO_URL} className="text-white hover:text-bits-red" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
