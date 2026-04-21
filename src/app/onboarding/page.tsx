"use client";

import React from 'react';
import { OnboardingWizard } from '@/components/OnboardingWizard';

export default function OnboardingPage() {
  return (
    <main className="container spotlight" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }} className="animate-fade-in">
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>Set Up Your Profile</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Let's create your first proof-based project in under 2 minutes.</p>
      </div>
      <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <OnboardingWizard />
      </div>
    </main>
  );
}
