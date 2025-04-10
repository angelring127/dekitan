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
  { label: '年少', value: 1 },
  { label: '年中', value: 2 },
  { label: '年長', value: 3 },
  { label: '小学1年生', value: 4 },
  { label: '小学2年生', value: 5 },
  { label: '小学3年生', value: 6 },
  { label: '小学4年生', value: 7 },
  { label: '小学5年生', value: 8 },
  { label: '小学6年生', value: 9 },
]

export * from './hanasu'
