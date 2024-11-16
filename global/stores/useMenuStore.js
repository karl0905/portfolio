import { create } from 'zustand';

export const useMenuStore = create((set) => ({
  selectedMenuItem: null,
  setSelectedMenuItem: (item) => set({ selectedMenuItem: item }),
}));
