import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { ProjectStore } from '../types';

const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  activeProjectId: null,
  addProject: (project) => set((state) => ({ projects: [...state.projects, { ...project, id: uuidv4() }]})),
  setActiveProject: (project) => set(() => ({ activeProjectId: project?.id })),
  isActive: (project) => get().activeProjectId === project.id,
}))

export default useProjectStore;