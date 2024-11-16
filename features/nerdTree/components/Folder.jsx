"use client";
import React, { useState } from 'react';
import skillsData from '@/data/skills.json';
import { useMenuStore } from '@/global';

export function Folder({ title = "title" }) {
  const [isOpen, setIsOpen] = useState(true);
  const { setSelectedMenuItem, selectedMenuItem } = useMenuStore();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = async (skill) => {
    setSelectedMenuItem(skill); // Update the selected menu item in global state
  };

  return (
    <div>
      <p className="text-sm text-[#87afff] cursor-pointer" onClick={toggleDropdown}>
        {isOpen ? '▼' : '▶'} {title}
      </p>
      {isOpen && (
        <div className="ml-6">
          {skillsData.data.map((item, index) => (
            <div
              key={index}
              className={`w-full cursor-pointer 
                ${selectedMenuItem?.name === item.name ? 'bg-[#303030]' : 'hover:bg-[#303030]'}`} // Apply styles conditionally
              onClick={() => handleMenuClick(item)} // Handle click event
            >
              <p className='text-sm'>{item.name}</p> {/* Display name */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

