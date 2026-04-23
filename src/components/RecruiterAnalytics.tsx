"use client";

import React from 'react';
import { useProfile } from '@/context/ProfileContext';
import { motion } from 'framer-motion';

export function RecruiterAnalytics() {
  const { profile } = useProfile();
  const { analytics } = profile;

  const maxViews = analytics.viewHistory.length > 0 ? Math.max(...analytics.viewHistory.map(p => p.views)) : 0;
  const chartHeight = 100;
  const chartWidth = 300;

  const hasHistory = analytics.viewHistory && analytics.viewHistory.length > 1;
  const points = hasHistory ? analytics.viewHistory.map((p, i) => {
    const x = (i / (analytics.viewHistory.length - 1)) * chartWidth;
    const y = chartHeight - (p.views / (maxViews || 1)) * chartHeight;
    return `${x},${y}`;
  }).join(' ') : `0,${chartHeight} ${chartWidth},${chartHeight}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Top Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {[
          { label: 'Total Profile Views', value: analytics.totalViews, icon: '👁️', color: 'var(--accent)' },
          { label: 'Unique Recruiters', value: analytics.uniqueVisitors, icon: '👥', color: 'var(--success)' },
          { label: 'Avg. Decision Time', value: analytics.avgEngagementTime, icon: '⏱️', color: '#8b5cf6' },
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="card"
            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{stat.label}</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Traffic Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card"
          style={{ padding: '2rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Recruiter Traffic</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 700 }}>+12% vs last week</span>
          </div>
          
          <div style={{ position: 'relative', height: '200px', width: '100%', padding: '1rem 0' }}>
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`M 0,${chartHeight} L ${points} L ${chartWidth},${chartHeight} Z`}
                fill="url(#gradient)"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                d={`M ${points}`}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Data tooltips/dots */}
              {analytics.viewHistory.map((p, i) => {
                const x = (i / (analytics.viewHistory.length - 1)) * chartWidth;
                const y = chartHeight - (p.views / maxViews) * chartHeight;
                return (
                  <circle key={i} cx={x} cy={y} r="3" fill="var(--background)" stroke="var(--accent)" strokeWidth="2" />
                );
              })}
            </svg>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700 }}>
              {analytics.viewHistory.map((p, i) => (
                <span key={i}>{p.date}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Activity (Pulse) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
          style={{ padding: '1.5rem', maxHeight: '400px', overflowY: 'auto' }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)', animation: 'pulse 1.5s infinite' }} />
            Recruiter Pulse
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {analytics.recentVisitors.map(v => (
              <div key={v.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <img src={v.avatar} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--border)' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{v.role}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600 }}>{v.company}</div>
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{v.time}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Engagement per Proof */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
        style={{ padding: '2rem' }}
      >
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '2rem' }}>Proof Engagement</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {profile.projects.map(proj => {
            const clicks = analytics.projectClicks[proj.id] || 0;
            const percentage = (clicks / analytics.totalViews) * 100;
            return (
              <div key={proj.id} style={{ display: 'grid', gridTemplateColumns: '1fr 3fr 100px', gap: '2rem', alignItems: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{proj.title}</div>
                <div style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{ height: '100%', backgroundColor: 'var(--accent)', borderRadius: '10px' }} 
                  />
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent)' }}>{clicks} clicks</div>
              </div>
            );
          })}
        </div>
      </motion.div>
      
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.6; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
