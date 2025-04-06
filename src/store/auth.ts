import { create } from 'zustand'
import { verifyToken } from '@/api/auth'

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  isVerifying: boolean
  setToken: (token: string | null) => void
  logout: () => void
  verifyAuth: () => Promise<boolean>
}

// 세션 토큰을 가져오는 함수
const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null

  try {
    return localStorage.getItem('volatile_token')
  } catch (error) {
    console.error('세션 토큰을 가져오는 중 오류가 발생했습니다:', error)
    return null
  }
}

// 세션 토큰을 저장하는 함수
const setStoredToken = (token: string | null): void => {
  if (typeof window === 'undefined') return

  try {
    if (token) {
      localStorage.setItem('volatile_token', token)
    } else {
      localStorage.removeItem('volatile_token')
    }
  } catch (error) {
    console.error('세션 토큰을 저장하는 중 오류가 발생했습니다:', error)
  }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: getStoredToken(),
  isAuthenticated: !!getStoredToken(),
  isVerifying: false,

  setToken: (token: string | null) => {
    setStoredToken(token)
    set({ token, isAuthenticated: !!token })
    console.log('인증 토큰 설정:', token)
  },

  logout: () => {
    setStoredToken(null)
    localStorage.removeItem('player_id')
    set({ token: null, isAuthenticated: false })
    console.log('로그아웃 완료')
  },

  verifyAuth: async () => {
    set({ isVerifying: true })
    try {
      const isValid = await verifyToken()
      console.log('토큰 검증 결과:', isValid)

      if (!isValid) {
        get().logout()
      }

      set({ isAuthenticated: isValid, isVerifying: false })
      return isValid
    } catch (error) {
      console.error('인증 검증 중 오류가 발생했습니다:', error)
      set({ isVerifying: false })
      return false
    }
  },
}))
