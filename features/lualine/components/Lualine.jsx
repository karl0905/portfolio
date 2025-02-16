"use client"
import { useEffect, useState } from 'react';
import { LualineDir } from '@/features/lualine';
import { useContentStore, colorizeString } from '@/global';


export function Lualine() {
  const { mainContent } = useContentStore();

  const [currentDir, setCurrentDir] = useState({
    "file": mainContent?.name,
    "dir": mainContent?.type
  });

  useEffect(() => {
    setCurrentDir({
      "file": mainContent?.name,
      "dir": mainContent?.type
    });
  }, [mainContent])

  const links = [
    "[[Github|https://github.com/karl0905]]",
    "[[LinkedIn|https://www.linkedin.com/in/karllovendahl/]]",
    "[[Email|mailto:lovendahl@karlg.dk]]"
  ]

  return (
    <div className='w-[calc(100%+2rem)] lg:w-[calc(100%-22rem)] fixed bottom-0 flex flex-col -mx-4 '>
      <div className='h-5 bg-[var(--lightGrey)] flex items-center justify-between text-[var(--text)] px-4'>
        <LualineDir
          currentDir={currentDir}
        />
        <div className='flex gap-3 items-center'>
          {links.map((link, index) => (
            <p
              key={index}
              className='text-sm'
              target='_blank'
              rel='noopener noreferrer'
              dangerouslySetInnerHTML={{ __html: colorizeString(link) }}
            />
          ))}
        </div>

      </div>
      <div className='bg-[var(--background)] h-5 w-full' />
    </div>
  )
}
