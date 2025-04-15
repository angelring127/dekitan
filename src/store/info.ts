import { create } from 'zustand'
import { GlobalState } from '../types/info'
import { PLAYER_HONORIFIC_TITLE } from '../constants'

// 로컬 스토리지에서 초기값을 가져오는 함수
const getInitialState = (): Pick<
  GlobalState,
  | 'name'
  | 'points'
  | 'total_point'
  | 'current_point'
  | 'mycollection'
  | 'singleCollectionItem'
  | 'parentinfo'
  | 'childinfo'
  | 'volatileToken'
  | 'playerId'
  | 'honorific_title'
  | 'tasks'
> => {
  if (typeof window === 'undefined') {
    return {
      name: 'test',
      points: 120,
      total_point: 0,
      current_point: 0,
      mycollection: [],
      singleCollectionItem: null,
      parentinfo: { parent_id: '', name: '' },
      childinfo: { parent_id: '', suffix: '', name: '', schoolYear: '' },
      volatileToken: null,
      playerId: null,
      honorific_title: 4, // 기본값: 'なし'
      tasks: [],
    }
  }

  return {
    name: localStorage.getItem('name') || 'test',
    points: Number(localStorage.getItem('points')) || 120,
    total_point: Number(localStorage.getItem('total_point')) || 0,
    current_point: Number(localStorage.getItem('current_point')) || 0,
    mycollection: JSON.parse(localStorage.getItem('mycollection') || '[]'),
    singleCollectionItem: JSON.parse(localStorage.getItem('singleCollectionItem') || 'null'),
    parentinfo: {
      parent_id: localStorage.getItem('parent_id') || '',
      name: localStorage.getItem('name') || '',
    },
    childinfo: {
      parent_id: localStorage.getItem('child_parent_id') || '',
      suffix: localStorage.getItem('child_suffix') || '',
      name: localStorage.getItem('child_name') || '',
      schoolYear: localStorage.getItem('child_schoolYear') || '',
    },
    volatileToken: localStorage.getItem('volatileToken') || null,
    playerId: Number(localStorage.getItem('playerId')) || null,
    honorific_title: Number(localStorage.getItem('honorific_title')) || 4, // 기본값: 'なし'
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  }
}

export const useGlobalStore = create<GlobalState>((set, get) => ({
  ...getInitialState(),

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

  setVolatileToken: (token: string | null) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('volatileToken', token || '')
    }
    set({ volatileToken: token })
  },

  setPlayerId: (id: number | null) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('playerId', id?.toString() || '')
    }
    set({ playerId: id })
  },

  setHonorificTitle: (value: number) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('honorific_title', value.toString())
    }
    set({ honorific_title: value })
  },

  getHonorific: () => {
    const honorificTitle = get().honorific_title
    const honorificItem = PLAYER_HONORIFIC_TITLE.find((item) => item.value === honorificTitle)
    return honorificItem ? honorificItem.honorific : ''
  },

  setPoints: (totalPoint: number, currentPoint: number) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('total_point', totalPoint.toString())
      localStorage.setItem('current_point', currentPoint.toString())
    }
    set({ total_point: totalPoint, current_point: currentPoint })
  },

  setTasks: (tasks) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    set({ tasks })
  },

  getTaskById: (id) => {
    return get().tasks.find((task) => task.id === id)
  },
}))
