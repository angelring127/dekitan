'use client'

import React, { useState } from 'react'
import { Button } from '@/components/common/Button'
import { apiClient } from '@/services/api'
import { useGlobalStore } from '@/store/info'
import type { InformationItem } from '@/components/common/InformationPanel/types'
import { InformationPanel } from '@/components/common/InformationPanel'
import { useRouter } from 'next/navigation'

interface FormValues {
  nickname: string
  password: string
  email: string
  confirmEmail: string
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormValues>({
    nickname: '',
    password: '',
    email: '',
    confirmEmail: '',
  })

  const [errors, setErrors] = useState<Partial<FormValues>>({})
  const [isAgreed, setIsAgreed] = useState(false)
  const { parentinfo, setParentInfo } = useGlobalStore()
  const router = useRouter()

  const validateForm = () => {
    const newErrors: Partial<FormValues> = {}

    if (!formData.nickname) newErrors.nickname = 'ニックネームは必須'
    else if (formData.nickname.length > 8) newErrors.nickname = '８文字以内'
    if (!formData.password) newErrors.password = 'パスワードは必要'
    else if (formData.password.length < 6)
      newErrors.password = 'パスワードは、8〜16文字以内、記号は .!/+-_=$#&%@が利用できます'

    if (!formData.email) newErrors.email = 'メールアドレスは必要'
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'メールアドレスが正しくありません。'

    if (!formData.confirmEmail) newErrors.confirmEmail = '確認メールアドレスは必要'
    else if (formData.confirmEmail !== formData.email)
      newErrors.confirmEmail = 'メールアドレスと一致しません'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const items: InformationItem[] = [
    {
      id: '0',
      content: (
        <div className="flex flex-col items-center gap-4">
          <span className=" text-xl font-medium">
            仮登録完了しました。<br></br>
            ご入力いただいたメールアドレス（ログインＩＤ）に登録確認メールを送信いたしました。
            メールに記載されているURLをクリックして、登録完了をしてください。<br></br>
            24時間以内にクリックしていただけないと無効となります。
          </span>
        </div>
      ),
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        await apiClient.post('/account/regist/entry', formData)
        setParentInfo('name', formData.nickname)
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    }
  }

  return (
    <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center justify-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
      {parentinfo.name ? (
        <div>
          <InformationPanel
            items={items}
            currentIndex={0}
            background="transparent"
            withShadow
            className="my-4 mt-20 flex flex-col w-[320px] items-center justify-center common_panel_style"
          />
          <Button
            className="text-lg font-bold mt-4 bg-red-500 text-white rounded-l-full rounded-r-full"
            onClick={() => router.push('/')}
          >
            トップページにもどる
          </Button>
        </div>
      ) : (
        <>
          <div className="relative w-[350px] bg-white p-6 rounded-lg shadow-md">
            <span className="font-bold">
              わくわくワールドで「できた」の原石を集めるには、ユーザ登録が必要です。ぜひ、ご登録ください！
            </span>

            <form className="max-w-md mx-auto mt-10  p-4 border rounded-lg shadow-md">
              <div className="mb-2">
                <label className="font-bold">ニックネーム:</label>
                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                  className="border p-2 w-full"
                />
                <p className="text-red-500 text-sm">{errors.nickname}</p>
              </div>

              <div className="mb-2">
                <label className="font-bold">パスワード:</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="border p-2 w-full"
                />
                <p className="text-red-500 text-sm">{errors.password}</p>
              </div>
              <div className="mb-2">
                <label className="font-bold">メールアドレス:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border p-2 w-full"
                />
                <p className="text-red-500 text-sm">{errors.email}</p>
              </div>

              <div className="mb-5">
                <label className="font-bold">メールアドレス再入力:</label>
                <input
                  type="email"
                  value={formData.confirmEmail}
                  onChange={(e) => setFormData({ ...formData, confirmEmail: e.target.value })}
                  className="border p-2 w-full font-bold"
                />
                <p className="text-red-500 text-sm">{errors.confirmEmail}</p>
              </div>
              <span>
                <a href="https://www.google.com" target="_blank" className="text-blue-500">
                  利用規約
                </a>
                、
                <a href="https://www.google.com" target="_blank" className="text-blue-500">
                  プライバシーポリシー
                </a>
                （オーナー説明ひとりまで/HFやっている人への注意テキストも入ります。）
              </span>
              <div className="mt-4">
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    checked={isAgreed}
                  />
                  <span className="ml-2">同意する</span>
                </label>
              </div>
            </form>
          </div>
          <Button
            className="text-lg w-[100] font-bold mt-4 rounded-l-full rounded-r-full"
            type="submit"
            disabled={!isAgreed}
            onClick={handleSubmit}
          >
            登録
          </Button>
        </>
      )}
    </div>
  )
}

export default RegisterForm
