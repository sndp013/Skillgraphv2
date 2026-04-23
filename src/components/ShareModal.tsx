"use client";

import React, { useState, useEffect } from 'react';
import { useProfile } from '@/context/ProfileContext';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const { profile } = useProfile();
  const [copied, setCopied] = useState(false);
  
  const [publicUrl, setPublicUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPublicUrl(window.location.origin + window.location.pathname);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = `Check out my SkillGraph profile! Verified Proof-of-Work and Impact: ${publicUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publicUrl)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      animation: 'fadeIn 0.3s ease-out'
    }} onClick={onClose}>
      <div style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border)',
        borderRadius: '28px',
        width: '90%',
        maxWidth: '500px',
        padding: '2.5rem',
        position: 'relative',
        boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.6)',
        animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        textAlign: 'center',
        color: 'var(--foreground)'
      }} onClick={e => e.stopPropagation()}>
        
        <button onClick={onClose} style={{
          position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'rgba(255,255,255,0.05)', border: 'none',
          color: 'var(--text-muted)', cursor: 'pointer', padding: '0.6rem', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
        }} className="hover-scale">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div style={{ 
          width: '64px', height: '64px', borderRadius: '18px', background: 'linear-gradient(135deg, var(--accent) 0%, #1d4ed8 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
          boxShadow: '0 8px 16px var(--accent-glow)'
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>Share Profile</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1rem', lineHeight: 1.5 }}>
          Showcase your verified Hire Score and Proof-of-Work to recruiters.
        </p>

        {/* Share Buttons Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            onClick={handleCopy}
            style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', 
              backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--border)',
              cursor: 'pointer', transition: 'all 0.2s', width: '100%', position: 'relative', overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ color: 'var(--accent)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </div>
              <span style={{ fontSize: '1rem', fontWeight: 600 }}>{copied ? 'Copied to clipboard!' : 'Copy profile link'}</span>
            </div>
            {!copied && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>{publicUrl.replace(/^https?:\/\//, '').slice(0, 20)}...</span>}
            {copied && <div style={{ color: 'var(--success)' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>}
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <button onClick={shareWhatsApp} className="btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '1.25rem', borderRadius: '16px', fontSize: '1rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </button>
            <button onClick={shareLinkedIn} className="btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '1.25rem', borderRadius: '16px', fontSize: '1rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </button>
          </div>
        </div>

        {/* Toast Notification (Simple internal) */}
        {copied && (
          <div style={{
            position: 'absolute', bottom: '-4rem', left: '50%', transform: 'translateX(-50%)',
            backgroundColor: 'var(--success)', color: 'white', padding: '0.75rem 2rem', borderRadius: '2rem',
            fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
            animation: 'slideUpToast 0.3s ease-out'
          }}>
            Link copied to clipboard!
          </div>
        )}

      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideUpToast {
          from { transform: translate(-50%, 20px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        .hover-scale:hover {
          transform: scale(1.1);
          background-color: rgba(255,255,255,0.1) !important;
        }
      `}</style>
    </div>
  );
}
