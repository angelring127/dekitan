'use client'
import { useState } from 'react'
// import Image from 'next/image'

interface HamburgerButtonProps {
    userName?: string
    //   userImage?: string
}

export function HamburgerButton({ userName = 'できたんのワクワクワールド' }: HamburgerButtonProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="relative z-10 flex h-14 items-center justify-between px-4 bg-white shadow-md">
            <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-black">{userName}</span>
            </div>

            {/* ハンバーガーボタン*/}
            <button
                className="flex h-11 w-11 items-center justify-center font-bold text-black"
                aria-label="メニューを開く"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <line x1="6" y1="6" x2="18" y2="18" />
                        <line x1="6" y1="18" x2="18" y2="6" />
                    </svg>
                ) : (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                )}
            </button>

            {/* ハンバーガーメニュー */}
            {isMenuOpen && (
                <div className="absolute top-14 right-4 bg-white shadow-lg w-40">
                    <ul className="flex flex-col">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black">HOME</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black">新しく始める</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black">ログイン</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black">ワクワクワールドって?</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black">お知らせ一覧</li>
                    </ul>
                </div>
            )}
        </nav>
    )
}