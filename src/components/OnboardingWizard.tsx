"use client";

import React, { useState, useRef } from 'react';
import { useProfile, Project } from '@/context/ProfileContext';
import { useRouter } from 'next/navigation';

export function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const { addProject, setProfile } = useProfile();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [projectData, setProjectData] = useState<Partial<Project>>({
    title: '',
    outcome: '',
    mediaUrl: '',
    techStack: ['React', 'Next.js'], // Default defaults
  });
  
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const progress = (step / 3) * 100;

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleGenerate = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: projectData.title || 'Untitled Project',
      problem: 'Solved during build', // Placeholder since we removed it from onboarding
      solution: 'Built with modern tech',
      outcome: projectData.outcome || 'Improved project performance',
      techStack: projectData.techStack || [],
      mediaUrl: projectData.mediaUrl || '',
    };
    
    if (name || role) {
      setProfile(prev => ({ 
        ...prev, 
        name: name || prev.name, 
        role: role || prev.role 
      }));
    }
    
    addProject(newProject);
    router.push('/dashboard');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setProjectData({ ...projectData, mediaUrl: url });
      // Auto move after upload for speed
      setTimeout(() => setStep(3), 600);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '500px', margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
      {/* Progress Bar */}
      <div style={{ width: '100%', height: '6px', background: 'var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent)', transition: 'width 0.4s ease' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Step {step} of 3</p>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
          {step === 1 && "What's the project name?"}
          {step === 2 && "Add visual proof"}
          {step === 3 && "What was the outcome?"}
        </h2>
      </div>

      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input 
              className="input-field" 
              placeholder="e.g. SkillGraph V2" 
              autoFocus
              value={projectData.title} 
              onChange={e => setProjectData({...projectData, title: e.target.value})} 
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
            <div style={{ flex: 1 }}>
              <span className="input-label">Your Name</span>
              <input className="input-field" placeholder="Jane Doe" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div style={{ flex: 1 }}>
              <span className="input-label">Your Role</span>
              <input className="input-field" placeholder="Designer" value={role} onChange={e => setRole(e.target.value)} />
            </div>
          </div>

          <button 
            className="btn-accent" 
            disabled={!projectData.title}
            onClick={handleNext} 
            style={{ marginTop: '0.5rem', opacity: !projectData.title ? 0.5 : 1 }}
          >
            Continue &rarr;
          </button>
        </div>
      )}

      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div 
            onClick={() => fileInputRef.current?.click()}
            style={{ 
              height: '240px', border: '2px dashed var(--border)', borderRadius: '16px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              cursor: 'pointer', overflow: 'hidden', position: 'relative',
              backgroundColor: 'var(--card-bg)'
            }}
            className="glow-on-hover"
          >
            {projectData.mediaUrl ? (
              <img src={projectData.mediaUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                <span style={{ fontSize: '0.9rem' }}>Upload Image / Video</span>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} accept="image/*,video/*" />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-primary" onClick={handleBack} style={{ flex: 1, backgroundColor: 'transparent', border: '1px solid var(--border)' }}>Back</button>
            <button className="btn-accent" onClick={handleNext} style={{ flex: 2 }}>Skip for now &rarr;</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="input-label" style={{ marginBottom: 0 }}>Metric or result achieved</span>
            <input 
              className="input-field" 
              autoFocus
              placeholder="e.g. Increased conversion by 15%" 
              value={projectData.outcome} 
              onChange={e => setProjectData({...projectData, outcome: e.target.value})} 
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="btn-primary" onClick={handleBack} style={{ flex: 1, backgroundColor: 'transparent', border: '1px solid var(--border)' }}>Back</button>
            <button 
              className="btn-accent" 
              onClick={handleGenerate} 
              style={{ flex: 2, boxShadow: '0 0 20px var(--accent-glow)' }}
            >
              Generate Portfolio &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
