'use client'

import { useState, useEffect } from 'react'
import { InformationPanel } from '@/components/common/InformationPanel'
import { ChildRegist } from '@/hooks/childRegist'
import { Button } from '@/components/common/Button'
import { useGlobalStore } from '@/store/info'
import type { GlobalState } from '@/types/info'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/services/api'
import { PLAYER_HONORIFIC_TITLE } from '@/constants'
// import { useLocation } from 'react-router-dom';

export default function InitPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [player_id, setPlayerId] = useState(0)
  const [volatile_token, setVolatileToken] = useState('')
  const { childinfo, setChildInfo } = useGlobalStore() as GlobalState
  const router = useRouter()

  const handleNext = async () => {
    if (currentIndex === 0) {
      await getChild()
      setCurrentIndex((prev) => prev + 1)
    } else if (currentIndex === 1) {
      await updateChild()
      setCurrentIndex((prev) => prev + 1)
    } else {
      router.push('/login')
    }
  }

  const { items } = ChildRegist({ childinfo, setChildInfo })

  const commonPanelStyle = {
    borderRadius: 20,
    position: 'relative' as const,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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

    // 4月2日時点の年齢から生まれた年を算出
    const birthYear = year - ageMap[grade]

    return `${birthYear}-04-02`
  }

  function birthdateToGrade(birthdate: string): string {
    const today = new Date()
    const baseDate = new Date(today.getFullYear(), 3, 2) // 4月2日

    const bd = new Date(birthdate)
    const age = baseDate.getFullYear() - bd.getFullYear()

    const grades: Record<number, string> = {
      3: '年少',
      4: '年中',
      5: '年長',
      6: '小学1年生',
      7: '小学2年生',
      8: '小学3年生',
      9: '小学4年生',
      10: '小学5年生',
      11: '小学6年生',
    }

    return grades[age] || ''
  }
  const getChild = async () => {
    await apiClient
      .post('/account/profile/player/get', {
        volatile_token: volatile_token,
        player_id: player_id,
      })
      .then((res) => {
        setChildInfo('name', res.data.data.nickname)
        setChildInfo(
          'suffix',
          PLAYER_HONORIFIC_TITLE.find((e) => e.value === res.data.data.profile.honorific_title)
            ?.label || ''
        )
        setChildInfo('schoolYear', birthdateToGrade(res.data.data.profile.birth_day))
      })
  }

  const updateChild = async () => {
    await apiClient
      .post('/account/profile/player/put', {
        volatile_token: volatile_token,
        player_id: player_id,
        nickname: childinfo.name,
        birth_day: gradeToBirthdate(childinfo.schoolYear),
        honoric_title: PLAYER_HONORIFIC_TITLE.filter((e) => e.label === childinfo.suffix)[0][
          'value'
        ],
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
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mx-auto flex h-[844px] w-[390px] items-center justify-center bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col items-center justify-center w-full max-w-[320px]">
        <InformationPanel
          items={items}
          currentIndex={currentIndex}
          onNext={handleNext}
          background="transparent"
          withShadow
          style={commonPanelStyle}
          className="w-full flex flex-col h-[75%]"
        />

        <Button
          className="text-lg font-bold mt-4 bg-red-500 px-6 py-2 rounded-full"
          onClick={handleNext}
        >
          つぎへ
        </Button>
      </div>
    </div>
  )
}
