export function PageBlocks({ children, h = '20' }) {
  return (
    <div className={`w-screen h-${h} gap-10 z-10 flex flex-row mt-20 justify-around items-center`}>
      {children}
    </div>
  );
}
