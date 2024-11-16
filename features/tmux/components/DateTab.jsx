"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';

export function DateTab({ icon }) {
  const arrowSize = 8; // Size of the arrow
  const [currentDateTime, setCurrentDateTime] = useState('16 Nov 00:00');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      // Format the date as "16 Nov 11:35"
      const options = {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      };
      const formattedDate = now.toLocaleString('en-GB', options).replace(',', '');
      setCurrentDateTime(formattedDate);
    };

    // Update immediately on mount
    updateDateTime();

    // Set an interval to update every second
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className={`ml-auto relative flex items-center h-4 text-white bg-[#545a78]`}>
      {/* Left Triangle Cutout with Icon */}
      <div className="relative flex items-center h-full">
        {/* Icon Box with Left-pointing Triangle Arrow */}
        <div className="relative flex items-center justify-center bg-[#747a9f] w-4 h-full">
          <Image className="mr-2.5 z-50"
            src={icon}
            alt="tmux tab icon"
            height={10}
            width={10}
            draggable={false}
          />
        </div>

        {/* Right Triangle Cutout */}
        <div
          className="absolute right-0 top-0 h-0 w-0 border-t-transparent border-b-transparent border-r-[#545a78]"
          style={{
            borderTopWidth: `${arrowSize}px`,
            borderBottomWidth: `${arrowSize}px`,
            borderRightWidth: `${arrowSize}px`,
          }}
        ></div>
      </div>

      {/* Main Tab Content */}
      <div className="flex items-center px-1">
        <span className="text-xs">{currentDateTime}</span>
      </div>

      {/* Left Arrow */}
      <div
        className={`absolute top-0 border-t-transparent border-b-transparent border-r-[#747a9f] z-10`}
        style={{
          left: `-${arrowSize}px`,
          borderTopWidth: `${arrowSize}px`,
          borderBottomWidth: `${arrowSize}px`,
          borderRightWidth: `${arrowSize}px`,
        }}
      ></div>
    </div>
  );
}
