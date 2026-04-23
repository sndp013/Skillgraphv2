"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export type Candidate = {
  id: string;
  name: string;
  role: string;
  score: number;
  skills: string[];
  topProject: {
    title: string;
    thumbnail: string;
  };
  hasVerifiedProof: boolean;
  email: string;
  isOpenToWork?: boolean;
  experienceLevel?: string;
  location?: string;
};

interface CandidateCardProps {
  candidate: Candidate;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export function CandidateCard({ candidate, isSaved, onToggleSave }: CandidateCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      style={{ 
        backgroundColor: 'var(--card-bg)', 
        border: '1px solid var(--border)', 
        borderRadius: '24px', 
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        position: 'relative'
      }}
    >
      {/* "Open to Work" Badge */}
      {candidate.isOpenToWork && (
        <div style={{ 
          position: 'absolute', top: '1rem', left: '1rem', zIndex: 10,
          backgroundColor: 'var(--accent)', color: 'white', 
          padding: '0.3rem 0.75rem', borderRadius: '20px', fontSize: '0.65rem', fontWeight: 900,
          textTransform: 'uppercase', letterSpacing: '0.05em', border: '2px solid var(--card-bg)'
        }}>
          Open to Work
        </div>
      )}

      {/* Project Thumbnail Header */}
      <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
        <img 
          src={candidate.topProject.thumbnail} 
          alt={candidate.topProject.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ 
          position: 'absolute', bottom: 0, left: 0, right: 0, 
          padding: '1rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
          color: 'white', fontSize: '0.8rem', fontWeight: 700
        }}>
          Top Project: {candidate.topProject.title}
        </div>
        {candidate.hasVerifiedProof && (
          <div style={{ 
            position: 'absolute', top: '1rem', right: '1rem', 
            backgroundColor: 'var(--success)', color: 'white', 
            padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 900,
            textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.3rem',
            boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)', border: '2px solid var(--card-bg)'
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Verified Proof
          </div>
        )}
      </div>

      {/* Candidate Info */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>{candidate.name}</h3>
            <p style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>{candidate.role}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ 
              fontSize: '1.25rem', fontWeight: 900, 
              color: candidate.score >= 70 ? 'var(--success)' : 'var(--accent)'
            }}>
              {candidate.score}
            </div>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>Score</div>
          </div>
        </div>

        {/* New Metadata: Exp & Location */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {candidate.location || 'Remote'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            {candidate.experienceLevel || 'Fresher'}
          </div>
        </div>

        {/* Skills */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {candidate.skills.slice(0, 3).map(skill => (
            <span key={skill} style={{ 
              backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', 
              padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)'
            }}>
              {skill}
            </span>
          ))}
          {candidate.skills.length > 3 && (
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>+{candidate.skills.length - 3}</span>
          )}
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem' }}>
          <Link 
            href={`/${candidate.name.toLowerCase().replace(/\s+/g, '-')}`} 
            style={{ 
              flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
              borderRadius: '12px', padding: '0.75rem', textAlign: 'center', fontSize: '0.85rem', fontWeight: 700,
              color: 'var(--foreground)', textDecoration: 'none', transition: 'all 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            Profile
          </Link>
          <button 
            onClick={() => onToggleSave(candidate.id)}
            style={{ 
              width: '45px', backgroundColor: isSaved ? 'var(--accent)' : 'rgba(255,255,255,0.05)', 
              border: isSaved ? 'none' : '1px solid var(--border)',
              borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={isSaved ? "white" : "none"} stroke={isSaved ? "white" : "currentColor"} strokeWidth="2.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          </button>
          <button 
            style={{ 
              flex: 2, backgroundColor: 'var(--accent)', color: 'white',
              border: 'none', borderRadius: '12px', padding: '0.75rem', fontSize: '0.85rem', fontWeight: 800,
              cursor: 'pointer', boxShadow: '0 4px 15px var(--accent-glow)'
            }}
            onClick={() => alert(`Contacting ${candidate.name} at ${candidate.email}`)}
          >
            Contact
          </button>
        </div>
      </div>
    </motion.div>
  );
}
