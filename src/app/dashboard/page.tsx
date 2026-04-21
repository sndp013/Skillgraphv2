"use client";

import React from 'react';
import { useProfile } from '@/context/ProfileContext';
import { HireScoreGauge } from '@/components/HireScoreGauge';
import { ProjectCard } from '@/components/ProjectCard';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const { profile } = useProfile();
  const router = useRouter();

  return (
    <main className="spotlight" style={{ minHeight: '100vh', padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', marginBottom: '4rem' }} className="animate-fade-in">
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '0.5rem' }}>
              Dashboard
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Welcome back, {profile.name.split(' ')[0]}. Here's your impact overview.</p>
          </div>
          <Link href="/jane-doe" className="btn-accent" style={{ padding: '0.8rem 1.5rem' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '0.5rem' }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            Live Public Profile
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '6rem', animationDelay: '0.2s' }} className="animate-fade-in">
          <HireScoreGauge />
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Profile Visibility</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Your profile is currently public. Recruiters can see your proof-of-work cards and impact timeline.
            </p>
            <Link href="/onboarding" className="btn-primary" style={{ width: 'fit-content', fontSize: '0.9rem' }}>
              + Add New Project Proof
            </Link>
          </div>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>Your Projects</h2>
            <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--border)' }}></div>
          </div>
          
          {profile.projects.length === 0 ? (
            <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--card-bg)', borderRadius: '24px', border: '1px dashed var(--border)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No project proof found yet. Let's build your reputation.</p>
              <Link href="/onboarding" className="btn-accent" style={{ marginTop: '1.5rem' }}>Add Your First Project</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
              {profile.projects.map(proj => (
                <ProjectCard key={proj.id} project={proj} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
