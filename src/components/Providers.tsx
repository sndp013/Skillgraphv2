"use client";

import { ProfileProvider } from "@/context/ProfileContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AccessProvider } from "@/context/AccessContext";
import { ReferralProvider } from "@/context/ReferralContext";
import { FreelanceProvider } from "@/context/FreelanceContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AccessProvider>
        <ReferralProvider>
          <FreelanceProvider>
            <ProfileProvider>
              {children}
            </ProfileProvider>
          </FreelanceProvider>
        </ReferralProvider>
      </AccessProvider>
    </ThemeProvider>
  );
}
