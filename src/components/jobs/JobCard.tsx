import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Job } from '../../types/job';

// Helper function to format date
const formatDate = (dateString: string) => {
  const postedDate = new Date(dateString);
  const now = new Date();
  
  const diffTime = Math.abs(now.getTime() - postedDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
};

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
        <CardTitle className="text-xl font-bold text-bits-darkBlue">{job.title}</CardTitle>
          <Badge className="bg-bits-blue hover:bg-bits-blue">{job.jobType}</Badge>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-gray-600 font-medium">{job.company || 'Company Name'}</span>
          <span className="text-sm text-gray-500">{job.location}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>
        
        <div className="mt-3">
          <h4 className="font-semibold text-sm mb-1">Requirements:</h4>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            {Array.isArray(job.requirements) && job.requirements.slice(0, 2).map((req, index) => (
              <li key={index}>{req}</li>
            ))}
            {Array.isArray(job.requirements) && job.requirements.length > 2 && (
              <li>+ {job.requirements.length - 2} more requirements</li>
            )}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start pt-2 border-t">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-bits-blue/20 flex items-center justify-center text-bits-blue mr-2">
              <span className="font-semibold">{job.postedBy.name ? job.postedBy.name.charAt(0) : 'A'}</span>
            </div>
            <div>
              <p className="text-sm font-medium">{job.postedBy.name}</p>
              <p className="text-xs text-gray-500">{job.postedBy.bitsId || 'BITS Alumni'}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">
              {job.salary && <span className="block">₹{job.salary}/yr</span>}
              Posted {formatDate(job.postedAt)}
            </p>
          </div>
        </div>
        <div className="flex justify-between w-full mt-3">
          <a 
            href={job.postedBy.linkedIn || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-bits-blue hover:text-bits-red"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
            LinkedIn
          </a>
          <Button className="bg-bits-blue hover:bg-bits-darkBlue">Apply Now</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
