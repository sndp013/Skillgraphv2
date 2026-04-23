"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ReferralContextType {
  referralCount: number;
  referralLink: string;
  isPremiumUnlocked: boolean;
  addReferral: () => void;
  copyReferralLink: () => void;
  shareToWhatsApp: () => void;
}

const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

export function ReferralProvider({ children }: { children: ReactNode }) {
  // In a real app, this would be fetched from the backend
  const [referralCount, setReferralCount] = useState(1); // Starting with 1 for demo
  const [username, setUsername] = useState('sandeep');
  
  const referralLink = `https://skillgraph.com/signup?ref=${username}`;
  const isPremiumUnlocked = referralCount >= 3;

  const addReferral = () => {
    setReferralCount(prev => prev + 1);
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard!');
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(`Build your proof-based portfolio on SkillGraph and get hired fast! Use my link: ${referralLink}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <ReferralContext.Provider value={{
      referralCount,
      referralLink,
      isPremiumUnlocked,
      addReferral,
      copyReferralLink,
      shareToWhatsApp
    }}>
      {children}
    </ReferralContext.Provider>
  );
}

export function useReferral() {
  const context = useContext(ReferralContext);
  if (context === undefined) {
    throw new Error('useReferral must be used within a ReferralProvider');
  }
  return context;
}
