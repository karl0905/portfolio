"use client"
import { useEffect } from 'react';
import { fetchSnippet } from '@/global'
import axios from 'axios';
import {
  useMenuStore,
  useContentStore
} from '@/global';

export function Fileline({
  content,
  type = "file",
  hexcode,
  route,
  title,
  onClick = () => { }
}) {

  const { setSelectedMenuItem, selectedMenuItem } = useMenuStore();

  const {
    setContent,
    setSnippet,
    clearSnippet,
    setSnippetFileType,
    clearSnippetFileType,
    mainContent
  } = useContentStore();

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
    clearSnippet();
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
    console.log("content", mainContent)
  };

  return (
    < >
      {
        type === 'dir'
          ? (
            <p className="text-md text-[#7394d5]">
              {content}
            </p>
          )
          : type === 'file'
            ? (
              <
                div className="ml-6"
                onClick={onClick}
              >
                {content.data.map((item, index) => (
                  <div
                    key={index}
                    className={`w-full cursor-pointer flex gap-2 whitespace-nowrap
                ${selectedMenuItem?.name === item.name ? 'bg-[#303030]' : 'hover:bg-[#303030]'}`}
                    onClick={() => handleMenuClick(item, route)}
                  >
                    <p className='text-md'>{item?.icon} {item.name}</p>
                    {title === "experience" && (
                      <>
                        <p className='text-md text-[var(--orange)]'>@</p>
                        <p className='text-md'>{item.company}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )
            : type === 'misc'
              ? (
                <p className="text-md" style={{ color: `#${hexcode}` }}>
                  {content}
                </p>
              )
              : null
      }
    </>
  );
}
