import React, { createContext, useContext, useState, ReactNode } from "react";

export type Project = {
  id: string;
  title: string;
  problem: string;
  solution: string;
  outcome: string;
  techStack: string[];
  mediaUrl: string; // URL from mock upload
  externalLink?: string;
  demoLink?: string;
  codeLink?: string;
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
  valueProp: string;
  score: number;
  projects: Project[];
  timeline: TimelineEvent[];
  skills: string[];
};

type ProfileContextType = {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  addProject: (project: Project) => void;
  updateScore: () => void;
};

const defaultProfile: UserProfile = {
  name: "Alex Designer", // Mock default
  role: "Product Engineer",
  valueProp: "Building the gap between design and scalable code.",
  score: 10,
  projects: [],
  timeline: [],
  skills: [],
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  const addProject = (project: Project) => {
    setProfile((prev) => {
      const newProjects = [...prev.projects, project];
      // Gather skills
      const newSkills = Array.from(new Set([...prev.skills, ...project.techStack]));
      
      // Auto-add timeline event
      const newTimelineEvent: TimelineEvent = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        action: `Built ${project.title}`,
        outcome: project.outcome,
      };

      const newTimeline = [newTimelineEvent, ...prev.timeline];

      // Scoring Rules Logic
      let newScore = 0;
      if (prev.name && prev.role) newScore += 10; // Base completion
      newScore += Math.min(60, newProjects.length * 20); // +20 per project (max 60)
      if (newProjects.some(p => p.mediaUrl)) newScore += 10; // +10 for media proof
      if (newProjects.some(p => p.outcome && p.outcome.trim().length > 0)) newScore += 10; // +10 for outcome
      if (newSkills.length >= 5) newScore += 10; // +10 for skill diversity
      
      newScore = Math.min(100, newScore);

      return {
        ...prev,
        projects: newProjects,
        skills: newSkills,
        timeline: newTimeline,
        score: newScore,
      };
    });
  };

  const updateScore = () => { /* logic inside addProject handles it mostly */ };

  return (
    <ProfileContext.Provider value={{ profile, setProfile, addProject, updateScore }}>
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
