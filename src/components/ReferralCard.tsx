"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useReferral } from '@/context/ReferralContext';

export function ReferralCard() {
  const { referralCount, referralLink, isPremiumUnlocked, addReferral, copyReferralLink, shareToWhatsApp } = useReferral();
  const progress = Math.min((referralCount / 3) * 100, 100);

  return (
    <div className="card" style={{ padding: '2rem', background: 'linear-gradient(135deg, var(--card-bg) 0%, rgba(59, 130, 246, 0.05) 100%)', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative background element */}
      <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'var(--accent)', filter: 'blur(100px)', opacity: 0.1 }}></div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Unlock Premium Access</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Invite 3 friends to SkillGraph and unlock exclusive profile themes and AI insights.</p>
        </div>
        <div style={{ padding: '0.5rem 1rem', background: isPremiumUnlocked ? 'var(--success)' : 'rgba(255,255,255,0.05)', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, color: isPremiumUnlocked ? 'white' : 'var(--text-muted)', border: '1px solid var(--border)' }}>
          {isPremiumUnlocked ? '✨ PREMIUM UNLOCKED' : 'LOCKED'}
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 700 }}>
          <span>Progess</span>
          <span style={{ color: 'var(--accent)' }}>{referralCount}/3 referrals completed</span>
        </div>
        <div style={{ height: '12px', width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border)' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ height: '100%', background: 'linear-gradient(to right, var(--accent), #60a5fa)', borderRadius: '6px' }}
          />
        </div>
      </div>

      {/* Sharing Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <button 
          onClick={copyReferralLink}
          style={{ 
            padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', 
            backgroundColor: 'rgba(255,255,255,0.03)', color: 'white', fontWeight: 700,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
            transition: 'all 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          Copy Link
        </button>
        <button 
          onClick={shareToWhatsApp}
          style={{ 
            padding: '1rem', borderRadius: '14px', border: 'none', 
            backgroundColor: '#25D366', color: 'white', fontWeight: 700,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
            boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.672 1.433 5.661 1.433h.05c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp
        </button>
      </div>

      {/* Bonus for demo purposes */}
      <button 
        onClick={addReferral} 
        style={{ marginTop: '1.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.7rem', textDecoration: 'underline', cursor: 'pointer' }}
      >
        Simulate Referral (Demo Only)
      </button>
    </div>
  );
}
