"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccess } from '@/context/AccessContext';
import Link from 'next/link';

export default function RecruiterWaitlist() {
  const { accessMode, addToWaitlist } = useAccess();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    hiringNeeds: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToWaitlist(formData);
    setSubmitted(true);
  };

  return (
    <main className="spotlight" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
        style={{ maxWidth: '500px', width: '100%', padding: '3rem', textAlign: 'center' }}
      >
        <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', fontSize: '1.5rem' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
        </div>

        {submitted ? (
          <div className="animate-fade-in">
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>You're on the list!</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
              Thanks for your interest in SkillGraph. We're currently limiting recruiter access to ensure quality. We'll reach out to <strong>{formData.email}</strong> as soon as your access is approved.
            </p>
            <Link href="/" className="btn-accent" style={{ display: 'inline-block', padding: '1rem 2rem' }}>
              Back to Home
            </Link>
          </div>
        ) : (
          <>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              {accessMode === 'INVITE_ONLY' ? 'Invite Only Access' : 'Join the Waitlist'}
            </h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              {accessMode === 'INVITE_ONLY' 
                ? 'Recruiter access is currently limited to invited partners. Apply below to join our early access program.'
                : 'Join 400+ top recruiters finding talent via proof-based portfolios.'}
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Full Name</label>
                <input 
                  type="text" required 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Alex Rivera"
                  style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'white' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Work Email</label>
                <input 
                  type="email" required 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="alex@company.com"
                  style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'white' }} 
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Company</label>
                  <input 
                    type="text" required 
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                    placeholder="TechCorp"
                    style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'white' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Role</label>
                  <input 
                    type="text" required 
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value})}
                    placeholder="Talent Lead"
                    style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'white' }} 
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Hiring Needs</label>
                <textarea 
                  required 
                  value={formData.hiringNeeds}
                  onChange={e => setFormData({...formData, hiringNeeds: e.target.value})}
                  placeholder="Looking for 3 senior frontend engineers..."
                  style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'white', minHeight: '100px', resize: 'none' }} 
                />
              </div>
              <button type="submit" className="btn-accent" style={{ width: '100%', padding: '1rem', marginTop: '1rem', fontSize: '1rem' }}>
                Join Waitlist
              </button>
            </form>
          </>
        )}
      </motion.div>
    </main>
  );
}
