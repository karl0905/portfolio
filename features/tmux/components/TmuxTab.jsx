import Image from 'next/image';

export function TmuxTab({
  icon,
  title = "tab",
  index,
  isActive = false,
  action = () => { }
}) {
  const arrowSize = 8; // Size of the arrow

  return (
    <div
      onClick={action}
      className={`relative flex items-center h-4 text-white 
      ${isActive ? "bg-[#af87d7]" : "bg-[#545a78]"}`}>
      {/* Left Triangle Cutout with Number */}
      <div className="relative flex items-center">
        {/* Number Box with Right-pointing Triangle Arrow */}
        <div className={`relative flex items-center justify-center 
          ${isActive ? "bg-[#af87d7]" : "bg-[#747a9f]"} w-4 pl-2 h-full `} >
          <span className="text-xs font-bold">{index + 1}</span>
          {/* Right-pointing Triangle as Background Arrow */}
          <div
            className={`absolute right-[-8px] top-1/2 transform -translate-y-1/2 h-0 w-0 border-t-[8px] 
              border-b-[8px] border-l-[8px] border-t-transparent border-b-transparent 
              ${isActive ? "border-l-[#af87d7]" : "border-l-[#747a9f]"}`}
          ></div>
        </div>

        {/* Left Triangle Cutout */}
        <div
          className="absolute left-0 top-0 h-0 w-0 border-t-transparent border-b-transparent border-l-[#2a2d40]"
          style={{
            borderTopWidth: `${arrowSize}px`,
            borderBottomWidth: `${arrowSize}px`,
            borderLeftWidth: `${arrowSize}px`,
          }}
        ></div>
      </div>

      {/* Main Tab Content */}
      <div className="flex items-center px-2 h-full ml-2" >
        <Image
          src={icon}
          alt="tmux tab icon"
          height={10}
          width={10}
          draggable={false}
        />
        <span className="ml-2 text-xs">{title}</span>
      </div>

      {/* Right Arrow */}
      <div
        className={`absolute top-0 border-t-transparent border-b-transparent ${isActive ? "border-l-[#af87d7]" : "border-l-[#545a78]"} z-10`}
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

