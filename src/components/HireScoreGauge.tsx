"use client";

import React, { useEffect, useState } from 'react';
import { useProfile } from '@/context/ProfileContext';
import { motion, AnimatePresence } from 'framer-motion';

export function HireScoreGauge({ score, isPublic = false }: { score?: number, isPublic?: boolean }) {
  const { profile } = useProfile();
  const [isHovered, setIsHovered] = useState(false);
  
  const activeScore = score !== undefined ? score : profile.score;
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(activeScore), 100);
    return () => clearTimeout(timer);
  }, [activeScore]);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  let color = '#a1a1aa';
  let message = 'Just getting started';
  
  if (animatedScore >= 30) { color = '#facc15'; message = 'Building Potential'; }
  if (animatedScore >= 70) { color = '#10b981'; message = 'Hire Ready'; }
  if (animatedScore >= 90) { color = '#3b82f6'; message = 'Top Talent'; }

  // Dynamic Suggestions Logic
  const suggestions = [];
  if (profile.scoreBreakdown.projects < 40) suggestions.push(`Add ${Math.ceil((40 - profile.scoreBreakdown.projects)/10)} more project(s) to reach 60+`);
  if (profile.scoreBreakdown.proof < 20) suggestions.push("Add visual proof to increase credibility");
  if (profile.scoreBreakdown.outcome < 30) suggestions.push("Add measurable outcomes to your projects");
  if (profile.scoreBreakdown.skills < 10) suggestions.push("Tag more skills to improve discoverability");

  const ProgressBar = ({ label, current, max, color }: { label: string, current: number, max: number, color: string }) => (
    <div style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
        <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{label}</span>
        <span style={{ fontWeight: 700, color: 'var(--foreground)' }}>{current}/{max}</span>
      </div>
      <div style={{ height: '5px', width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(current / max) * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ 
            height: '100%', 
            background: `linear-gradient(90deg, ${color}cc, ${color})`,
            borderRadius: '10px'
          }} 
        />
      </div>
    </div>
  );

  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem', 
        padding: isPublic && !isHovered ? '1.25rem' : '2rem', 
        backgroundColor: 'var(--card-bg)', 
        borderRadius: '32px', 
        border: '1px solid var(--border)', 
        backdropFilter: 'blur(20px)',
        width: isPublic && !isHovered ? '140px' : '100%',
        maxWidth: isPublic && !isHovered ? '140px' : '450px',
        justifyContent: 'center',
        alignItems: 'stretch',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: isHovered ? '0 25px 50px -12px rgba(0,0,0,0.5)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      
      {/* Main Score Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: isPublic && !isHovered ? '0' : '1.5rem',
        flexDirection: isPublic && !isHovered ? 'column' : 'row'
      }}>
        <div style={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0 }}>
          <svg width="100" height="100" viewBox="0 0 110 110" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="55" cy="55" r={radius} fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="10" />
            <motion.circle
              cx="55" cy="55" r={radius} fill="transparent" stroke={color} strokeWidth="10"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset: strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              strokeLinecap="round"
            />
          </svg>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 900, color: color, lineHeight: 1 }}>{animatedScore}</span>
            <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Points</span>
          </div>
        </div>

        {(!isPublic || isHovered) && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: 'var(--foreground)' }}>Hire Readiness</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ 
                fontSize: '0.7rem', color: 'white', fontWeight: 900, padding: '0.2rem 0.6rem', 
                backgroundColor: color, borderRadius: '6px', textTransform: 'uppercase'
              }}>{message}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Top {Math.max(1, 100 - activeScore)}% of users
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Breakdown & Suggestions (Expanded) */}
      {(!isPublic || isHovered) && (
        <motion.div
           initial={{ opacity: 0, height: 0 }}
           animate={{ opacity: 1, height: 'auto' }}
           style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {/* Breakdown List */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
            <ProgressBar label="Projects (Quantity)" current={profile.scoreBreakdown.projects} max={40} color="#3b82f6" />
            <ProgressBar label="Outcomes (Impact)" current={profile.scoreBreakdown.outcome} max={30} color="#10b981" />
            <ProgressBar label="Visual Proof (Trust)" current={profile.scoreBreakdown.proof} max={20} color="#8b5cf6" />
            <ProgressBar label="Skills (Diversity)" current={profile.scoreBreakdown.skills} max={10} color="#facc15" />
          </div>

          {/* Dynamic Suggestions */}
          {suggestions.length > 0 && (
            <div style={{ 
              backgroundColor: 'rgba(59, 130, 246, 0.05)', 
              padding: '1rem', 
              borderRadius: '16px', 
              border: '1px solid rgba(59, 130, 246, 0.1)' 
            }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Improve your score</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {suggestions.slice(0, 2).map((s, i) => (
                  <div key={i} style={{ fontSize: '0.85rem', color: 'var(--foreground)', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--accent)' }}>•</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Badges Section */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {profile.badges.map((badge, idx) => (
              <div key={idx} style={{ 
                padding: '0.4rem 0.75rem', backgroundColor: 'rgba(255,255,255,0.05)', 
                border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 700,
                color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem'
              }}>
                {badge === "Top Talent" ? '👑' : badge === "Hire Ready" ? '✅' : '🛡️'}
                {badge}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Public Interaction Hint */}
      {isPublic && !isHovered && (
        <div style={{ position: 'absolute', bottom: '0.75rem', left: '50%', transform: 'translateX(-50%)', fontSize: '0.6rem', fontWeight: 900, color: 'var(--text-muted)', opacity: 0.5 }}>
          HOVER FOR INFO
        </div>
      )}
    </motion.div>
  );
}
