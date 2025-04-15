'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { InformationPanel } from '@/components/common/InformationPanel'
import type { InformationItem } from '@/components/common/InformationPanel/types'

function DekitaContent() {
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [showStamp, setShowStamp] = useState(false)
  const [showEffect, setShowEffect] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [effectPosition, setEffectPosition] = useState('translate-y-[40%]')

  const messages: InformationItem[] = [
    {
      id: 'message1',
      content: 'こうきくん、できたんだね！',
    },
    {
      id: 'message2',
      content: 'やったー！',
    },
    {
      id: 'message3',
      content: 'すごい、すごーい！',
    },
  ]

  useEffect(() => {
    const imageUrls = [
      '/images/dekita/bg_landscape.png',
      '/images/dekita/GJ_stamp_mono.png',
      '/images/dekita/animC2_dekitan.png',
      '/images/dekita/animC2eff_stamp.png',
    ]

    let loadedCount = 0
    const totalImages = imageUrls.length

    imageUrls.forEach((url) => {
      const img = new window.Image()
      img.src = url
      img.onload = () => {
        loadedCount++
        if (loadedCount === totalImages) {
          setImagesLoaded(true)
        }
      }
    })
  }, [])

  useEffect(() => {
    if (imagesLoaded && !animationComplete) {
      const timer1 = setTimeout(() => setShowStamp(true), 500)
      const timer2 = setTimeout(() => setShowEffect(true), 2000)
      const timer3 = setTimeout(() => {
        setShowMessage(true)
        setAnimationComplete(true)
      }, 4500)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    }
  }, [imagesLoaded, animationComplete])

  useEffect(() => {
    if (showEffect && !animationComplete) {
      const timer = setTimeout(() => {
        setEffectPosition('translate-y-[25%]')
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [showEffect, animationComplete])

  const handleNextMessage = () => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex((prev) => prev + 1)
    }
  }

  if (!imagesLoaded) {
    return (
      <div className="w-full h-[100dvh] flex items-center justify-center bg-black">
        <div className="text-white text-xl">로딩중...</div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[100dvh] flex justify-center bg-black overflow-hidden">
      <div className="w-full h-full relative">
        {/* 타이틀 */}
        <div className="absolute top-0 left-0 right-0 w-full h-20 flex items-center justify-center bg-white z-[11]">
          <h1 className="font-title">できたほうこく</h1>
        </div>

        {/* 배경 이미지 */}
        <div className="absolute inset-0">
          <Image
            src="/images/dekita/bg_landscape.png"
            alt="メッセージ背景"
            width={100}
            height={200}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* 스탬프 이미지 */}
        {showStamp && !showEffect && (
          <div className="absolute top-[10%] left-[10%] transform -translate-x-[5%] translate-y-[50%] z-10 scale-150">
            <Image
              src="/images/dekita/GJ_stamp_mono.png"
              alt="スタンプ"
              width={2000}
              height={2000}
            />
          </div>
        )}

        {/* 캐릭터 이미지 */}
        {showStamp && (
          <div className="absolute top-[45%] left-[45%] transform -translate-x-[40%] -translate-y-[70%] z-30 scale-150">
            <Image
              src="/images/dekita/animC2_dekitan.png"
              alt="キャラクター"
              width={500}
              height={500}
              className="transition-all duration-300"
            />
          </div>
        )}

        {/* 이펙트 이미지 */}
        {showEffect && (
          <div
            className={`absolute transform z-20 transition-transform duration-500 ${effectPosition} scale-150`}
          >
            <Image
              src="/images/dekita/animC2eff_stamp.png"
              alt="エフェクト"
              width={2000}
              height={2000}
            />
          </div>
        )}

        {/* 메시지 패널 */}
        {showMessage && (
          <div className="absolute bottom-20 left-0 right-0 px-4 z-40">
            <InformationPanel
              items={messages}
              currentIndex={currentMessageIndex}
              onNext={handleNextMessage}
              background="white"
              withShadow={true}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default function Dekita() {
  return (
    <ProtectedRoute>
      <DekitaContent />
    </ProtectedRoute>
  )
}
