import React from 'react';
import { Project } from '@/context/ProfileContext';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="card glow-on-hover" style={{ 
      display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0, 
      backgroundColor: 'var(--background)',
      border: '1px solid var(--border)',
      boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
    }}>
      {/* Visual Proof Header */}
      <div style={{ width: '100%', height: '240px', backgroundColor: '#111', position: 'relative' }}>
        {project.mediaUrl ? (
          <img src={project.mediaUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
            <span style={{ fontStyle: 'italic' }}>Pending Visual Proof Validation</span>
          </div>
        )}
        <div style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          background: 'linear-gradient(to bottom, transparent 50%, var(--background) 100%)' 
        }}></div>
        <h3 style={{ 
          position: 'absolute', bottom: '1rem', left: '1.5rem', 
          fontSize: '1.75rem', margin: 0, fontWeight: 700 
        }}>{project.title}</h3>
      </div>
      
      {/* Content Body area */}
      <div style={{ padding: '1rem 1.5rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* Storytelling Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>The Challenge</span>
            <p style={{ fontSize: '0.95rem', color: 'var(--foreground)', marginTop: '0.2rem', lineHeight: 1.5 }}>{project.problem}</p>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>The Approach</span>
            <p style={{ fontSize: '0.95rem', color: 'var(--foreground)', marginTop: '0.2rem', lineHeight: 1.5 }}>{project.solution}</p>
          </div>
        </div>
        
        {/* Core Highlighted Outcome */}
        {project.outcome && (
          <div style={{ 
            backgroundColor: 'rgba(16, 185, 129, 0.1)', 
            padding: '1.25rem 1rem 1rem 1rem', 
            borderRadius: '12px', 
            border: '1px solid rgba(16, 185, 129, 0.3)',
            position: 'relative',
            marginTop: '0.5rem'
          }}>
            <div style={{ 
              position: 'absolute', top: '-10px', left: '1rem', 
              backgroundColor: 'var(--background)', padding: '0 0.5rem', 
              color: 'var(--success)', fontSize: '0.75rem', fontWeight: 700, 
              textTransform: 'uppercase', letterSpacing: '0.05em',
              display: 'flex', alignItems: 'center', gap: '0.25rem'
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Confirmed Impact
            </div>
            <p style={{ fontSize: '1.1rem', color: 'var(--foreground)', fontWeight: 600, margin: 0, lineHeight: 1.4 }}>
              {project.outcome}
            </p>
          </div>
        )}
        
        {/* Tech Stack Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
          {project.techStack.map(tech => (
            <span key={tech} style={{ 
              fontSize: '0.75rem', fontWeight: 600, padding: '0.35rem 0.75rem', 
              backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', 
              borderRadius: '20px', color: 'var(--text-muted)'
            }}>
              {tech}
            </span>
          ))}
        </div>

        {/* CTA Buttons Row */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
          <a href={project.demoLink || '#'} target="_blank" rel="noreferrer" style={{ flex: 1, textDecoration: 'none' }}>
            <button className="btn-accent" style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              View Demo
            </button>
          </a>
          <a href={project.codeLink || '#'} target="_blank" rel="noreferrer" style={{ flex: 1, textDecoration: 'none' }}>
            <button className="btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem', backgroundColor: 'transparent', border: '1px solid var(--border)', color: 'var(--foreground)', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center', transition: 'background-color 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor='rgba(255,255,255,0.05)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor='transparent'}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              View Code
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
