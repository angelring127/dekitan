import { create } from "zustand";

interface CollectionItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface GlobalState {
  name: string;
  points: number;
  mycollection: CollectionItem | null;

  setName: (newName: string) => void;
  increasePoints: (value: number) => void;
  decreasePoints: (value: number) => void;
  addToCollection: (item: CollectionItem) => void;
  removeFromCollection: (id: number) => void;
  clearCollection: () => void;
}

export const useGlobalStore = create<GlobalState>((set) => {
  // Load the initial state from localStorage or use default values
  const storedName = localStorage.getItem("name") || "こうき";
  const storedPoints = parseInt(localStorage.getItem("points") || "120", 10);
  const storedCollection = JSON.parse(localStorage.getItem("mycollection") || "null");

  return {
    name: storedName,
    points: storedPoints,
    mycollection: storedCollection,

    setName: (newName) => {
      localStorage.setItem("name", newName);
      set({ name: newName });
    },

    increasePoints: (value) => {
      const newPoints = storedPoints + value;
      localStorage.setItem("points", newPoints.toString());
      set({ points: newPoints });
    },

    decreasePoints: (value) => {
      const newPoints = Math.max(0, storedPoints - value);
      localStorage.setItem("points", newPoints.toString());
      set({ points: newPoints });
    },

    addToCollection: (item) => {
      localStorage.setItem("mycollection", JSON.stringify(item));
      set({ mycollection: item });
    },

    removeFromCollection: (id) => {
      if (storedCollection?.id === id) {
        localStorage.removeItem("mycollection");
        set({ mycollection: null });
      }
    },

    clearCollection: () => {
      localStorage.removeItem("mycollection");
      set({ mycollection: null });
    },
  };
});
