import Image from 'next/image';
import Link from 'next/link';

export function TmuxTab({
  icon,
  title = "tab",
  index,
  isActive = false,
  destination = "/",
  action = () => { }
}) {
  const arrowSize = 10;

  return (
    <Link
      onClick={action}
      href={destination}
      className={`relative flex items-center h-5 text-white 
      ${isActive ? "bg-[#af87d7]" : "bg-[#545a78]"}`}>
      {/* Left Triangle Cutout with Number */}
      <div className="relative flex items-center">
        {/* Number Box with Right-pointing Triangle Arrow */}
        <div className={`relative flex items-center justify-center 
          ${isActive ? "bg-[#af87d7]" : "bg-[#747a9f]"} w-5 pl-2 h-5 `} >
          <span className="text-sm font-bold ml-0.5">{index + 1}</span>
          {/* Right-pointing Triangle as Background Arrow */}
          <div
            className={`absolute right-[-10px] top-1/2 transform -translate-y-1/2 h-0 w-0 border-t-[10px] 
              border-b-[10px] border-l-[10px] border-t-transparent border-b-transparent 
              ${isActive ? "border-l-[#af87d7]" : "border-l-[#747a9f]"}`}
          ></div>
        </div>

        {/* Left Triangle Cutout */}
        <div
          className="absolute left-0 top-0 h-0 w-0 border-t-transparent border-b-transparent border-l-[#303030]"
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
          height={12}
          width={12}
          draggable={false}
        />
        <span className="ml-2 text-sm">{title}</span>
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
    </Link>
  );
}

