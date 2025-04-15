'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { InformationPanel } from '@/components/common/InformationPanel'
import { Button } from '@/components/common/Button'
import { requestPasswordReset } from '@/api/auth'

export default function LoginPage() {
  const router = useRouter()
  const [currentIndex] = useState(0)
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await requestPasswordReset({ email, nickname })

      if (response.status === 2000) {
        // 성공 시 로그인 페이지로 이동
        router.replace('/login')
        return
      }

      // 에러 메시지 설정
      switch (response.status) {
        case 4008:
          setError('メールアドレスまたはニックネームが正しくありません。')
          break
        case 4016:
          setError('メールアドレスの形式が正しくありません。')
          break
        case 4023:
          setError('ニックネームの形式が正しくありません。')
          break
        case 5011:
        case 5037:
          router.push('/error')
          return
        default:
          setError('予期せぬエラーが発生しました。')
      }
    } catch (error) {
      setError('システムエラーが発生しました。')
      console.error('Password reset error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    router.back()
  }

  const loginForm = (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
      <div className="space-y-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900">パスワードを忘れた方</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          登録済みのメールアドレスを入力すると、入力したメールアドレス宛てにパスワード再発行のご案内を送信します。
          <br />
          メールアドレスとニックネームを入力して、[送信する]ボタンを押してください。
        </p>
      </div>

      {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

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
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          ニックネーム
        </label>
        <input
          id="nickname"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          required
        />
      </div>
      <Button type="submit" variant="primary" fullWidth loading={isLoading}>
        送信する
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
