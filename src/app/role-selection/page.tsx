"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '@/context/ProfileContext';
import { useRouter } from 'next/navigation';

export default function RoleSelection() {
  const { setProfile } = useProfile();
  const router = useRouter();

  const handleRoleSelection = (role: 'candidate' | 'recruiter') => {
    setProfile(prev => ({ ...prev, userRole: role }));
    
    if (role === 'candidate') {
      router.push('/onboarding');
    } else {
      router.push('/recruiter/dashboard');
    }
  };

  return (
    <main className="spotlight" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>
            How do you want to use SkillGraph?
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', marginBottom: '4rem' }}>
            Select your path to get started with proof-based hiring.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          
          {/* Candidate Path */}
          <motion.div 
            whileHover={{ y: -10, borderColor: 'var(--accent)' }}
            onClick={() => handleRoleSelection('candidate')}
            className="card"
            style={{ 
              padding: '3rem', cursor: 'pointer', transition: 'all 0.3s',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🚀</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Candidate</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              I want to build a proof-based portfolio and get hired for my real skills.
            </p>
            <button className="btn-accent" style={{ width: '100%', padding: '1rem' }}>I want to get hired</button>
          </motion.div>

          {/* Recruiter Path */}
          <motion.div 
            whileHover={{ y: -10, borderColor: 'var(--accent)' }}
            onClick={() => handleRoleSelection('recruiter')}
            className="card"
            style={{ 
              padding: '3rem', cursor: 'pointer', transition: 'all 0.3s',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🎯</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Recruiter</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              I want to discover verified talent and hire based on proof, not resumes.
            </p>
            <button className="btn-outline" style={{ width: '100%', padding: '1rem' }}>I want to hire talent</button>
          </motion.div>

        </div>

        <button 
          onClick={() => router.back()}
          style={{ marginTop: '4rem', background: 'none', border: 'none', color: 'var(--text-muted)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
        >
          Go back to home
        </button>
      </div>
    </main>
  );
}
