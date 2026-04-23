"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, UserProfile } from '@/context/ProfileContext';

interface AIReviewModalProps {
  isOpen: boolean;
  onAccept: (enhancedData: Partial<UserProfile>, enhancedProject: Project) => void;
  onClose: () => void;
  baseProject: Project;
  baseName: string;
  baseRole: string;
}

export function AIReviewModal({ isOpen, onAccept, onClose, baseProject, baseName, baseRole }: AIReviewModalProps) {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState('');
  const [enhancedDesc, setEnhancedDesc] = useState('');
  const [suggestedRoles, setSuggestedRoles] = useState<string[]>([]);

  const generateAIContent = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulate Professional Summary
      const summaries = [
        `${baseRole} dedicated to building high-performance solutions like ${baseProject.title}, with a focus on measurable impact and clean architecture.`,
        `Results-driven ${baseRole} specialized in leveraging modern tech stacks to solve complex product challenges and drive business outcomes.`,
        `Experienced in bridging the gap between product strategy and technical execution, demonstrated by the successful deployment of ${baseProject.title}.`
      ];
      setSummary(summaries[Math.floor(Math.random() * summaries.length)]);

      // Simulate Impact Description (Impact Format)
      setEnhancedDesc(`Leveraged ${baseProject.techStack.join(', ')} to address ${baseProject.problem.toLowerCase()} by architecting ${baseProject.solution.toLowerCase()}, resulting in ${baseProject.outcome.toLowerCase()}.`);

      // Simulate Suggested Roles
      const roles = [`Senior ${baseRole}`, `Lead ${baseRole}`, "Product Engineer", "Full Stack Developer"];
      setSuggestedRoles(roles.slice(0, 3));
      
      setLoading(false);
    }, 1800);
  };

  useEffect(() => {
    if (isOpen) generateAIContent();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
    }}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '32px',
          width: '90%', maxWidth: '650px', padding: '3rem', position: 'relative', boxShadow: '0 50px 100px -20px rgba(0,0,0,0.7)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '0.75rem', borderRadius: '12px', boxShadow: '0 0 20px var(--accent-glow)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
          </div>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>AI Enhancement Ready</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>We've optimized your profile for recruiter visibility.</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}
            >
              <div className="ai-loader"></div>
              <p style={{ color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem' }}>Analyzing Impact Metrics...</p>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
              {/* 1. Professional Summary */}
              <div style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '1.5rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>1. Professional Summary</span>
                <p style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '0.5rem', lineHeight: 1.5 }}>“{summary}”</p>
              </div>

              {/* 2. Impact Rewrite */}
              <div style={{ borderLeft: '3px solid var(--success)', paddingLeft: '1.5rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--success)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>2. Project Impact Format</span>
                <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: 1.6, fontStyle: 'italic' }}>“{enhancedDesc}”</p>
              </div>

              {/* 3. Suggested Roles */}
              <div style={{ borderLeft: '3px solid #8b5cf6', paddingLeft: '1.5rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.1em' }}>3. Suggested Targets</span>
                <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                  {suggestedRoles.map(role => (
                    <span key={role} style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700 }}>{role}</span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button 
                  onClick={generateAIContent}
                  style={{ flex: 1, padding: '1rem', backgroundColor: 'transparent', border: '1px solid var(--border)', borderRadius: '14px', color: 'var(--text-muted)', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  Regenerate
                </button>
                <button 
                  onClick={() => onAccept({ bio: summary, suggestedRoles: suggestedRoles }, { ...baseProject, enhancedSolution: enhancedDesc })}
                  style={{ flex: 2, padding: '1rem', backgroundColor: 'var(--accent)', color: 'white', borderRadius: '14px', border: 'none', fontWeight: 800, cursor: 'pointer', boxShadow: '0 10px 20px var(--accent-glow)' }}
                >
                  Accept & Complete Portfolio →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx>{`
          .ai-loader {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(59, 130, 246, 0.1);
            border-top: 4px solid var(--accent);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </motion.div>
    </div>
  );
}
