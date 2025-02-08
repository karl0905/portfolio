"use client";
import React, { useState } from 'react';
import { Fileline } from '@/features/nerdTree';

export function Folder({
  title = "title",
  route = "skills",
  content = { data: [] },
  onClick = () => { }
}) {

  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <p className="text-md text-[#87afff] cursor-pointer" onClick={toggleDropdown}>
        {isOpen ? '▼' : '▶'} {title}
      </p>
      {isOpen && (
        <Fileline
          type="file"
          hexcode="9574d7"
          route={route}
          content={content}
          onClick={onClick}
        />
      )}
    </div>
  );
}

