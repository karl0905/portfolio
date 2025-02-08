import { create } from 'zustand';

export const useMenuStore = create((set) => ({
  selectedMenuItem: { name: "home.jsx"},
  setSelectedMenuItem: (item) => set({ selectedMenuItem: item }),
}));
