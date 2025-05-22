import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import Navbar from '../components/layout/NavBar';
import JobCard from '../components/jobs/JobCard';
import { PostJobDialog } from '../components/jobs/PostJobDialog';
import { Job, BackendJob, mapBackendJobToFrontend } from '../types/job';
import { useAuth } from '../hooks/useAuth';
import { Plus } from 'lucide-react';
import { buildApiUrl } from '../config/api';
import { handleApiError } from '../utils/errorHandler';

// Updated job types as per requirements
const JobTypes = ['All', 'Employment', 'Internship', 'Starting Up'];
const Locations = ['All', 'Hyderabad', 'Bangalore', 'Mumbai', 'Pune', 'Delhi', 'Other'];

const Jobs = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState({
    jobType: 'All',
    location: 'All',
    search: '',
  });

  useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !isAuthenticated) {
      navigate('/');
    }
    
    // Fetch jobs from API
    const fetchJobs = async () => {
      try {
        const response = await fetch(buildApiUrl('/v1/jobs'), {
          headers: {
            'Authorization': `Bearer ${user?.token || ''}`
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
        
        setJobs(mappedJobs);
        setFilteredJobs(mappedJobs);
      } catch (error) {
        const errorResponse = await handleApiError(error);
        console.log(`Error fetching jobs: ${errorResponse.message}`);
        // Fallback to empty array if API fails
        setJobs([]);
        setFilteredJobs([]);
      }
    };
    
    fetchJobs();
  }, [isAuthenticated, loading, navigate, user]);

  useEffect(() => {
    let result = [...jobs];
    
    // Apply job type filter
    if (filters.jobType !== 'All') {
      result = result.filter(job => job.jobType === filters.jobType);
    }
    
    // Apply location filter
    if (filters.location !== 'All') {
      result = result.filter(job => job.location === filters.location);
    }
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        (job.company ? job.company.toLowerCase().includes(searchLower) : false) ||
        job.description.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredJobs(result);
  }, [filters, jobs]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [postJobDialogOpen, setPostJobDialogOpen] = useState(false);

  const handleCreateJob = () => {
    setPostJobDialogOpen(true);
  };

  const handleViewMyListings = () => {
    navigate('/my-listings');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-bits-gray/30 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-bits-darkBlue dark:text-white mb-2">Job Opportunities</h2>
            <p className="text-gray-600 dark:text-gray-400">Find exclusive job openings posted by BITS alumni</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            {isAuthenticated && (
              <>
                <Button 
                  onClick={handleViewMyListings}
                  variant="outline"
                  className="border-bits-blue text-bits-blue hover:bg-bits-blue hover:text-white"
                >
                  My Listings
                </Button>
                
                <Button 
                  onClick={handleCreateJob}
                  className="bg-bits-blue hover:bg-bits-darkBlue text-white"
                >
                  <Plus className="mr-2 h-4 w-4" /> Post a Job
                </Button>
              </>
            )}
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-bits-gray/30 dark:bg-gray-800 backdrop-blur-sm border border-white/10 p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Job Type</label>
              <Select 
                value={filters.jobType} 
                onValueChange={(value) => handleFilterChange('jobType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Job Type" />
                </SelectTrigger>
                <SelectContent>
                  {JobTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Location</label>
              <Select 
                value={filters.location} 
                onValueChange={(value) => handleFilterChange('location', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  {Locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Search</label>
              <Input 
                placeholder="Search jobs..." 
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button 
              variant="outline" 
              className="mr-2 border-bits-blue text-bits-blue hover:bg-bits-blue hover:text-white"
              onClick={() => setFilters({ jobType: 'All', location: 'All', search: '' })}
            >
              Reset Filters
            </Button>
              <Button 
                className="bg-bits-blue hover:bg-bits-darkBlue"
                onClick={() => setPostJobDialogOpen(true)}
              >
                Post a Job
              </Button>
          </div>
        </div>
        
        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No jobs found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try changing your search filters</p>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-bits-darkBlue text-white py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p> {new Date().getFullYear()} BITS Job Portal. For BITSians, By BITSians.</p>
            <div className="mt-4 md:mt-0">
              <Link to="/about" className="text-white hover:text-bits-red mr-4">About</Link>
              <a href={import.meta.env.VITE_CONTACT_ME_URL} className="text-white hover:text-bits-red mr-4" target="_blank" rel="noopener noreferrer">Contact</a>
              <a href= {import.meta.env.VITE_GITHUB_REPO_URL} className="text-white hover:text-bits-red" target="_blank" rel="noopener noreferrer">GitHub</a>
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

export default Jobs;
