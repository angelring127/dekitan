import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios'
import { ChatResponse, ChatRequestParams, ChatMessage } from '@/types/chat'
import { API_ENDPOINTS } from '@/constants'

const API_URL = `${API_ENDPOINTS.BASE_URL}event/task/chat/get`
const LOGIN_URL = `${API_ENDPOINTS.BASE_URL}account/auth/login`

interface LoginResponse {
  data: {
    data: {
      player_id: number
      volatile_token: string
    }
    message: string
    status: number
  }
  status: number
  statusText: string
  headers: AxiosHeaders
  config: AxiosRequestConfig
}

export const login = async () => {
  try {
    const response = await axios.post<LoginResponse>(LOGIN_URL, {
      login_id: 'youn@maebe.jp',
      password: 'test12345',
    })

    console.log(response)
    if (response.data.status === 2000) {
      localStorage.setItem('volatile_token', response.data.data.volatile_token)
      localStorage.setItem('player_id', response.data.data.player_id.toString())
      return true
    }
    return false
  } catch (err) {
    console.error('Failed to login:', err)
    return false
  }
}

export const fetchChatMessages = async (
  sequence: number,
  category?: number
): Promise<ChatResponse> => {
  // 토큰이 없으면 로그인 시도
  await login()

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
