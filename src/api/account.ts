import axiosInstance from './axios'
import { API_ENDPOINTS } from '@/constants'

// 비밀번호 재설정 요청 타입
export interface ResetPasswordRequest {
  email: string
  nickname: string
}

// 비밀번호 재설정 응답 타입
export interface ResetPasswordResponse {
  status: number
  message: string
  data: Record<string, unknown>
}

// 비밀번호 재설정 API 호출 함수
export const requestPasswordReset = async (
  params: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  try {
    const response = await axiosInstance.post<ResetPasswordResponse>(
      `${API_ENDPOINTS.BASE_URL}/account/auth/reset/password`,
      params
    )
    return response.data
  } catch (error) {
    console.error('비밀번호 재설정 중 오류가 발생했습니다:', error)
    throw error
  }
}
