import create from 'zustand';
import Work from '../interfaces/Work';

const useStore = create((set) =>({
  works: [],
  setWorks: (works: Work[] | undefined) => set((state) => ({
    state,
    works
  }))
}));

export default useStore;