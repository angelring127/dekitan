'use client'

import React, { useState } from 'react'
import { Button } from '@/components/common/Button'
import { apiClient } from '@/services/api'
import { useGlobalStore } from '@/store/info'
import type { GlobalState } from '@/types/info'
import type { InformationItem } from '@/components/common/InformationPanel/types'
import { InformationPanel } from '@/components/common/InformationPanel'
import { useRouter } from 'next/navigation'
import { PLAYER_HONORIFIC_TITLE } from '@/constants'

interface FormValues {
  nickname: string
  login_password: string
  login_id: string
  confirm_login_id: string
  player_name: string
  player_honorific_title: number
  birth_day: string
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormValues>({
    nickname: '',
    login_password: '',
    login_id: '',
    confirm_login_id: '',
    player_name: '',
    player_honorific_title: 0,
    birth_day: '',
  })

  const [errors, setErrors] = useState<Partial<FormValues>>({})
  const [isAgreed, setIsAgreed] = useState(false)
  const parentinfo = useGlobalStore((state: GlobalState) => state.parentinfo)
  const setParentInfo = useGlobalStore((state: GlobalState) => state.setParentInfo)
  const childinfo = useGlobalStore((state: GlobalState) => state.childinfo)
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)

  const validateForm = () => {
    const newErrors: Partial<FormValues> = {}

    if (!formData.nickname) newErrors.nickname = 'ニックネームを入力してください。'
    else if (formData.nickname.length > 8) newErrors.nickname = '８文字以内'
    if (!formData.login_password) newErrors.login_password = 'パスワードを入力してください。'
    else if (formData.login_password.length < 6)
      newErrors.login_password = 'パスワードは、8〜16文字以内、記号は .!/+-_=$#&%@が利用できます'

    if (!formData.login_id) newErrors.login_id = 'メールアドレスを入力してください。'
    else if (!/\S+@\S+\.\S+/.test(formData.login_id))
      newErrors.login_id = 'メールアドレスが正しくありません。'

    if (!formData.confirm_login_id)
      newErrors.confirm_login_id = '確認メールアドレスを入力してください。'
    else if (formData.confirm_login_id !== formData.login_id)
      newErrors.confirm_login_id = 'メールアドレスと一致しません'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const items: InformationItem[] = [
    {
      id: '0',
      content: (
        <div className="flex flex-col items-center gap-4">
         <h1 className='font-bold text-xl text-green-800'> ユーザー登録</h1>
          <div className="border mx-auto mb-4" style={{ borderColor: '#2f855a' ,width:'95%' }}></div>
          <span className=" text-m font-semibold">
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
    if (validateForm() && isAgreed) {
      try {
        formData.player_name = childinfo.name
        formData.player_honorific_title = PLAYER_HONORIFIC_TITLE.filter(
          (item) => item.honorific == childinfo.suffix
        )[0]['value']
        formData.birth_day = gradeToBirthdate(childinfo.schoolYear)

        await apiClient
          .post('/account/regist/entry', formData)
          .then((response) => {
            if (response.status == 200) {
              setParentInfo('name', formData.nickname)
            }
          })
          .catch(() => { })
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    }
  }

  function gradeToBirthdate(grade: string): string {
    const date = new Date()
    const year = date.getFullYear()
    const ageMap: Record<string, number> = {
      年少: 3,
      年中: 4,
      年長: 5,
      小学1年生: 6,
      小学2年生: 7,
      小学3年生: 8,
      小学4年生: 9,
      小学5年生: 10,
      小学6年生: 11,
    }

    const birthYear = year - ageMap[grade]

    return `${birthYear}-04-02`
  }

  return (
    <div className="mx-auto flex h-auto w-[390px] flex-col items-center justify-center overflow-auto bg-[url('/images/bg_landscape.png')] bg-cover bg-center bg-no-repeat">
      {parentinfo.name ? (
        <div>
          <InformationPanel
            items={items}
            currentIndex={0}
            background="white"
            withShadow
            className="my-4 mt-20 flex flex-col w-[320px] items-center justify-center"
          >

          </InformationPanel>
          <button
  className="text-lg font-bold m-4 bg-gray-300 shadow-lg px-7 py-5 shadow-gray-500/50 text-black rounded-l-full rounded-r-full mx-auto block"
  onClick={() => router.push('/')}
>
  トップページにもどる
</button>

        </div>
      ) : (
        <>
          <div className=" w-[350px] bg-white p-6 rounded-lg flex flex-col mt-20">
            <h1 className='font-bold text-xl text-green-800 mb-2'> ユーザー登録</h1>
            <div className="border mx-auto mb-5" style={{ borderColor: '#2f855a', width: '95%' }}></div>
            <span className="font-semibold">
              ワクワクワールドで「できた」の原石を集めるには、ユーザー登録が必要です。ぜひ、ご登録ください！
            </span>

            <label htmlFor="nickname" style={{ backgroundColor: '#2f855a', borderRadius: '5px', fontSize: '12px', width: '150px' }} className="mt-10 text-white font-semibold px-6 py-2 text-center mx-auto block">
              ニックネーム
            </label>
            <input
              type="text"
              value={formData.nickname}
              onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
              maxLength={16}
              className="w-full mt-1 font-semibold text-center border-2 rounded-md  min-h-[50px]"
              style={{ borderColor: '#00803a', outline: 'none' }}
              aria-label="ニックネームを入力"
            />
            <p className="text-red-500 text-sm">{errors.nickname}</p>

            <label style={{ backgroundColor: '#2f855a', borderRadius: '5px', fontSize: '12px', width: '150px' }} className="mt-10 text-white font-semibold px-6 py-2 text-center mx-auto block">
              パスワード
            </label>
            <div className="relative flex items-center w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.login_password}
                onChange={(e) => setFormData({ ...formData, login_password: e.target.value })}
                maxLength={16}
                className="w-full mt-1 font-semibold text-center border-2 rounded-md pr-10 min-h-[50px]" 
                style={{ borderColor: '#00803a', outline: 'none' }}
                aria-label="パスワードを入力"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <img
                    src="/images/pw_eye_02.png"
                    alt="Hide Password"
                    className="w-6 h-6"
                  />
                ) : (
                  <img
                    src="/images/pw_eye_01.png"
                    alt="Show Password"
                    className="w-6 h-6"
                  />
                )}
              </button>
            </div>

            <p className="text-red-500 text-sm">{errors.login_password}</p>

            <label style={{ backgroundColor: '#2f855a', borderRadius: '5px', fontSize: '12px', width: '150px' }} className="mt-10 text-white font-semibold px-6 py-2 text-center mx-auto block">
              メールアドレス
            </label>
            <input
              type="email"
              value={formData.login_id}
              onChange={(e) => setFormData({ ...formData, login_id: e.target.value })}
              className="w-full mt-1 font-semibold text-center border-2 rounded-md  min-h-[50px]"
              style={{ borderColor: '#00803a', outline: 'none' }}
              aria-label="メールアドレスを入力"
            />
            <p className="text-red-500 text-sm">{errors.login_id}</p>

            <label style={{ backgroundColor: '#2f855a', borderRadius: '5px', fontSize: '12px', width: '150px' }} className="mt-10 text-white font-semibold px-2 py-2 text-center mx-auto block">
              メールアドレス再入力
            </label>
            <input
              type="email"
              value={formData.confirm_login_id}
              onChange={(e) => setFormData({ ...formData, confirm_login_id: e.target.value })}
              className="w-full mt-1 font-semibold text-center border-2 rounded-md  min-h-[50px]"
              style={{ borderColor: '#00803a', outline: 'none' }}
              aria-label="確認メールアドレスを入力"
            />
            <p className="text-red-500 text-sm">{errors.confirm_login_id}</p>

            <span className='mt-20 '>     
              <a href="https://www.google.com" target="_blank" className="text-[#00803a] text-sm font-bold">
                利用規約
              </a>
              、
              <a href="https://www.google.com" target="_blank" className="text-[#00803a] text-sm font-bold">
                プライバシーポリシー
              </a>
            </span> <br></br>
            <span className='text-sm  font-semibold'>ご利用には        <a href="https://www.google.com" target="_blank" className="text-[#00803a] underline">
              利用規約
            </a>
              および 、
              <a href="https://www.google.com" target="_blank" className="text-[#00803a]  underline">
                プライバシーポリシー
              </a>の同意が必要です。</span>
            <span className='text-sm font-semibold'>ドメインの除外設定をされている場合は、〇〇.com からの
              メールを受信できるように設定してください。</span>
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
      
          </div>
        
          <button
              className="bg-[#00803a] m-6 text-white rounded-l-full rounded-r-full px-6 py-2 focus:outline-none"
              onClick={handleSubmit}
            >
              登録する
            </button>
        </>
      )}
    </div>
  )
}

export default RegisterForm
