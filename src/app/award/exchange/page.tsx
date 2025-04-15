'use client'
import React, { useEffect } from 'react'
import { apiClient } from '@/services/api'
import { InformationPanel } from '@/components/common/InformationPanel'
import { getAwards } from '@/hooks/awardGetting'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useGlobalStore } from '@/store/info'
import type { GlobalState } from '@/types/info'
import { useAuthStore } from '@/store/auth'

export default function GetAward() {
  const { name, points, singleCollectionItem, setPoints, decreasePoints, setSingleCollectionItem } =
    useGlobalStore()
  const router = useRouter()
  const volatileToken = useAuthStore.getState().token
  const playerId = useGlobalStore.getState().playerId

  const handleNext = () => {
    if (currentIndex === 0) {
      getAward()
    }

    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      decreasePoints(points - 100);
      router.push('/award/collect')
      apiClient
        .post('award/item/collect', {
          volatile_token: volatileToken,
          player_id: playerId,
          item_id: singleCollectionItem?.id,
        })
        .then((res) => {
          console.log('res', res)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const initialItems = getAwards(
    handleNext,
    name,
    points,
    singleCollectionItem ?? { title: '', description: '' }
  )
  const items = initialItems?.items || []

  const getAward = () => {
    apiClient
      .post('/award/exchange/ordinary', {
        volatile_token: volatileToken,
        player_id: playerId,
      })
      .then((response) => {
        setSingleCollectionItem(response.data.data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  useEffect(() => {
    apiClient.post('account/profile/player/get', {
      volatile_token: volatileToken,
      player_id: playerId,
    })
    .then((res) => {
      setPoints(res.data.data.current_point)
    })
  }, [])

  return (
    <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
      <div className="relative w-[390px] mt-auto mb-4">
        {currentIndex === 0 && (
          <div className="relative inline-block" style={{ left: '12%', margin: '0' }}>
            <Image
              src="/images/img_gemstone.png"
              alt="gemStone"
              width={280}
              height={280}
              className="gem_points"
            />
            <span
              className="absolute 
    inset-0 flex items-center justify-center  text-3xl font-bold"
            >
              {points} ポイント
            </span>
            <Image
              src="/images/img_little_rat.png"
              alt="little_rat"
              width={130}
              height={130}
              className="absolute  z-10"
              style={{ bottom: '-45%', right: '-15%' }}
            />
          </div>
        )}

        {currentIndex === 1 && (
          <>
            <Image
              className=" mx-auto  absolute  cursor-pointer"
              src="/images/img_stonecrusher_burst.png"
              alt="crusher"
              width={500}
              height={500}
              onClick={handleNext}
              style={{ top: '-28%' }}
            />
            <Image
              className=" mx-auto relative  cursor-pointer"
              src="/images/img_stonecrusher.png"
              alt="crusher"
              width={500}
              height={500}
              onClick={handleNext}
              style={{ top: '12%' }}
            />
            <Image
              src="/images/img_little_rat.png"
              alt="little_rat"
              width={120}
              height={120}
              className="absolute"
              style={{ bottom: '32%', right: '8%' }}
            />
          </>
        )}
        {currentIndex === 2 && (
          <>
            <Image
              src="/images/img_yellow_star.png"
              alt="effect"
              width={80}
              height={80}
              className="mx-auto absolute"
              style={{ top: '-200%', right: '50%' }}
            />
            <Image
              src="/images/img_yellow_star.png"
              alt="effect"
              width={80}
              height={80}
              className="mx-auto absolute"
              style={{ top: '-210%', right: '10%' }}
            />
            <Image
              src={singleCollectionItem?.image ?? '/images/default-image.png'}
              alt="award"
              width={120}
              height={120}
              className="mx-auto absolute gem_points cursor-pointer animate-fade-in-up "
              style={{ top: '-180%', right: '20%' }}
              onClick={handleNext}
            />
            <Image
              src="/images/img_stonecrusher_effect.png"
              alt="effect"
              width={120}
              height={120}
              className="mx-auto absolute rotate-[120deg]"
              style={{ top: '-130%', right: '10%' }}
            />
            <Image
              src="/images/img_burst_effect2.png"
              alt="effect"
              width={120}
              height={120}
              className="mx-auto absolute rotate-[-20deg]"
              style={{ top: '-140%', right: '35%' }}
            />
            <Image
              src="/images/img_stonecrusher.png"
              alt="stoneCrusher"
              width={400}
              height={400}
              className="mx-auto absolute "
              style={{ bottom: '60%' }}
            />

            <Image
              src="/images/img_little_rat.png"
              alt="little_rat"
              width={120}
              height={120}
              className="absolute "
              style={{ bottom: '55%', right: '05%' }}
            />
          </>
        )}
        {currentIndex === 3 && (
          <>
            <Image
              src="/images/img_little_girl.png"
              alt="littlegirl"
              width={80}
              height={80}
              className="mx-auto absolute"
              style={{ top: '-10%', right: '10%' }}
            />
            <Image
              src="/images/img_little_girl_2.png"
              alt="littlegirl"
              width={80}
              height={80}
              className="mx-auto absolute"
              style={{ top: '-10%', left: '10%' }}
            />
            <Image
              src={singleCollectionItem?.image ?? '/images/default-image.png'}
              alt="award"
              width={150}
              height={150}
              className="gem_points relative animate-fade-in-up"
              style={{ bottom: '-20%', left: '30%' }}
            />
          </>
        )}

        <div className=" w-full flex flex-col items-center mb-20">
          <InformationPanel
            items={items.slice(0)}
            currentIndex={currentIndex}
            background="transparent"
            withShadow
            className="w-[320px] my-4 mt-20  flex flex-col items-center justify-center common_panel_style"
          ></InformationPanel>
        </div>
      </div>
    </div>
  )
}
