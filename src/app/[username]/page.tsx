"use client";

import React, { use } from 'react';
import { useProfile } from '@/context/ProfileContext';
import { ProjectCard } from '@/components/ProjectCard';
import { Timeline } from '@/components/Timeline';

export default function PublicProfile({ params }: { params: Promise<{ username: string }> }) {
  const { profile } = useProfile();
  const resolvedParams = use(params);

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '6rem' }} className="spotlight">
      {/* Hero Section */}
      <section style={{ padding: '8rem 1.5rem 6rem', textAlign: 'center', position: 'relative', zIndex: 1 }} className="animate-fade-in">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ 
            display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(59, 130, 246, 0.1)', 
            border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '2rem', color: 'var(--accent)', 
            fontSize: '0.875rem', fontWeight: 600, marginBottom: '2rem' 
          }}>
            Available for hire
          </div>
          <h1 style={{ 
            fontSize: '4.5rem', marginBottom: '1rem', fontWeight: 800, 
            background: 'linear-gradient(to bottom, #fff, #a1a1aa)', 
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.04em', lineHeight: 1
          }}>
            {profile.name}
          </h1>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--foreground)', fontWeight: 500, marginBottom: '2rem', opacity: 0.8 }}>
            {profile.role}
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
            {profile.valueProp || "Passionate professional focused on delivering high-impact work and verifiable outcomes."}
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href={`mailto:hello@${resolvedParams.username}.com`} className="btn-accent" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Hire Me
            </a>
            <button className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', backgroundColor: 'transparent', border: '1px solid var(--border)' }}>
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '1000px', margin: '4rem auto', display: 'flex', flexDirection: 'column', gap: '6rem', position: 'relative', zIndex: 1 }}>
        
        {/* Featured Projects Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="section-title">Proof of Work</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
            {profile.projects.length > 0 ? (
              profile.projects.slice(0, 3).map(proj => (
                <ProjectCard key={proj.id} project={proj} />
              ))
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Working on exciting things. Coming soon.</p>
            )}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h2 className="section-title">Impact Journey</h2>
          <Timeline events={profile.timeline} />
        </section>

        {/* Skills Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <h2 className="section-title">Core Expertise</h2>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {profile.skills.length > 0 ? (
              profile.skills.map(skill => (
                <div key={skill} style={{ 
                  padding: '0.75rem 1.5rem', background: 'var(--card-bg)', 
                  border: '1px solid var(--border)', borderRadius: '12px', 
                  fontSize: '1rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }}></div>
                  {skill}
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Continuous learner exploring new horizons.</p>
            )}
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ 
          marginTop: '4rem', padding: '4rem 2rem', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)', 
          borderRadius: '24px', border: '1px solid var(--border)', textAlign: 'center', animationDelay: '0.8s'
        }} className="animate-fade-in">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Let's build something great together</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
            Looking for a driven professional who focuses on real-world impact and visual proof? Let's connect.
          </p>
          <a href={`mailto:hello@${resolvedParams.username}.com`} className="btn-accent" style={{ padding: '1rem 3rem', fontSize: '1.25rem' }}>
            Get In Touch
          </a>
        </section>

      </div>
    </main>
  );
}
