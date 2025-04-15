export interface CollectionItem {
  id: number
  title: string
  description: string
  image?: string
  parent_id: string
}

export interface ChildInfo {
  parent_id: string
  suffix: string
  name: string
  schoolYear: string
}

export interface ParentInfo {
  parent_id: string
  name: string
}

export interface GlobalState {
  name: string
  points: number
  total_point: number
  current_point: number
  mycollection: CollectionItem[]
  singleCollectionItem: CollectionItem | null
  parentinfo: ParentInfo
  childinfo: ChildInfo
  volatileToken: string | null
  playerId: number | null
  honorific_title: number

  setName: (newName: string) => void
  setParentInfo: (key: keyof ParentInfo, value: string) => void
  setChildInfo: (key: keyof ChildInfo, value: string) => void
  syncParentToChild: () => void

  increasePoints: (value: number) => void
  decreasePoints: (value: number) => void
  addToCollection: (item: CollectionItem) => void
  removeFromCollection: (id: number) => void
  setSingleCollectionItem: (item: CollectionItem) => void
  clearCollection: () => void
  setVolatileToken: (token: string | null) => void
  setPlayerId: (id: number | null) => void
  setHonorificTitle: (value: number) => void
  getHonorific: () => string
  setPoints: (totalPoint: number, currentPoint: number) => void
}
