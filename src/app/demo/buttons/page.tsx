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
        <h2 className="text-2xl font-bold mb-4">기본 버튼</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)} 버튼
            </Button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">아웃라인 버튼</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant} style="outline">
              {variant.charAt(0).toUpperCase() + variant.slice(1)} 아웃라인
            </Button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">전체 너비 버튼</h2>
        <div className="space-y-4">
          {styles.map((style) => (
            <Button key={style} fullWidth style={style}>
              전체 너비 {style} 버튼
            </Button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">상태</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Button disabled>비활성화 버튼</Button>
          <Button loading>로딩 중 버튼</Button>
          <Button loading={loading} onClick={handleLoadingClick}>
            로딩 테스트
          </Button>
        </div>
      </section>
    </div>
  )
} 