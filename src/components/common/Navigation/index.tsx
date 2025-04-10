'use client'

import { useEffect, useRef, useState } from 'react'
import { useNavigation } from './NavigationContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useGlobalStore } from '@/store/info'
import { useAuthStore } from '@/store/auth'
import { useProfileStore } from '@/store/profile'
import { Profile } from '@/types/profile'

interface NavigationProps {
  onMenuClick?: () => void
}

export function Navigation({ onMenuClick }: NavigationProps) {
  const { showNav, showUserMenu, setShowUserMenu } = useNavigation()
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // 스토어에서 유저 정보 가져오기
  const { name, setName } = useGlobalStore()
  const { isAuthenticated } = useAuthStore()
  const { profiles, currentProfile, fetchProfiles, setCurrentProfile, isLoading } =
    useProfileStore()

  // 클라이언트 사이드 렌더링 확인
  useEffect(() => {
    setIsClient(true)
  }, [])

  // 인증 상태가 변경되면 프로필 목록 가져오기
  useEffect(() => {
    if (isAuthenticated) {
      fetchProfiles(false)
    }
  }, [isAuthenticated, fetchProfiles])

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

  const handleUserChange = (profile: Profile) => {
    setCurrentProfile(profile)
    setName(profile.nickname)
    setShowUserMenu(false)
  }

  // 현재 선택된 프로필의 이름 또는 기본 이름
  const userName = isAuthenticated ? name || 'ゲスト' : 'ゲスト'

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
                <div className="overflow-y-auto max-h-[60vh]">
                  {isLoading ? (
                    <div className="p-4 text-center text-gray-500">読み込み中...</div>
                  ) : profiles.length > 0 ? (
                    profiles.map((profile, index) => (
                      <div key={`profile-${index}-${profile.id}`}>
                        <button
                          className={`w-full text-left px-6 py-3 text-sm font-bold ${
                            currentProfile?.id === profile.id
                              ? 'bg-gray-100 text-[#00803a]'
                              : 'text-gray-700 hover:bg-gray-100'
                          } transition-colors`}
                          onClick={() => handleUserChange(profile)}
                        >
                          {profile.nickname}
                          {profile.role === 1 && ' (オーナー)'}
                          {profile.role === 2 && ' (サブ・オーナー)'}
                          {profile.role === 3 && ' (子ユーザー)'}
                        </button>
                        {index < profiles.length - 1 && (
                          <div
                            key={`divider-${index}-${profile.id}`}
                            className="border-b border-dashed border-[#b3b3b3] mx-4"
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      プロファイルが見つかりません
                    </div>
                  )}
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
