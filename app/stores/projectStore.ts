import { create } from 'zustand';

interface ProjectStore {
  activeProjectIndex: number | null;
  setActiveProject: (index: number | null) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  activeProjectIndex: null,
  setActiveProject: (activeProjectIndex) => set(() => ({ activeProjectIndex })),
}))
