"use client";
import { useEffect } from 'react';
import {
  useContentStore,
  colorizeString,
  colorizeSnippet,
  useMediaQuery
} from '@/global';
import karl from '@/public/karl.md';
import { figlet } from '@/features/terminal'

export function MainContent() {
  const { mainContent, snippet, snippetFileType } = useContentStore();
  const contentDescription = mainContent?.content;
  const mediaQuery = useMediaQuery();

  useEffect(() => {
    console.log("mediaQuery", mediaQuery);
  }, [mediaQuery]);

  return (
    <div className={` flex flex-col px-4 pt-10 overflow-y-auto w-full grow gap-8 `}>
      <div className='max-w-[1200px]'>
        {mainContent?.name === "home.jsx" && (
          <div className={`flex gap-12 flex-wrap mb-8 items-center`}>
            <pre className='text-[0.8px]/[3px] tracking-[1.2px] '>{karl}</pre>
            {(mediaQuery === "desktop" || mediaQuery === "tablet") && (
              <pre className='text-[9px]/[9px] tracking-[0.3px]'>{figlet}</pre>
            )}
          </div>
        )}
        <div>
          {contentDescription?.map((str, index) => (
            <p
              key={index}
              className="text-md py-2"
              dangerouslySetInnerHTML={{ __html: colorizeString(str) }}
            />
          ))}
        </div>
        {snippet && (
          <pre className="text-sm border border-grey-400 p-4 whitespace-pre-wrap">
            <code dangerouslySetInnerHTML={{ __html: colorizeSnippet(snippet, snippetFileType) }} />
          </pre>
        )}
      </div>
    </div>
  );
}
