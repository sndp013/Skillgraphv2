"use client";

import React, { useState } from 'react';
import { useProfile } from '@/context/ProfileContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThemeSwitcher({ isOpen, onClose }: ThemeSwitcherProps) {
  const { profile, setProfile } = useProfile();
  const [pendingTheme, setPendingTheme] = useState<'midnight' | 'aurora' | 'brutalist' | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const themes = [
    { id: 'midnight', name: 'Midnight Glow', icon: '🌌', color: '#3b82f6', desc: 'Original professional dark mode.' },
    { id: 'aurora', name: 'Aurora Light', icon: '🌤️', color: '#6366f1', desc: 'Minimalist clean light mode.' },
    { id: 'brutalist', name: 'Neo Brutalist', icon: '🎨', color: '#facc15', desc: 'Bold DISRUPTIVE design.' },
  ] as const;

  const handleApplyTheme = () => {
    if (pendingTheme) {
      setProfile(prev => ({ ...prev, theme: pendingTheme }));
      setShowConfirmModal(false);
      setPendingTheme(null);
      // Optional: close the main modal after apply? 
      // User said "pop screen appears with selection", better to stay open until closed.
    }
  };

  const handleSelectTheme = (themeId: 'midnight' | 'aurora' | 'brutalist') => {
    if (themeId === profile.theme) return;
    setPendingTheme(themeId);
    setShowConfirmModal(true);
  };

  const activeDisplayTheme = pendingTheme || profile.theme;

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999999
          }}
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto',
              backgroundColor: '#0a0a0a', borderRadius: '32px', border: '1px solid var(--border)',
              padding: '2.5rem', position: 'relative', boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
            }}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-muted)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ padding: '0.4rem 0.8rem', backgroundColor: 'var(--accent-glow)', color: 'var(--accent)', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', width: 'fit-content', marginBottom: '1rem' }}>
                Profile Branding
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.04em' }}>Custom Appearance</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.5rem' }}>Select the theme recruiters will see on your public profile.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleSelectTheme(t.id)}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '20px',
                    border: `2.5px solid ${profile.theme === t.id ? t.color : 'rgba(255,255,255,0.05)'}`,
                    backgroundColor: profile.theme === t.id ? `${t.color}10` : 'rgba(255,255,255,0.02)',
                    textAlign: 'center',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative'
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{t.icon}</div>
                  <div style={{ fontWeight: 800, fontSize: '0.8rem', color: profile.theme === t.id ? 'white' : 'var(--text-muted)' }}>{t.name}</div>
                </button>
              ))}
            </div>

            {/* Live Preview Container */}
            <div style={{ 
              padding: '1.5rem', 
              backgroundColor: 'rgba(255,255,255,0.02)', 
              borderRadius: '24px',
              border: '1px solid var(--border)'
            }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                Vibe Preview
              </div>

              {/* Mini Preview Mock */}
              <div data-theme={activeDisplayTheme} style={{ 
                background: 'var(--background)',
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                transition: 'all 0.4s ease'
              }} className={activeDisplayTheme === 'brutalist' ? 'brutalist-theme' : ''}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--accent), #8b5cf6)' }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ height: '10px', width: '100px', backgroundColor: 'var(--foreground)', borderRadius: '4px', marginBottom: '0.4rem', opacity: 0.8 }}></div>
                    <div style={{ height: '6px', width: '60px', backgroundColor: 'var(--text-muted)', borderRadius: '4px', opacity: 0.5 }}></div>
                  </div>
                </div>
                <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.4rem' }}>
                  <div style={{ padding: '0.4rem 0.8rem', backgroundColor: 'var(--badge-bg)', color: 'var(--badge-text)', borderRadius: activeDisplayTheme === 'brutalist' ? '0' : '20px', fontSize: '0.5rem', fontWeight: 900, border: activeDisplayTheme === 'brutalist' ? '2px solid black' : 'none' }}>VERIFIED</div>
                  <div style={{ height: '20px', width: '60px', backgroundColor: 'var(--card-bg)', borderRadius: activeDisplayTheme === 'brutalist' ? '0' : '10px', border: '1px solid var(--border)' }}></div>
                </div>
              </div>
            </div>

            {/* Confirmation Sub-Modal */}
            <AnimatePresence>
              {showConfirmModal && pendingTheme && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 100, display: 'flex',
                    flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    padding: '2rem', textAlign: 'center', borderRadius: '32px'
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    {themes.find(t => t.id === pendingTheme)?.icon}
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Switch to {themes.find(t => t.id === pendingTheme)?.name}?</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', maxWidth: '300px' }}>
                    This will immediately update your public recruiter link. Proceed?
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '280px' }}>
                    <button 
                      onClick={handleApplyTheme} 
                      className="btn-accent" 
                      style={{ width: '100%', padding: '1rem', fontWeight: 800 }}
                    >
                      Confirm branding change
                    </button>
                    <button 
                      onClick={() => setShowConfirmModal(false)}
                      style={{ padding: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
