'use client'

import { useState, useEffect } from 'react'
import { InformationPanel } from '@/components/common/InformationPanel'
import { useInitialItems } from '@/hooks/useInitialItems'
import { Button } from '@/components/common/Button'
import Image from 'next/image'

export default function InitPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showOmikuji, setShowOmikuji] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showFinalPanel, setShowFinalPanel] = useState(false)
  const initialItems = useInitialItems()
  const items = initialItems?.items || []

  useEffect(() => {
    if (showOmikuji) {
      // 흔들기 애니메이션이 끝난 후 (5초 = 10회 * 0.5초) 결과 표시
      const timer = setTimeout(() => {
        setShowResult(true)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showOmikuji])

  useEffect(() => {
    if (showResult) {
      // 결과 이미지 애니메이션이 끝난 후 (1초) 최종 패널 표시
      const timer = setTimeout(() => {
        setShowFinalPanel(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [showResult])

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handleOmikuji = () => {
    setShowOmikuji(true)
  }

  const itemsWithHandlers = items.map((item) => {
    if (item.id === 'start') {
      return {
        ...item,
        onClick: handleNext,
      }
    }
    if (item.id === 'input') {
      return {
        ...item,
        buttons: [
          {
            text: '確認',
            variant: 'primary' as const,
            onClick: handleNext,
          },
        ],
      }
    }
    if (item.id === 'welcome') {
      return {
        ...item,
        buttons: [
          {
            text: 'おみくじをひく',
            variant: 'secondary' as const,
            onClick: handleOmikuji,
          },
        ],
      }
    }
    return item
  })

  if (showOmikuji) {
    return (
      <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
        {/* 메인 콘텐츠 */}
        <div className="relative flex w-full flex-1 flex-col items-center justify-center">
          <div className={showResult ? 'animate-shrink-and-move' : 'animate-shake-limited'}>
            <Image
              src="/images/img_omikuji.png"
              alt="오미쿠지"
              width={300}
              height={300}
              className="mx-auto"
            />
          </div>
          {showResult && (
            <div className="absolute top-1/3 left-2/3 animate-fade-in">
              <Image
                src="/images/img_result.png"
                alt="결과"
                width={450}
                height={450}
                className="mx-auto"
              />
            </div>
          )}
          {showFinalPanel && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-fade-in-up">
              <div className="flex flex-col items-center gap-4">
                <InformationPanel
                  items={[
                    {
                      id: 'final',
                      text: (
                        <span className="whitespace-pre-line text-center text-2xl font-bold">
                          はなうたを歌えたら{'\n'}ハッピーな一日に！{'\n'}
                          {'\n'}さっそくうたってみよう！
                        </span>
                      ),
                    },
                  ]}
                  background="transparent"
                  withShadow
                  style={{
                    borderRadius: 20,
                    position: 'relative',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  }}
                  padding={24}
                  className="w-[280px]"
                />
                <Button
                  variant="primary"
                  className="shadow-[0_0_10px_rgba(255,255,255,0.5)] text-lg font-bold"
                >
                  やってみた！
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex h-[844px] w-[390px] items-center justify-center bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
      <div className="flex h-full w-full items-center justify-center px-4">
        <InformationPanel
          items={itemsWithHandlers}
          sequential={true}
          currentIndex={currentIndex}
          onNext={handleNext}
          background="transparent"
          withShadow
          style={{
            borderRadius: 20,
            height: '75%',
            position: 'relative',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          }}
          padding={24}
          className="w-full max-w-[320px] flex flex-col"
        />
      </div>
    </div>
  )
}
