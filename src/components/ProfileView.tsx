"use client";

import React, { useState, useEffect } from 'react';
import { useProfile } from '@/context/ProfileContext';
import { ProjectCard } from '@/components/ProjectCard';
import { Timeline } from '@/components/Timeline';
import { HireScoreGauge } from '@/components/HireScoreGauge';
import { GrowthTimeline } from '@/components/GrowthTimeline';
import { ShareModal } from '@/components/ShareModal';

export function ProfileView({ username }: { username: string }) {
  const { profile } = useProfile();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <main 
        style={{ minHeight: '100vh', paddingBottom: '8rem', background: 'var(--background)' }} 
        data-theme={profile.theme} 
        className={`spotlight ${profile.theme === 'brutalist' ? 'brutalist-theme' : ''}`}
      >
        {/* Header Action Bar (Fixed on scroll for mobile) */}
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          padding: '1rem 1.5rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          zIndex: 100,
          background: scrolled ? 'var(--navbar-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
             <div style={{ 
                width: scrolled ? '32px' : '0px', 
                height: scrolled ? '32px' : '0px', 
                borderRadius: '8px', 
                background: 'var(--accent)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'white', 
                fontWeight: 800, 
                fontSize: '0.8rem',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                opacity: scrolled ? 1 : 0
              }}>S</div>
              <span style={{ 
                fontWeight: 700, 
                fontSize: '1rem', 
                opacity: scrolled ? 1 : 0,
                transform: scrolled ? 'translateX(0)' : 'translateX(-10px)',
                transition: 'all 0.3s ease'
              }}>{profile.name}</span>
          </div>
          <button 
            onClick={() => setIsShareModalOpen(true)}
            className="btn-accent"
            style={{ 
              borderRadius: '2rem', 
              padding: scrolled ? '0.4rem 1rem' : '0.6rem 1.25rem', 
              fontSize: scrolled ? '0.8rem' : '0.9rem',
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              boxShadow: scrolled ? 'none' : '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            <span style={{ fontWeight: 700 }}>Share</span>
          </button>
        </div>

        {/* Hero Section */}
        <section style={{ padding: '8rem 1.5rem 4rem', textAlign: 'center', position: 'relative', zIndex: 1 }} className="animate-fade-in">
          <div className="container" style={{ maxWidth: '900px' }}>
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.1)', 
              border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '2rem', color: '#10b981', 
              fontSize: '0.8rem', fontWeight: 800, marginBottom: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
              Available for hire
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(3rem, 8vw, 4.5rem)', marginBottom: '1rem', fontWeight: 800, 
              background: profile.theme === 'midnight' ? 'linear-gradient(to bottom, #fff, #a1a1aa)' : 'none', 
              color: profile.theme === 'midnight' ? 'transparent' : 'var(--foreground)',
              WebkitBackgroundClip: profile.theme === 'midnight' ? 'text' : 'initial', 
              WebkitTextFillColor: profile.theme === 'midnight' ? 'transparent' : 'initial',
              letterSpacing: '-0.04em', lineHeight: 1.1
            }}>
              {profile.name}
            </h1>
            <h2 style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', color: 'var(--foreground)', fontWeight: 500, marginBottom: '2rem', opacity: 0.8 }}>
              {profile.role}
            </h2>

            {/* Badges Row */}
            {profile.badges.length > 0 && (
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
                {profile.badges.map((badge, idx) => {
                  let badgeColor = 'var(--accent)';
                  let badgeIcon = '🛡️';
                  if (badge === "Verified Impact") { badgeColor = 'var(--success)'; badgeIcon = '⚡'; }
                  if (badge === "Top 10% Profile") { badgeColor = '#facc15'; badgeIcon = '👑'; }
                  if (badge === "First Proof Added") { badgeColor = '#8b5cf6'; badgeIcon = '📸'; }

                  return (
                    <div key={idx} style={{ 
                      display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1.25rem', 
                      backgroundColor: 'var(--badge-bg)', border: profile.theme === 'brutalist' ? '3px solid black' : `1px solid ${badgeColor}30`, 
                      borderRadius: profile.theme === 'brutalist' ? '0' : '2rem', fontSize: '0.85rem', fontWeight: 800, color: profile.theme === 'brutalist' ? 'white' : 'var(--badge-text)',
                      backdropFilter: 'blur(8px)',
                      boxShadow: profile.theme === 'brutalist' ? '4px 4px 0px black' : 'none'
                    }}>
                      <span>{badgeIcon}</span>
                      {badge}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="profile-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '3rem', 
              alignItems: 'center', 
              textAlign: 'left' 
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ fontSize: 'clamp(1.1rem, 3vw, 1.25rem)', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 0 2.5rem', lineHeight: 1.6 }}>
                  {profile.valueProp || "Passionate professional focused on delivering high-impact work and verifiable outcomes."}
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }} className="hide-on-mobile">
                  <a href={`mailto:hello@${username}.com`} className="btn-accent" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                    Hire {profile.name.split(' ')[0]}
                  </a>
                  <button 
                    onClick={() => alert("Generating Profile Summary PDF...")}
                    className="btn-outline" 
                    style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
                  >
                    Download CV
                  </button>
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '32px',
                padding: '2rem',
                border: '1px solid var(--border)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <HireScoreGauge isPublic={true} />
                </div>
                <div style={{ 
                  position: 'absolute', 
                  top: '1rem', 
                  right: '1rem', 
                  fontSize: '0.65rem', 
                  fontWeight: 800, 
                  color: 'var(--accent)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em',
                  opacity: 0.5
                }}>Verified Score</div>
              </div>
            </div>
          </div>
        </section>

        <div className="container" style={{ maxWidth: '1000px', margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '6rem', position: 'relative', zIndex: 1 }}>
          
          {/* Featured Projects Section */}
          <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="section-title">Proof of Work</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {profile.projects.length > 0 ? (
                profile.projects.slice(0, 3).map((proj, idx) => (
                  <div key={proj.id} style={{ position: 'relative' }}>
                    <div style={{ 
                      position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 30,
                      backgroundColor: 'var(--accent)', color: 'white', padding: '0.4rem 0.8rem', 
                      borderRadius: '8px', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }}>
                      FEATURED #0{idx + 1}
                    </div>
                    <ProjectCard project={proj} />
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', gridColumn: '1/-1', padding: '4rem', background: 'var(--card-bg)', borderRadius: '24px' }}>
                  Working on exciting things. Coming soon.
                </p>
              )}
            </div>
          </section>

          {/* Growth Tracking Section */}
          <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="section-title">Growth Track</h2>
            <div className="card" style={{ padding: '2rem' }}>
              <GrowthTimeline />
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
                    fontSize: '1rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem',
                    transition: 'var(--transition)'
                  }} className="glow-on-hover">
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
            marginTop: '4rem', padding: '5rem 2rem', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, transparent 100%)', 
            borderRadius: '32px', border: '1px solid var(--border)', textAlign: 'center', animationDelay: '0.8s'
          }} className="animate-fade-in">
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.5rem', fontWeight: 800 }}>Let's build something great</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem', maxWidth: '500px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
              Looking for a driven professional who focuses on real-world impact and visual proof? Let's connect and discuss how I can help.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={`mailto:hello@${username}.com`} className="btn-accent" style={{ padding: '1.25rem 3.5rem', fontSize: '1.2rem' }}>
                Get In Touch
              </a>
            </div>
          </section>

        </div>

        {/* Watermark Footer */}
        <footer style={{ 
          marginTop: '6rem', padding: '6rem 1.5rem', borderTop: '1px solid var(--border)', 
          textAlign: 'center' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '1rem', opacity: 0.6 }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '0.8rem' }}>S</div>
            <span style={{ letterSpacing: '0.02em', fontWeight: 500 }}>Built on SkillGraph</span>
          </div>
        </footer>
      </main>

      {/* Sticky Mobile CTA */}
      <div style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1.5rem',
        right: '1.5rem',
        zIndex: 100,
        display: 'none', // Shown only on mobile via media query
      }} className="mobile-cta">
        <div style={{
          backgroundColor: 'var(--navbar-bg)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '0.75rem',
          display: 'flex',
          gap: '0.75rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
        }}>
          <a href={`mailto:hello@${username}.com`} className="btn-accent" style={{ flex: 2, padding: '1rem', fontSize: '1rem', borderRadius: '14px' }}>
            Hire Me
          </a>
          <button 
            onClick={() => setIsShareModalOpen(true)}
            className="btn-outline" 
            style={{ flex: 1, padding: '1rem', borderRadius: '14px' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
          </button>
        </div>
      </div>

      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />

      <style jsx>{`
        @media (max-width: 768px) {
          .hide-on-mobile {
            display: none !important;
          }
          .mobile-cta {
            display: block !important;
            animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .profile-grid {
             gap: 2rem !important;
          }
        }

        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
