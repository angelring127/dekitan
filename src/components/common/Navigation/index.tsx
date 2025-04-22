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

  // 現在のパスを確認するためのログ
  console.log('Current pathname:', pathname)

  const { name, setName } = useGlobalStore()
  const { isAuthenticated } = useAuthStore()
  const { profiles, currentProfile, fetchProfiles, setCurrentProfile, isLoading } =
    useProfileStore()

  // クライアントサイドレンダリングの確認
  useEffect(() => {
    setIsClient(true)
  }, [])

  // 認証状態が変更されたらプロフィール一覧を取得
  useEffect(() => {
    if (isAuthenticated) {
      fetchProfiles(false)
    }
  }, [isAuthenticated, fetchProfiles])

  // スクロール防止効果
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

  // 現在選択されているプロフィールの名前またはデフォルトの名前
  const userName = isAuthenticated ? name || 'ゲスト' : 'ゲスト'

  // サーバーサイドレンダリング時は何もレンダリングしない
  if (!isClient) {
    return null
  }

  return (
    <div className="relative">
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
                className={`fixed top-[100px] bg-white shadow-lg z-[9999] transform transition-all duration-200 ease-in-out ${
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
                  <span className="flex-1 text-center font-bold py-3">ユーザーきりかえ</span>
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
                  href="/room"
                  className={`flex flex-col items-center justify-center w-14 h-14 relative ${
                    pathname === '/room' || pathname === '/room/'
                      ? 'text-[#00803a]'
                      : 'text-gray-600'
                  }`}
                  tabIndex={0}
                >
                  <Image src="/images/icons/home_icon.png" alt="ホーム" width={48} height={48} />
                  <div
                    className={`absolute bottom-0 h-1 w-10 ${
                      pathname === '/room' || pathname === '/room/'
                        ? 'bg-[#00803a]'
                        : 'bg-transparent'
                    }`}
                  />
                </Link>
                <Link
                  href="/calendar"
                  className={`flex flex-col items-center justify-center w-14 h-14 relative ${
                    pathname === '/calendar' || pathname === '/calendar/'
                      ? 'text-[#00803a]'
                      : 'text-gray-600'
                  }`}
                  tabIndex={0}
                >
                  <Image
                    src="/images/icons/calendar_icon.png"
                    alt="カレンダー"
                    width={48}
                    height={48}
                  />
                  <div
                    className={`absolute bottom-0 h-1 w-10 ${
                      pathname === '/calendar' || pathname === '/calendar/'
                        ? 'bg-[#00803a]'
                        : 'bg-transparent'
                    }`}
                  />
                </Link>
                <Link
                  href="/notes"
                  className={`flex flex-col items-center justify-center w-14 h-14 relative ${
                    pathname === '/notes' || pathname === '/notes/'
                      ? 'text-[#00803a]'
                      : 'text-gray-600'
                  }`}
                  tabIndex={0}
                >
                  <Image
                    src="/images/icons/collection_icon.png"
                    alt="ノート"
                    width={48}
                    height={48}
                  />
                  <div
                    className={`absolute bottom-0 h-1 w-10 ${
                      pathname === '/notes' || pathname === '/notes/'
                        ? 'bg-[#00803a]'
                        : 'bg-transparent'
                    }`}
                  />
                </Link>
                <Link
                  href="/memo"
                  className={`flex flex-col items-center justify-center w-14 h-14 relative ${
                    pathname === '/memo' || pathname === '/memo/'
                      ? 'text-[#00803a]'
                      : 'text-gray-600'
                  }`}
                  tabIndex={0}
                >
                  <Image src="/images/icons/list_icon.png" alt="メモ" width={48} height={48} />
                  <div
                    className={`absolute bottom-0 h-1 w-10 ${
                      pathname === '/memo' || pathname === '/memo/'
                        ? 'bg-[#00803a]'
                        : 'bg-transparent'
                    }`}
                  />
                </Link>
              </div>
            </div>

            {/* 右側の余白を確保するための空のdiv */}
            <div className="w-8"></div>
          </>
        ) : (
          // 非ログイン状態時のUI
          <>
            <div className="w-8"></div> {/* 左側の余白 */}
            <h1 className="text-lg font-bold text-center text-blue-600">
              できたんのワクワクワールド
            </h1>
            <div
              className="flex items-center justify-center w-8 h-8 cursor-pointer"
              onClick={handleMenuClick}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              aria-label={showMenu ? 'メニューを閉じる' : 'メニューを開く'}
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
      {/* ナビゲーションが表示されるときにのみマージンを追加 */}
      <div className={`transition-all duration-300 ${showNav ? 'mt-20' : 'mt-0'}`}>
        {/* ハンバーガーメニュー ドロップダウン - 中央位置及びアニメーション適用 */}
        {!isAuthenticated && (
          <div
            className={`fixed top-24 bg-white shadow-lg z-20 overflow-hidden transition-all duration-300 transform ${
              showMenu ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}
            style={{
              width: '100%',
              maxWidth: '500px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <ul className="py-4 max-w-md mx-auto">
              <li>
                <Link
                  href="/"
                  className="block px-6 py-4 hover:bg-gray-100 transition-colors text-center"
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="block px-6 py-4 hover:bg-gray-100 transition-colors text-center"
                >
                  新しく始める
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="block px-6 py-4 hover:bg-gray-100 transition-colors text-center"
                >
                  ログイン
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block px-6 py-4 hover:bg-gray-100 transition-colors text-center"
                >
                  わくわくワールドって？
                </Link>
              </li>
              <li>
                <Link
                  href="/notifications"
                  className="block px-6 py-4 hover:bg-gray-100 transition-colors text-center"
                >
                  お知らせ一覧
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
