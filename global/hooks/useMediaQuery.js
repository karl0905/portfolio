"use client"
import { useState, useEffect } from 'react';

export function useMediaQuery() {
  const [mediaQuery, setMediaQuery] = useState(); // Default to desktop

  const updateMediaQuery = () => {
    if (window.innerWidth <= 470) {
      setMediaQuery('smallMobile');
    } else if (window.innerWidth <= 800) {
      setMediaQuery('mobile');
    } else if (window.innerWidth <= 1280) {
      setMediaQuery('tablet');
    }
    else {
      setMediaQuery('desktop');
    }
  };

  useEffect(() => {
    updateMediaQuery(); // Set initial value
    window.addEventListener('resize', updateMediaQuery); // Update on resize

    return () => {
      window.removeEventListener('resize', updateMediaQuery); // Cleanup
    };
  }, []);

  return mediaQuery;
};
