'use client'

import { useState, useEffect } from 'react'
import { InformationPanel } from '@/components/common/InformationPanel'
import { useInitialItems } from '@/hooks/useInitialItems'
import Image from 'next/image'

export default function InitPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showOmikuji, setShowOmikuji] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showFinalPanel, setShowFinalPanel] = useState(false)

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handleOmikuji = () => {
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
      <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
        <div className="relative flex w-full flex-1 flex-col items-center justify-center">
          <div
            className={`${
              showResult
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
            className={`absolute inset-0 flex flex-col items-center justify-center gap-8 ${
              !showResult ? 'pointer-events-none' : 'z-20'
            }`}
          >
            {showResult && (
              <div className="animate-grow-and-center">
                <Image
                  src="/images/img_result.png"
                  alt="おみくじ結果"
                  width={450}
                  height={450}
                  className="mx-auto"
                />
              </div>
            )}
            {showFinalPanel && (
              <div className="animate-fade-in-up w-[280px]">
                <InformationPanel
                  items={[items[items.length - 1]]}
                  currentIndex={0}
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
    <div className="mx-auto flex h-[844px] w-[390px] items-center justify-center bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
      <div className="flex h-full w-full items-center justify-center px-4">
        <InformationPanel
          items={items.slice(0, -1)}
          currentIndex={currentIndex}
          onNext={handleNext}
          background="transparent"
          withShadow
          style={commonPanelStyle}
          className="w-full max-w-[320px] flex flex-col h-[75%]"
        />
      </div>
    </div>
  )
}
