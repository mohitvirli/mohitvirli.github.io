import { create } from 'zustand';

interface PortalStore {
  activePortalId: string | null;
  setActivePortal: (activePortalId: string | null) => void;
}

export const usePortalStore = create<PortalStore>((set) => ({
  activePortalId: null,
  setActivePortal: (activePortalId) => set(() => ({ activePortalId })),
}))
