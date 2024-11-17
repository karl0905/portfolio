"use client";
import React, { useState } from 'react';
import { useMenuStore } from '@/global';
import skillsData from '@/data/skills.json';
import axios from 'axios';

export function Folder({
  title = "title",
  route = "skills",
  content = { data: [] }
}) {
  const [isOpen, setIsOpen] = useState(true);
  const { setSelectedMenuItem, selectedMenuItem } = useMenuStore();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  async function fetchData() {
    try {
      const response = await axios.get(`/api/${route}`)
      const data = response.data.data;
      console.log("data fetched:", data);
    } catch (error) {
      console.error("error fetching data:", error);
    }
  }

  const handleMenuClick = async (item, route) => {
    setSelectedMenuItem(item); 
    fetchData(route);
  };

  return (
    <div>
      <p className="text-sm text-[#87afff] cursor-pointer" onClick={toggleDropdown}>
        {isOpen ? '▼' : '▶'} {title}
      </p>
      {isOpen && (
        <div className="ml-6">
          {content.data.map((item, index) => (
            <div
              key={index}
              className={`w-full cursor-pointer 
                ${selectedMenuItem?.name === item.name ? 'bg-[#303030]' : 'hover:bg-[#303030]'}`}
              onClick={() => handleMenuClick(item,)}
            >
              <p className='text-sm'>{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

