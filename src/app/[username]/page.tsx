import React from 'react';
import { Metadata } from 'next';
import { ProfileView } from '@/components/ProfileView';
import { defaultProfile } from '@/context/ProfileContext';

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  
  // In a real app, you'd fetch the user's data from a DB based on the username.
  // For this prototype, we use the defaultProfile to demonstrate the OG tag generation.
  const name = defaultProfile?.name || "SkillGraph User";
  const role = defaultProfile?.role || "Professional";
  const score = defaultProfile?.score || 0;
  const projects = defaultProfile?.projects || [];
  const firstProjectImage = projects.length > 0 ? projects[0].mediaUrl : null;

  return {
    title: `${name} | ${role} on SkillGraph`,
    description: `Hire Score: ${score}/100. View verified proof-of-work and impact journey on SkillGraph.`,
    openGraph: {
      title: `${name} | ${role}`,
      description: `Verified Hire Score: ${score}. Exploring the impact journey of ${name}.`,
      images: firstProjectImage ? [{
        url: firstProjectImage,
        width: 1200,
        height: 630,
        alt: `${name}'s Featured Project`
      }] : [],
      type: 'profile',
      siteName: 'SkillGraph',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} | ${role}`,
      description: `Hire Score: ${score}/100. Built on SkillGraph.`,
      images: firstProjectImage ? [firstProjectImage] : [],
    }
  };
}

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params;
  return <ProfileView username={username} />;
}
