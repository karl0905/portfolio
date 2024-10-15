import Image from "next/image";
import {
  SkillFloater
} from '@/features/skills/'
import {
  PageBlocks,
  ParticleBackground
} from '@/global';
import {
  TerminalController
} from '@/features/terminal/';

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <PageBlocks center={true} >
        <div className="p-2 flex flex-col ">
          <h1>Karl Løvendahl</h1>
          <p>Hvad skal der stå her??</p>
        </div>
        <div className="flex items-start w-3/5">
          <TerminalController />
        </div>
      </PageBlocks>
    </>
  );
}
