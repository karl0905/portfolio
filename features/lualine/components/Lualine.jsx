"use client"
import { useEffect, useState } from 'react';
import { LualineDir } from '@/features/lualine';
import { useContentStore } from '@/global';


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

  return (
    <div className='w-[calc(100%+2rem)] fixed bottom-0 flex flex-col -mx-4 '>
      <div className='h-5 bg-[var(--lightGrey)] flex items-center text-[var(--text)]'>
        <LualineDir
          currentDir={currentDir}
        />
      </div>
      <div className='bg-[var(--background)] h-5 w-full' />
    </div>
  )
}
