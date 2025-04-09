import axiosInstance from './axios'
import { ChatResponse, ChatRequestParams } from '@/types/chat'
import { API_ENDPOINTS } from '@/constants'
import { TASK_CHAT_SEQUENCE } from '@/constants/hanasu'

const API_URL = `${API_ENDPOINTS.BASE_URL}/event/task/chat/get`

export const fetchChatMessages = async (
  sequence: number,
  category?: number
): Promise<ChatResponse> => {
  const params: ChatRequestParams = {
    player_id: Number(localStorage.getItem('player_id')) || 1,
    volatile_token: localStorage.getItem('volatile_token') || '',
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
