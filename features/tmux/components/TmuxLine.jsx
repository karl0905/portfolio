"use client";
import { useState } from 'react';
import { usePathname } from 'next/navigation';

import {
  TmuxTab,
  StatusTab,
  DateTab,
} from '@/features/tmux/'

const tabs = [
  {
    icon: "/terminal_white.svg",
    title: "nvim",
    destination: "/"
  },
  {
    icon: "/terminal_white.svg",
    title: "zsh",
    destination: "/zsh"
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
  const route = usePathname();
  const [currentSite, setCurrentSite] = useState(route);
  return (
    <div className='h-fit flex gap-2 bg-[#303030] no-select'>
      <StatusTab title={statusTab.title} icon={statusTab.icon} />
      {
        tabs.map((item, index) => (
          <TmuxTab
            key={index}
            index={index}
            icon={item.icon}
            title={item.title}
            isActive={currentSite === item.destination}
            action={() => setCurrentSite(item.destination)}
            destination={item.destination}
          />
        ))
      }
      <DateTab title={dateTab.title} icon={dateTab.icon} />
    </div>
  );
}
