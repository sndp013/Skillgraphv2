"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile, ScoreHistoryPoint } from '@/context/ProfileContext';

type MetricKey = 'total' | 'proof' | 'outcome';

export function GrowthTimeline() {
  const { profile } = useProfile();
  const [hoveredPoint, setHoveredPoint] = useState<{ monthIndex: number, metric: MetricKey } | null>(null);

  const data = profile.scoreHistory;
  if (!data || data.length === 0) return null;

  const width = 800;
  const height = 300;
  const padding = 50;

  // Calculate scales
  const maxScore = 100;
  const xStep = (width - padding * 2) / (data.length - 1);
  const yScale = (height - padding * 2) / maxScore;

  const metricConfig = {
    total: { color: 'var(--accent)', label: 'Hire Readiness', icon: '📈' },
    proof: { color: '#8b5cf6', label: 'Proof Quality', icon: '🛡️' },
    outcome: { color: 'var(--success)', label: 'Outcomes', icon: '✅' }
  };

  const generatePath = (key: MetricKey) => {
    const pts = data.map((d, i) => ({
      x: padding + i * xStep,
      y: height - padding - (d[key] || 0) * yScale
    }));
    return pts.reduce((acc, p, i) => 
      i === 0 ? `M ${p.x},${p.y}` : `${acc} L ${p.x},${p.y}`, ""
    );
  };

  const generateArea = (key: MetricKey) => {
    const line = generatePath(key);
    const lastX = padding + (data.length - 1) * xStep;
    return `${line} L ${lastX},${height - padding} L ${padding},${height - padding} Z`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ 
        padding: '2.5rem', backgroundColor: 'var(--card-bg)', borderRadius: '32px', 
        border: '1px solid var(--border)', backdropFilter: 'blur(20px)', position: 'relative',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)', flex: 1
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: 'var(--foreground)' }}>Impact Progression</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '0.4rem', fontWeight: 500 }}>Visualizing your recruiter-ready growth</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
           {/* Summary Badges */}
           {(['total', 'proof', 'outcome'] as MetricKey[]).map(m => (
             <div key={m} style={{ 
               backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', 
               padding: '0.5rem 0.75rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center'
             }}>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>{m}</span>
                <span style={{ fontSize: '1rem', fontWeight: 900, color: metricConfig[m].color }}>{data[data.length-1][m]}%</span>
             </div>
           ))}
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', height: `${height}px` }}>
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ overflow: 'visible' }}>
          <defs>
            {/* Gradients */}
            {(['total', 'proof', 'outcome'] as MetricKey[]).map(m => (
              <linearGradient key={`grad-${m}`} id={`grad-${m}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={metricConfig[m].color} stopOpacity="0.2" />
                <stop offset="100%" stopColor={metricConfig[m].color} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>

          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(v => (
            <g key={v}>
              <line 
                x1={padding} y1={height - padding - v * yScale} 
                x2={width - padding} y2={height - padding - v * yScale} 
                stroke="var(--border)" strokeWidth="1" strokeDasharray="6 6" opacity="0.3"
              />
              <text x={padding - 15} y={height - padding - v * yScale} fill="var(--text-muted)" fontSize="11" fontWeight="700" textAnchor="end" alignmentBaseline="middle">{v}%</text>
            </g>
          ))}

          {/* Area Fills */}
          {(['outcome', 'proof', 'total'] as MetricKey[]).map(m => (
            <motion.path
              key={`area-${m}`}
              d={generateArea(m)}
              fill={`url(#grad-${m})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          ))}

          {/* Lines */}
          {(['outcome', 'proof', 'total'] as MetricKey[]).map(m => (
            <motion.path
              key={`line-${m}`}
              d={generatePath(m)}
              fill="none"
              stroke={metricConfig[m].color}
              strokeWidth={m === 'total' ? "5" : "3"}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          ))}

          {/* Interactive Points */}
          {data.map((d, i) => (
            <g key={`points-${i}`}>
              {(['total', 'proof', 'outcome'] as MetricKey[]).map(m => (
                <motion.circle
                  key={`dot-${m}-${i}`}
                  cx={padding + i * xStep}
                  cy={height - padding - (d[m] || 0) * yScale}
                  r={m === 'total' ? "6" : "4"}
                  fill="var(--card-bg)"
                  stroke={metricConfig[m].color}
                  strokeWidth="3"
                  onMouseEnter={() => setHoveredPoint({ monthIndex: i, metric: m })}
                  onMouseLeave={() => setHoveredPoint(null)}
                  whileHover={{ scale: 1.5 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5 + i * 0.1 }}
                  style={{ cursor: 'pointer' }}
                />
              ))}
              {/* Month Labels */}
              <text x={padding + i * xStep} y={height - padding + 30} fill="var(--text-muted)" fontSize="12" textAnchor="middle" fontWeight="700">
                {d.month}
              </text>
            </g>
          ))}
        </svg>

        {/* Improved Tooltip */}
        <AnimatePresence>
          {hoveredPoint && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                position: 'absolute',
                left: `${((padding + hoveredPoint.monthIndex * xStep) / width) * 100}%`,
                top: `${((height - padding - (data[hoveredPoint.monthIndex][hoveredPoint.metric] || 0) * yScale) / height) * 100}%`,
                transform: 'translate(-50%, -130%)',
                backgroundColor: 'var(--foreground)',
                color: 'var(--background)',
                padding: '0.75rem 1.25rem',
                borderRadius: '16px',
                fontSize: '0.9rem',
                fontWeight: 900,
                pointerEvents: 'none',
                zIndex: 100,
                boxShadow: '0 15px 30px rgba(0,0,0,0.4)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                minWidth: '120px'
              }}
            >
              <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.7, letterSpacing: '0.1em' }}>
                {data[hoveredPoint.monthIndex].month} • {metricConfig[hoveredPoint.metric].label}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
                {metricConfig[hoveredPoint.metric].icon}
                {data[hoveredPoint.monthIndex][hoveredPoint.metric]}%
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '3rem', marginTop: '2.5rem', justifyContent: 'center' }}>
        {(['total', 'proof', 'outcome'] as MetricKey[]).map(m => (
          <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '4px', backgroundColor: metricConfig[m].color }} />
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {metricConfig[m].label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
