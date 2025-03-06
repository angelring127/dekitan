'use client'

import { useEffect } from 'react'
import { useNavigation } from './Navigation/NavigationContext'

export function DisablePullToRefresh() {
  const { showNav } = useNavigation()

  useEffect(() => {
    // 터치 이벤트 핸들러
    const preventPullToRefresh = (e: TouchEvent) => {
      // 네비게이션이 표시된 상태에서는 기본 동작 방지하지 않음
      if (showNav) return

      // 매우 제한적인 조건에서만 기본 동작 방지
      // 페이지 최상단에서 아래로 당기는 동작일 때만 방지
      if (window.scrollY === 0 && e.touches[0].clientY > 10) {
        // 첫 번째 터치 포인트의 Y 위치가 시작점보다 30px 이상 아래일 때만 방지
        const touchDelta = e.touches[0].clientY - (e.target as any).touchStartY || 0

        if (touchDelta > 30) {
          e.preventDefault()
          return
        }
      }
    }

    // 터치 시작 위치 기록
    const handleTouchStart = (e: TouchEvent) => {
      ;(e.target as any).touchStartY = e.touches[0].clientY
    }

    // 터치 이벤트에 핸들러 등록
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', preventPullToRefresh, { passive: false })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', preventPullToRefresh)
    }
  }, [showNav])

  return null
}
