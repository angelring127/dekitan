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

export * from './hanasu'
