'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { useNavigation } from './NavigationContext'

interface NavigationProps {
  userName?: string
  userImage?: string
  onMenuClick?: () => void
}

export function Navigation({ userName, userImage, onMenuClick }: NavigationProps) {
  const { showNav } = useNavigation()
  const navRef = useRef<HTMLElement>(null)

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
    <nav
      ref={navRef}
      className="relative z-10 flex h-14 items-center justify-between px-4 bg-white shadow-md transition-all duration-300"
    >
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
