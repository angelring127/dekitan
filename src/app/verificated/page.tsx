'use client'

import { useState, useEffect } from 'react'
import { InformationPanel } from '@/components/common/InformationPanel'
import { ChildRegist } from '@/hooks/childRegist'
import { useGlobalStore } from '@/store/info'
import type { GlobalState } from '@/types/info'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/services/api'
import { PLAYER_HONORIFIC_TITLE } from '@/constants'
import { useAuthStore } from '@/store/auth'
// import { useLocation } from 'react-router-dom';

export default function InitPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [player_id, setPlayerId] = useState(0)
  const [volatile_token, setVolatileToken] = useState('')
  const { childinfo, setChildInfo } = useGlobalStore() as GlobalState
  const { setName } = useGlobalStore() as GlobalState
  const router = useRouter()

  const handleNext = async () => {
    if (currentIndex === 0) {
      await getChild()
      setCurrentIndex((prev) => prev + 1)
    } else if (currentIndex === 1) {
      await updateChild()
      setCurrentIndex((prev) => prev + 1)
    } else {
      router.push('/room')
    }
  }

  const { items } = ChildRegist({ childinfo, setChildInfo })


  function gradeToBirthdate(grade: string): string {
    const date = new Date()
    const year = date.getFullYear()
    // 4月2日時点の年齢から生まれた年を算出
    const birthYear = year - parseInt(grade)

    return `${birthYear}-04-02`
  }

  function birthdateToGrade(birthdate: string): string {
    const today = new Date()
    const baseDate = new Date(today.getFullYear(), 3, 2) // 4月2日

    const bd = new Date(birthdate)
    const age = baseDate.getFullYear() - bd.getFullYear()
    return age.toString();
  }
  const getChild = async () => {
    await apiClient
      .post('/account/profile/player/get', {
        volatile_token: volatile_token,
        player_id: player_id,
      })
      .then((res) => {
        setChildInfo('name', res.data.data.nickname)
        setChildInfo('suffix',res.data.data.profile?.honorific_title)
        setChildInfo('schoolYear', birthdateToGrade(res.data.data?.profile?.birth_day))
      })
  }

  const updateChild = async () => {
    await apiClient
      .post('/account/profile/player/put', {
        volatile_token: volatile_token,
        player_id: player_id,
        nickname: childinfo.name,
        birth_day: gradeToBirthdate(childinfo.schoolYear),
        honoric_title: childinfo.suffix
      })
      .then(() => {})
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('t')
    if (!token) return

    apiClient
      .post('/account/regist/verificate', {
        token: token,
      })
      .then((res) => {
        if (res.data?.data?.player_id && res.data?.data?.volatile_token) {
          setPlayerId(res.data.data.player_id)
          setVolatileToken(res.data.data.volatile_token)
          useAuthStore.getState().setToken(res.data.data.volatile_token)
          useGlobalStore.getState().setPlayerId(res.data.data.player_id)
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mx-auto flex h-[844px] w-[390px] items-center justify-center bg-[url('/images/bg_landscape.png')] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col items-center justify-center w-full max-w-[320px]">
        <InformationPanel
          items={items}
          currentIndex={currentIndex}
          onNext={handleNext}
          background="white"
          withShadow
          className="w-full flex flex-col h-[75%]"
        />

        <button
          className="text-lg font-bold mt-4 bg-[#00803a] text-white px-6 py-2 rounded-full w-[200px]"
          onClick={handleNext}
        >
          つぎへ
        </button>
      </div>
    </div>
  )
}
