// Backend job data structure
export interface BackendJob {
  id: string;
  jobTitle: string;
  jobType: string;
  jobDescription: string;
  company?: string;  // Added company field
  location: string;
  expectedSalary: number;
  linkedInUrl: string;
  contactInfo?: string; // Added contact info field
  requirements: string;
  createdBy: string;
  createdAt: string;
  deleted: boolean;
  deletedAt?: string;
}

// Frontend job data structure
export interface Job {
  id: string;
  title: string;
  jobType: string;
  company?: string;
  location: string;
  description: string;
  requirements: string[];
  contactInfo?: string; // Added contact info field
  postedBy: {
    name: string;
    bitsId?: string;
    linkedIn: string;
  };
  postedAt: string;
  salary?: number;
}

// Helper function to convert backend job data to frontend format
export const mapBackendJobToFrontend = (backendJob: BackendJob): Job => {
  return {
    id: backendJob.id,
    title: backendJob.jobTitle,
    jobType: backendJob.jobType,
    company: backendJob.company || 'BITS Alumni Company', // Add company field mapping
    location: backendJob.location,
    description: backendJob.jobDescription,
    requirements: backendJob.requirements 
      ? backendJob.requirements.split('\n').filter(req => req.trim() !== '')
      : [],
    contactInfo: backendJob.contactInfo || undefined, // Map contact info field
    postedBy: {
      name: backendJob.createdBy || 'BITS Alumni',
      linkedIn: backendJob.linkedInUrl || '#'
    },
    postedAt: backendJob.createdAt,
    salary: backendJob.expectedSalary
  };
};
