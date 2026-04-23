"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Candidate, CandidateCard } from '@/components/CandidateCard';

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
    skills: ['React Native', 'Swift', 'Kotlin', 'GraphQL'],
    topProject: {
      title: 'Fitness Tracking App',
      thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=400'
    },
    hasVerifiedProof: false,
    email: 'tom.b@example.com',
    isOpenToWork: true,
    experienceLevel: '1-3 yrs',
    location: 'Remote'
  }
];

export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState<'discovery' | 'saved'>('discovery');
  const [searchQuery, setSearchQuery] = useState('');
  const [minScore, setMinScore] = useState(0);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredCandidates = useMemo(() => {
    let base = activeTab === 'discovery' ? MOCK_CANDIDATES : MOCK_CANDIDATES.filter(c => savedIds.includes(c.id));
    
    return base.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesScore = c.score >= minScore;
      const matchesVerified = onlyVerified ? c.hasVerifiedProof : true;
      
      return matchesSearch && matchesScore && matchesVerified;
    });
  }, [activeTab, searchQuery, minScore, onlyVerified, savedIds]);

  return (
    <main className="spotlight" style={{ minHeight: '100vh', padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
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
            </div>
          </div>

          {/* Search & Filters */}
          <div style={{ 
            display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', 
            backgroundColor: 'var(--card-bg)', padding: '1.5rem', borderRadius: '24px', border: '1px solid var(--border)'
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
                style={{ padding: '0.8rem 1rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '14px', color: 'white', fontWeight: 600 }}
              >
                <option value={0}>Any Score</option>
                <option value={60}>Score 60+</option>
                <option value={70}>Score 70+ (Hire Ready)</option>
                <option value={80}>Score 80+</option>
                <option value={90}>Score 90+ (Top Talent)</option>
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
                Verified Proof Only
              </button>
            </div>
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

      </div>
    </main>
  );
}
