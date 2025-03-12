'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { InformationPanel } from '@/components/common/InformationPanel'
import { Button } from '@/components/common/Button'

export default function LoginPage() {
  const router = useRouter()
  const [currentIndex] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: 로그인 로직 구현
    setIsLoading(false)
  }

  const handleBack = () => {
    router.back()
  }

  const loginForm = (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
      <div className="space-y-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900">ログイン</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          ログインID（メールアドレス）、パスワードを入力して、［ログインする］ボタンを押してください。
          <br />
          ※パスワード送信時にはSSL通信を使用しています。
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          メールアドレス
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          パスワード
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          required
        />
      </div>

      <Link href="/forgot-password" className="block text-sm text-red-600 hover:text-red-500">
        パスワードを忘れましたか？
      </Link>

      <Button type="submit" variant="primary" fullWidth loading={isLoading}>
        ログイン
      </Button>
    </form>
  )

  const items = [
    {
      id: 'login-form',
      content: loginForm,
      size: {
        width: '100%',
        maxWidth: 400,
      },
    },
  ]

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <InformationPanel
        items={items}
        currentIndex={currentIndex}
        className="w-full max-w-md backdrop-blur-sm bg-white/90"
      />

      <Button variant="tertiary" style="outline" className="mt-8" onClick={handleBack}>
        戻る
      </Button>
    </div>
  )
}
