"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Project = {
  id: string;
  title: string;
  problem: string;
  solution: string;
  outcome: string;
  metrics?: string;
  techStack: string[];
  mediaUrl: string; // URL from mock upload (After)
  action?: string; // What the user built/did
  beforeMediaUrl?: string; // URL for Before/After comparison
  externalLink?: string;
  demoLink?: string;
  codeLink?: string;
  enhancedSolution?: string; // AI enhanced description
};

export type TimelineEvent = {
  id: string;
  timestamp: string;
  action: string;
  outcome: string;
};

export type AnalyticsPoint = {
  date: string;
  views: number;
};

export type Analytics = {
  totalViews: number;
  uniqueVisitors: number;
  avgEngagementTime: string;
  projectClicks: Record<string, number>;
  recentVisitors: {
    id: string;
    role: string;
    company: string;
    time: string;
    avatar: string;
  }[];
  viewHistory: AnalyticsPoint[];
};

export type ScoreHistoryPoint = {
  month: string;
  total: number;
  proof: number;
  outcome: number;
};

export type UserProfile = {
  name: string;
  role: string;
  userRole?: 'candidate' | 'recruiter';
  bio?: string; // Professional Summary (AI generated)
  suggestedRoles?: string[]; // AI suggested roles
  valueProp: string;
  score: number;
  scoreBreakdown: {
    projects: number;
    proof: number;
    outcome: number;
    skills: number;
  };
  projects: Project[];
  timeline: TimelineEvent[];
  skills: string[];
  badges: string[];
  scoreHistory: ScoreHistoryPoint[];
  theme: 'midnight' | 'aurora' | 'brutalist';
  analytics: Analytics;
  isOpenToWork?: boolean;
  experienceLevel?: 'Student' | 'Fresher' | '1-3 yrs' | '3-5 yrs' | '5+ yrs';
  location?: string;
  preferredRole?: string;
};

type ProfileContextType = {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  addProject: (project: Project) => void;
  updateProfileData: (data: Partial<UserProfile>) => void;
};

export const defaultProfile: UserProfile = {
  name: "Alex Designer",
  role: "Product Engineer",
  isOpenToWork: true,
  experienceLevel: '1-3 yrs',
  location: 'San Francisco, CA',
  preferredRole: 'Senior Frontend Engineer',
  bio: "Full-stack product engineer specializing in bridging the gap between sophisticated design systems and scalable production code.",
  suggestedRoles: ["Frontend Engineer", "Product UI/UX Developer", "Technical Product Manager"],
  valueProp: "Building the gap between design and scalable code.",
  score: 33,
  scoreBreakdown: { projects: 10, proof: 10, outcome: 10, skills: 3 },
  projects: [
    {
      id: "test-1",
      title: "Optimized Checkout Flow",
      problem: "Checkout abandonment rate was 65% due to long forms and poor mobile UX.",
      solution: "Implemented one-page checkout, Apple Pay/Google Pay integration, and predictive address entry.",
      outcome: "Reduced abandonment and increased overall conversion rate.",
      metrics: "+42% Conversion",
      techStack: ["Next.js", "Stripe", "Framer Motion"],
      mediaUrl: "https://images.unsplash.com/photo-1556740734-75474a702e8d?q=80&w=2070&auto=format&fit=crop"
    }
  ],
  timeline: [],
  skills: ["Next.js", "Stripe", "Framer Motion"],
  badges: ["First Project Added", "Verified Proof"],
  scoreHistory: [
    { month: "Jan", total: 10, proof: 0, outcome: 0 },
    { month: "Feb", total: 25, proof: 5, outcome: 5 },
    { month: "Mar", total: 33, proof: 10, outcome: 10 },
  ],
  theme: 'midnight',
  analytics: {
    totalViews: 1284,
    uniqueVisitors: 412,
    avgEngagementTime: "2m 45s",
    projectClicks: { "test-1": 342 },
    recentVisitors: [
      { id: 'v1', role: 'Engineering Manager', company: 'Google', time: '2h ago', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=100' },
      { id: 'v2', role: 'Technical Recruiter', company: 'Meta', time: '5h ago', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100' },
      { id: 'v3', role: 'Talent Acquisition', company: 'Amazon', time: '1d ago', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100' },
    ],
    viewHistory: [
      { date: 'Apr 10', views: 45 },
      { date: 'Apr 12', views: 65 },
      { date: 'Apr 14', views: 42 },
      { date: 'Apr 16', views: 88 },
      { date: 'Apr 18', views: 120 },
      { date: 'Apr 20', views: 95 },
      { date: 'Apr 22', views: 154 },
    ]
  }
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  const addProject = (project: Project) => {
    setProfile((prev) => {
      const newProjects = [...prev.projects, project];
      const newSkills = Array.from(new Set([...prev.skills, ...project.techStack]));
      
      const projectsScore = Math.min(40, newProjects.length * 10);
      const outcomeScore = Math.min(30, newProjects.filter(p => p.outcome && p.outcome.length > 10).length * 10);
      const proofScore = Math.min(20, newProjects.filter(p => p.mediaUrl).length * 10);
      const skillsScore = Math.min(10, newSkills.length);
      const totalScore = projectsScore + outcomeScore + proofScore + skillsScore;

      return {
        ...prev,
        projects: newProjects,
        skills: newSkills,
        score: totalScore,
        scoreBreakdown: {
          projects: projectsScore,
          proof: proofScore,
          outcome: outcomeScore,
          skills: skillsScore
        }
      };
    });
  };

  const updateProfileData = (data: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile, addProject, updateProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
