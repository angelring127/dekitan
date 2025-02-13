'use client'

import Image from 'next/image'

interface NavigationProps {
  userName?: string
  userImage?: string
  onMenuClick?: () => void
}

export function Navigation({ userName = 'こうきくん', userImage, onMenuClick }: NavigationProps) {
  return (
    <nav className="relative z-10 flex h-14 items-center justify-between px-4 bg-white shadow-md">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-purple-500">
          {userImage && (
            <Image
              src={userImage}
              alt={userName}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          )}
        </div>
        <span className="text-lg font-bold">{userName}</span>
      </div>
      <button
        className="flex h-11 w-11 items-center justify-center"
        aria-label="メニューを開く"
        onClick={onMenuClick}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
    </nav>
  )
}
