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

export function MainContent() {
  const { mainContent, snippet, snippetFileType } = useContentStore();
  const contentDescription = mainContent?.content;

  return (
    <div className={` flex flex-col px-4 pt-10 overflow-y-auto w-full grow gap-8 `}>
      <div className='max-w-[1200px] pb-4'>
        {mainContent?.name === "home.jsx" && (
          <div className={`flex gap-12 flex-wrap mb-8 items-center`}>
            <pre className='text-[0.8px]/[3px] tracking-[1.2px] '>{karl}</pre>
            <pre className='hidden lg:flex text-[9px]/[9px] tracking-[0.3px]'>{figlet}</pre>
          </div>
        )}
        {(mainContent.type === "project" || mainContent.type === "experience") && (
          <>
            <h1
              dangerouslySetInnerHTML={{ __html: colorizeString(`{{` + mainContent.title + `}}`) }}
            />
            <p
              dangerouslySetInnerHTML={{ __html: colorizeString(`{{` + mainContent.date + `}}`) }}
            />
            {mainContent.type === "project" && (
              <div className='flex gap-12 p-8'>
                {mainContent.links.map((link, index) => (
                  <ProjectButton
                    key={index}
                    href={link.url}
                    title={link.title}
                  />
                ))}
              </div>
            )}
            <div className='flex w-full gap-4 py-4 flex-wrap'>
            </div>
          </>
        )}
        <div>
          {contentDescription?.map((str, index) => (
            <>
              <p
                key={index}
                className="text-md py-2"
                dangerouslySetInnerHTML={{ __html: colorizeString(str) }}
              />
              {mainContent.images?.[index] && (
                <div key={index} className='relative w-96 h-80 border border-[var(--text)]'>
                  <Image
                    src={mainContent.images[index].src}
                    alt={mainContent.images[index].alt}
                    layout="fill"
                    objectFit="contain"
                    className='p-4'
                  />
                </div>
              ) }
            </>
          ))}
        </div>
        {snippet && (
          <pre className="text-sm border border-grey-400 p-4 whitespace-pre-wrap">
            <code dangerouslySetInnerHTML={{ __html: colorizeSnippet(snippet, snippetFileType) }} />
          </pre>
        )}
      </div>
    </div >
  );
}
