'use client'

import { useEffect, useRef, useState } from 'react'
import { useNavigation } from './NavigationContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationProps {
  userName?: string
  isLogin?: boolean
  onMenuClick?: () => void
}

// 목업 사용자 데이터
const mockUserName = 'こうき'

export function Navigation({
  userName = mockUserName,
  isLogin = true,
  onMenuClick,
}: NavigationProps) {
  const { showNav } = useNavigation()
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false)

  const handleMenuClick = () => {
    setShowMenu(!showMenu)
    if (onMenuClick) {
      onMenuClick()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleMenuClick()
    }
  }

  useEffect(() => {
    if (navRef.current) {
      if (showNav) {
        navRef.current.style.transform = 'translateY(0)'
        navRef.current.style.opacity = '1'
      } else {
        navRef.current.style.transform = 'translateY(-100%)'
        navRef.current.style.opacity = '0'
      }
    }
  }, [showNav])

  return (
    <>
      <nav
        ref={navRef}
        className="relative z-10 flex h-14 items-center justify-between px-4 bg-white shadow-md transition-all duration-300"
      >
        {isLogin ? (
          // 로그인 상태일 때의 UI
          <>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 text-sm font-medium">
                {userName?.slice(0, 1)}
              </div>

              {/* 아이콘 메뉴를 왼쪽으로 이동 */}
              <div className="grid grid-cols-4 gap-2 ml-2">
                <Link
                  href="/"
                  className={`text-2xl flex items-center justify-center w-10 h-10 ${
                    pathname === '/' ? 'text-blue-500' : 'text-gray-600'
                  }`}
                  tabIndex={0}
                >
                  🏡
                </Link>
                <Link
                  href="/calendar"
                  className={`text-2xl flex items-center justify-center w-10 h-10 ${
                    pathname === '/calendar' ? 'text-blue-500' : 'text-gray-600'
                  }`}
                  tabIndex={0}
                >
                  📅
                </Link>
                <Link
                  href="/notes"
                  className={`text-2xl flex items-center justify-center w-10 h-10 ${
                    pathname === '/notes' ? 'text-blue-500' : 'text-gray-600'
                  }`}
                  tabIndex={0}
                >
                  📒
                </Link>
                <Link
                  href="/memo"
                  className={`text-2xl flex items-center justify-center w-10 h-10 ${
                    pathname === '/memo' ? 'text-blue-500' : 'text-gray-600'
                  }`}
                  tabIndex={0}
                >
                  📝
                </Link>
              </div>
            </div>

            {/* 오른쪽 여백을 위한 빈 div */}
            <div className="w-8"></div>
          </>
        ) : (
          // 비로그인 상태일 때의 UI
          <>
            <div className="w-8"></div> {/* 좌측 여백 */}
            <h1 className="text-lg font-bold text-center text-blue-600">
              できたんのワクワクワールド
            </h1>
            <div
              className="flex items-center justify-center w-8 h-8 cursor-pointer"
              onClick={handleMenuClick}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              aria-label={showMenu ? '메뉴 닫기' : '메뉴 열기'}
              role="button"
            >
              {showMenu ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </div>
          </>
        )}
      </nav>

      {/* 햄버거 메뉴 드롭다운 - 중앙 위치 및 애니메이션 적용 */}
      {!isLogin && (
        <div
          className={`fixed inset-x-0 top-14 bg-white shadow-lg z-20 overflow-hidden transition-all duration-300 transform ${
            showMenu ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="py-2 max-w-md mx-auto">
            <li>
              <Link
                href="/"
                className="block px-4 py-3 hover:bg-gray-100 transition-colors text-center"
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="block px-4 py-3 hover:bg-gray-100 transition-colors text-center"
              >
                新しく始める
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="block px-4 py-3 hover:bg-gray-100 transition-colors text-center"
              >
                ログイン
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block px-4 py-3 hover:bg-gray-100 transition-colors text-center"
              >
                わくわくワールドって？
              </Link>
            </li>
            <li>
              <Link
                href="/notifications"
                className="block px-4 py-3 hover:bg-gray-100 transition-colors text-center"
              >
                お知らせ一覧
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
