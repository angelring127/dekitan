import axiosInstance from './axios'
import { Profile, ProfileListResponse } from '@/types/profile'

export const getProfileList = async (): Promise<Profile[]> => {
  try {
    // 세션 토큰 확인
    const volatile_token = localStorage.getItem('volatile_token')

    if (!volatile_token) {
      console.error('인증 토큰이 없습니다. 로그인이 필요합니다.')

      // 로그인 페이지로 리다이렉트
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }

      return []
    }

    console.log('프로필 목록 요청 시작')

    // API 요청 - 토큰은 axios 인스턴스의 인터셉터에서 자동으로 헤더와 본문에 추가됨
    const response = await axiosInstance.post<ProfileListResponse>(
      '/account/profile/list',
      {} // volatile_token은 인터셉터에서 자동으로 추가됨
    )

    console.log('프로필 목록 응답:', response.data)

    if (response.data.status === 2000) {
      return response.data.data.list
    }

    // 특정 상태 코드에 따른 처리
    if (response.data.status === 4003 || response.data.status === 4004) {
      // 인증 토큰 관련 오류 - 로그아웃 처리
      console.error('인증 토큰 오류:', response.data.message)
      localStorage.removeItem('volatile_token')
      localStorage.removeItem('player_id')

      // 로그인 페이지로 리다이렉트
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }

      return []
    }

    if (response.data.status === 5007) {
      // 시스템 오류
      console.error('시스템 오류가 발생했습니다:', response.data.message)
      return []
    }

    console.error('알 수 없는 오류:', response.data)
    return []
  } catch (error) {
    console.error('프로필 목록을 가져오는 중 오류가 발생했습니다:', error)
    return []
  }
}
