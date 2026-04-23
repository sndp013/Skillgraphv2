"use client";

import React, { useState, useRef } from 'react';
import { useProfile, Project, UserProfile } from '@/context/ProfileContext';
import { useRouter } from 'next/navigation';
import { AIReviewModal } from './AIReviewModal';

export function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const { addProject, setProfile, updateProfileData } = useProfile();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [projectData, setProjectData] = useState<Partial<Project>>({
    title: '',
    problem: '',
    solution: '',
    outcome: '',
    metrics: '',
    mediaUrl: '',
    techStack: ['Next.js', 'React', 'TypeScript'],
  });
  
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [showAIModal, setShowAIModal] = useState(false);
  const [pendingProject, setPendingProject] = useState<Project | null>(null);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleGenerate = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: projectData.title || 'Untitled Project',
      problem: projectData.problem || 'Solved technical challenge.',
      solution: projectData.solution || 'Implemented specialized solution.',
      outcome: projectData.outcome || 'Improved project outcomes.',
      metrics: projectData.metrics || '',
      techStack: projectData.techStack || [],
      mediaUrl: projectData.mediaUrl || '',
    };
    
    // Set pending project and show AI modal
    setPendingProject(newProject);
    setShowAIModal(true);
  };

  const handleAIAccept = (enhancedData: Partial<UserProfile>, enhancedProject: Project) => {
    // 1. Update Profile (Name, Role, Bio, etc)
    setProfile(prev => ({ 
      ...prev, 
      name: name || prev.name, 
      role: role || prev.role,
      ...enhancedData
    }));
    
    // 2. Add Enhanced Project
    addProject(enhancedProject);
    
    // 3. Close & Redirect
    setShowAIModal(false);
    router.push('/dashboard');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setProjectData({ ...projectData, mediaUrl: url });
      setTimeout(() => handleNext(), 800);
    }
  };

  return (
    <>
      <div className="card" style={{ 
        maxWidth: '550px', 
        margin: '4rem auto', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2rem', 
        padding: '2.5rem',
        borderRadius: '28px',
        boxShadow: '0 40px 80px -20px rgba(0,0,0,0.5)'
      }}>
        {/* Progress Bar */}
        <div style={{ width: '100%', height: '8px', background: 'var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent)', transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
             <span style={{ color: 'var(--accent)', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Step {step} of {totalSteps}</span>
             <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '0.5rem' }}>
            {step === 1 && "Start with the basics"}
            {step === 2 && "The Case Study Core"}
            {step === 3 && "Visual Proof"}
            {step === 4 && "The Impact"}
          </h2>
        </div>

        {/* STEP 1: IDENTITY & TITLE */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span className="input-label">Project Title</span>
              <input 
                className="input-field" 
                placeholder="e.g. AI-Powered CRM Dashboard" 
                autoFocus
                value={projectData.title} 
                onChange={e => setProjectData({...projectData, title: e.target.value})} 
              />
            </div>
            
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span className="input-label">Full Name</span>
                <input className="input-field" placeholder="Alex Chen" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span className="input-label">Your Role</span>
                <input className="input-field" placeholder="Fullstack Dev" value={role} onChange={e => setRole(e.target.value)} />
              </div>
            </div>

            <button 
              className="btn-accent" 
              disabled={!projectData.title || !name}
              onClick={handleNext} 
              style={{ padding: '1.25rem', fontSize: '1rem', marginTop: '1rem', opacity: (!projectData.title || !name) ? 0.5 : 1 }}
            >
              Define the Problem &rarr;
            </button>
          </div>
        )}

        {/* STEP 2: PROBLEM & SOLUTION */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span className="input-label">1. The Problem (Challenge)</span>
              <textarea 
                className="input-field" 
                style={{ minHeight: '100px', resize: 'none' }}
                placeholder="What was the specific challenge or pain point?" 
                value={projectData.problem} 
                onChange={e => setProjectData({...projectData, problem: e.target.value})} 
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span className="input-label">2. Action Taken (Your Build)</span>
              <textarea 
                className="input-field" 
                style={{ minHeight: '100px', resize: 'none' }}
                placeholder="How did you solve it? What did you build?" 
                value={projectData.solution} 
                onChange={e => setProjectData({...projectData, solution: e.target.value})} 
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button className="btn-primary" onClick={handleBack} style={{ flex: 1, backgroundColor: 'transparent', border: '1px solid var(--border)' }}>Back</button>
              <button 
                 className="btn-accent" 
                 disabled={!projectData.problem || !projectData.solution}
                 onClick={handleNext} 
                 style={{ flex: 2, padding: '1.25rem', opacity: (!projectData.problem || !projectData.solution) ? 0.5 : 1 }}
              >
                Add Visual Proof &rarr;
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: VISUAL PROOF */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div 
              onClick={() => fileInputRef.current?.click()}
              style={{ 
                height: '280px', border: '2px dashed var(--accent)', borderRadius: '24px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                cursor: 'pointer', overflow: 'hidden', position: 'relative',
                backgroundColor: 'rgba(59, 130, 246, 0.02)',
                transition: 'all 0.3s ease'
              }}
              className="glow-on-hover"
            >
              {projectData.mediaUrl ? (
                <img src={projectData.mediaUrl} alt="Proof" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: 'var(--accent)' }}>
                  <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: '1.5rem', borderRadius: '50%' }}>
                     <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 800 }}>Upload Visual Proof</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Required for "Verified" status</span>
                  </div>
                </div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} accept="image/*,video/*" />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-primary" onClick={handleBack} style={{ flex: 1, backgroundColor: 'transparent', border: '1px solid var(--border)' }}>Back</button>
              <button className="btn-outline" onClick={handleNext} style={{ flex: 1 }}>Skip Visuals &rarr;</button>
            </div>
          </div>
        )}

        {/* STEP 4: OUTCOME */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span className="input-label">Key Result or Outcome</span>
              <input 
                className="input-field" 
                autoFocus
                placeholder="e.g. Reduced server costs by 30%" 
                value={projectData.outcome} 
                onChange={e => setProjectData({...projectData, outcome: e.target.value})} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span className="input-label">Specific Metric (Optional)</span>
              <input 
                className="input-field" 
                placeholder="e.g. -30% Costs" 
                value={projectData.metrics} 
                onChange={e => setProjectData({...projectData, metrics: e.target.value})} 
              />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button className="btn-primary" onClick={handleBack} style={{ flex: 1, backgroundColor: 'transparent', border: '1px solid var(--border)' }}>Back</button>
              <button 
                className="btn-accent" 
                onClick={handleGenerate} 
                disabled={!projectData.outcome}
                style={{ flex: 2, boxShadow: '0 10px 30px var(--accent-glow)', opacity: !projectData.outcome ? 0.5 : 1 }}
              >
                Generate Portfolio &rarr;
              </button>
            </div>
          </div>
        )}
      </div>

      <AIReviewModal 
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        onAccept={handleAIAccept}
        baseProject={pendingProject!}
        baseName={name}
        baseRole={role}
      />
    </>
  );
}
