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
  mycollection: CollectionItem[]
  singleCollectionItem: CollectionItem | null

  parentinfo: ParentInfo
  childinfo: ChildInfo

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
}
