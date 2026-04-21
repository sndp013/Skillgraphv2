"use client";

import React, { useEffect, useState } from 'react';
import { useProfile } from '@/context/ProfileContext';

export function HireScoreGauge({ score }: { score?: number }) {
  const { profile } = useProfile();
  // Read score fallback to context if not explicitly passed
  const activeScore = score !== undefined ? score : profile.score;
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    // Simple slide up animation for score loading
    setTimeout(() => setAnimatedScore(activeScore), 100);
  }, [activeScore]);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  let color = 'var(--text-muted)';
  let message = 'Just getting started. Add your work!';
  
  if (animatedScore > 30) {
    color = '#facc15';
    message = 'Gaining traction. Keep building.';
  }
  if (animatedScore > 70) {
    color = 'var(--success)';
    message = 'Strong profile! You are highly visible.';
  }
  if (animatedScore >= 90) {
    color = 'var(--accent)';
    message = 'Top Tier! You are fully hire-ready.';
  }

  // Live dynamic suggestions based on real user context
  const suggestions = [];
  if (profile.projects.length < 3) {
    suggestions.push("💡 Add 1 more project to increase score");
  }
  if (profile.projects.some(p => !p.outcome) || profile.projects.length === 0) {
    suggestions.push("📈 Add outcome to improve credibility");
  }
  if (profile.projects.some(p => !p.mediaUrl) || profile.projects.length === 0) {
    suggestions.push("📸 Upload visual proof to stand out");
  }
  if (profile.skills.length < 5) {
    suggestions.push("🔥 List more skills to show versatility");
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--border)' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0 }}>
          <svg width="100" height="100" viewBox="0 0 110 110" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="55" cy="55" r={radius} fill="transparent" stroke="var(--card-bg)" strokeWidth="8" />
            <circle
              cx="55" cy="55" r={radius} fill="transparent" stroke={color} strokeWidth="8"
              strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1), stroke 1.5s ease' }}
            />
          </svg>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{animatedScore}</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <h3 style={{ fontSize: '1.35rem', margin: 0, lineHeight: 1 }}>Hire Readiness Score</h3>
          <p style={{ fontSize: '0.85rem', color: color, fontWeight: 600, margin: 0, padding: '0.3rem 0.6rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'inline-block', width: 'fit-content', border: `1px solid ${color}` }}>
            {message}
          </p>
        </div>
      </div>

      {/* Gamification Suggestions List */}
      {animatedScore < 100 && suggestions.length > 0 && (
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '0.25rem' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Next steps to 100</p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', listStyle: 'none', margin: 0, padding: 0 }}>
            {suggestions.slice(0, 2).map((suggestion, idx) => (
              <li key={idx} style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'flex-start', color: 'var(--foreground)' }}>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
