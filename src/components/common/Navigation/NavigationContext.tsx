'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { usePathname } from 'next/navigation'

interface NavigationContextType {
  showNav: boolean
  setShowNav: (show: boolean) => void
  isPulling: boolean
  pullProgress: number
  showUserMenu: boolean
  setShowUserMenu: (show: boolean) => void
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
  const [showNav, setShowNav] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [touchStartY, setTouchStartY] = useState(0)
  const [touchStartTime, setTouchStartTime] = useState(0)
  const [isPulling, setIsPulling] = useState(false)
  const [pullProgress, setPullProgress] = useState(0)
  const [navShownByPull, setNavShownByPull] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)

  // 경로 변경 감지 및 특정 경로에서만 네비게이션 표시
  useEffect(() => {
    if (pathname === '/room') {
      setShowNav(true)
      setNavShownByPull(false)
    } else {
      setShowNav(false)
      setNavShownByPull(false)
    }
  }, [pathname])

  // 스크롤 이벤트 핸들러를 useCallback으로 메모이제이션
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    setIsAtTop(currentScrollY === 0)

    // pull-to-refresh로 표시된 경우에는 스크롤에 의한 상태 변경을 방지
    if (navShownByPull) return

    if (currentScrollY < lastScrollY) {
      if (pathname === '/room') {
        setShowNav(true)
      }
    } else if (currentScrollY > 50 && currentScrollY > lastScrollY) {
      setShowNav(false)
    }

    setLastScrollY(currentScrollY)
  }, [lastScrollY, pathname, navShownByPull])

  // 터치 이벤트 핸들러들도 useCallback으로 메모이제이션
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (isAtTop) {
        setTouchStartY(e.touches[0].clientY)
        setTouchStartTime(Date.now())
        setPullProgress(0)
        setIsPulling(false)
      }
    },
    [isAtTop]
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (showNav || !isAtTop) return

      const touchY = e.touches[0].clientY
      const diff = touchY - touchStartY

      if (touchStartY === 0) return

      const currentTime = Date.now()
      const elapsedTime = (currentTime - touchStartTime) / 1000

      if (diff > 30) {
        setIsPulling(true)
        const progress = Math.min(diff / 100, 1) * 100 // 진행률을 터치 거리에 기반으로 계산
        setPullProgress(progress)

        if (progress >= 100) {
          setShowNav(true)
          setNavShownByPull(true)
          setIsPulling(false)
        }
      } else {
        setIsPulling(false)
      }
    },
    [showNav, isAtTop, touchStartY, touchStartTime]
  )

  const handleTouchEnd = useCallback(() => {
    if (!navShownByPull) {
      setIsPulling(false)
      setPullProgress(0)
    }
    setTouchStartY(0)
  }, [navShownByPull])

  useEffect(() => {
    if (!hideNavOnLoad) {
      setShowNav(true)
      return
    }

    // 초기 스크롤 위치 확인
    setIsAtTop(window.scrollY === 0)

    // 이벤트 리스너 등록
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
  }, [hideNavOnLoad, handleScroll, handleTouchStart, handleTouchMove, handleTouchEnd])

  return (
    <NavigationContext.Provider
      value={{
        showNav,
        setShowNav,
        isPulling,
        pullProgress,
        showUserMenu,
        setShowUserMenu,
      }}
    >
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
