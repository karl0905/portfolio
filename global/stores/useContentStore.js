import { create } from 'zustand';
import readmeData from '@/data/readme.json';

const startdata = readmeData.data[0];

export const useContentStore = create((set) => ({
  mainContent: startdata,
  snippet: "",

  setContent: (newContent) => set({ mainContent: newContent }),
  clearContent: () => set({ mainContent: {} }),

  setSnippet: (newSnippet) => set({ snippet: newSnippet }),
  clearSnippet: () => set({ snippet: "" }),

  setSnippetFileType: (newSnippetFileType) => set({ snippetFileType: newSnippetFileType }),
  clearSnippetFileType: () => set({ snippetFileType: "" })
}));
