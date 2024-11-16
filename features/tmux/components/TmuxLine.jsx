"use client";
import { useEffect, useState } from 'react';

import {
  TmuxTab,
  StatusTab,
  DateTab,
} from '@/features/tmux/'

const tabs = [
  {
    icon: "/terminal_white.svg",
    title: "nvim",
  },
  {
    icon: "/terminal_white.svg",
    title: "zsh",
  },
  {
    icon: "/terminal_white.svg",
    title: "title",
  },
]

const statusTab = {
  icon: "/keyboard.svg",
  title: "portfolio",
}

const dateTab = {
  icon: "/calendar.svg",
  title: "date",
}

export function TmuxLine() {
  const [currentSite, setCurrentSite] = useState('zsh');
  return (
    <div className='h-fit flex gap-2 bg-[#2a2d40] no-select'>
      <StatusTab title={statusTab.title} icon={statusTab.icon} />
      {
        tabs.map((item, index) => (
          <TmuxTab
            className="mouse-pointer"
            key={index}
            index={index}
            icon={item.icon}
            title={item.title}
            isActive={currentSite === item.title}
            action={() => setCurrentSite(item.title)}
          />
        ))
      }
      <DateTab title={dateTab.title} icon={dateTab.icon} />
    </div>
  );
}
