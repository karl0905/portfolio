import { create } from 'zustand';

export const useContentStore = create((set) => ({
  mainContent: {},
  snippet: "",

  setContent: (newContent) => set({ mainContent: newContent}),
  clearContent: () => set({ mainContent: {}}),

  setSnippet: (newSnippet) => set({ snippet: newSnippet}),
  clearSnippet: () => set({ snippet: {}}),
}));
