"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/onboarding';
  
  if (isAuthPage) return null;

  return (
    <nav style={{ 
      position: 'sticky', top: 0, zIndex: 100, 
      backgroundColor: 'var(--navbar-bg)', backdropFilter: 'blur(12px)', 
      borderBottom: '1px solid var(--border)', padding: '1rem 0' 
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>S</div>
          SkillGraph
        </Link>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {pathname === '/dashboard' && (
            <>
              <Link href="/dashboard" style={{ color: 'var(--foreground)', fontSize: '0.9rem', fontWeight: 500 }}>Dashboard</Link>
              <Link href="/jane-doe" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>Profile</Link>
              <Link href="/login" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>Sign out</Link>
            </>
          )}

          {pathname !== '/' && pathname !== '/dashboard' && (
            <Link href="/" className="btn-accent" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>Create Your Own SkillGraph</Link>
          )}

          {pathname === '/' && (
            <>
              <Link href="/login" className="btn-outline" style={{ fontSize: '0.9rem', fontWeight: 500, padding: '0.5rem 1rem' }}>Sign in</Link>
              <Link href="/signup" className="btn-accent" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>Join now</Link>
            </>
          )}
          
          <div style={{ marginLeft: '0.5rem', borderLeft: '1px solid var(--border)', paddingLeft: '1.25rem' }}>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
