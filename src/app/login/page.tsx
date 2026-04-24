"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/context/ProfileContext';

export default function LoginPage() {
  const { profile } = useProfile();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Automatic Role-Based Redirection
    if (profile.userRole === 'recruiter') {
      router.push('/recruiter/dashboard');
    } else if (profile.userRole === 'candidate') {
      router.push('/dashboard');
    } else {
      // If no role is found, take them to selection
      router.push('/role-selection');
    }
  };

  return (
    <main className="container spotlight" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-muted)' }}>Enter your credentials to continue.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <span className="input-label">Email Address</span>
            <input type="email" className="input-field" placeholder="jane@example.com" required />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="input-label" style={{ margin: 0 }}>Password</span>
              <Link href="#" style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>Forgot?</Link>
            </div>
            <input type="password" className="input-field" placeholder="••••••••" required />
          </div>

          <button type="submit" className="btn-accent" style={{ marginTop: '0.5rem', width: '100%' }}>
            Sign In
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Don't have an account? <Link href="/signup" style={{ color: 'var(--accent)', fontWeight: 600 }}>Sign up</Link>
        </p>
      </div>
    </main>
  );
}
