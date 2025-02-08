'use client'

import Link from 'next/link'
import { Button } from '@/components/common/Button'
import { memo } from 'react'

const demoPages = [
  {
    title: '이미지 뷰어 데모',
    description: '이미지 표시, 애니메이션, 드래그 앤 드롭 기능을 포함한 이미지 뷰어 컴포넌트',
    href: '/demo/image-viewer',
    status: '준비 중',
  },
  {
    title: '버튼 데모',
    description: '다양한 스타일과 상태를 지원하는 버튼 컴포넌트',
    href: '/demo/buttons',
    status: '완료',
  },
  {
    title: '메시지 화면 데모',
    description: '튜토리얼 및 설명용 메시지 UI 컴포넌트',
    href: '/demo/messages',
    status: '준비 중',
  },
  {
    title: '결과 화면 데모',
    description: '작업 결과를 표시하는 화면 컴포넌트',
    href: '/demo/results',
    status: '준비 중',
  },
  {
    title: '상품 상세 데모',
    description: '상품 정보를 표시하는 화면 컴포넌트',
    href: '/demo/products',
    status: '준비 중',
  },
  {
    title: '프로필 화면 데모',
    description: '사용자 프로필을 표시하는 화면 컴포넌트',
    href: '/demo/profile',
    status: '준비 중',
  },
  {
    title: '모달 데모',
    description: '다양한 형태의 모달 컴포넌트',
    href: '/demo/modals',
    status: '준비 중',
  },
] as const

const DemoCard = memo(({ demo }: { demo: (typeof demoPages)[number] }) => {
  const isCompleted = demo.status === '완료'

  return (
    <div
      className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
      role="article"
      aria-labelledby={`title-${demo.href}`}
    >
      <div className="flex items-start justify-between mb-2">
        <h2 id={`title-${demo.href}`} className="text-xl font-semibold">
          {demo.title}
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}
          role="status"
        >
          {demo.status}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{demo.description}</p>
      <Link 
        href={demo.href}
        aria-disabled={!isCompleted}
        tabIndex={isCompleted ? 0 : -1}
      >
        <Button
          variant={isCompleted ? 'primary' : 'tertiary'}
          disabled={!isCompleted}
          fullWidth
          aria-label={`${demo.title} ${isCompleted ? '데모 보기' : '준비 중'}`}
        >
          {isCompleted ? '데모 보기' : '준비 중'}
        </Button>
      </Link>
    </div>
  )
})

DemoCard.displayName = 'DemoCard'

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">컴포넌트 데모</h1>
          <p className="text-gray-600">
            Next.js 14와 TailwindCSS를 사용하여 구현된 재사용 가능한 컴포넌트 모음입니다.
          </p>
        </header>

        <div 
          className="grid gap-6"
          role="list"
          aria-label="데모 페이지 목록"
        >
          {demoPages.map((demo) => (
            <DemoCard key={demo.href} demo={demo} />
          ))}
        </div>
      </div>
    </main>
  )
}
