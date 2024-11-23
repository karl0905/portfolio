"use client";
import React, { useEffect } from 'react';
import {
  useContentStore,
  colorizeString,
} from '@/global';

export function MainContent() {
  const { mainContent } = useContentStore();
  const contentDescription = mainContent?.content;

  return (
    <div className="flex flex-col px-4 pt-10 overflow-x-hidden overflow-y-auto w-full">
      {contentDescription?.map((str, index) => (
        <p
          key={index}
          className="text-md py-4"
          dangerouslySetInnerHTML={{ __html: colorizeString(str) }}
        >
        </p>
      ))}
    </div>
  );
};

