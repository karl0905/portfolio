"use client";
import React, { useEffect } from 'react';
import {
  useContentStore,
  colorizeString,
} from '@/global';

export function MainContent() {
  const { mainContent } = useContentStore();

  const formattedString = colorizeString("{{ hello }} and {{ welcome }} to my portfolio!");

  return (
    <div className="flex flex-col p-4 overflow-x-hidden overflow-y-auto w-full">
      <h1 className="text-3xl font-bold text-customGreen">{mainContent.name}</h1>
      <p dangerouslySetInnerHTML={{ __html: formattedString }}></p>
      {mainContent?.content?.map((item, index) => (
        <p
          key={index}
          className="text-sm"
        >
          {item}
        </p>
      ))}
    </div>
  );
};

