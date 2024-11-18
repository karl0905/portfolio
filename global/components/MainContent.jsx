"use client";
import React, { useEffect } from 'react';
import { useContentStore } from '@/global';

export function MainContent() {
  const { mainContent } = useContentStore();

  return (
    <div className="w-full p-4">
      <h1 className="text-3xl font-bold">{mainContent.name}</h1>
      {mainContent?.content?.map((item, index) => (
        <div key={index} className="text-sm">
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
};

