import axiosInstance from './axios'
import { useGlobalStore } from '@/store/info'
import { useAuthStore } from '@/store/auth'
import { AxiosHeaders, AxiosRequestConfig } from 'axios'
import type { GlobalState } from '@/types/info'

const LOGIN_URL = '/account/auth/login'
const VERIFY_URL = '/account/auth/verify'

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
    console.log('로그인 시도:', credentials)

    // 로그인 요청
    const response = await axiosInstance.post<LoginResponse>(LOGIN_URL, credentials)

    console.log('로그인 응답:', response.data)
    console.log('로그인 응답 헤더:', response.headers)

    // 응답 헤더에서 쿠키 확인
    const setCookieHeader = response.headers['set-cookie']
    if (setCookieHeader) {
      console.log('로그인 후 서버가 설정한 쿠키:', setCookieHeader)
    }

    // 쿠키 확인
    const cookies = document.cookie.split(';')
    console.log('로그인 후 모든 쿠키:', cookies)

    // 세션 쿠키 확인 (karenainsworth_session 또는 session)
    const sessionCookie = cookies.find(
      (cookie) =>
        cookie.trim().startsWith('karenainsworth_session=') || cookie.trim().startsWith('session=')
    )

    if (sessionCookie) {
      console.log('로그인 후 세션 쿠키가 발견되었습니다:', sessionCookie)
    }

    if (response.data.status === 2000) {
      const { volatile_token, player_id } = response.data.data
      console.log('받은 토큰:', volatile_token)
      console.log('받은 플레이어 ID:', player_id)

      // 로컬 스토리지에 토큰과 플레이어 ID 저장
      localStorage.setItem('volatile_token', volatile_token)
      localStorage.setItem('player_id', player_id.toString())

      // 저장 후 확인
      console.log('저장된 토큰:', localStorage.getItem('volatile_token'))
      console.log('저장된 플레이어 ID:', localStorage.getItem('player_id'))

      // 인증 스토어 업데이트
      useAuthStore.getState().setToken(volatile_token)

      // 유저 정보를 스토어에 저장
      const { setName } = useGlobalStore.getState() as GlobalState

      // 기본 이름 설정 (API에서 이름을 제공하지 않는 경우)
      setName(`Player ${player_id}`)

      return true
    }

    console.error('로그인 실패:', response.data)
    return false
  } catch (err) {
    console.error('로그인 중 오류가 발생했습니다:', err)
    return false
  }
}

export const verifyToken = async (): Promise<boolean> => {
  try {
    const volatile_token = localStorage.getItem('volatile_token')
    const player_id = localStorage.getItem('player_id')

    if (!volatile_token || !player_id) {
      console.error('인증 토큰 또는 플레이어 ID가 없습니다.')
      return false
    }

    // 토큰 검증 요청 - 토큰은 인터셉터에서 자동으로 헤더와 본문에 추가됨
    const response = await axiosInstance.post(VERIFY_URL, {
      player_id: Number(player_id),
      // volatile_token은 인터셉터에서 자동으로 추가됨
    })

    console.log('토큰 검증 응답:', response.data)
    console.log('토큰 검증 응답 헤더:', response.headers)

    // 응답 헤더에서 쿠키 확인
    const setCookieHeader = response.headers['set-cookie']
    if (setCookieHeader) {
      console.log('토큰 검증 후 서버가 설정한 쿠키:', setCookieHeader)
    }

    // 쿠키 확인
    const cookies = document.cookie.split(';')
    console.log('토큰 검증 후 모든 쿠키:', cookies)

    // 세션 쿠키 확인 (karenainsworth_session 또는 session)
    const sessionCookie = cookies.find(
      (cookie) =>
        cookie.trim().startsWith('karenainsworth_session=') || cookie.trim().startsWith('session=')
    )

    if (sessionCookie) {
      console.log('토큰 검증 후 세션 쿠키가 발견되었습니다:', sessionCookie)
    }

    // 응답 상태 코드에 따라 유효성 판단
    if (response.data.status === 2000) {
      return true
    }

    // 인증 토큰 관련 오류 처리
    if (response.data.status === 4003 || response.data.status_code === 4004) {
      console.error('인증 토큰 오류:', response.data.message)
      localStorage.removeItem('volatile_token')
      localStorage.removeItem('player_id')

      // 로그인 페이지로 리다이렉트
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }

    return false
  } catch (err) {
    console.error('토큰 검증 중 오류가 발생했습니다:', err)
    return false
  }
}

export const logout = async (): Promise<boolean> => {
  try {
    const volatile_token = localStorage.getItem('volatile_token')

    if (!volatile_token) {
      console.error('인증 토큰이 없습니다.')
      return false
    }

    // 로그아웃 요청
    const response = await axiosInstance.post('/account/auth/logout', {
      volatile_token,
    })

    console.log('로그아웃 응답:', response.data)

    // 로그아웃 성공 시 로컬 스토리지 정리
    if (response.data.status === 2000) {
      localStorage.removeItem('volatile_token')
      localStorage.removeItem('player_id')

      // 인증 스토어 업데이트
      useAuthStore.getState().logout()

      return true
    }

    // 오류 처리
    if ([4003, 4004, 4008].includes(response.data.status)) {
      console.error('로그아웃 중 인증 오류:', response.data.message)
      localStorage.removeItem('volatile_token')
      localStorage.removeItem('player_id')

      // 인증 스토어 업데이트
      useAuthStore.getState().logout()

      return true
    }

    console.error('로그아웃 실패:', response.data)
    return false
  } catch (err) {
    console.error('로그아웃 중 오류가 발생했습니다:', err)
    return false
  }
}
