"use client";

import { ProfileProvider } from "@/context/ProfileContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AccessProvider } from "@/context/AccessContext";
import { ReferralProvider } from "@/context/ReferralContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AccessProvider>
        <ReferralProvider>
          <ProfileProvider>
            {children}
          </ProfileProvider>
        </ReferralProvider>
      </AccessProvider>
    </ThemeProvider>
  );
}
