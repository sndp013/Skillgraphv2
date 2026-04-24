"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type JobStatus = 'OPEN' | 'CLOSED';
export type ApplicationStatus = 'APPLIED' | 'SHORTLISTED' | 'HIRED' | 'REJECTED';

export type Job = {
  id: string;
  title: string;
  description: string;
  expectedOutcomes: string;
  budget: string;
  requiredSkills: string[];
  postedBy: string; // Company or Recruiter Name
  status: JobStatus;
  timestamp: number;
};

export type Application = {
  id: string;
  jobId: string;
  candidateId: string;
  candidateName: string;
  candidateScore: number;
  candidateTopProject?: {
    title: string;
    thumbnail: string;
    outcome: string;
  };
  pitch: string;
  status: ApplicationStatus;
  timestamp: number;
};

interface FreelanceContextType {
  jobs: Job[];
  applications: Application[];
  postJob: (job: Omit<Job, 'id' | 'status' | 'timestamp'>) => void;
  applyToJob: (app: Omit<Application, 'id' | 'status' | 'timestamp'>) => void;
  updateApplicationStatus: (appId: string, status: ApplicationStatus) => void;
}

const FreelanceContext = createContext<FreelanceContextType | undefined>(undefined);

const MOCK_JOBS: Job[] = [
  {
    id: 'j1',
    title: '3D Product Landing Page',
    description: 'Need a developer to build a high-performance landing page with Spline/Three.js integration.',
    expectedOutcomes: 'A fully interactive 3D hero section with 60fps performance on mobile.',
    budget: '$2,000 - $3,500',
    requiredSkills: ['Next.js', 'Three.js', 'Spline', 'Framer Motion'],
    postedBy: 'CyberScale AI',
    status: 'OPEN',
    timestamp: Date.now() - 86400000
  },
  {
    id: 'j2',
    title: 'Framer Motion Interaction Designer',
    description: 'Looking for an expert in micro-interactions for a premium SaaS dashboard.',
    expectedOutcomes: 'A complete set of verified interactive components with smooth state transitions.',
    budget: '$80/hr',
    requiredSkills: ['Framer Motion', 'React', 'TypeScript'],
    postedBy: 'Velocity Labs',
    status: 'OPEN',
    timestamp: Date.now() - 172800000
  }
];

export function FreelanceProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const savedJobs = localStorage.getItem('sg_jobs');
    const savedApps = localStorage.getItem('sg_applications');
    if (savedJobs) setJobs(JSON.parse(savedJobs));
    if (savedApps) setApplications(JSON.parse(savedApps));
  }, []);

  const postJob = (job: Omit<Job, 'id' | 'status' | 'timestamp'>) => {
    const newJob: Job = {
      ...job,
      id: Math.random().toString(36).substr(2, 9),
      status: 'OPEN',
      timestamp: Date.now()
    };
    const newJobs = [newJob, ...jobs];
    setJobs(newJobs);
    localStorage.setItem('sg_jobs', JSON.stringify(newJobs));
  };

  const applyToJob = (app: Omit<Application, 'id' | 'status' | 'timestamp'>) => {
    const newApp: Application = {
      ...app,
      id: Math.random().toString(36).substr(2, 9),
      status: 'APPLIED',
      timestamp: Date.now()
    };
    const newApps = [newApp, ...applications];
    setApplications(newApps);
    localStorage.setItem('sg_applications', JSON.stringify(newApps));
  };

  const updateApplicationStatus = (appId: string, status: ApplicationStatus) => {
    const newApps = applications.map(a => a.id === appId ? { ...a, status } : a);
    setApplications(newApps);
    localStorage.setItem('sg_applications', JSON.stringify(newApps));
  };

  return (
    <FreelanceContext.Provider value={{ jobs, applications, postJob, applyToJob, updateApplicationStatus }}>
      {children}
    </FreelanceContext.Provider>
  );
}

export function useFreelance() {
  const context = useContext(FreelanceContext);
  if (context === undefined) {
    throw new Error('useFreelance must be used within a FreelanceProvider');
  }
  return context;
}
