import { ReactNode} from 'react'
// import { useRouter } from 'next/navigation'
// import { useAuthStore } from '@/store/auth'
// import { useAuthVerification } from '@/hooks/useAuthVerification'

interface ProtectedRouteProps {
  children: ReactNode
  redirectPath?: string
}

/**
 * 인증이 필요한 라우트를 보호하는 컴포넌트
 * @param children 보호할 컴포넌트
 * @param redirectPath 인증 실패 시 리다이렉트할 경로
 */
export const ProtectedRoute = ({ children}: ProtectedRouteProps) => {
  // 목업 버전: 항상 인증된 상태로 처리
  return <>{children}</>

  /* 실제 인증 로직 (현재 비활성화)
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  // 인증 검증 훅 사용
  useAuthVerification(redirectPath)

  useEffect(() => {
    // 초기 로딩 시 인증 상태 확인
    const checkAuth = async () => {
      if (!isAuthenticated) {
        // 로컬 스토리지에서 토큰 확인
        const token = localStorage.getItem('volatile_token')
        if (!token) {
          router.push(redirectPath)
          return
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [isAuthenticated, redirectPath, router])

  // 로딩 중이거나 인증되지 않은 경우 아무것도 렌더링하지 않음
  if (isLoading || !isAuthenticated) {
    return null
  }

  // 인증된 경우 자식 컴포넌트 렌더링
  return <>{children}</>
  */
}
