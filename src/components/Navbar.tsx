"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { useProfile } from '@/context/ProfileContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { profile, setProfile } = useProfile();
  const [showLogoutNote, setShowLogoutNote] = React.useState(false);
  
  React.useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('sg_logout_success') === 'true') {
      setShowLogoutNote(true);
      localStorage.removeItem('sg_logout_success');
      setTimeout(() => setShowLogoutNote(false), 3000);
    }
  }, []);

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
              <>
                <Link href={dashboardLink} style={{ color: pathname === dashboardLink ? 'var(--foreground)' : 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
                  Dashboard
                </Link>
                
                {/* Role Switcher */}
                <button 
                  onClick={() => {
                    const nextRole = profile.userRole === 'candidate' ? 'recruiter' : 'candidate';
                    setProfile(prev => ({ ...prev, userRole: nextRole }));
                    router.push(nextRole === 'recruiter' ? '/recruiter/dashboard' : '/dashboard');
                  }}
                  style={{ 
                    padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid var(--accent)', 
                    backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent)', 
                    fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M16 3h5v5"></path><path d="M4 20L21 3"></path><path d="M21 16v5h-5"></path><path d="M15 15l6 6"></path><path d="M4 4l5 5"></path></svg>
                  Switch to {profile.userRole === 'candidate' ? 'Recruiter' : 'Candidate'}
                </button>
              </>
            )}
          </div>

          {pathname === '/' && !hasRole && (
            <>
              <Link href="/login" className="btn-outline" style={{ fontSize: '0.9rem', fontWeight: 500, padding: '0.5rem 1rem' }}>Sign in</Link>
              <Link href="/role-selection" className="btn-accent" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>Join now</Link>
            </>
          )}
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '0.5rem', borderLeft: '1px solid var(--border)', paddingLeft: '1.25rem' }}>
            {hasRole && (
              <div style={{ 
                fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em',
                padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-muted)'
              }}>
                {profile.userRole}
              </div>
            )}
            <ThemeToggle />
            {hasRole && (
              <button 
                onClick={() => {
                  setProfile(prev => ({ ...prev, userRole: undefined }));
                  localStorage.setItem('sg_logout_success', 'true');
                  window.location.href = '/';
                }}
                style={{ 
                  background: 'none', border: 'none', color: '#ef4444', 
                  fontSize: '0.85rem', fontWeight: 700, padding: '0.4rem 0.6rem',
                  borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem'
                }}
                className="hover-fade"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Logout Notification */}
      {showLogoutNote && (
        <div style={{ 
          position: 'fixed', bottom: '2rem', right: '2rem', 
          backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)',
          padding: '1rem 2rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 2000,
          animation: 'slideUp 0.3s ease-out'
        }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Logged out successfully</span>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </nav>
  );
}
