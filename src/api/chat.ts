import axios from 'axios'
import { ChatResponse, ChatRequestParams, ChatMessage } from '@/types/chat'
import { API_ENDPOINTS } from '@/constants'

const API_URL = `${API_ENDPOINTS.BASE_URL}event/task/chat/get`
export const fetchChatMessages = async (
  sequence: number,
  category?: number
): Promise<ChatResponse> => {
  console.log(localStorage.getItem('player_id'))
  console.log(localStorage.getItem('volatile_token'))
  const params: ChatRequestParams = {
    player_id: Number(localStorage.getItem('player_id')) || 1,
    volatile_token: localStorage.getItem('volatile_token') || '',
    sequence,
    ...(category && { category }),
  }

  const response = await axios.post<ChatResponse>(API_URL, params)
  return response.data
}

export const formatChatMessages = (messages: string[]): ChatMessage[] => {
  return messages.map((msg, index) => ({
    type: 'intro',
    message: msg,
    showCharacter: true,
    nextStep: index < messages.length - 1 ? index + 1 : undefined,
  }))
}
