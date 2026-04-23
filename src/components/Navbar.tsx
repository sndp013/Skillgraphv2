"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { useProfile } from '@/context/ProfileContext';

export default function Navbar() {
  const pathname = usePathname();
  const { profile } = useProfile();
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/onboarding' || pathname === '/role-selection';
  
  if (isAuthPage) return null;

  const dashboardLink = profile.userRole === 'recruiter' ? '/recruiter/dashboard' : '/dashboard';
  const hasRole = !!profile.userRole;

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
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {hasRole && (
              <Link href={dashboardLink} style={{ color: pathname === dashboardLink ? 'var(--foreground)' : 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
                Dashboard
              </Link>
            )}
          </div>

          {pathname === '/' && !hasRole && (
            <>
              <Link href="/login" className="btn-outline" style={{ fontSize: '0.9rem', fontWeight: 500, padding: '0.5rem 1rem' }}>Sign in</Link>
              <Link href="/role-selection" className="btn-accent" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>Join now</Link>
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
