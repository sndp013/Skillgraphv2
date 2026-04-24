"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAccess } from '@/context/AccessContext';
import { useProfile } from '@/context/ProfileContext';

const RECRUITER_ROLES = ['HR', 'Founder', 'Hiring Manager'];
const HIRING_NEEDS = [
  'Frontend Developer', 
  'Backend Engineer', 
  'Fullstack Developer', 
  'UI/UX Designer', 
  'Mobile Developer', 
  'Product Manager',
  'Data Scientist',
  'DevOps Engineer'
];

export default function RecruiterOnboarding() {
  const router = useRouter();
  const { completeRecruiterOnboarding } = useAccess();
  const { profile } = useProfile();

  React.useEffect(() => {
    if (!profile.userRole && typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.push('/role-selection');
    }
  }, [profile.userRole, router]);
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    hiringNeeds: [] as string[]
  });

  const [step, setStep] = useState(1);

  const toggleHiringNeed = (need: string) => {
    setFormData(prev => ({
      ...prev,
      hiringNeeds: prev.hiringNeeds.includes(need)
        ? prev.hiringNeeds.filter(n => n !== need)
        : [...prev.hiringNeeds, need]
    }));
  };

  const handleComplete = () => {
    if (!formData.name || !formData.company || !formData.role || formData.hiringNeeds.length === 0) {
      alert("Please fill in all fields and select at least one hiring role.");
      return;
    }
    completeRecruiterOnboarding(formData);
    router.push('/recruiter/dashboard');
  };

  return (
    <main className="spotlight" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
          style={{ padding: '3rem' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ 
              fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent)', 
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', display: 'block' 
            }}>
              Recruiter Onboarding
            </span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.04em' }}>
              Find your next star hire.
            </h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Tell us a bit about your company and hiring needs.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                <div>
                  <label className="input-label">Your Name</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="e.g. Jane Doe"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="input-label">Company Name</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="e.g. Acme Inc."
                    value={formData.company}
                    onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="input-label">Your Role</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                    {RECRUITER_ROLES.map(role => (
                      <button
                        key={role}
                        onClick={() => setFormData(prev => ({ ...prev, role }))}
                        style={{
                          padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--border)',
                          backgroundColor: formData.role === role ? 'var(--accent)' : 'rgba(255,255,255,0.03)',
                          color: formData.role === role ? 'white' : 'var(--text-muted)',
                          fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.2s'
                        }}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
                <button 
                  className="btn-accent" 
                  style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}
                  onClick={() => setStep(2)}
                  disabled={!formData.name || !formData.company || !formData.role}
                >
                  Continue
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                <div>
                  <label className="input-label">What roles are you hiring for?</label>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Select all that apply</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                    {HIRING_NEEDS.map(need => (
                      <button
                        key={need}
                        onClick={() => toggleHiringNeed(need)}
                        style={{
                          padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--border)',
                          backgroundColor: formData.hiringNeeds.includes(need) ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.03)',
                          borderColor: formData.hiringNeeds.includes(need) ? 'var(--accent)' : 'var(--border)',
                          color: formData.hiringNeeds.includes(need) ? 'white' : 'var(--text-muted)',
                          fontSize: '0.85rem', fontWeight: 600, textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem'
                        }}
                      >
                        <div style={{ 
                          width: '16px', height: '16px', borderRadius: '4px', border: '1px solid var(--border)',
                          backgroundColor: formData.hiringNeeds.includes(need) ? 'var(--accent)' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          {formData.hiringNeeds.includes(need) && (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          )}
                        </div>
                        {need}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button 
                    className="btn-outline" 
                    style={{ flex: 1, padding: '1rem' }}
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button 
                    className="btn-accent" 
                    style={{ flex: 2, padding: '1rem' }}
                    onClick={handleComplete}
                    disabled={formData.hiringNeeds.length === 0}
                  >
                    See Candidates
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </main>
  );
}
