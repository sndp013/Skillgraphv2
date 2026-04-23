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
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { profile, setProfile } = useProfile();
  const router = useRouter();
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);
  const [selectedReviewProject, setSelectedReviewProject] = React.useState<Project | null>(null);
  const [isAIReviewOpen, setIsAIReviewOpen] = React.useState(false);
  const [isBrandingModalOpen, setIsBrandingModalOpen] = React.useState(false);

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
              gap: '1.5rem'
            }}
          >
            {profile.bio && (
              <div style={{ position: 'relative' }}>
                <span style={{ 
                  position: 'absolute', top: '-0.75rem', left: '1rem', 
                  backgroundColor: 'var(--accent)', color: 'white', fontSize: '0.6rem', 
                  fontWeight: 900, padding: '0.2rem 0.6rem', borderRadius: '4px',
                  textTransform: 'uppercase', letterSpacing: '0.05em'
                }}>AI Professional Summary</span>
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

        <div className="animate-fade-in" style={{ animationDelay: '0.2s', marginBottom: '6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>Recruiter Insights</h2>
            <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--border)' }}></div>
          </div>
          <RecruiterAnalytics />
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
    </main>
  );
}
