import {
  ParticleBackground
} from '@/global';
import {
  TerminalController
} from '@/features/terminal/';
import {
  TmuxLine
} from '@/features/tmux/'

export default function Home() {
  return (
    <>
      <TmuxLine />
      <div className="p-2 flex flex-col ">
      </div>
      <h1 className=''>Hi, I&apos;m Karl Løvendahl =&gt; </h1>
    </>
  );
}
