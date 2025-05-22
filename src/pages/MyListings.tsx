import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/use-toast';
import { Job, BackendJob, mapBackendJobToFrontend } from '../types/job';
import Navbar from '../components/layout/NavBar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { buildApiUrl } from '../config/api';
import { PostJobDialog } from '../components/jobs/PostJobDialog';
import { handleApiError } from '../utils/errorHandler';

const MyListings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated, loading } = useAuth();
  const [myJobs, setMyJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !isAuthenticated) {
      navigate('/');
      return;
    }

    // Fetch user's jobs from API
    const fetchUserJobs = async () => {
      try {
        if (user && user.email) {
          // Using the user's email to fetch their jobs
          const response = await fetch(buildApiUrl(`/v1/jobs/user/${encodeURIComponent(user.email)}`), {
            headers: {
              'Authorization': `Bearer ${user.token || ''}`
            }
          });
          
          if (!response.ok) {
            const errorResponse = await handleApiError(null, response);
            throw new Error(errorResponse.message);
          }
          
          const backendJobs: BackendJob[] = await response.json();
          const mappedJobs = backendJobs
            .filter(job => !job.deleted)
            .map(mapBackendJobToFrontend);
          
          setMyJobs(mappedJobs);
        }
      } catch (error) {
        const errorResponse = await handleApiError(error);
        toast({
          title: "Error",
          description: errorResponse.message,
          variant: "destructive"
        });
      }
    };
    
    fetchUserJobs();
  }, [isAuthenticated, loading, user, navigate, toast]);

  const [postJobDialogOpen, setPostJobDialogOpen] = useState(false);

  const handleCreateJob = () => {
    setPostJobDialogOpen(true);
  };

  const handleViewJob = (jobId: string) => {
    // For now, just show a toast. In a real app, this would navigate to a job details page
    toast({
      title: "View Job",
      description: `Viewing job with ID: ${jobId}`,
    });
  };

  const handleEditJob = (jobId: string) => {
    // For now, just show a toast. In a real app, this would navigate to a job edit page
    toast({
      title: "Edit Job",
      description: `Editing job with ID: ${jobId}`,
    });
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      const response = await fetch(buildApiUrl(`/v1/jobs/${jobId}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user?.token || ''}`
        }
      });
      
      if (!response.ok) {
        const errorResponse = await handleApiError(null, response);
        throw new Error(errorResponse.message);
      }
      
      // Remove the job from local state
      setMyJobs(prev => prev.filter(job => job.id !== jobId));
      
      toast({
        title: "Job Deleted",
        description: "The job posting has been removed successfully.",
      });
    } catch (error) {
      const errorResponse = await handleApiError(error);
      toast({
        title: "Error",
        description: errorResponse.message,
        variant: "destructive"
      });
    }
  };

  const handleViewAllJobs = () => {
    navigate('/jobs');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-bits-gray/30 dark:bg-gray-900 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-bits-darkBlue dark:text-white mb-2">My Job Listings</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage the job postings you've shared with the BITS community</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleViewAllJobs}
              variant="outline"
              className="border-bits-blue text-bits-blue hover:bg-bits-blue hover:text-white"
            >
              <Eye className="mr-2 h-4 w-4" /> View All Jobs
            </Button>
            
            <Button 
              onClick={handleCreateJob}
              className="bg-bits-blue hover:bg-bits-darkBlue text-white"
            >
              <Plus className="mr-2 h-4 w-4" /> Post New Job
            </Button>
          </div>
        </div>
        
        {myJobs.length > 0 ? (
          <div className="bg-bits-gray/30 dark:bg-gray-800 backdrop-blur-sm border border-white/10 rounded-lg shadow-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Posted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.company || 'BITS Alumni'}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{new Date(job.postedAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleViewJob(job.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleEditJob(job.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-bits-red hover:text-red-700 hover:bg-red-100" onClick={() => handleDeleteJob(job.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="bg-bits-gray/30 dark:bg-gray-800 backdrop-blur-sm border border-white/10 rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">You haven't posted any jobs yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Share job opportunities with the BITS community</p>
            <Button 
              onClick={handleCreateJob}
              className="bg-bits-blue hover:bg-bits-darkBlue text-white"
            >
              <Plus className="mr-2 h-4 w-4" /> Post Your First Job
            </Button>
          </div>
        )}
      </main>
      
      <footer className="bg-bits-darkBlue text-white py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p> {new Date().getFullYear()} BITS Job Portal. For BITSIans, By BITSians.</p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-white hover:text-bits-red mr-4">About</a>
              <a href="https://www.linkedin.com/in/shivang-jani/" className="text-white hover:text-bits-red mr-4" target="_blank" rel="noopener noreferrer">Contact</a>
              <a href="#" className="text-white hover:text-bits-red">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Post Job Dialog */}
      <PostJobDialog 
        open={postJobDialogOpen} 
        onOpenChange={setPostJobDialogOpen} 
      />
    </div>
  );
};

export default MyListings;
