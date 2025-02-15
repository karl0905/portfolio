"use client";
import {
  useContentStore,
  colorizeString,
  colorizeSnippet,
  ProjectButton
} from '@/global';
import karl from '@/public/karl.md';
import { figlet } from '@/features/terminal'
import Image from 'next/image';
import { useEffect } from 'react';

export function MainContent({ children }) {
  const { mainContent, snippet, snippetFileType } = useContentStore();
  const contentDescription = mainContent?.content;

  const isProject = mainContent?.type === "projects";
  const isExperience = mainContent?.type === "experience";
  const isHome = mainContent?.name === "home.jsx";

  useEffect(() => {
    console.log("snippet state", snippetFileType);
  }, [snippet, snippetFileType, mainContent]);

  return (
    <div className={` flex flex-col px-4 pt-10 overflow-y-auto w-full grow gap-8 `}>
      <div className='max-w-[1200px] pb-16'>
        {isHome && (
          <div className={`flex gap-12 flex-wrap mb-8 items-center`}>
            <pre className='text-[1px]/[3px] tracking-[1.2px] text-white'>{karl}</pre>
            <pre className='hidden desktop:flex text-[9px]/[9px] tracking-[0.3px]'>{figlet}</pre>
          </div>
        )}
        {(isProject || isExperience) && (
          <div className='pb-4'>
            <h1 className='text-2xl font-bold'
              dangerouslySetInnerHTML={{ __html: colorizeString(`{{` + mainContent.title + `}}`) }}
            />
            <p
              dangerouslySetInnerHTML={{ __html: colorizeString(`{{` + mainContent.date + `}}`) }}
            />
            {mainContent?.tech && (
              <div className='flex flex-row gap-3'>
                {mainContent.tech.map((tech, index) => (
                  <span key={index}
                    dangerouslySetInnerHTML={{ __html: colorizeString('{{' + tech + '}}') }}
                  />
                ))}
              </div>
            )}
            {isProject && (
              <div className='flex gap-12 pt-4'>
                {mainContent.links.map((link, index) => (
                  <ProjectButton
                    key={index}
                    href={link.url}
                    title={link.title}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        {(snippetFileType === null || snippet) && (
          <>
            {contentDescription?.map((str, index) => (
              <div key={index}>
                <p
                  className="text-md py-2"
                  dangerouslySetInnerHTML={{ __html: colorizeString(str) }}
                />
                {mainContent.images?.[index] && (
                  <div className='relative max-w-[35rem] min-w-96 h-80 border border-[var(--text)]'>
                    <Image
                      src={mainContent.images[index].src}
                      alt={mainContent.images[index].alt}
                      layout="fill"
                      objectFit="contain"
                      className='p-4'
                    />
                  </div>
                )}
              </div>
            ))}
            {snippet && snippetFileType !== null && (
              <pre className="text-sm border border-grey-400 p-4 whitespace-pre-wrap">
                <code dangerouslySetInnerHTML={{ __html: colorizeSnippet(snippet, snippetFileType) }} />
              </pre>
            )}
          </>
        )}
      </div>
      {children}
    </div >
  );
}
