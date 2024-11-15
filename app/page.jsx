import {
  ParticleBackground
} from '@/global';
import {
  TerminalController
} from '@/features/terminal/';

export default function Home() {
  return (
    <>
      <div className="p-2 flex flex-col ">
      </div>
      <h1 className=''>Hi, I&apos;m Karl Løvendahl =&gt; </h1>
      <div className="flex items-start w-3/5 mobile:w-4/5">
        <TerminalController />
      </div>
    </>
  );
}
