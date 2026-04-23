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

      {/* Problem vs. Solution Section */}
      <section style={{ padding: '8rem 0', background: 'var(--background)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>Resumes are broken.</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>The old way of hiring is failing talented people. SkillGraph is the new standard.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', backgroundColor: 'var(--border)', borderRadius: '32px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 30px 60px rgba(0,0,0,0.2)' }}>
            
            {/* Left Column: The Problem */}
            <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '4rem 3rem' }}>
              <div style={{ marginBottom: '3rem' }}>
                <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.5rem 1rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase' }}>The Old Way</span>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1.5rem' }}>The Resume Trap</h3>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--text-muted)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem', color: '#eee' }}>Text-based & Static</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>You are more than a PDF. Text can't capture the complexity of your projects.</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--text-muted)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem', color: '#eee' }}>Zero Proof of Skills</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>Keywords don't mean competence. Recruiters have to guess if you're actually good.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--text-muted)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem', color: '#eee' }}>Hard to Stand Out</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>When everyone uses the same template, your unique talent gets lost in the pile.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: The Solution */}
            <div style={{ backgroundColor: 'var(--card-bg)', padding: '4rem 3rem', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--accent)' }}></div>
              <div style={{ marginBottom: '3rem' }}>
                <span style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent)', padding: '0.5rem 1rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase' }}>The SkillGraph Way</span>
                <h3 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1.5rem' }}>Proof-Driven Discovery</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'white', boxShadow: '0 5px 15px var(--accent-glow)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 7 16 12 23 17 23 7"></polyline><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem', color: 'white' }}>Real Work, Real Proof</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>Showcase videos, live demos, and before/after proofs that remove all doubt.</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'white', boxShadow: '0 5px 15px rgba(16, 185, 129, 0.4)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem', color: 'white' }}>Outcome-First Focus</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>Highlight measurable impact and growth metrics that prove your value instantly.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'black' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem', color: 'white' }}>Instant Credibility</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>Get a verified Hire Score that lets recruiters know you're qualified within seconds.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section style={{ padding: '8rem 0', background: 'var(--card-bg)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>Your portfolio, ready in 3 minutes.</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>We removed the friction. You just bring the proof.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', position: 'relative' }}>
            
            {/* Step 1 */}
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ 
                width: '80px', height: '80px', borderRadius: '24px', backgroundColor: 'rgba(59, 130, 246, 0.1)', 
                color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                margin: '0 auto 2rem', fontSize: '2rem', border: '1px solid rgba(59, 130, 246, 0.2)'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
              </div>
              <div style={{ position: 'absolute', top: '24px', left: 'calc(50% + 50px)', width: '100%', height: '2px', background: 'linear-gradient(to right, var(--border), transparent)', zIndex: 0 }} className="hide-on-mobile"></div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>1. Add Your Work</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Describe your project and the impact it made. No boring summaries required.</p>
            </div>

            {/* Step 2 */}
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ 
                width: '80px', height: '80px', borderRadius: '24px', backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                margin: '0 auto 2rem', fontSize: '2rem', border: '1px solid rgba(16, 185, 129, 0.2)'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
              </div>
              <div style={{ position: 'absolute', top: '24px', left: 'calc(50% + 50px)', width: '100%', height: '2px', background: 'linear-gradient(to right, var(--border), transparent)', zIndex: 0 }} className="hide-on-mobile"></div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>2. Upload Proof</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Attach screenshots or videos. Let the visual evidence do the talking for you.</p>
            </div>

            {/* Step 3 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', height: '80px', borderRadius: '24px', backgroundColor: 'white', 
                color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                margin: '0 auto 2rem', fontSize: '2rem'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>3. Get Your Link</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Generate your SkillGraph link and start sending it to recruiters instantly.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Hire Score Explanation Section */}
      <section style={{ padding: '8rem 0', background: 'var(--background)', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)', zIndex: 0 }}></div>
        
        <div className="container" style={{ maxWidth: '1000px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '5rem', alignItems: 'center' }}>
            
            {/* Left Column: The Concept */}
            <div>
              <span style={{ backgroundColor: 'rgba(250, 204, 21, 0.1)', color: '#facc15', padding: '0.5rem 1rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gamified Growth</span>
              <h2 style={{ fontSize: '3rem', fontWeight: 800, marginTop: '1.5rem', marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>
                Your value, quantified.
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '3rem' }}>
                SkillGraph calculates your **Hire Readiness Score** by analyzing your real-world proof. Stop guessing your worth and start measuring it.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {[
                  { label: 'Project Density', percent: 40, color: 'var(--accent)', desc: 'Variety and complexity of your work.' },
                  { label: 'Visual Proof', percent: 30, color: 'var(--success)', desc: 'Verification via videos and screenshots.' },
                  { label: 'Measurable Outcomes', percent: 30, color: '#facc15', desc: 'Real-world impact and performance metrics.' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', alignItems: 'center' }}>
                      <h4 style={{ fontWeight: 800, fontSize: '1rem' }}>{stat.label}</h4>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: stat.color }}>{stat.percent}% Weight</span>
                    </div>
                    <div style={{ height: '8px', width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.percent * 2.5}%` }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        style={{ height: '100%', backgroundColor: stat.color, borderRadius: '4px' }}
                      />
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>{stat.desc}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '4rem' }}>
                <Link href="/signup" className="btn-accent" style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem' }}>
                  Get My Score (Free)
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Gauge */}
            <div style={{ position: 'relative' }}>
              <div style={{ 
                backgroundColor: 'var(--card-bg)', border: '2px solid var(--border)', borderRadius: '40px', 
                padding: '3rem', textAlign: 'center', boxShadow: '0 40px 100px rgba(0,0,0,0.3)',
                position: 'relative', overflow: 'hidden'
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2rem', letterSpacing: '0.1em' }}>Target Score for Big Tech</div>
                
                {/* Large Gauge Simulation */}
                <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 2.5rem' }}>
                  <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                    <motion.circle 
                      cx="50" cy="50" r="45" fill="none" stroke="var(--success)" strokeWidth="8" 
                      strokeDasharray="282.7"
                      initial={{ strokeDashoffset: 282.7 }}
                      whileInView={{ strokeDashoffset: 282.7 * (1 - 0.85) }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '4rem', fontWeight: 900, color: 'white', lineHeight: 1 }}>85</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--success)' }}>HIRE READY</div>
                  </div>
                </div>

                <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '1rem', borderRadius: '16px', fontSize: '0.9rem', fontWeight: 700 }}>
                  🏆 Top 5% of all Frontend Developers
                </div>
              </div>

              {/* Floating "Improve" Tip */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                style={{ 
                  position: 'absolute', bottom: '-20px', right: '-20px', zIndex: 10,
                  backgroundColor: 'var(--accent)', color: 'white', padding: '1rem',
                  borderRadius: '20px', boxShadow: '0 10px 30px var(--accent-glow)',
                  maxWidth: '180px', fontSize: '0.85rem', fontWeight: 700, border: '2px solid var(--background)'
                }}
              >
                💡 Tip: Add a video demo to increase score by +12
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Real Profiles Showcase */}
      <section style={{ padding: '8rem 0', background: 'var(--background)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>Trusted by elite builders.</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>From startups to Big Tech, SkillGraph is the new way to discover talent.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
            {[
              { 
                name: 'Elena Rodriguez', role: 'UI/UX Lead', score: 94, 
                img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=400',
                project: 'Neumorphic Design System', avatar: 'https://i.pravatar.cc/150?img=32'
              },
              { 
                name: 'Marcus Thorne', role: 'Backend Engineer', score: 88, 
                img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=400',
                project: 'Distributed Ledger Core', avatar: 'https://i.pravatar.cc/150?img=11'
              },
              { 
                name: 'Sarah Jenkins', role: 'Frontend Architect', score: 91, 
                img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400',
                project: 'Interactive Data Hub', avatar: 'https://i.pravatar.cc/150?img=44'
              }
            ].map((profile, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                style={{ 
                  backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)', 
                  borderRadius: '32px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
                }}
              >
                <div style={{ height: '180px', background: `url(${profile.img}) center/cover` }}></div>
                <div style={{ padding: '2rem', position: 'relative' }}>
                  <div style={{ 
                    position: 'absolute', top: '-30px', right: '2rem',
                    width: '60px', height: '60px', borderRadius: '50%', border: '4px solid var(--card-bg)',
                    background: `url(${profile.avatar}) center/cover`
                  }}></div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>{profile.name}</h3>
                    <p style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>{profile.role}</p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--success)' }}>{profile.score}</div>
                      <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>Hire Score</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white' }}>{profile.project}</div>
                      <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>Top Project</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '5rem' }}>
            <Link href="/signup" className="btn-accent" style={{ padding: '1.25rem 3.5rem', fontSize: '1.15rem' }}>
              Build My Profile Now
            </Link>
          </div>
        </div>
      </section>

      {/* Final Conversion Section */}
      <section style={{ padding: '10rem 1.5rem', background: 'var(--card-bg)', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'var(--accent)', filter: 'blur(150px)', opacity: 0.1, pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '300px', height: '300px', background: 'var(--success)', filter: 'blur(150px)', opacity: 0.1, pointerEvents: 'none' }}></div>

        <div className="container" style={{ maxWidth: '800px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.05em', lineHeight: 1.1 }}>
              Stop sending resumes.<br/>
              <span style={{ color: 'var(--accent)' }}>Start showing proof.</span>
            </h2>
            
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '4rem', maxWidth: '500px', margin: '0 auto 4rem' }}>
              Join the next generation of builders getting hired based on what they've actually built.
            </p>

            <div style={{ display: 'inline-block', position: 'relative' }}>
              <Link href="/signup" className="btn-accent" style={{ padding: '1.5rem 4rem', fontSize: '1.25rem', boxShadow: '0 10px 40px var(--accent-glow)' }}>
                Create My Portfolio
              </Link>
              <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  Free for early users
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '5rem 1.5rem', background: 'var(--background)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '2rem' }}>SkillGraph</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '3rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
            <Link href="/recruiter/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>Recruiter Hub</Link>
            <Link href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About</Link>
            <Link href="/twitter" style={{ color: 'inherit', textDecoration: 'none' }}>Twitter</Link>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', opacity: 0.6 }}>
            &copy; 2026 SkillGraph. For builders, by builders.
          </div>
        </div>
      </footer>
    </main>
  );
}
