import {
  TmuxTab
} from '@/features/tmux/'

const tabs = [
  {
    icon: "/terminal_white.svg",
    title: "nvim",
  },
  {
    icon: "/terminal_white.svg",
    title: "title",
  },
  {
    icon: "/terminal_white.svg",
    title: "title",
  },
]

export function TmuxLine() {
  return (
    <div className='w-screen h-fit flex gap-2 bg-[#2a2d40] '>
      {
        tabs.map((item, index) => (
          <TmuxTab key={index} index={index} icon={item.icon} title={item.title} />
        ))
      }
    </div>
  );
}
