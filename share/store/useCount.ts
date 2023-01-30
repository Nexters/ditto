import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface CountState {
  count: number;
  increaseCount: () => void;
}

// example
const useCount = create<CountState>()(
  devtools((set) => ({
    count: 0,
    increaseCount: () => set((state) => ({ count: state.count + 1 })),
  }))
);

export default useCount;
