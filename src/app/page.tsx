"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="spotlight" style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Hero Section */}
      <section style={{ padding: '6rem 0', position: 'relative' }}>
        <div className="container" style={{ 
          maxWidth: '1200px', 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '4rem', 
          alignItems: 'center' 
        }}>
          
          {/* Left Column: Text + CTAs */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Trust Indicator */}
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem', 
              padding: '0.6rem 1.25rem', background: 'rgba(255,255,255,0.03)', 
              border: '1px solid var(--border)', borderRadius: '100px', marginBottom: '2.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{ 
                    width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--background)',
                    marginLeft: i === 1 ? 0 : '-8px', overflow: 'hidden', backgroundColor: 'var(--card-bg)'
                  }}>
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                Used by students & developers
              </span>
            </div>

            <h1 style={{ 
              fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', 
              lineHeight: 1, marginBottom: '1.5rem', color: 'var(--foreground)'
            }}>
              Get hired with <span style={{ color: 'var(--accent)' }}>proof</span>, not resumes.
            </h1>
            
            <p style={{ 
              fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.6, 
              marginBottom: '3.5rem', maxWidth: '520px' 
            }}>
              Build a portfolio that shows your real work — projects, videos, and results — in one powerful link.
            </p>

            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <Link href="/signup" className="btn-accent" style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem', boxShadow: '0 10px 30px var(--accent-glow)' }}>
                Create My Portfolio (Free)
              </Link>
              <Link href="/alex-designer" className="btn-outline" style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem' }}>
                See Example Profile
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Live Portfolio Preview Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            style={{ position: 'relative', perspective: '1000px' }}
            className="hide-on-mobile"
          >
            {/* The "Live" Preview UI */}
            <div style={{ 
              backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)', 
              borderRadius: '32px', padding: '2rem', boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
              position: 'relative', zIndex: 2
            }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.5rem' }}>A</div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Alex Rivera</h3>
                  <p style={{ color: 'var(--text-muted)', margin: 0, fontWeight: 600 }}>Senior Product Developer</p>
                </div>
              </div>

              {/* Stats Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--success)', marginBottom: '0.25rem' }}>84</div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Hire Readiness</div>
                </div>
                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent)', marginBottom: '0.25rem' }}>12</div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Verified Proofs</div>
                </div>
              </div>

              {/* Mini Project Card */}
              <div style={{ border: '1px solid var(--border)', borderRadius: '20px', overflow: 'hidden' }}>
                <div style={{ height: '140px', background: 'url(https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&w=400) center/cover' }}></div>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>SaaS Analytics Core</h4>
                    <span style={{ fontSize: '0.7rem', color: 'var(--success)', fontWeight: 800 }}>+42% Conversion</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {['Next.js', 'Stripe'].map(tag => (
                      <span key={tag} style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--text-muted)' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements for visual depth */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              style={{ 
                position: 'absolute', top: '-20px', right: '-20px', zIndex: 3,
                backgroundColor: 'var(--success)', color: 'white', padding: '0.75rem 1.25rem',
                borderRadius: '16px', fontWeight: 800, fontSize: '0.85rem', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)'
              }}
            >
              ✓ Verified by Recruiters
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              style={{ 
                position: 'absolute', bottom: '40px', left: '-40px', zIndex: 3,
                backgroundColor: 'var(--background)', border: '1px solid var(--border)', padding: '1rem',
                borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
              }}
            >
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#facc15' }}></div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>New Hire Intent</div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Feature Grids (Minimalist) */}
      <section style={{ padding: '8rem 0', background: 'var(--card-bg)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Engineered for builders.</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Stop writing summaries. Start showing outcomes.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            <div className="card" style={{ padding: '3rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '2rem' }}>⚡</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Instant AI Review</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Our AI rewrites your project descriptions into impact-first metrics that recruiters love.</p>
            </div>
            <div className="card" style={{ padding: '3rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '2rem' }}>💎</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Visual Proof Cards</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Attach videos, before/after shots, and live links to prove you actually built what you say.</p>
            </div>
            <div className="card" style={{ padding: '3rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '2rem' }}>🎯</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Recruiter discovery</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Get indexed in our global talent hub where 500+ recruiters search by proof, not pedigree.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '8rem 1.5rem', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>Ready to stand out?</h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3.5rem' }}>Join the next generation of builders who hire with proof.</p>
          <Link href="/signup" className="btn-accent" style={{ padding: '1.5rem 4rem', fontSize: '1.25rem' }}>
            Start Building My Proof
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '4rem 1.5rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <div className="container" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
          &copy; 2026 SkillGraph. All rights reserved.
        </div>
      </footer>

      <style jsx>{`
        @media (max-width: 968px) {
          .hide-on-mobile { display: none; }
          .container { grid-template-columns: 1fr !important; text-align: center; }
          p { margin: 0 auto 3.5rem !important; }
          div[style*="display: flex"] { justify-content: center; }
        }
      `}</style>
    </main>
  );
}
