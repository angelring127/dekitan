'use client'

import { useEffect, useRef, useState } from 'react'
import { useNavigation } from './NavigationContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useGlobalStore } from '@/store/info'
import { useAuthStore } from '@/store/auth'

interface NavigationProps {
  onMenuClick?: () => void
}

// 목업 사용자 데이터
const mockUsers = [
  { id: 1, name: 'こうき' },
  { id: 2, name: 'たなか' },
  { id: 3, name: 'すずき' },
  { id: 4, name: 'さとう' },
]

export function Navigation({ onMenuClick }: NavigationProps) {
  const { showNav, showUserMenu, setShowUserMenu } = useNavigation()
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // 스토어에서 유저 정보 가져오기
  const { name, setName, childinfo, parentinfo } = useGlobalStore()
  const { isAuthenticated } = useAuthStore()

  // 유저 이름 설정 (인증된 경우 스토어에서 가져온 이름 사용, 아닌 경우 기본값 사용)
  // childinfo.name이 있으면 그것을 사용, 없으면 parentinfo.name을 사용, 둘 다 없으면 name을 사용
  const userName = isAuthenticated
    ? childinfo.name || parentinfo.name || name || 'ゲスト'
    : 'ゲスト'

  // 클라이언트 사이드 렌더링 확인
  useEffect(() => {
    setIsClient(true)
  }, [])

  // 스크롤 방지 효과
  useEffect(() => {
    if (showUserMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showUserMenu])

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

  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu)
  }

  const handleUserMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleUserMenuClick()
    }
  }

  const handleUserChange = (newUserName: string) => {
    // 사용자 변경 처리
    setName(newUserName)
    setShowUserMenu(false)
  }

  // 서버 사이드 렌더링 시에는 아무것도 렌더링하지 않음
  if (!isClient) {
    return null
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 z-10 flex h-20 items-center justify-between px-4 bg-white transition-all duration-300 ${
          showNav ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
        style={{
          width: '100%',
          maxWidth: '500px',
          left: '50%',
          transform: showNav ? 'translateX(-50%)' : 'translateX(-50%) translateY(-100%)',
        }}
      >
        {isAuthenticated ? (
          // ログイン状態時のUI
          <>
            <div className="flex items-center gap-2">
              <div
                className="flex flex-col items-center justify-center cursor-pointer w-16"
                onClick={handleUserMenuClick}
                onKeyDown={handleUserMenuKeyDown}
                tabIndex={0}
                role="button"
                aria-label="ユーザー選択"
                aria-expanded={showUserMenu}
              >
                <Image
                  src={
                    showUserMenu ? '/images/icons/user_icon_b.png' : '/images/icons/user_icon_a.png'
                  }
                  alt="ユーザーアイコン"
                  width={40}
                  height={40}
                />
                <span className="text-xs mt-1 text-gray-600 truncate w-full text-center">
                  {userName}
                </span>
              </div>

              {/* ユーザー ドロップダウン メニュー */}
              <div
                className={`fixed top-[80px] bg-white shadow-lg z-[9999] transform transition-all duration-200 ease-in-out ${
                  showUserMenu
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
                style={{
                  width: '95%',
                  maxWidth: '475px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                <div className="bg-[#00803a] text-white font-medium flex justify-between items-center">
                  <span className="flex-1 text-center py-3">ユーザーきりかえ</span>
                  <button
                    onClick={() => setShowUserMenu(false)}
                    className="text-white hover:text-gray-200 w-12 h-12 flex items-center justify-center"
                    aria-label="メニューを閉じる"
                  >
                    ✕
                  </button>
                </div>
                <div className="overflow-y-auto">
                  {mockUsers.map((user, index) => (
                    <div key={user.id}>
                      <button
                        className="w-full text-left px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => handleUserChange(user.name)}
                      >
                        {user.name}
                      </button>
                      {index < mockUsers.length - 1 && (
                        <div className="border-b border-dashed border-[#b3b3b3] mx-4" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* アイコン メニューを左に移動 */}
              <div className="grid grid-cols-4 gap-6 ml-10 mt-2">
                <Link
                  href="/"
                  className={`flex items-center justify-center w-14 h-14 ${
                    pathname === '/' ? 'text-blue-500' : 'text-gray-600'
                  }`}
                  tabIndex={0}
                >
                  <Image src="/images/icons/home_icon.png" alt="ホーム" width={48} height={48} />
                </Link>
                <Link
                  href="/calendar"
                  className={`flex items-center justify-center w-14 h-14 ${
                    pathname === '/calendar' ? 'text-blue-500' : 'text-gray-600'
                  }`}
                  tabIndex={0}
                >
                  <Image
                    src="/images/icons/calendar_icon.png"
                    alt="カレンダー"
                    width={48}
                    height={48}
                  />
                </Link>
                <Link
                  href="/notes"
                  className={`flex items-center justify-center w-14 h-14 ${
                    pathname === '/notes' ? 'text-blue-500' : 'text-gray-600'
                  }`}
                  tabIndex={0}
                >
                  <Image
                    src="/images/icons/collection_icon.png"
                    alt="ノート"
                    width={48}
                    height={48}
                  />
                </Link>
                <Link
                  href="/memo"
                  className={`flex items-center justify-center w-14 h-14 ${
                    pathname === '/memo' ? 'text-blue-500' : 'text-gray-600'
                  }`}
                  tabIndex={0}
                >
                  <Image src="/images/icons/list_icon.png" alt="メモ" width={48} height={48} />
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
      {showNav && <div className="h-20" />} {/* 네비게이션이 표시될 때만 공간 확보 */}
      {/* 햄버거 메뉴 드롭다운 - 중앙 위치 및 애니메이션 적용 */}
      {!isAuthenticated && (
        <div
          className={`fixed top-20 bg-white shadow-lg z-20 overflow-hidden transition-all duration-300 transform ${
            showMenu ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{
            width: '100%',
            maxWidth: '500px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
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
