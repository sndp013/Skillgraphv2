import React from 'react';
import { TimelineEvent } from '@/context/ProfileContext';

export function Timeline({ events }: { events: TimelineEvent[] }) {
  if (events.length === 0) {
    return <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No impact events recorded yet.</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', position: 'relative', paddingLeft: '2rem', marginTop: '2rem' }}>
      <div style={{ 
        position: 'absolute', left: '7px', top: '10px', bottom: '10px', width: '2px', 
        background: 'linear-gradient(to bottom, var(--accent), var(--border))' 
      }} />
      {events.map((event) => (
        <div key={event.id} style={{ position: 'relative' }}>
          <div style={{ 
            position: 'absolute', left: '-2rem', top: '2px', width: '16px', height: '16px', 
            borderRadius: '50%', backgroundColor: 'var(--background)', border: '3px solid var(--accent)',
            boxShadow: '0 0 10px var(--accent-glow)', zIndex: 2
          }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ 
              fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', 
              textTransform: 'uppercase', letterSpacing: '0.1em' 
            }}>
              {event.timestamp}
            </span>
            <h4 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700, color: 'var(--foreground)' }}>
              {event.action}
            </h4>
            {event.outcome && (
              <p style={{ 
                fontSize: '1rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5,
                borderLeft: '2px solid var(--border)', paddingLeft: '1rem', marginTop: '0.25rem'
              }}>
                {event.outcome}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
