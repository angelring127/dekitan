'use client'

import { useState } from 'react'
import { Button } from '@/components/common/Button'

const variants = ['primary', 'secondary', 'tertiary', 'quaternary', 'quinary'] as const
const styles = ['solid', 'outline'] as const

export default function ButtonsDemo() {
  const [loading, setLoading] = useState(false)

  const handleLoadingClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="p-4 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">基本ボタン</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)} ボタン
            </Button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">アウトラインボタン</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant} style="outline">
              {variant.charAt(0).toUpperCase() + variant.slice(1)} アウトライン
            </Button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">全幅ボタン</h2>
        <div className="space-y-4">
          {styles.map((style) => (
            <Button key={style} fullWidth style={style}>
              全幅 {style} ボタン
            </Button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">状態</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Button disabled>無効ボタン</Button>
          <Button loading>ローディング中</Button>
          <Button loading={loading} onClick={handleLoadingClick}>
            ローディングテスト
          </Button>
        </div>
      </section>
    </div>
  )
} 