"use client";

import React from 'react';
import { useProfile, Project, UserProfile } from '@/context/ProfileContext';
import { HireScoreGauge } from '@/components/HireScoreGauge';
import { ProjectCard } from '@/components/ProjectCard';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShareModal } from '@/components/ShareModal';
import { GrowthTimeline } from '@/components/GrowthTimeline';
import { AIReviewModal } from '@/components/AIReviewModal';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { RecruiterAnalytics } from '@/components/RecruiterAnalytics';
import { ReferralCard } from '@/components/ReferralCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useFreelance, Job } from '@/context/FreelanceContext';

export default function Dashboard() {
  const { profile, setProfile } = useProfile();
  const router = useRouter();
  // Role check
  React.useEffect(() => {
    // Only redirect if we are NOT signing out (handled by Navbar)
    if (!profile.userRole && typeof window !== 'undefined' && window.location.pathname !== '/') {
       // Check if we are on a protected page
       const protectedPaths = ['/dashboard', '/onboarding', '/recruiter/dashboard', '/recruiter/onboarding'];
       if (protectedPaths.includes(window.location.pathname)) {
          router.push('/role-selection');
       }
    }
  }, [profile.userRole, router]);

  const [activeTab, setActiveTab] = React.useState<'overview' | 'freelance'>('overview');
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);
  const [selectedReviewProject, setSelectedReviewProject] = React.useState<Project | null>(null);
  const [isAIReviewOpen, setIsAIReviewOpen] = React.useState(false);
  const [isBrandingModalOpen, setIsBrandingModalOpen] = React.useState(false);
  
  // Freelance State
  const { jobs, applications, applyToJob } = useFreelance();
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
  const [pitch, setPitch] = React.useState('');
  const [isApplyModalOpen, setIsApplyModalOpen] = React.useState(false);

  const handleOpenReview = (project: Project) => {
    setSelectedReviewProject(project);
    setIsAIReviewOpen(true);
  };

  const handleAIAccept = (enhancedData: Partial<UserProfile>, enhancedProject: Project) => {
    setProfile(prev => ({
      ...prev,
      ...enhancedData,
      projects: prev.projects.map(p => p.id === enhancedProject.id ? enhancedProject : p)
    }));
    setIsAIReviewOpen(false);
  };

  const handleApply = () => {
    if (!selectedJob) return;
    
    // Use the first project as the "Top Project" for the application snapshot
    const topProject = profile.projects[0];
    
    applyToJob({
      jobId: selectedJob.id,
      candidateId: profile.name.toLowerCase().replace(/\s+/g, '-'),
      candidateName: profile.name,
      candidateScore: profile.score,
      candidateTopProject: topProject ? {
        title: topProject.title,
        thumbnail: topProject.thumbnail,
        outcome: topProject.outcome
      } : undefined,
      pitch: pitch
    });
    setIsApplyModalOpen(false);
    setPitch('');
    setSelectedJob(null);
  };

  return (
    <main className="spotlight" style={{ minHeight: '100vh', padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', marginBottom: '4rem' }} className="animate-fade-in">
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '0.5rem' }}>
              Dashboard
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Welcome back, {profile.name.split(' ')[0]}. Here's your impact overview.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={() => setIsBrandingModalOpen(true)}
              className="btn-outline" 
              style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path></svg>
              Edit Branding
            </button>
            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="btn-outline" 
              style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
              Share Profile
            </button>
            <Link href={`/${profile.name.toLowerCase().replace(/\s+/g, '-')}`} className="btn-accent" style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              Live Public Profile
            </Link>
          </div>
        </div>


        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
          <button 
            onClick={() => setActiveTab('overview')}
            style={{ 
              fontSize: '1.1rem', fontWeight: 800, padding: '0.5rem 1rem', 
              color: activeTab === 'overview' ? 'var(--foreground)' : 'var(--text-muted)',
              borderBottom: activeTab === 'overview' ? '2px solid var(--accent)' : 'none'
            }}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('freelance')}
            style={{ 
              fontSize: '1.1rem', fontWeight: 800, padding: '0.5rem 1rem', 
              color: activeTab === 'freelance' ? 'var(--foreground)' : 'var(--text-muted)',
              borderBottom: activeTab === 'freelance' ? '2px solid var(--accent)' : 'none',
              display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}
          >
            Freelance Marketplace
            <span style={{ fontSize: '0.7rem', backgroundColor: 'var(--accent)', color: 'white', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>NEW</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' ? (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {/* AI Enhanced Identity Section */}
              {(profile.bio || profile.suggestedRoles) && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ 
                    backgroundColor: 'rgba(59, 130, 246, 0.03)', 
                    border: '1px solid var(--border)', 
                    borderRadius: '24px', 
                    padding: '2rem', 
                    marginBottom: '3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    position: 'relative'
                  }}
                >
                  {profile.bio && (
                    <span style={{ 
                      position: 'absolute', top: '-0.75rem', left: '2rem', 
                      backgroundColor: 'var(--accent)', color: 'white', fontSize: '0.6rem', 
                      fontWeight: 900, padding: '0.2rem 0.6rem', borderRadius: '4px',
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                      zIndex: 1
                    }}>AI Professional Summary</span>
                  )}

                  {profile.bio && (
                    <div style={{ position: 'relative' }}>
                      <p style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, lineHeight: 1.5, color: 'var(--foreground)' }}>
                        "{profile.bio}"
                      </p>
                    </div>
                  )}
                  
                  {profile.suggestedRoles && profile.suggestedRoles.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>AI Suggested Targets:</span>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {profile.suggestedRoles.map(role => (
                          <span key={role} style={{ 
                            backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', 
                            padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700,
                            border: '1px solid rgba(139, 92, 246, 0.2)'
                          }}>{role}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) 2fr', gap: '2rem', marginBottom: '4rem', alignItems: 'start' }} className="animate-fade-in">
                <HireScoreGauge />
                <GrowthTimeline />
              </div>

              <div className="animate-fade-in" style={{ animationDelay: '0.2s', marginBottom: '4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>Recruiter Insights</h2>
                  <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--border)' }}></div>
                </div>
                <RecruiterAnalytics />
              </div>

              <div className="animate-fade-in" style={{ animationDelay: '0.3s', marginBottom: '6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>Network Growth</h2>
                  <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--border)' }}></div>
                </div>
                <ReferralCard />
              </div>

              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>Your Projects</h2>
                  <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--border)' }}></div>
                </div>
                
                {profile.projects.length === 0 ? (
                  <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--card-bg)', borderRadius: '24px', border: '1px dashed var(--border)' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No project proof found yet. Let's build your reputation.</p>
                    <Link href="/onboarding" className="btn-accent" style={{ marginTop: '1.5rem' }}>Add Your First Project</Link>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
                    {profile.projects.map(proj => (
                      <ProjectCard 
                        key={proj.id} 
                        project={proj} 
                        isOwner={true} 
                        onReview={handleOpenReview}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div key="freelance" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem', alignItems: 'start' }}>
                
                {/* Job Feed */}
                <div>
                  <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Recommended Gigs</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Based on your Hire Score and Project Proof.</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {jobs.map(job => {
                        const hasApplied = applications.some(a => a.jobId === job.id && a.candidateName === profile.name);
                        const app = applications.find(a => a.jobId === job.id && a.candidateName === profile.name);
                        
                        // Smart Match Logic
                        const matchingSkillsCount = job.requiredSkills.filter(s => profile.skills.includes(s)).length;
                        const isStrongMatch = matchingSkillsCount >= 2 && profile.score > 70;
                        
                        return (
                          <div key={job.id} className="card" style={{ padding: '2rem', border: isStrongMatch ? '1px solid var(--accent)' : '1px solid var(--border)', position: 'relative' }}>
                            {isStrongMatch && (
                               <div style={{ position: 'absolute', top: '-0.75rem', right: '1.5rem', backgroundColor: 'var(--accent)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase' }}>
                                  Strong Match ✨
                               </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div>
                              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.25rem' }}>{job.title}</h3>
                              <div style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 700 }}>{job.postedBy} • {job.budget}</div>
                            </div>
                            <div style={{ 
                              padding: '0.4rem 0.8rem', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                              color: 'var(--success)', fontSize: '0.75rem', fontWeight: 800 
                            }}>
                              Proof-Only Mode
                            </div>
                          </div>
                          
                          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>{job.description}</p>
                          
                          {job.expectedOutcomes && (
                             <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'rgba(59, 130, 246, 0.03)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Expected Outcomes</div>
                                <div style={{ fontSize: '0.9rem', color: 'white', fontWeight: 600 }}>{job.expectedOutcomes}</div>
                             </div>
                          )}
                          
                          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                            {job.requiredSkills.map(skill => (
                              <span key={skill} style={{ 
                                padding: '0.3rem 0.6rem', borderRadius: '6px', 
                                backgroundColor: profile.skills.includes(skill) ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.05)',
                                color: profile.skills.includes(skill) ? 'var(--accent)' : 'var(--text-muted)',
                                fontSize: '0.75rem', fontWeight: 700, border: '1px solid var(--border)'
                              }}>
                                {skill} {profile.skills.includes(skill) && '✓'}
                              </span>
                            ))}
                          </div>

                          {hasApplied ? (
                            <div style={{ 
                              display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', 
                              backgroundColor: 'rgba(16, 185, 129, 0.05)', borderRadius: '12px', border: '1px solid var(--success)'
                            }}>
                              <div style={{ color: 'var(--success)', fontWeight: 800 }}>Applied</div>
                              <div style={{ height: '20px', width: '1px', backgroundColor: 'var(--border)' }}></div>
                              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Status: <span style={{ color: 'white', fontWeight: 700 }}>{app?.status}</span></div>
                            </div>
                          ) : (
                            <button 
                              onClick={() => { setSelectedJob(job); setIsApplyModalOpen(true); }}
                              className="btn-accent" 
                              style={{ width: '100%', padding: '1rem' }}
                            >
                              Apply with SkillGraph Profile
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Freelance Stats/Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                   <div className="card" style={{ padding: '2rem' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>Your Status</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Active Applications</span>
                            <span style={{ fontWeight: 800 }}>{applications.filter(a => a.candidateName === profile.name).length}</span>
                         </div>
                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Shortlisted</span>
                            <span style={{ fontWeight: 800, color: 'var(--accent)' }}>{applications.filter(a => a.candidateName === profile.name && a.status === 'SHORTLISTED').length}</span>
                         </div>
                      </div>
                   </div>

                    <div className="card" style={{ padding: '2rem', border: '1px solid var(--accent)', backgroundColor: 'rgba(59, 130, 246, 0.03)', position: 'relative', overflow: 'hidden' }}>
                       <div style={{ position: 'absolute', top: '-1rem', right: '-1rem', fontSize: '4rem', opacity: 0.1 }}>🛡️</div>
                       <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✨</div>
                       <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Proof Advantage</h3>
                       <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                         Your verified outcomes give you a <span style={{ color: 'var(--success)', fontWeight: 800 }}>3.4x higher</span> visibility to recruiters than unverified candidates.
                       </p>
                       <div style={{ padding: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid var(--success)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--success)', textAlign: 'center' }}>
                          Verified Status: ACTIVE
                       </div>
                    </div>
                </div>

                {/* Status Tracking / Active Applications */}
                <div style={{ marginTop: '4rem', gridColumn: '1 / -1' }}>
                   <div style={{ marginBottom: '2rem' }}>
                      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Active Applications</h2>
                      <p style={{ color: 'var(--text-muted)' }}>Track your progress from Applied to Hired.</p>
                   </div>

                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '1.5rem' }}>
                      {applications.filter(a => a.candidateName === profile.name).map(app => {
                         const job = jobs.find(j => j.id === app.jobId);
                         if (!job) return null;

                         return (
                            <div key={app.id} className="card" style={{ padding: '2rem' }}>
                               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
                                  <div style={{ flex: 1 }}>
                                     <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{job.title}</div>
                                     <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{job.postedBy} • {job.budget}</div>
                                  </div>
                                  
                                  {/* Progress Visual */}
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                     {['APPLIED', 'SHORTLISTED', 'HIRED'].map((step, idx) => {
                                        const isCompleted = ['APPLIED', 'SHORTLISTED', 'HIRED', 'REJECTED'].indexOf(app.status) >= idx;
                                        const isCurrent = app.status === step;
                                        const isRejected = app.status === 'REJECTED';
                                        
                                        return (
                                           <React.Fragment key={step}>
                                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                                                 <div style={{ 
                                                    width: '28px', height: '28px', borderRadius: '50%', 
                                                    backgroundColor: isRejected ? 'rgba(239, 68, 68, 0.1)' : (isCompleted ? 'var(--accent)' : 'rgba(255,255,255,0.03)'),
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: isRejected ? '#ef4444' : (isCompleted ? 'white' : 'var(--text-muted)'),
                                                    border: isCurrent ? '2px solid white' : 'none',
                                                    boxShadow: isCurrent ? '0 0 15px var(--accent-glow)' : 'none',
                                                    fontSize: '0.7rem'
                                                 }}>
                                                    {isRejected ? '✕' : (isCompleted ? '✓' : idx + 1)}
                                                 </div>
                                                 <span style={{ fontSize: '0.55rem', fontWeight: 800, color: isCompleted ? 'var(--foreground)' : 'var(--text-muted)', textTransform: 'uppercase' }}>{step}</span>
                                              </div>
                                              {idx < 2 && (
                                                 <div style={{ width: '20px', height: '2px', backgroundColor: isCompleted && !isRejected && ['APPLIED', 'SHORTLISTED', 'HIRED'].indexOf(app.status) > idx ? 'var(--accent)' : 'var(--border)', marginTop: '-1rem' }}></div>
                                              )}
                                           </React.Fragment>
                                        );
                                     })}
                                  </div>
                               </div>
                            </div>
                         );
                      })}
                      {applications.filter(a => a.candidateName === profile.name).length === 0 && (
                         <div style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center', border: '1px dashed var(--border)', borderRadius: '24px', color: 'var(--text-muted)' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📋</div>
                            No active applications yet. Start applying to gigs!
                         </div>
                      )}
                   </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
      />

      {selectedReviewProject && (
        <AIReviewModal 
          isOpen={isAIReviewOpen} 
          onClose={() => setIsAIReviewOpen(false)} 
          onAccept={handleAIAccept}
          baseProject={selectedReviewProject}
          baseName={profile.name}
          baseRole={profile.role}
        />
      )}

      <ThemeSwitcher 
        isOpen={isBrandingModalOpen} 
        onClose={() => setIsBrandingModalOpen(false)} 
      />

      {/* Apply Modal */}
      <AnimatePresence>
        {isApplyModalOpen && selectedJob && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               onClick={() => setIsApplyModalOpen(false)}
               style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
             />
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
               className="card"
               style={{ width: '100%', maxWidth: '500px', position: 'relative', zIndex: 1, padding: '3rem' }}
             >
                <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>Pitch for {selectedJob.title}</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Your Hire Score ({profile.score}) and Projects will be sent automatically.</p>
                
                <div style={{ marginBottom: '2rem' }}>
                   <label className="input-label">1-Line Pitch</label>
                   <textarea 
                     className="input-field"
                     rows={3}
                     placeholder="e.g. I've built 5+ production-grade 3D landing pages using Spline and Next.js."
                     value={pitch}
                     onChange={e => setPitch(e.target.value)}
                     style={{ resize: 'none' }}
                   />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                   <button onClick={() => setIsApplyModalOpen(false)} className="btn-outline" style={{ flex: 1, padding: '1rem' }}>Cancel</button>
                   <button onClick={handleApply} className="btn-accent" style={{ flex: 2, padding: '1rem' }} disabled={!pitch}>Send Application</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
