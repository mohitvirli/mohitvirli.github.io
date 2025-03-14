
export interface Project {
  id?: string;
  title: string;
  component: React.ReactNode;
  color: string;
  active?: boolean;
}
export interface ProjectStore {
  projects: Project[];
  activeProjectId: string | null;
  addProject: (project: Project) => void;
  setActiveProject: (project: Project | null) => void;
  isActive: (project: Project) => boolean;
}