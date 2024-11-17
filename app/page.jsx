import { Tree } from '@/features/nerdTree';
import {
  MainContent
} from '@/global';

export default function Home() {

  return (
    <div className='flex'>
      <Tree />
      <MainContent />
    </div>
  );
}

