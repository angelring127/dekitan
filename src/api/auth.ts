import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios'
import { API_ENDPOINTS } from '@/constants'
import { useGlobalStore } from '@/store/info'
import { useAuthStore } from '@/store/auth'

const LOGIN_URL = `${API_ENDPOINTS.BASE_URL}account/auth/login`

export interface LoginResponse {
  data: {
    player_id: number
    volatile_token: string
    message: string
    status: number
  }
  status: number
  statusText: string
  headers: AxiosHeaders
  config: AxiosRequestConfig
}

export interface LoginRequest {
  login_id: string
  password: string
}

export const login = async (credentials: LoginRequest): Promise<boolean> => {
  try {
    const response = await axios.post<LoginResponse>(LOGIN_URL, credentials)

    console.log(response)
    if (response.data.status === 2000) {
      const { volatile_token, player_id } = response.data.data
      console.log(volatile_token, player_id)

      // 로컬 스토리지에 토큰과 플레이어 ID 저장
      localStorage.setItem('volatile_token', volatile_token)
      localStorage.setItem('player_id', player_id.toString())

      // 인증 스토어 업데이트
      useAuthStore.getState().setToken(volatile_token)

      // 유저 정보를 스토어에 저장
      const { setName, setAllData } = useGlobalStore.getState()

      // 기본 이름 설정 (API에서 이름을 제공하지 않는 경우)
      setName(`Player ${player_id}`)

      // 기본 포인트 설정 (API에서 포인트를 제공하지 않는 경우)
      setAllData({ points: 0 })

      return true
    }
    return false
  } catch (err) {
    console.error('Failed to login:', err)
    return false
  }
}

export const verifyToken = async (): Promise<boolean> => {
  try {
    const volatile_token = localStorage.getItem('volatile_token')
    const player_id = localStorage.getItem('player_id')

    if (!volatile_token || !player_id) {
      return false
    }

    // 실제 API 경로로 수정 (서버에 맞게 조정 필요)
    const response = await axios.post(`${API_ENDPOINTS.BASE_URL}account/auth/verify`, {
      volatile_token,
      player_id: Number(player_id),
    })

    // 응답 상태 코드에 따라 유효성 판단
    return response.data.status === 2000
  } catch (err) {
    console.error('Failed to verify token:', err)
    // 오류 발생 시 일단 유효하다고 간주 (서버에 검증 API가 없는 경우)
    return true
  }
}
