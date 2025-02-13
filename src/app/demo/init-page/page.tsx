'use client'

import { useState } from 'react'
import { InformationPanel } from '@/components/common/InformationPanel'
import { useInitialItems } from '@/hooks/useInitialItems'

export default function InitPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const { items } = useInitialItems(handleNext)

  const handlePanelClick = () => {
    // 입력 화면에서는 클릭으로 다음으로 넘어가지 않도록 합니다
    if (currentIndex !== 1) {
      handleNext()
    }
  }

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
      <div className="container mx-auto flex h-full max-h-[844px] w-full max-w-[390px] items-center justify-center px-4">
        <InformationPanel
          items={items}
          currentIndex={currentIndex}
          onNext={handlePanelClick}
          background="transparent"
          withShadow
          className="h-[75%] w-full max-w-[320px] rounded-[20px] backdrop-blur-sm"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          }}
        />
      </div>
    </div>
  )
}
