import { useEffect, useRef } from 'react'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'

/**
 * 주기적으로 인증 상태를 확인하는 훅
 * @param redirectPath 인증 실패 시 리다이렉트할 경로
 */
export const useAuthVerification = (redirectPath: string = '/') => {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true

    // 토큰이 없으면 리다이렉트
    if (!isAuthenticated && isMounted.current) {
      router.push(redirectPath)
    }

    // 클린업 함수
    return () => {
      isMounted.current = false
    }
  }, [isAuthenticated, redirectPath, router])

  return { isAuthenticated }
}
