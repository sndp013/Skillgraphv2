"use client";

import { ProfileProvider } from "@/context/ProfileContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AccessProvider } from "@/context/AccessContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AccessProvider>
        <ProfileProvider>
          {children}
        </ProfileProvider>
      </AccessProvider>
    </ThemeProvider>
  );
}
