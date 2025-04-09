import { create } from "zustand";

export interface CollectionItem {
  // id: number;
  title: string;
  description: string;
  image?: string;
  count: number;
  // parent_id: string;
}


interface GlobalState {
  name: string;
  points: number;
  mycollection: CollectionItem[];
  singleCollectionItem: CollectionItem | null;



  setName: (newName: string) => void;
  increasePoints: (value: number) => void;
  decreasePoints: (value: number) => void;
  addToCollection: (item: CollectionItem) => void;
  removeFromCollection: (id: number) => void;
  setSingleCollectionItem: (item: CollectionItem) => void;
  clearCollection: () => void;
}

export const useGlobalStore = create<GlobalState>((set, get) => ({
  name: 'test',
  points: 120,
  mycollection: [],
  singleCollectionItem: null,

  parentinfo: { parent_id: '', name: '' },
  childinfo: { parent_id: '', suffix: '', name: '', schoolYear: '' },

  setAllData: (data: Partial<GlobalState>) => {
    if (typeof window !== 'undefined') {
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          localStorage.setItem(key, JSON.stringify(value))
        } else {
          localStorage.setItem(key, value?.toString() || '')
        }
      })
    }
    set(data)
  },

  setName: (newName) => {
    localStorage.setItem('name', newName)
    set({ name: newName })
  },

  setParentInfo: (key, value) => {
    localStorage.setItem(key, value)
    set((state) => ({
      parentinfo: { ...state.parentinfo, [key]: value },
      ...(key === 'parent_id' ? { childinfo: { ...state.childinfo, parent_id: value } } : {}),
    }))
  },

  setChildInfo: (key, value) => {
    localStorage.setItem(`child_${key}`, value)
    set((state) => ({
      childinfo: { ...state.childinfo, [key]: value },
    }))
  },

  syncParentToChild: () => {
    const parent_id = get().parentinfo.parent_id
    localStorage.setItem('child_parent_id', parent_id)
    set((state) => ({
      childinfo: { ...state.childinfo, parent_id },
    }))
  },

  increasePoints: (value) => {
    const newPoints = get().points + value
    localStorage.setItem('points', newPoints.toString())
    set({ points: newPoints })
  },
  decreasePoints: (value) => {
    const newPoints = Math.max(0, get().points - value)
    localStorage.setItem('points', newPoints.toString())
    set({ points: newPoints })
  },

  addToCollection: (items) => {
    const collectionItems = Array.isArray(items) ? items : [items]
    localStorage.setItem('mycollection', JSON.stringify(collectionItems))
    set({ mycollection: collectionItems })
  },

  removeFromCollection: (id) => {
    const updatedCollection = get().mycollection.filter((item) => item.id !== id)
    localStorage.setItem('mycollection', JSON.stringify(updatedCollection))
    set({ mycollection: updatedCollection })
  },

  setSingleCollectionItem: (item) => {
    localStorage.setItem('singleCollectionItem', JSON.stringify(item))
    set({ singleCollectionItem: item })
  },

  clearCollection: () => {
    localStorage.removeItem('mycollection')
    localStorage.removeItem('singleCollectionItem')
    set({ mycollection: [], singleCollectionItem: null })
  },
}))
