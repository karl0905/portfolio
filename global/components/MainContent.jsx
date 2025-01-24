"use client";
import React from 'react';
import {
  useContentStore,
  colorizeString,
  colorizeSnippet,
} from '@/global';

export function MainContent() {
  const { mainContent, snippet, snippetFileType } = useContentStore();
  const contentDescription = mainContent?.content;

  return (
    <div className="flex flex-col px-4 pt-10 overflow-x-hidden overflow-y-auto w-full">
      {contentDescription?.map((str, index) => (
        <p
          key={index}
          className="text-md py-4"
          dangerouslySetInnerHTML={{ __html: colorizeString(str) }}
        />
      ))}
      {snippet && (
        <pre className="text-md py-4 border border-grey-400 p-4">
          <code dangerouslySetInnerHTML={{ __html: colorizeSnippet(snippet, snippetFileType) }} />
        </pre>
      )}
    </div>
  );
}

