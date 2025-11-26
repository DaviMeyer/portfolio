import React from 'react';

export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  place: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

export interface HobbyItem {
  id: number;
  name: string;
  desc: string;
  icon: React.ReactNode;
}
