import { create } from 'zustand'

export const useTerminalStore = create((set) => ({
  terminalLineData: [],
  commandHistory: [],
  setTerminalLineData: (data) => set({ terminalLineData: data }),
  addTerminalLine: (line) => set((state) => ({ 
    terminalLineData: [...state.terminalLineData, line] 
  })),
  addCommand: (command) => set((state) => ({ 
    commandHistory: [...state.commandHistory, command] 
  })),
  clearTerminal: () => set({ terminalLineData: [] }),
}))

