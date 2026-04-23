"use client";

import React, { useState } from 'react';
import { Project } from '@/context/ProfileContext';

interface ProjectCardProps {
  project: Project;
  isOwner?: boolean;
  onReview?: (project: Project) => void;
}

export function ProjectCard({ project, isOwner = false, onReview }: ProjectCardProps) {
  const [sliderPos, setSliderPos] = useState(50);
  
  // High score verification logic
  const hasMedia = !!project.mediaUrl;
  const hasOutcome = !!project.outcome && (project.outcome.length > 10 || !!project.metrics);
  const isVerified = hasMedia && hasOutcome;

  return (
    <div className="card glow-on-hover case-study-card" style={{ 
      display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0, 
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid var(--border)',
      boxShadow: '0 20px 40px -20px rgba(0,0,0,0.5)',
      borderRadius: '28px',
      backdropFilter: 'blur(12px)',
      position: 'relative',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }}>
      {/* Visual Proof / Slider Header (Visual First) */}
      <div style={{ width: '100%', height: '320px', backgroundColor: '#000', position: 'relative', overflow: 'hidden' }}>
        {project.beforeMediaUrl && project.mediaUrl ? (
          <div style={{ position: 'relative', width: '100%', height: '100%', cursor: 'ew-resize' }} 
               onMouseMove={(e) => {
                 if (e.buttons === 1) {
                   const rect = e.currentTarget.getBoundingClientRect();
                   const x = ((e.clientX - rect.left) / rect.width) * 100;
                   setSliderPos(Math.max(0, Math.min(100, x)));
                 }
               }}
               onTouchMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
                  setSliderPos(Math.max(0, Math.min(100, x)));
               }}>
            <img src={project.mediaUrl} alt="After" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '1.25rem', right: '1.25rem', padding: '0.4rem 0.8rem', backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, color: 'white', zIndex: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>After</div>
            
            <div style={{ 
              position: 'absolute', top: 0, left: 0, width: `${sliderPos}%`, height: '100%', 
              overflow: 'hidden', borderRight: '3px solid white', boxShadow: '5px 0 15px rgba(0,0,0,0.3)'
            }}>
              <img src={project.beforeMediaUrl} alt="Before" style={{ width: '100%', height: '100%', objectFit: 'cover', maxWidth: 'none' }} />
              <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', padding: '0.4rem 0.8rem', backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Before</div>
            </div>

            <div style={{ 
              position: 'absolute', top: '50%', left: `${sliderPos}%`, transform: 'translate(-50%, -50%)',
              width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(0,0,0,0.4)',
              zIndex: 10, pointerEvents: 'none'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3"><polyline points="11 17 6 12 11 7"></polyline><polyline points="13 17 18 12 13 7"></polyline></svg>
            </div>
          </div>
        ) : project.mediaUrl ? (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
             <img src={project.mediaUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', padding: '0.4rem 0.8rem', backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 800, color: 'white', textTransform: 'uppercase' }}>Visual Proof</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', gap: '1rem', backgroundColor: 'rgba(255,255,255,0.01)' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>Visual Proof Required for High Score</span>
          </div>
        )}

        {/* Verification Badge */}
        {isVerified && (
          <div style={{ 
            position: 'absolute', top: '20px', left: '20px', 
            backgroundColor: '#10b981', color: 'white', 
            padding: '6px 14px', borderRadius: '30px', fontSize: '11px', 
            fontWeight: 900, display: 'flex', alignItems: 'center', gap: '6px',
            boxShadow: '0 8px 16px rgba(16, 185, 129, 0.4)', zIndex: 20,
            border: '1px solid rgba(255,255,255,0.3)',
            textTransform: 'uppercase', letterSpacing: '0.05em'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Verified Proof
          </div>
        )}

        <div style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.8) 100%)',
          pointerEvents: 'none'
        }}></div>
      </div>
      
      {/* Content Section (Case Study Logic) */}
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.85rem', margin: '0 0 0.75rem 0', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1 }}>{project.title}</h3>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {project.techStack.map(tech => (
              <span key={tech} style={{ 
                fontSize: '0.7rem', fontWeight: 800, padding: '0.25rem 0.75rem', 
                backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', 
                borderRadius: '8px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em'
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Mandatory Case Study Sections */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
               <div style={{ width: '4px', height: '14px', backgroundColor: 'var(--accent)', borderRadius: '2px' }}></div>
               <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 900, letterSpacing: '0.1em' }}>The Problem</span>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{project.problem || "Unspecified challenge."}</p>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
               <div style={{ width: '4px', height: '14px', backgroundColor: 'var(--accent)', borderRadius: '2px' }}></div>
               <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 900, letterSpacing: '0.1em' }}>Action Taken</span>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{project.solution || project.action || "Built technical solution."}</p>
          </div>
        </div>
        
        {/* Outcome Section (Highlighted Strongly) */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)', 
          padding: '1.5rem', 
          borderRadius: '20px', 
          border: '1px solid rgba(16, 185, 129, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ backgroundColor: '#10b981', color: 'white', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Outcome</div>
            <span style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Measurable Impact</span>
          </div>
          
          <p style={{ fontSize: '1.1rem', color: 'var(--foreground)', fontWeight: 700, margin: 0, lineHeight: 1.4, letterSpacing: '-0.01em' }}>
            {project.outcome || "Achieved successful deployment and verified results."}
          </p>
          
          {project.metrics && (
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#10b981', marginTop: '0.25rem', letterSpacing: '-0.02em' }}>
              {project.metrics}
            </div>
          )}

          {/* Decorative Background Icon */}
          <div style={{ position: 'absolute', top: '50%', right: '-10px', transform: 'translateY(-50%)', opacity: 0.05, pointerEvents: 'none' }}>
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
          {isOwner && onReview && (
            <button 
              onClick={() => onReview(project)}
              style={{ 
                width: '100%', padding: '1rem', fontSize: '0.95rem', fontWeight: 800,
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
                border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '14px',
                color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                transition: 'all 0.3s ease'
              }}
              className="hover-brighten"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
              Review Case Study
            </button>
          )}

          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href={project.demoLink || project.externalLink || '#'} target="_blank" rel="noreferrer" style={{ flex: 1, textDecoration: 'none' }}>
              <button className="btn-accent" style={{ width: '100%', padding: '1rem', fontSize: '0.9rem', fontWeight: 800, borderRadius: '14px' }}>
                View Live Demo
              </button>
            </a>
            <a href={project.codeLink || '#'} target="_blank" rel="noreferrer" style={{ flex: 1, textDecoration: 'none' }}>
              <button className="btn-outline" style={{ width: '100%', padding: '1rem', fontSize: '0.9rem', fontWeight: 800, borderRadius: '14px' }}>
                View GitHub
              </button>
            </a>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .case-study-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 60px -15px rgba(0,0,0,0.6);
        }
        .hover-brighten:hover {
          background: rgba(59, 130, 246, 0.15) !important;
          border-color: rgba(59, 130, 246, 0.5) !important;
        }
      `}</style>
    </div>
  );
}
