export function PageBlocks({ children, h = 'full' }) {
  return (
    <div className={`w-full h-${h} gap-10 z-10 flex flex-row mt-20 justify-around items-start relative`}>
      {children}
    </div>
  );
}
