'use client'

import Link from 'next/link'
import Image from 'next/image'
import { memo } from 'react'
import Card from '@/components/common/Card'

const CardDemo = memo(() => {
  return (
    <div className="mx-auto max-w-[390px] min-h-screen bg-white">
      <main className="p-4">
        <header className="mb-8">
          <div className="flex justify-end mb-4">
            <Link href="/" tabIndex={0} aria-label="メインページに戻る">
              <Image
                src="/images/ic_back.png"
                width={24}
                height={24}
                alt="戻るアイコン"
                className="w-12 h-12"
              />
            </Link>
          </div>
          <h1 className="text-2xl font-bold">カードデモ</h1>
        </header>

        <section className="mb-8" aria-labelledby="point-card-section">
          <h2 id="point-card-section" className="text-xl font-semibold mb-4">
            ポイント/スコアカード
          </h2>
          <div className="flex flex-wrap justify-between">
            <Card variant="point" title="獲得ポイント" point={1000} />
            <Card variant="point" title="累積ポイント" point={100000} />
            <Card variant="point" title="デイリーポイント" point={50} />
          </div>
        </section>

        <section className="mb-8" aria-labelledby="text-card-section">
          <h2 id="text-card-section" className="text-xl font-semibold mb-4">
            テキストカード
          </h2>
          <Card
            variant="text"
            headerText="ミッション成功！"
            bodyText="おめでとうございます！全てのミッションを完了しました。"
            headerColor="green"
          />
          <Card
            variant="text"
            headerText="ミッション失敗"
            bodyText="もう一度チャレンジしてみましょう！"
            headerColor="red"
          />
          <Card
            variant="text"
            headerText="特別イベント"
            bodyText="新規イベントに参加して特別な報酬をゲットしよう！"
            headerColor="purple"
          />
        </section>

        <section className="mb-8" aria-labelledby="style-card-section">
          <h2 id="style-card-section" className="text-xl font-semibold mb-4">
            スタイルバリエーション
          </h2>
          <Card
            variant="text"
            headerText="基本シャドウ"
            bodyText="基本的なシャドウ効果が適用されたカードです。"
            headerColor="green"
          />
          <Card
            variant="text"
            headerText="強いシャドウ"
            bodyText="より強いシャドウ効果が適用されたカードです。"
            headerColor="purple"
            className="shadow-lg"
          />
          <Card
            variant="text"
            headerText="シャドウなし"
            bodyText="シャドウ効果のないカードです。"
            headerColor="red"
            className="shadow-none"
          />
        </section>
      </main>
    </div>
  )
})

CardDemo.displayName = 'CardDemo'

export default CardDemo
