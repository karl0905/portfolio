import Image from "next/image";

export function StatusTab({ title, icon }) {
  const arrowSize = 8; // Size of the arrow
  return (
    <div className={`relative flex items-center h-4 text-white bg-[#afd75f]`}>
      <span className="text-xs font-bold"></span>

      {/* Main Tab Content */}
      <div className="flex items-center h-full px-1.5" >
        <Image
          src={icon}
          alt="tmux tab icon"
          height={12}
          width={12}
          draggable={false}
        />
        <span className="ml-2 text-xs text-black">{title}</span>
      </div>

      {/* Right Arrow */}
      <div
        className={`absolute top-0 border-t-transparent border-b-transparent border-l-[#afd75f] z-10`}
        style={{
          right: `-${arrowSize}px`,
          borderTopWidth: `${arrowSize}px`,
          borderBottomWidth: `${arrowSize}px`,
          borderLeftWidth: `${arrowSize}px`,
        }}
      ></div>
    </div>

  );
}
