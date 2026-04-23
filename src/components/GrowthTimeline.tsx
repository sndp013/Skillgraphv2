"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile, ScoreHistoryPoint } from '@/context/ProfileContext';

type MetricKey = 'total' | 'proof' | 'outcome';

export function GrowthTimeline() {
  const { profile } = useProfile();
  const [activeMetric, setActiveMetric] = useState<MetricKey>('total');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const data = profile.scoreHistory;
  if (!data || data.length === 0) return null;

  const width = 800;
  const height = 300;
  const padding = 40;

  // Calculate scales
  const maxScore = 100;
  const xStep = (width - padding * 2) / (data.length - 1);
  const yScale = (height - padding * 2) / maxScore;

  // Generate SVG path
  const points = data.map((d, i) => ({
    x: padding + i * xStep,
    y: height - padding - d[activeMetric] * yScale,
    score: d[activeMetric],
    month: d.month
  }));

  const linePath = points.reduce((acc, p, i) => 
    i === 0 ? `M ${p.x},${p.y}` : `${acc} L ${p.x},${p.y}`, ""
  );

  const areaPath = `${linePath} L ${points[points.length - 1].x},${height - padding} L ${points[0].x},${height - padding} Z`;

  const metricConfig = {
    total: { color: 'var(--accent)', label: 'Hire Readiness' },
    proof: { color: '#8b5cf6', label: 'Proof Quality' },
    outcome: { color: 'var(--success)', label: 'Outcomes' }
  };

  return (
    <div style={{ 
      padding: '2rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '24px', 
      border: '1px solid var(--border)', backdropFilter: 'blur(10px)', position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>Growth Track</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Visualizing your impact over time</p>
        </div>
        
        {/* Metric Toggles */}
        <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.3rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
          {(['total', 'proof', 'outcome'] as MetricKey[]).map(m => (
            <button
              key={m}
              onClick={() => setActiveMetric(m)}
              style={{
                padding: '0.5rem 1rem', borderRadius: '8px', border: 'none',
                backgroundColor: activeMetric === m ? metricConfig[m].color : 'transparent',
                color: activeMetric === m ? 'white' : 'var(--text-muted)',
                fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s ease',
                textTransform: 'uppercase', letterSpacing: '0.05em'
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', height: `${height}px` }}>
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(v => (
            <g key={v}>
              <line 
                x1={padding} y1={height - padding - v * yScale} 
                x2={width - padding} y2={height - padding - v * yScale} 
                stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"
              />
              <text x={padding - 10} y={height - padding - v * yScale} fill="var(--text-muted)" fontSize="10" textAnchor="end" alignmentBaseline="middle">{v}</text>
            </g>
          ))}

          {/* Area under line */}
          <motion.path
            key={`area-${activeMetric}`}
            d={areaPath}
            fill={`url(#gradient-${activeMetric})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1 }}
          />

          {/* The Data Line */}
          <motion.path
            key={`line-${activeMetric}`}
            d={linePath}
            fill="none"
            stroke={metricConfig[activeMetric].color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Data Points */}
          {points.map((p, i) => (
            <motion.circle
              key={`${activeMetric}-${i}`}
              cx={p.x} cy={p.y} r="6"
              fill="var(--background)"
              stroke={metricConfig[activeMetric].color}
              strokeWidth="3"
              onMouseEnter={() => setHoveredPoint(i)}
              onMouseLeave={() => setHoveredPoint(null)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 + i * 0.1 }}
              style={{ cursor: 'pointer' }}
            />
          ))}

          {/* Month Labels */}
          {points.map((p, i) => (
            <text key={i} x={p.x} y={height - padding + 25} fill="var(--text-muted)" fontSize="12" textAnchor="middle" fontWeight="500">
              {p.month}
            </text>
          ))}

          <defs>
            <linearGradient id={`gradient-total`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`gradient-proof`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="1" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`gradient-outcome`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--success)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--success)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Tooltip */}
        <AnimatePresence>
          {hoveredPoint !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                position: 'absolute',
                left: `${(points[hoveredPoint].x / width) * 100}%`,
                top: `${(points[hoveredPoint].y / height) * 100}%`,
                transform: 'translate(-50%, -120%)',
                backgroundColor: 'var(--foreground)',
                color: 'var(--background)',
                padding: '0.6rem 1rem',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: 800,
                pointerEvents: 'none',
                zIndex: 100,
                boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.2rem',
                minWidth: '80px'
              }}
            >
              <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.7, letterSpacing: '0.05em' }}>
                {points[hoveredPoint].month}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: metricConfig[activeMetric].color }} />
                {points[hoveredPoint].score}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', paddingLeft: '40px' }}>
        {(['total', 'proof', 'outcome'] as MetricKey[]).map(m => (
          <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: activeMetric === m ? 1 : 0.4, transition: 'opacity 0.3s' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: metricConfig[m].color }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>{metricConfig[m].label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
