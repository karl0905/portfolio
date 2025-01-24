"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  useMenuStore,
  useContentStore
} from '@/global';
import { fetchSnippet } from '@/global'

export function Folder({
  title = "title",
  route = "skills",
  content = { data: [] }
}) {

  const [isOpen, setIsOpen] = useState(true);
  const { setSelectedMenuItem, selectedMenuItem } = useMenuStore();
  const {
    setContent,
    mainContent,
    setSnippet,
    clearSnippet,
    setSnippetFileType,
    clearSnippetFileType
  } = useContentStore();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  async function fetchData(name) {
    try {
      const response = await axios.get(`/api/${route}`)
      const items = response.data.data;

      const matchedItem = items.find(item => item.name === name);

      if (matchedItem) {
        return matchedItem;
      } else {
        console.log("no matchedItem with name", name);
        return null;
      }
    } catch (error) {
      console.error("error fetching data:", error);
    }
  }

  const handleMenuClick = async (item, route) => {
    setSelectedMenuItem(item);
    const data = await fetchData(item.name, route);
    setContent(data);
    if (route === "skills") {
      console.log("this ran");
      setSnippetFileType(data.snippet);
      const snippet = await fetchSnippet(data.snippet);
      setSnippet(snippet);
    } else {
      clearSnippet();
      clearSnippetFileType();
    }
    console.log("data", data);
  };

  return (
    <div>
      <p className="text-md text-[#87afff] cursor-pointer" onClick={toggleDropdown}>
        {isOpen ? '▼' : '▶'} {title}
      </p>
      {isOpen && (
        <div className="ml-6">
          {content.data.map((item, index) => (
            <div
              key={index}
              className={`w-full cursor-pointer flex gap-4 whitespace-nowrap
                ${selectedMenuItem?.name === item.name ? 'bg-[#303030]' : 'hover:bg-[#303030]'}`}
              onClick={() => handleMenuClick(item, route)}
            >
              <p className='text-md'>{item.name}</p>
              {title === "experience" && (
                <>
                  <p className='text-md text-[var(--orange)]'>@</p>
                  <p className='text-md'>{item.company}</p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

