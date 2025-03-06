'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface NavigationContextType {
  showNav: boolean
  setShowNav: (show: boolean) => void
  isPulling: boolean
  pullProgress: number
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({
  children,
  hideNavOnLoad = true,
}: {
  children: ReactNode
  hideNavOnLoad?: boolean
}) {
  const pathname = usePathname()
  const [showNav, setShowNav] = useState(false) // 기본값은 항상 false로 시작
  const [lastScrollY, setLastScrollY] = useState(0)
  const [touchStartY, setTouchStartY] = useState(0)
  const [touchStartTime, setTouchStartTime] = useState(0)
  const [isPulling, setIsPulling] = useState(false)
  const [pullProgress, setPullProgress] = useState(0)
  const [navShownByPull, setNavShownByPull] = useState(false) // pull로 네비게이션이 표시되었는지 추적
  const [isAtTop, setIsAtTop] = useState(true) // 페이지가 최상단에 있는지 여부

  // 경로 변경 감지 및 특정 경로에서만 네비게이션 표시
  useEffect(() => {
    // demo/dashboard 경로에서만 네비게이션 표시
    if (pathname === '/room') {
      setShowNav(true)
      setNavShownByPull(false) // 경로 변경으로 표시된 경우 pull 플래그 초기화
    } else {
      setShowNav(false)
      setNavShownByPull(false) // 경로 변경으로 숨겨진 경우 pull 플래그 초기화
    }
  }, [pathname])

  useEffect(() => {
    if (!hideNavOnLoad) {
      setShowNav(true)
      return
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // 페이지가 최상단에 있는지 확인
      setIsAtTop(currentScrollY === 0)

      // 스크롤 방향 감지
      if (currentScrollY < lastScrollY) {
        // 위로 스크롤 시 네비게이션 표시 (demo/dashboard 경로이거나 pull로 표시된 경우에만)
        if (pathname === '/room' || navShownByPull) {
          setShowNav(true)
        }
      } else if (currentScrollY > 50 && currentScrollY > lastScrollY) {
        // 아래로 스크롤하고 일정 거리 이상 스크롤된 경우 네비게이션 숨김
        setShowNav(false)
      }

      setLastScrollY(currentScrollY)
    }

    // 초기 스크롤 위치 확인
    setIsAtTop(window.scrollY === 0)

    // 터치 이벤트 처리
    const handleTouchStart = (e: TouchEvent) => {
      // 페이지가 최상단에 있을 때만 터치 시작 위치 기록
      if (isAtTop) {
        setTouchStartY(e.touches[0].clientY)
        setTouchStartTime(Date.now())
        setPullProgress(0)
        setIsPulling(false)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      // 이미 네비게이션이 표시된 상태면 pull 동작 무시
      if (showNav) return

      // 페이지가 최상단에 있지 않으면 pull 동작 무시
      if (!isAtTop) return

      const touchY = e.touches[0].clientY
      const diff = touchY - touchStartY

      // 터치 시작 위치가 기록되지 않았으면 무시
      if (touchStartY === 0) return

      const currentTime = Date.now()
      const elapsedTime = (currentTime - touchStartTime) / 1000 // 초 단위로 변환

      // 아래로 당기는 동작 감지 (diff > 30은 아래로 당기는 것)
      if (diff > 30) {
        setIsPulling(true)

        // 1초를 100%로 계산하여 진행률 설정 (최대 100%)
        const progress = Math.min(elapsedTime / 1, 1) * 100
        setPullProgress(progress)

        // 1초 이상 당겼을 때 네비게이션 표시
        if (elapsedTime >= 1) {
          setShowNav(true)
          setNavShownByPull(true) // pull로 네비게이션이 표시되었음을 기록
        }
      } else {
        setIsPulling(false)
      }
    }

    const handleTouchEnd = () => {
      setIsPulling(false)
      setPullProgress(0)
      setTouchStartY(0) // 터치 시작 위치 초기화
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [
    lastScrollY,
    hideNavOnLoad,
    touchStartY,
    touchStartTime,
    showNav,
    pathname,
    navShownByPull,
    isAtTop,
  ])

  return (
    <NavigationContext.Provider value={{ showNav, setShowNav, isPulling, pullProgress }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}
