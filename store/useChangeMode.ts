import { create } from 'zustand';

export type ModalMode = 'create' | 'update';
interface ChangeModeState {
  mode: ModalMode;
  setMode: (mode: ModalMode, selectedEventId: number | undefined) => void;
  selectedEventId: number | undefined;
  resetMode: () => void;
}

const useChangeMode = create<ChangeModeState>((set) => ({
  mode: 'create',
  selectedEventId: undefined,
  setMode: (mode, selectedEventId) => set({ mode, selectedEventId }),
  resetMode: () => set({ mode: 'create', selectedEventId: undefined }),
}));

export default useChangeMode;
