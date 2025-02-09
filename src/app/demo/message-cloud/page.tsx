'use client'

import React, { useState } from 'react'
import { MessageCloud } from '@/components/common/MessageCloud'

export default function MessageCloudDemo() {
  const [messages, setMessages] = useState<string[]>([])

  const handleInputSubmit = (value: string) => {
    setMessages((prev) => [...prev, value])
  }

  const selectionOptions = [
    { label: '옵션 1', value: '1', onClick: () => console.log('옵션 1 선택') },
    { label: '옵션 2', value: '2', onClick: () => console.log('옵션 2 선택') },
    { label: '옵션 3', value: '3', onClick: () => console.log('옵션 3 선택') },
  ]

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-[375px] mx-auto bg-gray-900 min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-4rem)] shadow-2xl rounded-2xl overflow-hidden">
        <div className="sticky top-0 z-10 bg-gray-800 border-b border-gray-700 p-4">
          <h1 className="text-2xl font-bold text-white">메시지 구름 데모</h1>
        </div>

        <div className="p-4 space-y-8 pb-8">
          {/* 기본 기능 데모 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">기본 기능</h2>

            <div className="space-y-2">
              <MessageCloud
                message="안녕하세요! 👋"
                direction="left"
                animation={{ fadeIn: true }}
                ariaLabel="인사 메시지"
                backgroundColor="#4B5563"
                textColor="#FFFFFF"
              />
              <MessageCloud
                message="이것은 기본 메시지입니다."
                direction="right"
                backgroundColor="#3B82F6"
                textColor="#FFFFFF"
                ariaLabel="기본 메시지"
              />
              <MessageCloud
                message="이모지도 지원됩니다! 🎉 🎨 🚀"
                direction="left"
                ariaLabel="이모지 메시지"
                backgroundColor="#4B5563"
                textColor="#FFFFFF"
              />
              <MessageCloud
                message="https://example.com 링크도 자동으로 감지됩니다."
                direction="right"
                backgroundColor="#3B82F6"
                textColor="#FFFFFF"
                ariaLabel="링크 메시지"
              />
            </div>
          </section>

          {/* 스타일 변형 데모 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">스타일 변형</h2>

            <div className="space-y-2">
              <MessageCloud
                message="커스텀 배경색"
                backgroundColor="#6D28D9"
                textColor="#FFFFFF"
                ariaLabel="커스텀 배경색 메시지"
              />
              <MessageCloud
                message="둥근 모서리 조절"
                borderRadius="24px"
                backgroundColor="#065F46"
                textColor="#FFFFFF"
                ariaLabel="둥근 모서리 메시지"
              />
              <MessageCloud
                message="테두리 스타일"
                borderStyle="2px dashed #60A5FA"
                backgroundColor="transparent"
                textColor="#FFFFFF"
                ariaLabel="테두리 스타일 메시지"
              />
            </div>
          </section>

          {/* 메시지 유형 데모 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">메시지 유형</h2>

            <div className="space-y-2">
              <MessageCloud
                message="시스템 메시지입니다."
                type="system"
                backgroundColor="#374151"
                textColor="#FFFFFF"
                ariaLabel="시스템 메시지"
              />
              <MessageCloud
                message=""
                type="input"
                inputPlaceholder="메시지를 입력하세요..."
                onInputSubmit={handleInputSubmit}
                backgroundColor="#1F2937"
                textColor="#FFFFFF"
                ariaLabel="입력 메시지"
              />
              {messages.map((msg, index) => (
                <MessageCloud
                  key={index}
                  message={msg}
                  direction="right"
                  backgroundColor="#3B82F6"
                  textColor="#FFFFFF"
                  ariaLabel={`사용자 메시지 ${index + 1}`}
                />
              ))}
              <MessageCloud
                message="옵션을 선택해주세요"
                type="selection"
                selectionOptions={selectionOptions}
                backgroundColor="#1F2937"
                textColor="#FFFFFF"
                ariaLabel="선택형 메시지"
              />
            </div>
          </section>

          {/* 애니메이션 데모 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">애니메이션</h2>

            <div className="space-y-2">
              <MessageCloud
                message="페이드인 효과"
                animation={{ fadeIn: true }}
                backgroundColor="#4B5563"
                textColor="#FFFFFF"
                ariaLabel="페이드인 메시지"
              />
              <MessageCloud
                message="타이핑 효과"
                animation={{ typing: true }}
                backgroundColor="#4B5563"
                textColor="#FFFFFF"
                ariaLabel="타이핑 메시지"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
