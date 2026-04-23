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

export type UserProfile = {
  name: string;
  role: string;
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
  scoreHistory: any[];
  theme: 'midnight' | 'aurora' | 'brutalist';
  analytics: any;
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
  scoreHistory: [],
  theme: 'midnight',
  analytics: {
    totalViews: 1284,
    uniqueVisitors: 412,
    avgEngagementTime: "2m 45s",
    projectClicks: {},
    recentVisitors: [],
    viewHistory: []
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
