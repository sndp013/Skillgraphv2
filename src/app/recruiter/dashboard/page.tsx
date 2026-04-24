"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Candidate, CandidateCard } from '@/components/CandidateCard';
import { useAccess, AccessMode } from '@/context/AccessContext';
import { useRouter } from 'next/navigation';
import { useFreelance, Job, ApplicationStatus } from '@/context/FreelanceContext';
import { useProfile } from '@/context/ProfileContext';
import Link from 'next/link';

const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 'c1',
    name: 'Sarah Jenkins',
    role: 'Frontend Developer',
    score: 88,
    skills: ['React', 'Next.js', 'Framer Motion', 'TypeScript'],
    topProject: {
      title: '3D E-commerce Experience',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400'
    },
    hasVerifiedProof: true,
    email: 'sarah.j@example.com',
    isOpenToWork: true,
    experienceLevel: '1-3 yrs',
    location: 'Remote / London'
  },
  {
    id: 'c2',
    name: 'Marcus Thorne',
    role: 'Backend Engineer',
    score: 72,
    skills: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    topProject: {
      title: 'Distributed Task Queue',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=400'
    },
    hasVerifiedProof: false,
    email: 'm.thorne@example.com',
    isOpenToWork: true,
    experienceLevel: '3-5 yrs',
    location: 'Austin, TX'
  },
  {
    id: 'c3',
    name: 'Elena Rodriguez',
    role: 'UI/UX Designer',
    score: 94,
    skills: ['Figma', 'Prototyping', 'Design Systems', 'Interaction Design'],
    topProject: {
      title: 'Banking App Redesign',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=400'
    },
    hasVerifiedProof: true,
    email: 'elena.ux@example.com',
    isOpenToWork: false,
    experienceLevel: '5+ yrs',
    location: 'Remote'
  },
  {
    id: 'c4',
    name: 'David Kim',
    role: 'Fullstack Developer',
    score: 65,
    skills: ['React', 'Python', 'Django', 'AWS'],
    topProject: {
      title: 'SaaS Analytics Platform',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=400'
    },
    hasVerifiedProof: true,
    email: 'david.k@example.com',
    isOpenToWork: true,
    experienceLevel: 'Fresher',
    location: 'Seoul, KR'
  },
  {
    id: 'c5',
    name: 'Jessica Lee',
    role: 'Frontend Developer',
    score: 81,
    skills: ['Vue.js', 'Tailwind CSS', 'JavaScript', 'Firebase'],
    topProject: {
      title: 'Social Media Dashboard',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400'
    },
    hasVerifiedProof: true,
    email: 'jess.lee@example.com',
    isOpenToWork: true,
    experienceLevel: 'Student',
    location: 'Toronto, CA'
  },
  {
    id: 'c6',
    name: 'Tom Bradley',
    role: 'Mobile Developer',
    score: 55,
    skills: ['React RN', 'Swift', 'Kotlin', 'GraphQL'],
    topProject: {
      title: 'Fitness Tracking App',
      thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=400'
    },
    hasVerifiedProof: false,
    email: 'tom.b@example.com',
    isOpenToWork: true,
    experienceLevel: '1-3 yrs',
    location: 'Remote'
  },
  {
    id: 'c7',
    name: 'John Minimalist',
    role: 'Frontend Developer',
    score: 42,
    skills: ['HTML', 'CSS'],
    topProject: {
      title: 'Static Page',
      thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=400'
    },
    hasVerifiedProof: false,
    email: 'john.m@example.com',
    isOpenToWork: true,
    experienceLevel: 'Student',
    location: 'Remote'
  }
];

export default function RecruiterDashboard() {
  const { 
    accessMode, setAccessMode, approvedEmails, waitlist, approveWaitlistEntry,
    isRecruiterOnboarded 
  } = useAccess();
  const { jobs, applications, postJob, updateApplicationStatus } = useFreelance();
  const { profile } = useProfile();
  const router = useRouter();

  // Role check
  useEffect(() => {
    // Only redirect if we are NOT signing out (handled by Navbar)
    if (!profile.userRole && typeof window !== 'undefined' && window.location.pathname !== '/') {
       const protectedPaths = ['/dashboard', '/onboarding', '/recruiter/dashboard', '/recruiter/onboarding'];
       if (protectedPaths.includes(window.location.pathname)) {
          router.push('/role-selection');
       }
    }
  }, [profile.userRole, router]);
  
  const [activeTab, setActiveTab] = useState<'discovery' | 'saved' | 'freelance' | 'admin'>('discovery');
  
  // Job Post State
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    expectedOutcomes: '',
    budget: '',
    requiredSkills: [] as string[]
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [minScore, setMinScore] = useState(0);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [showQualifiedOnly, setShowQualifiedOnly] = useState(true);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Simplified auth simulation for prototype
  const [simulatedEmail, setSimulatedEmail] = useState('');
  const isApproved = useMemo(() => {
    if (accessMode === 'OPEN' || isRecruiterOnboarded) return true;
    return approvedEmails.includes(simulatedEmail);
  }, [accessMode, approvedEmails, simulatedEmail, isRecruiterOnboarded]);

  const handlePostJob = () => {
    if (!newJob.title || !newJob.description) return;
    postJob({
      ...newJob,
      postedBy: profile.companyName || 'Acme Inc.', // Fallback
      requiredSkills: newJob.requiredSkills
    });
    setIsPostJobModalOpen(false);
    setNewJob({ title: '', description: '', expectedOutcomes: '', budget: '', requiredSkills: [] });
  };

  const toggleSkill = (skill: string) => {
    setNewJob(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.includes(skill)
        ? prev.requiredSkills.filter(s => s !== skill)
        : [...prev.requiredSkills, skill]
    }));
  };

  useEffect(() => {
    if (accessMode !== 'OPEN' && !isApproved && activeTab !== 'admin') {
      // Access Required logic handled via overlay
    }
  }, [accessMode, isApproved, activeTab]);

  const toggleSave = (id: string) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredCandidates = useMemo(() => {
    let base = activeTab === 'discovery' ? [...MOCK_CANDIDATES] : MOCK_CANDIDATES.filter(c => savedIds.includes(c.id));
    
    // Filtering
    let filtered = base.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const isQualified = c.score >= 60 || c.hasVerifiedProof;
      const matchesQualification = showQualifiedOnly ? isQualified : true;
      const matchesScore = c.score >= minScore;
      const matchesVerified = onlyVerified ? c.hasVerifiedProof : true;
      
      return matchesSearch && matchesQualification && matchesScore && matchesVerified;
    });

    // Sorting
    return filtered.sort((a, b) => {
      // Primary Sort: Score (Desc)
      if (b.score !== a.score) return b.score - a.score;
      // Secondary: Verified first
      if (b.hasVerifiedProof !== a.hasVerifiedProof) return b.hasVerifiedProof ? 1 : -1;
      return 0;
    });
  }, [activeTab, searchQuery, minScore, onlyVerified, showQualifiedOnly, savedIds]);

  return (
    <main className="spotlight" style={{ minHeight: '100vh', padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Access Restricted Overlay */}
        {accessMode !== 'OPEN' && !isApproved && (
           <div style={{ 
             position: 'fixed', inset: 0, zIndex: 1000, 
             backgroundColor: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)',
             display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
           }}>
             <div className="card" style={{ maxWidth: '450px', padding: '3rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🔒</div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>Restricted Access</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                  {accessMode === 'INVITE_ONLY' 
                    ? "SkillGraph Recruiter Hub is currently Invite Only. Please log in with an approved email or join the waitlist."
                    : "Access is limited to approved partners. Please join the waitlist to get started."}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input 
                    type="email" 
                    placeholder="Enter your approved email..."
                    value={simulatedEmail}
                    onChange={e => setSimulatedEmail(e.target.value)}
                    style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white' }}
                  />
                  <Link href="/recruiter/waitlist" className="btn-accent" style={{ padding: '1rem' }}>Join Waitlist</Link>
                  <button onClick={() => setIsAdminPanelOpen(true)} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}>Admin Controls (Testing Only)</button>
                </div>
             </div>
           </div>
        )}

        {/* Admin Floating Control (Prototype Only) */}
        <button 
          onClick={() => setIsAdminPanelOpen(true)}
          style={{ 
            position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 200,
            width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--foreground)',
            color: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)', border: 'none', cursor: 'pointer'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </button>

        {/* Admin Panel Modal */}
        <AnimatePresence>
          {isAdminPanelOpen && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsAdminPanelOpen(false)}
                style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)' }}
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="card"
                style={{ width: '100%', maxWidth: '800px', position: 'relative', zIndex: 1, maxHeight: '80vh', overflowY: 'auto', padding: '3rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Admin Controls</h2>
                  <button onClick={() => setIsAdminPanelOpen(false)} className="btn-outline" style={{ padding: '0.5rem 1rem' }}>Close</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                  {/* Mode Switcher */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Access Mode</h3>
                    {(['OPEN', 'INVITE_ONLY', 'WAITLIST'] as AccessMode[]).map(mode => (
                      <button 
                        key={mode}
                        onClick={() => setAccessMode(mode)}
                        style={{ 
                          padding: '1.25rem', borderRadius: '16px', textAlign: 'left',
                          border: accessMode === mode ? '2px solid var(--accent)' : '1px solid var(--border)',
                          backgroundColor: accessMode === mode ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                          color: accessMode === mode ? 'white' : 'var(--text-muted)',
                          cursor: 'pointer', transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.25rem' }}>{mode.replace('_', ' ')}</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                          {mode === 'OPEN' && 'Anyone can access immediately.'}
                          {mode === 'INVITE_ONLY' && 'Only pre-approved emails can enter.'}
                          {mode === 'WAITLIST' && 'All new users go to waitlist first.'}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Waitlist Management */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Pending Waitlist ({waitlist.filter(e => e.status === 'PENDING').length})</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {waitlist.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No entries found.</p>
                      ) : (
                        waitlist.map(entry => (
                          <div key={entry.id} style={{ 
                            padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)', 
                            backgroundColor: 'rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                          }}>
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{entry.name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>{entry.company} • {entry.role}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{entry.email}</div>
                            </div>
                            {entry.status === 'PENDING' ? (
                              <button 
                                onClick={() => approveWaitlistEntry(entry.id)}
                                style={{ backgroundColor: 'var(--success)', color: 'white', border: 'none', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}
                              >
                                Approve
                              </button>
                            ) : (
                              <span style={{ color: 'var(--success)', fontSize: '0.75rem', fontWeight: 800 }}>Approved</span>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        
        {/* Header Area */}
        <div style={{ marginBottom: '4rem' }} className="animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '0.5rem' }}>
                Recruiter Hub
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Find verified top talent with proof-based portfolios.</p>
            </div>
            
            {/* Tabs */}
            <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.4rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <button 
                onClick={() => setActiveTab('discovery')}
                style={{ 
                  padding: '0.8rem 1.5rem', borderRadius: '12px', border: 'none',
                  backgroundColor: activeTab === 'discovery' ? 'var(--accent)' : 'transparent',
                  color: activeTab === 'discovery' ? 'white' : 'var(--text-muted)',
                  fontWeight: 800, cursor: 'pointer', transition: 'all 0.3s'
                }}
              >
                Candidate Discovery
              </button>
              <button 
                onClick={() => setActiveTab('saved')}
                style={{ 
                  padding: '0.8rem 1.5rem', borderRadius: '12px', border: 'none',
                  backgroundColor: activeTab === 'saved' ? 'var(--accent)' : 'transparent',
                  color: activeTab === 'saved' ? 'white' : 'var(--text-muted)',
                  fontWeight: 800, cursor: 'pointer', transition: 'all 0.3s'
                }}
              >
                Saved ({savedIds.length})
              </button>
              <button 
                onClick={() => setActiveTab('freelance')}
                style={{ 
                  padding: '0.8rem 1.5rem', borderRadius: '12px', border: 'none',
                  backgroundColor: activeTab === 'freelance' ? 'var(--accent)' : 'transparent',
                  color: activeTab === 'freelance' ? 'white' : 'var(--text-muted)',
                  fontWeight: 800, cursor: 'pointer', transition: 'all 0.3s',
                  display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}
              >
                Freelance Marketplace
                <span style={{ fontSize: '0.7rem', backgroundColor: 'var(--success)', color: 'white', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>LIVE</span>
              </button>
              <button 
                onClick={() => setActiveTab('admin')}
                style={{ 
                  padding: '0.8rem 1.5rem', borderRadius: '12px', border: 'none',
                  backgroundColor: activeTab === 'admin' ? 'var(--accent)' : 'transparent',
                  color: activeTab === 'admin' ? 'white' : 'var(--text-muted)',
                  fontWeight: 800, cursor: 'pointer', transition: 'all 0.3s'
                }}
              >
                Access Management
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'freelance' ? (
              <motion.div key="freelance" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                       <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Your Job Postings</h2>
                       <p style={{ color: 'var(--text-muted)' }}>Manage your freelance gigs and applicants.</p>
                    </div>
                    <button onClick={() => setIsPostJobModalOpen(true)} className="btn-accent" style={{ padding: '1rem 2rem' }}>
                       + Post New Gig
                    </button>
                 </div>

                 <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {jobs.filter(j => j.postedBy === (profile.companyName || 'Acme Inc.') || j.postedBy === 'CyberScale AI').map(job => {
                       const jobApps = applications.filter(a => a.jobId === job.id);
                       
                       // Matching System Logic
                       const suggestedCandidates = MOCK_CANDIDATES.filter(c => {
                          // Check if they have at least one matching skill
                          const hasMatchingSkill = job.requiredSkills.some(s => c.skills.includes(s));
                          // Higher score candidates first
                          return hasMatchingSkill && c.score > 60;
                       }).sort((a, b) => b.score - a.score).slice(0, 3);
                       
                       return (
                          <div key={job.id} className="card" style={{ padding: '2.5rem' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                                <div>
                                   <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                      <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{job.title}</h3>
                                      <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '100px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent)', fontWeight: 800 }}>
                                         {job.status}
                                      </span>
                                   </div>
                                   <div style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>{job.budget} • {jobApps.length} Applicants</div>
                                </div>
                             </div>

                             {/* Matching System / Suggestions */}
                             <div style={{ marginBottom: '2.5rem', padding: '1.5rem', backgroundColor: 'rgba(59, 130, 246, 0.03)', borderRadius: '16px', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                   <span style={{ fontSize: '1.2rem' }}>🎯</span>
                                   <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>Smart Match Suggestions</h4>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                                   {suggestedCandidates.map(c => (
                                      <div key={c.id} style={{ minWidth: '200px', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--card-bg)' }}>
                                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{c.name}</span>
                                            <span style={{ color: 'var(--success)', fontWeight: 900, fontSize: '0.75rem' }}>{c.score}</span>
                                         </div>
                                         <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{c.role}</div>
                                         <button className="btn-outline" style={{ width: '100%', padding: '0.4rem', fontSize: '0.75rem' }}>Invite to Apply</button>
                                      </div>
                                   ))}
                                </div>
                             </div>

                             <div style={{ marginBottom: '2.5rem' }}>
                                <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                   Applicants
                                   <span style={{ fontSize: '0.7rem', backgroundColor: 'var(--border)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>Proof-Verified</span>
                                </h4>
                                
                                {jobApps.length === 0 ? (
                                   <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', padding: '2rem', textAlign: 'center', border: '1px dashed var(--border)', borderRadius: '12px' }}>
                                      No applicants yet. We're matching you with the best talent...
                                   </p>
                                ) : (
                                   <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                      {jobApps.map(app => (
                                         <div key={app.id} style={{ 
                                            padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)', 
                                            backgroundColor: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                         }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                               <div style={{ 
                                                  width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--accent)',
                                                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800, color: 'white'
                                               }}>
                                                  {app.candidateName[0]}
                                               </div>
                                               <div>
                                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                     <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>{app.candidateName}</span>
                                                     <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--success)' }}>SCORE: {app.candidateScore}</span>
                                                  </div>
                                                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>"{app.pitch}"</p>
                                               </div>
                                            </div>

                                            {/* Proof Snapshot */}
                                            {app.candidateTopProject && (
                                               <div style={{ 
                                                  display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', 
                                                  backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border)',
                                                  maxWidth: '300px'
                                               }}>
                                                  <img 
                                                     src={app.candidateTopProject.thumbnail} 
                                                     alt={app.candidateTopProject.title}
                                                     style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
                                                  />
                                                  <div style={{ overflow: 'hidden' }}>
                                                     <div style={{ fontSize: '0.8rem', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{app.candidateTopProject.title}</div>
                                                     <div style={{ fontSize: '0.7rem', color: 'var(--success)', fontWeight: 700 }}>Proof Attached ✓</div>
                                                  </div>
                                               </div>
                                            )}

                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                               <select 
                                                  value={app.status}
                                                  onChange={(e) => updateApplicationStatus(app.id, e.target.value as ApplicationStatus)}
                                                  style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'white', fontWeight: 600 }}
                                               >
                                                  <option value="APPLIED">Applied</option>
                                                  <option value="SHORTLISTED">Shortlisted</option>
                                                  <option value="HIRED">Hired</option>
                                                  <option value="REJECTED">Rejected</option>
                                               </select>
                                               <Link href={`/${app.candidateName.toLowerCase().replace(/\s+/g, '-')}`} target="_blank" className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                                                  View Profile
                                               </Link>
                                            </div>
                                         </div>
                                      ))}
                                   </div>
                                )}
                             </div>
                          </div>
                       );
                    })}
                 </div>
              </motion.div>
            ) : activeTab === 'saved' ? (
              <motion.div key="saved" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div style={{ marginBottom: '3rem' }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Saved Candidates</h2>
                  <p style={{ color: 'var(--text-muted)' }}>Top talent you've bookmarked for later.</p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
                  {MOCK_CANDIDATES.filter(c => savedIds.includes(c.id)).map(c => (
                    <CandidateCard 
                      key={c.id} 
                      candidate={c} 
                      isSaved={true}
                      onToggleSave={toggleSave}
                    />
                  ))}
                  {savedIds.length === 0 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '6rem 0', border: '1px dashed var(--border)', borderRadius: '24px' }}>
                      <p style={{ color: 'var(--text-muted)' }}>No saved candidates yet. Go to Discovery to find top talent.</p>
                      <button onClick={() => setActiveTab('discovery')} className="btn-accent" style={{ marginTop: '1.5rem' }}>Go to Discovery</button>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : activeTab === 'admin' ? (
               <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div style={{ marginBottom: '3rem' }}>
                     <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Access Management</h2>
                     <p style={{ color: 'var(--text-muted)' }}>Manage recruiter whitelists and waitlist requests.</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                     <div className="card" style={{ padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem' }}>Whitelisted Domains</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                           {approvedEmails.map(email => (
                              <div key={email} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                 <span style={{ fontWeight: 600 }}>{email}</span>
                                 <span style={{ color: 'var(--success)', fontSize: '0.75rem', fontWeight: 800 }}>ACTIVE</span>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="card" style={{ padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem' }}>Waitlist Requests</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                           {waitlist.length === 0 ? (
                              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No pending requests.</p>
                           ) : (
                              waitlist.map(entry => (
                                 <div key={entry.email} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                    <div>
                                       <div style={{ fontWeight: 800 }}>{entry.name}</div>
                                       <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{entry.email}</div>
                                    </div>
                                    <button onClick={() => approveWaitlistEntry(entry.id)} className="btn-accent" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Approve</button>
                                 </div>
                              ))
                           )}
                        </div>
                     </div>
                  </div>
               </motion.div>
            ) : (
              <motion.div key="discovery" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Search & Filters */}
                <div style={{ 
                  display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', 
                  backgroundColor: 'var(--card-bg)', padding: '1.5rem', borderRadius: '24px', border: '1px solid var(--border)',
                  marginBottom: '4rem'
                }}>
                  <div style={{ flex: 2, position: 'relative' }}>
                    <input 
                      type="text" 
                      placeholder="Search by role, skill, or name..." 
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      style={{ 
                        width: '100%', padding: '1rem 1rem 1rem 3rem', backgroundColor: 'rgba(255,255,255,0.03)', 
                        border: '1px solid var(--border)', borderRadius: '14px', color: 'white', fontSize: '1rem' 
                      }}
                    />
                    <svg style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <select 
                      value={minScore} 
                      onChange={e => setMinScore(Number(e.target.value))}
                      style={{ 
                        padding: '0.8rem 1rem', backgroundColor: '#1a1a1a', border: '1px solid var(--border)', 
                        borderRadius: '14px', color: 'white', fontWeight: 600, cursor: 'pointer' 
                      }}
                    >
                      <option value={0} style={{ backgroundColor: '#1a1a1a' }}>Any Score</option>
                      <option value={60} style={{ backgroundColor: '#1a1a1a' }}>Score 60+</option>
                      <option value={70} style={{ backgroundColor: '#1a1a1a' }}>Score 70+ (Hire Ready)</option>
                      <option value={80} style={{ backgroundColor: '#1a1a1a' }}>Score 80+</option>
                      <option value={90} style={{ backgroundColor: '#1a1a1a' }}>Score 90+ (Top Talent)</option>
                    </select>

                    <button 
                      onClick={() => setOnlyVerified(!onlyVerified)}
                      style={{ 
                        padding: '0.8rem 1.25rem', borderRadius: '14px', border: '1px solid var(--border)',
                        backgroundColor: onlyVerified ? 'var(--success)' : 'transparent',
                        color: onlyVerified ? 'white' : 'var(--text-muted)',
                        fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                      }}
                    >
                      {onlyVerified && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                      Verified Proof
                    </button>

                    <button 
                      onClick={() => setShowQualifiedOnly(!showQualifiedOnly)}
                      style={{ 
                        padding: '0.8rem 1.25rem', borderRadius: '14px', border: '1px solid var(--border)',
                        backgroundColor: showQualifiedOnly ? 'var(--accent)' : 'transparent',
                        color: showQualifiedOnly ? 'white' : 'var(--text-muted)',
                        fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s'
                      }}
                    >
                      {showQualifiedOnly ? 'Show Qualified Only (ON)' : 'Show All Candidates'}
                    </button>
                  </div>
                </div>

                {/* Candidate Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }} className="animate-fade-in">
                  <AnimatePresence>
                    {filteredCandidates.length > 0 ? (
                      filteredCandidates.map(c => (
                        <CandidateCard 
                          key={c.id} 
                          candidate={c} 
                          isSaved={savedIds.includes(c.id)}
                          onToggleSave={toggleSave}
                        />
                      ))
                    ) : (
                      <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '6rem 0' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>No candidates found</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or search query.</p>
                        <button 
                          onClick={() => { setSearchQuery(''); setMinScore(0); setOnlyVerified(false); }}
                          style={{ marginTop: '1.5rem', color: 'var(--accent)', fontWeight: 800, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          Clear all filters
                        </button>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Post Job Modal */}
          <AnimatePresence>
             {isPostJobModalOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                   <motion.div 
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     onClick={() => setIsPostJobModalOpen(false)}
                     style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
                   />
                   <motion.div 
                     initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                     className="card"
                     style={{ width: '100%', maxWidth: '600px', position: 'relative', zIndex: 1, padding: '3rem', maxHeight: '90vh', overflowY: 'auto' }}
                   >
                      <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem' }}>Post Freelance Gig</h2>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                         <div>
                            <label className="input-label">Gig Title</label>
                            <input 
                               type="text" className="input-field" placeholder="e.g. 3D Interaction Designer"
                               value={newJob.title} onChange={e => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                            />
                         </div>
                         <div>
                            <label className="input-label">Description (What outcome are you looking for?)</label>
                            <textarea 
                               className="input-field" rows={3} placeholder="e.g. Build a high-converting 3D landing page for our new AI product."
                               value={newJob.description} onChange={e => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                               style={{ resize: 'none' }}
                            />
                         </div>
                         <div>
                            <label className="input-label">Expected Outcomes (Be specific)</label>
                            <textarea 
                               className="input-field" rows={2} placeholder="e.g. 60fps Spline animation, mobile-responsive, <2s load time."
                               value={newJob.expectedOutcomes} onChange={e => setNewJob(prev => ({ ...prev, expectedOutcomes: e.target.value }))}
                               style={{ resize: 'none' }}
                            />
                         </div>
                         <div>
                            <label className="input-label">Budget Range</label>
                            <input 
                               type="text" className="input-field" placeholder="e.g. $2,000 - $3,500"
                               value={newJob.budget} onChange={e => setNewJob(prev => ({ ...prev, budget: e.target.value }))}
                            />
                         </div>
                         <div>
                            <label className="input-label">Required Skills</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                               {['Next.js', 'React', 'Three.js', 'Spline', 'Framer Motion', 'TypeScript', 'Tailwind CSS'].map(skill => (
                                  <button 
                                     key={skill}
                                     onClick={() => toggleSkill(skill)}
                                     style={{ 
                                        padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border)',
                                        backgroundColor: newJob.requiredSkills.includes(skill) ? 'var(--accent)' : 'rgba(255,255,255,0.03)',
                                        color: newJob.requiredSkills.includes(skill) ? 'white' : 'var(--text-muted)',
                                        fontSize: '0.8rem', fontWeight: 600
                                     }}
                                  >
                                     {skill}
                                  </button>
                               ))}
                            </div>
                         </div>
                      </div>

                      <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
                         <button onClick={() => setIsPostJobModalOpen(false)} className="btn-outline" style={{ flex: 1, padding: '1rem' }}>Cancel</button>
                         <button onClick={handlePostJob} className="btn-accent" style={{ flex: 2, padding: '1rem' }} disabled={!newJob.title || !newJob.description}>Post Gig</button>
                      </div>
                   </motion.div>
                </div>
             )}
          </AnimatePresence>
        </div>
      </div>
    </main>
    );
}
