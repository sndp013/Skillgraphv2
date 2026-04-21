"use client";

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="spotlight" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <section style={{ padding: '8rem 1.5rem 6rem', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="animate-fade-in">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ 
            display: 'inline-block', padding: '0.5rem 1.25rem', background: 'rgba(59, 130, 246, 0.1)', 
            border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '2rem', color: 'var(--accent)', 
            fontSize: '0.875rem', fontWeight: 600, marginBottom: '2rem' 
          }}>
            Proof-based portfolios for modern builders
          </div>
          <h1 style={{ 
            fontSize: '5rem', fontWeight: 800, marginBottom: '1.5rem', 
            background: 'linear-gradient(to bottom, #fff, #71717a)', 
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.05em', lineHeight: 1
          }}>
            Build Your Proof.<br/>Get Hired Fast.
          </h1>
          <p style={{ fontSize: '1.35rem', color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto 3.5rem', lineHeight: 1.6 }}>
            The traditional resume is dead. SkillGraph helps you create a powerful, impact-based portfolio in under 3 minutes that showcases your real work.
          </p>
          
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center' }}>
            <Link href="/signup" className="btn-accent" style={{ padding: '1.25rem 2.5rem', fontSize: '1.15rem' }}>
              Create Your Proof Portfolio
            </Link>
            <Link href="/login" className="btn-outline" style={{ padding: '1.25rem 2.5rem', fontSize: '1.15rem' }}>
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Teaser Section */}
      <section style={{ padding: '6rem 0', borderTop: '1px solid var(--border)', background: 'var(--card-bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }} className="animate-fade-in">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '1rem' }}>Engineered for Results</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Everything you need to showcase your actual impact, not just your titles.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            <div className="card animate-fade-in" style={{ animationDelay: '0.2s', padding: '2.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>📊</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Hire Readiness Score</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Our algorithm calculates your hireability based on project density, outcome verification, and visual proof.</p>
            </div>
            <div className="card animate-fade-in" style={{ animationDelay: '0.4s', padding: '2.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>⏳</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Impact Journey</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Transform your career path into a chronological timeline of actions and verifiable results.</p>
            </div>
            <div className="card animate-fade-in" style={{ animationDelay: '0.6s', padding: '2.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>📸</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Visual Validation</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Storytelling-first project cards that prioritize visual proof over generic text descriptions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '4rem 1.5rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <div className="container" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          &copy; 2026 SkillGraph. For builders, by builders.
        </div>
      </footer>
    </main>
  );
}
