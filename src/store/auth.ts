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

export const useAuthStore = create<AuthState>((set, get) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('volatile_token') : null,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('volatile_token') : false,
  isVerifying: false,
  setToken: (token: string | null) => {
    if (token) {
      localStorage.setItem('volatile_token', token)
    } else {
      localStorage.removeItem('volatile_token')
    }
    set({ token, isAuthenticated: !!token })
  },
  logout: () => {
    localStorage.removeItem('volatile_token')
    localStorage.removeItem('player_id')
    set({ token: null, isAuthenticated: false })
  },
  verifyAuth: async () => {
    set({ isVerifying: true })
    try {
      const isValid = await verifyToken()
      if (!isValid) {
        get().logout()
      }
      set({ isAuthenticated: isValid, isVerifying: false })
      return isValid
    } catch (error) {
      console.error('Auth verification failed:', error)
      set({ isVerifying: false })
      return false
    }
  },
}))
