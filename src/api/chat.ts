import axiosInstance from './axios'
import { ChatResponse, ChatRequestParams } from '@/types/chat'
import { API_ENDPOINTS } from '@/constants'
import { TASK_CHAT_SEQUENCE } from '@/constants/hanasu'
import { useAuthStore } from '@/store/auth'
import { useGlobalStore } from '@/store/info'

const API_URL = `${API_ENDPOINTS.BASE_URL}/event/task/chat/get`

export const fetchChatMessages = async (
  sequence: number,
  category?: number
): Promise<ChatResponse> => {
  const volatileToken = useAuthStore.getState().token
  const playerId = useGlobalStore.getState().playerId

  if (!volatileToken || !playerId) {
    throw new Error('認証情報が設定されていません')
  }

  const params: ChatRequestParams = {
    player_id: playerId,
    volatile_token: volatileToken,
    sequence,
    ...(category && { category }),
  }

  console.log('fetchChatMessages 호출', params)
  const response = await axiosInstance.post<ChatResponse>(
    API_URL,
    params // volatile_token은 인터셉터에서 자동으로 추가됨
  )
  return response.data
}

export const fetchCategoryMessages = async (): Promise<ChatResponse> => {
  return fetchChatMessages(TASK_CHAT_SEQUENCE.CHOOSE_CATEGORY.value)
}

export const fetchTaskMessages = async (category: number): Promise<ChatResponse> => {
  return fetchChatMessages(TASK_CHAT_SEQUENCE.CHOOSE_TASK.value, category)
}

// API 응답 타입 정의
export interface TaskEntryResponse {
  status: number
  message: string
  data: Record<string, unknown>
}

// API 요청 파라미터 타입 정의
export interface TaskEntryRequestParams {
  volatile_token: string
  player_id: number
  category: number
  task_id: number
}

// タスク登録可否確認 API 응답 타입 정의
export interface TaskEntryApproveResponse {
  status: number
  message: string
  data: {
    result: boolean
  }
}

// タスク登録可否確認 API 요청 파라미터 타입 정의
export interface TaskEntryApproveRequestParams {
  volatile_token: string
  player_id: number
}

// タスク登録可否確認 API 호출 함수
export const fetchTaskEntryApprove = async (): Promise<TaskEntryApproveResponse> => {
  const volatileToken = useAuthStore.getState().token
  const playerId = useGlobalStore.getState().playerId

  if (!volatileToken || !playerId) {
    throw new Error('認証情報が設定されていません')
  }

  const params: TaskEntryApproveRequestParams = {
    volatile_token: volatileToken,
    player_id: playerId,
  }

  try {
    const response = await axiosInstance.post<TaskEntryApproveResponse>(
      `${API_ENDPOINTS.BASE_URL}/event/task/entry/approve`,
      params
    )
    return response.data
  } catch (error) {
    console.error('タスク登録可否確認中にエラーが発生しました:', error)
    throw error
  }
}

// 기본 API 호출 함수
export const fetchTaskEntry = async (
  params: TaskEntryRequestParams
): Promise<TaskEntryResponse> => {
  try {
    const response = await axiosInstance.post<TaskEntryResponse>(
      `${API_ENDPOINTS.BASE_URL}/event/task/entry/regist`,
      params
    )
    return response.data
  } catch (error) {
    console.error('タスク登録中にエラーが発生しました:', error)
    throw error
  }
}

// API 호출 함수
export const registerTaskEntry = async (
  category: number,
  taskId: number
): Promise<TaskEntryResponse> => {
  const volatileToken = useAuthStore.getState().token
  const playerId = useGlobalStore.getState().playerId

  if (!volatileToken || !playerId) {
    throw new Error('認証情報が設定されていません')
  }

  const params: TaskEntryRequestParams = {
    volatile_token: volatileToken,
    player_id: playerId,
    category: category,
    task_id: taskId,
  }
  return fetchTaskEntry(params)
}
