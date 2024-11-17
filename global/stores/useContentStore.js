import { create } from 'zustand';

export const useContentStore = create((set) => ({
  mainContent: {},

  setContent: (newContent) => set({ mainContent: newContent }),
}));
