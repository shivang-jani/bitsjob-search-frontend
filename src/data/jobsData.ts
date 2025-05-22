import { Job } from '@/types/job';

export const JOBS: Job[] = [
  {
    id: '1',
    title: 'Software Development Engineer',
    company: 'TechCorp',
    location: 'Hyderabad',
    description: 'We are looking for a talented Software Development Engineer to join our team. You will be responsible for developing and maintaining high-quality software.',
    requirements: [
      'B.Tech/M.Tech in Computer Science or related field',
      'Strong knowledge of data structures and algorithms',
      'Experience with React, Node.js, and TypeScript',
      'Good communication skills'
    ],
    postedBy: {
      name: 'Rahul Sharma',
      bitsId: 'f2008434',
      linkedIn: 'https://linkedin.com/in/rahulsharma'
    },
    postedAt: '2025-05-15T10:30:00Z',
    jobType: 'SDE'
  },
  {
    id: '2',
    title: 'Data Analyst',
    company: 'Analytics Pro',
    location: 'Bangalore',
    description: 'Join our data team to analyze complex datasets and provide insights that drive business decisions.',
    requirements: [
      'B.Tech/M.Tech with strong analytical skills',
      'Proficiency in SQL, Python, and data visualization tools',
      'Experience with statistical analysis',
      'Good communication skills'
    ],
    postedBy: {
      name: 'Priya Patel',
      bitsId: 'f2010325',
      linkedIn: 'https://linkedin.com/in/priyapatel'
    },
    postedAt: '2025-05-10T14:45:00Z',
    jobType: 'Data Analyst'
  },
  {
    id: '3',
    title: 'Product Manager',
    company: 'InnovateTech',
    location: 'Mumbai',
    description: 'Lead product development from conception to launch, working with cross-functional teams to deliver exceptional user experiences.',
    requirements: [
      'B.Tech/M.Tech with MBA preferred',
      'Strong understanding of product development lifecycle',
      'Excellent communication and leadership skills',
      '2+ years of experience in product management'
    ],
    postedBy: {
      name: 'Amit Kumar',
      bitsId: 'f2005678',
      linkedIn: 'https://linkedin.com/in/amitkumar'
    },
    postedAt: '2025-05-18T09:15:00Z',
    jobType: 'Product Manager'
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudServe',
    location: 'Pune',
    description: 'Join our infrastructure team to build and maintain scalable and reliable cloud-based systems.',
    requirements: [
      'B.Tech/M.Tech in Computer Science or related field',
      'Experience with AWS, Docker, and Kubernetes',
      'Knowledge of CI/CD pipelines',
      'Scripting skills in Python or Bash'
    ],
    postedBy: {
      name: 'Vikram Singh',
      bitsId: 'f2007890',
      linkedIn: 'https://linkedin.com/in/vikramsingh'
    },
    postedAt: '2025-05-05T16:20:00Z',
    jobType: 'DevOps'
  },
  {
    id: '5',
    title: 'UI/UX Designer',
    company: 'DesignFirst',
    location: 'Bangalore',
    description: 'Create beautiful and intuitive user interfaces for our flagship products that millions of users love.',
    requirements: [
      'Degree in Design or related field',
      'Portfolio showcasing UI/UX projects',
      'Proficiency in Figma, Sketch, or Adobe XD',
      'Understanding of user-centered design principles'
    ],
    postedBy: {
      name: 'Neha Reddy',
      bitsId: 'f2011234',
      linkedIn: 'https://linkedin.com/in/nehareddy'
    },
    postedAt: '2025-05-12T11:00:00Z',
    jobType: 'UI/UX Designer'
  },
  {
    id: '6',
    title: 'Software Development Engineer II',
    company: 'MegaSoft',
    location: 'Hyderabad',
    description: 'Work on challenging problems and help build the next generation of our cloud platform.',
    requirements: [
      'B.Tech/M.Tech in Computer Science or related field',
      '3+ years of experience in software development',
      'Expertise in Java, Spring Boot, and microservices',
      'Knowledge of distributed systems'
    ],
    postedBy: {
      name: 'Arun Joshi',
      bitsId: 'f2006543',
      linkedIn: 'https://linkedin.com/in/arunjoshi'
    },
    postedAt: '2025-05-08T13:45:00Z',
    jobType: 'SDE'
  },
];
