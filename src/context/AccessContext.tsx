"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type AccessMode = 'OPEN' | 'INVITE_ONLY' | 'WAITLIST';

export type WaitlistEntry = {
  id: string;
  name: string;
  company: string;
  role: string;
  hiringNeeds: string;
  email: string;
  status: 'PENDING' | 'APPROVED';
  timestamp: number;
};

interface AccessContextType {
  accessMode: AccessMode;
  setAccessMode: (mode: AccessMode) => void;
  approvedEmails: string[];
  approveEmail: (email: string) => void;
  waitlist: WaitlistEntry[];
  addToWaitlist: (entry: Omit<WaitlistEntry, 'id' | 'status' | 'timestamp'>) => void;
  approveWaitlistEntry: (id: string) => void;
  isRecruiterOnboarded: boolean;
  completeRecruiterOnboarding: (data: { name: string; company: string; role: string; hiringNeeds: string[] }) => void;
}

const AccessContext = createContext<AccessContextType | undefined>(undefined);

export function AccessProvider({ children }: { children: ReactNode }) {
  // Persistence in local storage for the prototype
  const [accessMode, setAccessModeState] = useState<AccessMode>('OPEN');
  const [approvedEmails, setApprovedEmails] = useState<string[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [isRecruiterOnboarded, setIsRecruiterOnboarded] = useState<boolean>(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('sg_access_mode') as AccessMode;
    const savedEmails = JSON.parse(localStorage.getItem('sg_approved_emails') || '[]');
    const savedWaitlist = JSON.parse(localStorage.getItem('sg_waitlist') || '[]');
    const savedOnboarded = localStorage.getItem('sg_recruiter_onboarded') === 'true';
    
    if (savedMode) setAccessModeState(savedMode);
    if (savedEmails.length > 0) setApprovedEmails(savedEmails);
    if (savedWaitlist.length > 0) setWaitlist(savedWaitlist);
    if (savedOnboarded) setIsRecruiterOnboarded(true);
  }, []);

  const setAccessMode = (mode: AccessMode) => {
    setAccessModeState(mode);
    localStorage.setItem('sg_access_mode', mode);
  };

  const approveEmail = (email: string) => {
    const newEmails = [...new Set([...approvedEmails, email])];
    setApprovedEmails(newEmails);
    localStorage.setItem('sg_approved_emails', JSON.stringify(newEmails));
  };

  const addToWaitlist = (entry: Omit<WaitlistEntry, 'id' | 'status' | 'timestamp'>) => {
    const newEntry: WaitlistEntry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      status: 'PENDING',
      timestamp: Date.now()
    };
    const newWaitlist = [...waitlist, newEntry];
    setWaitlist(newWaitlist);
    localStorage.setItem('sg_waitlist', JSON.stringify(newWaitlist));
  };

  const approveWaitlistEntry = (id: string) => {
    const entry = waitlist.find(e => e.id === id);
    if (entry) {
      approveEmail(entry.email);
      const newWaitlist = waitlist.map(e => e.id === id ? { ...e, status: 'APPROVED' as const } : e);
      setWaitlist(newWaitlist);
      localStorage.setItem('sg_waitlist', JSON.stringify(newWaitlist));
    }
  };

  const completeRecruiterOnboarding = (data: { name: string; company: string; role: string; hiringNeeds: string[] }) => {
    // In a real app, we'd save this data to a profile/database
    console.log('Recruiter Onboarding Data:', data);
    setIsRecruiterOnboarded(true);
    localStorage.setItem('sg_recruiter_onboarded', 'true');
  };

  return (
    <AccessContext.Provider value={{ 
      accessMode, setAccessMode, 
      approvedEmails, approveEmail, 
      waitlist, addToWaitlist, approveWaitlistEntry,
      isRecruiterOnboarded, completeRecruiterOnboarding
    }}>
      {children}
    </AccessContext.Provider>
  );
}

export function useAccess() {
  const context = useContext(AccessContext);
  if (context === undefined) {
    throw new Error('useAccess must be used within an AccessProvider');
  }
  return context;
}
