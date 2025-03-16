import { create } from 'zustand';

interface PortalStore {
  activePortalId: string | null;
  setActivePortal: (activePortalId: string | null) => void;
}

const usePortalStore = create<PortalStore>((set, get) => ({
  activePortalId: null,
  setActivePortal: (activePortalId) => set(() => ({ activePortalId })),
}))

export default usePortalStore;