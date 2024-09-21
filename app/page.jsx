import Image from "next/image";
import {
  SkillFloater
} from '@/features/skills/'
import {
  PageBlocks
} from '@/global';
import {
  TerminalController
} from '@/features/terminal/';

export default function Home() {
  return (
    <div className="h-screen w-screen ">
      <TerminalController />
      <PageBlocks >
        <SkillFloater source="/skills_react.png" />
        <SkillFloater source="/skills_react.png" />
        <SkillFloater source="/skills_react.png" />
        <SkillFloater source="/skills_react.png" />
      </PageBlocks>
    </div>
  );
}
