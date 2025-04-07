export type TaskChatSequence = {
  label: string
  value: number
}

export type TaskCategory = {
  label: string
  value: number
}

export const TASK_CHAT_SEQUENCE: Record<string, TaskChatSequence> = {
  FIRST_TIME: {
    label: '初回',
    value: 1,
  },
  CHOOSE_CATEGORY: {
    label: 'カテゴリ選択',
    value: 2,
  },
  CHOOSE_TASK: {
    label: 'タスク選択',
    value: 3,
  },
}

export const TASK_CATEGORY: Record<string, TaskCategory> = {
  SPECIAL: {
    label: 'スペシャル',
    value: 1,
  },
  SCHOOL: {
    label: '学校',
    value: 2,
  },
  LIFE: {
    label: '生活',
    value: 3,
  },
  SPORTS: {
    label: '運動',
    value: 4,
  },
  CREATE: {
    label: '創造',
    value: 5,
  },
  FRIENDSHIP: {
    label: '仲良く',
    value: 6,
  },
}

export const STAMP_IMAGE_PATH_LIST = {
  sugoi: '/images/hanasu/stamps/stamp_01.png',
  hai: '/images/hanasu/stamps/stamp_02.png',
  wakatta: '/images/hanasu/stamps/stamp_03.png',
}

export const STAMP_IMAGE_SUGOI_KEY = 'sugoi'
export const STAMP_IMAGE_HAI_KEY = 'hai'
export const STAMP_IMAGE_WAKATTA_KEY = 'wakatta'
