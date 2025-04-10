'use client'

import { useState, useEffect } from 'react'
import { InformationPanel } from '@/components/common/InformationPanel'
import { useInitialItems } from '@/hooks/useInitialItems'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
export default function InitPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showOmikuji, setShowOmikuji] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showFinalPanel, setShowFinalPanel] = useState(false)
  const router = useRouter()
  const handleNext = () => {
    // if (currentIndex < items.length - 1 && currentIndex !== 2) {
    //   if(currentIndex == 1) {
    //     initialItems.smoothScrollTo()
    //   }
    //   setCurrentIndex((prev) => prev + 1)
    // }
  }

  const handleOmikuji = () => {
    setCurrentIndex(currentIndex + 1)
    setShowOmikuji(true)
  }

  const handleOmikujiClick = () => {
    if (!showResult) {
      setShowResult(true)
    }
  }

  const initialItems = useInitialItems(handleNext, handleOmikuji)
  const items = initialItems?.items || []

  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => {
        setShowFinalPanel(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [showResult])

  const commonPanelStyle = {
    borderRadius: 20,
    position: 'relative' as const,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  }

  if (showOmikuji) {
    return (
      <div className="mx-auto flex h-[844px] flex-col items-center bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
        <div className="relative flex w-full flex-1 flex-col items-center justify-center overflow-y-auto">
          <div
            className={`${showResult
                ? 'animate-shrink-and-move z-0'
                : 'animate-shake-infinite cursor-pointer z-10'
              }`}
            onClick={handleOmikujiClick}
            role="button"
            tabIndex={0}
            aria-label="おみくじをタップ"
          >
            <Image
              src="/images/img_omikuji.png"
              alt="おみくじ"
              width={300}
              height={300}
              className="mx-auto"
            />
          </div>
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center gap-8 overflow-y-auto ${!showResult ? 'pointer-events-none' : 'z-20'
              }`}
          >
            {showResult && (
              <>
                <div className="animate-grow-and-center">
                  <Image
                    src="/images/img_result.png"
                    alt="おみくじ結果"
                    width={450}
                    height={450}
                    className="mx-auto"
                  />
                </div>
                <Image
                  src="/images/img_little_girl_2.png"
                  alt="おみくじ結果"
                  width={80}
                  height={80}
                  className="mx-auto absolute animate-fade-in-up"
                  style={{ top: '5%', left: '5%' }}
                />
                <Image
                  src="/images/img_little_girl.png"
                  alt="おみくじ結果"
                  width={80}
                  height={80}
                  className="mx-auto absolute animate-fade-in-up"
                  style={{ top: '25%', right: '5%' }}
                />
              </>
            )}
            {showFinalPanel && (
              <div className="animate-fade-in-up w-[280px] mb-3">
                <InformationPanel
                  items={items}
                  onNext={handleNext}
                  currentIndex={currentIndex}
                  background="transparent"
                  withShadow
                  style={commonPanelStyle}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="relative mx-auto flex flex-col  h-[844px] items-center justify-center bg-[url('/images/bg_landscape.png')] bg-cover bg-center bg-no-repeat">
        <div className="flex h-full w-full items-center justify-center ">

          <InformationPanel
            items={items}
            currentIndex={currentIndex}
            onNext={handleNext}
            background="white"
            withShadow
            className="w-full max-w-[320px] flex flex-col h-[55%] overflow-visible"
          />
        </div>
        <button
          type="button"
          className="bg-[#00803a] mb-20 text-white rounded-l-full rounded-r-full w-[170px] py-2  "
          onClick={() => router.push('/regist/parent')}
        >
          つぎへ
        </button>
      </div>

    </>
  )
}
