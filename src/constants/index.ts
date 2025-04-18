export const APP_CONFIG = {
  title: 'Dekitan',
  description: 'Dekitan Application',
}

export const API_ENDPOINTS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8888/api',
}

export const ROUTES = {
  HOME: '/',
  DEMO: '/demo',
}
export const FORTUNE_PROGRESS = {
  UNREPORTED: 1,
  UNEVALUATED: 2,
}

export const PLAYER_HONORIFIC_TITLE = [
  { honorific: 'くん', label: 'くん', value: 1 },
  { honorific: 'ちゃん', label: 'ちゃん', value: 2 },
  { honorific: 'さん', label: 'さん', value: 3 },
  { honorific: '', label: 'なし', value: 4 },
]

export const PLAYER_SCHOOLING = [
  { label: '年少', value: 3 },
  { label: '年中', value: 4 },
  { label: '年長', value: 5 },
  { label: '小学1年生', value: 6 },
  { label: '小学2年生', value: 7 },
  { label: '小学3年生', value: 8 },
  { label: '小学4年生', value: 9 },
  { label: '小学5年生', value: 10 },
  { label: '小学6年生', value: 11 },
]

export const OWNER = 'owner'
export const SUB_OWNER = 'sub_owner'
export const PLAYER = 'player'

export const USER_ROLE = {
  OWNER: 1,
  SUB_OWNER: 2,
  PLAYER: 3,
}

export * from './hanasu'
export const TaskStatus = {
  ACTIVE: 1,
  FINISHED: 2,
  REWARDED: 3,
  CLOSED: 4,
}

export const TaskCategory = {
  SPECIAL: 1, // スペシャル
  SCHOOL: 2, // 学校
  LIFE: 3, // 生活
  SPORTS: 4, // 運動
  CREATE: 5, // 創造
  FRIENDSHIP: 6, // 仲良く
} as const

export const TaskCategoryLabel = {
  [TaskCategory.SPECIAL]: 'スペシャル',
  [TaskCategory.SCHOOL]: '学校',
  [TaskCategory.LIFE]: '生活',
  [TaskCategory.SPORTS]: '運動',
  [TaskCategory.CREATE]: '創造',
  [TaskCategory.FRIENDSHIP]: '仲良く',
} as const

export const TaskCategoryStone = {
  [TaskCategory.SPECIAL]: 'y', // イエローの原石
  [TaskCategory.SCHOOL]: 'b', // ブルーの原石
  [TaskCategory.LIFE]: 'lg', // ライトグリーンの原石
  [TaskCategory.SPORTS]: 'r', // レッドの原石
  [TaskCategory.CREATE]: 'p', // パープルの原石
  [TaskCategory.FRIENDSHIP]: 'e', // エメラルドの原石
} as const
