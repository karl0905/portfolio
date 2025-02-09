import { Tree } from '@/features/nerdTree';
import { MainContent } from '@/global';
import { Lualine } from '@/features/lualine';

export default function Home() {

  return (
    <div className='flex w-screen'>
      <Tree />
      <MainContent >
        <Lualine />
      </MainContent>
    </div>
  );
}
