'use client'

import Link from 'next/link'
import { Button } from '@/components/common/Button'
import { memo } from 'react'

const demoPages = [
  {
    title: '画像ビューアデモ',
    description: '画像表示、アニメーション、ドラッグ&ドロップ機能を含む画像ビューアコンポーネント',
    href: '/demo/image-viewer',
    status: '完了',
  },
  {
    title: 'ボタンデモ',
    description: 'さまざまなスタイルと状態をサポートするボタンコンポーネント',
    href: '/demo/buttons',
    status: '完了',
  },
  {
    title: '情報パネルデモ',
    description: 'アイコンとテキストで構成された情報表示パネルコンポーネント',
    href: '/demo/information-panel',
    status: '完了',
  },
  {
    title: 'メッセージクラウドデモ',
    description:
      'チャットとメッセージ表示のためのさまざまなスタイルのメッセージクラウドコンポーネント',
    href: '/demo/message-cloud',
    status: '完了',
  },
  {
    title: 'メッセージ画面デモ',
    description: '背景画像とキャラクターアバターが含まれたメッセージ画面コンポーネント',
    href: '/demo/messages',
    status: '完了',
  },
  {
    title: 'シェイク画像デモ',
    description: '画像の揺れアニメーションと背景画像を含むデモ画面',
    href: '/demo/shake-image',
    status: '完了',
  },
  {
    title: 'カードデモ',
    description: 'ポイント表示、テキスト表示、スタイルバリエーションを含むカードコンポーネント',
    href: '/demo/cards',
    status: '完了',
  },
] as const

const DemoCard = memo(({ demo }: { demo: (typeof demoPages)[number] }) => {
  const isCompleted = demo.status === '完了'

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
      <Link href={demo.href} aria-disabled={!isCompleted} tabIndex={isCompleted ? 0 : -1}>
        <Button
          variant={isCompleted ? 'primary' : 'tertiary'}
          disabled={!isCompleted}
          fullWidth
          aria-label={`${demo.title} ${isCompleted ? 'デモ 見る' : '準備中'}`}
        >
          {isCompleted ? 'デモ 見る' : '準備中'}
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
          <h1 className="text-3xl font-bold mb-2">コンポーネント デモ</h1>
          <p className="text-gray-600">
            Next.js 14とTailwindCSSを使用して実装された再利用可能なコンポーネントの集合です。
          </p>
        </header>

        <div className="grid gap-6" role="list" aria-label="デモページのリスト">
          {demoPages.map((demo) => (
            <DemoCard key={demo.href} demo={demo} />
          ))}
        </div>
      </div>
    </main>
  )
}
