"use client"
import { useState, useEffect } from 'react';

export function useMediaQuery() {
  const [mediaQuery, setMediaQuery] = useState('desktop'); // Default to desktop

  const updateMediaQuery = () => {
    if (window.innerWidth <= 700) {
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
