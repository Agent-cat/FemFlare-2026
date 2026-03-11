"use client";

import React from 'react';
import TeamCard from './TeamCard';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface TeamGridProps {
  members: TeamMember[];
}

export default function TeamGrid({ members }: TeamGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {members.map((member, index) => (
        <TeamCard key={index} member={member} index={index} />
      ))}
    </div>
  );
}
