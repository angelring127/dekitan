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

export const OWNER = 'owner'
export const SUB_OWNER = 'sub_owner'
export const PLAYER = 'player'

export const USER_ROLE = {
  OWNER: 1,
  SUB_OWNER: 2,
  PLAYER: 3,
}

export * from './hanasu'
export const TaskStatus ={
  ACTIVE: 1,
  FINISHED: 2,
  REWARDED: 3,
  CLOSED: 4
}
