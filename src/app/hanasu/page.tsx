'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MessageCloud } from '@/components/common/MessageCloud'
import { useChat } from '@/hooks/useChat'
import { STAMP_IMAGE_PATH_LIST } from '@/constants/hanasu'
import { messageEndButton } from '@/components/common/MessageCloud'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

function HanasuContent() {
  const { step, displayedMessages, messages, error, handleNextStep } = useChat()
  const router = useRouter()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messageContainerRef = useRef<HTMLDivElement>(null)

  const handleScreenClick = () => {
    const currentMessage = messages[step]
    if (currentMessage?.type !== 'selection' && currentMessage?.type !== 'input') {
      handleNextStep(currentMessage?.nextStep)
    }
  }

  const handleEndButtonClick = () => {
    // room 페이지로 replace 방식으로 이동 (뒤로가기 방지)
    router.replace('/room')
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [step])

  if (error) {
    return (
      <div className="relative w-full h-[100dvh] flex justify-center items-center bg-black">
        <div className="text-white">{error}</div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[100dvh] flex justify-center bg-black">
      <div className="w-full max-w-[500px] h-[100dvh] relative">
        {/* 타이틀 */}
        <div className="absolute top-0 left-0 right-0 w-full h-20 flex items-center justify-center bg-white z-[11]">
          <h1 className="font-title">できたんと話す</h1>
        </div>
        {/* 배경 이미지 */}
        <div className="absolute inset-0">
          <Image
            src="/images/hanasu/talk_bg.png"
            alt="メッセージ背景"
            width={375}
            height={667}
            className="w-full h-full object-cover"
            priority
            sizes="(max-width: 500px) 100vw, 500px"
          />
        </div>
        {/* 콘텐츠 영역 */}
        <div className="absolute inset-0">
          {/* 메시지 컨테이너 */}
          <div
            ref={messageContainerRef}
            className="h-full overflow-y-auto px-4 pt-20"
            onClick={handleScreenClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleScreenClick()}
          >
            <div className="min-h-full flex flex-col justify-end space-y-4 pb-4">
              {displayedMessages.map((msg, index) => {
                const isLatestMessage = index === displayedMessages.length - 1

                if (!msg) return null

                if (msg.type === 'intro') {
                  return (
                    <div key={`msg-${index}`} className="relative">
                      <div className="absolute -top-1 -left-1 w-16 h-16 z-10">
                        <Image
                          src="/images/hanasu/dekitan_kaiwa_icon.png"
                          alt=""
                          width={64}
                          height={64}
                          className="rounded-full"
                        />
                      </div>
                      <div className="pt-8">
                        <MessageCloud
                          message={msg.message || ''}
                          direction="left"
                          type="default"
                          backgroundColor="#FFFFFF"
                          textColor="#000000"
                          ariaLabel="開始メッセージ"
                          animation={{ fadeIn: true }}
                          name="できたん"
                        />
                      </div>
                    </div>
                  )
                }

                if (msg.type === 'selection') {
                  return (
                    <div key={`msg-${index}`} className="relative mt-4">
                      {msg.direction === 'left' && (
                        <div className="absolute -top-1 -left-1 w-16 h-16 z-10">
                          <Image
                            src="/images/hanasu/dekitan_kaiwa_icon.png"
                            alt=""
                            width={64}
                            height={64}
                            className="rounded-full"
                          />
                        </div>
                      )}
                      <div className={msg.direction === 'left' ? 'pt-8' : ''}>
                        <MessageCloud
                          message={msg.message || ''}
                          direction={msg.direction === 'right' ? 'right' : 'left'}
                          type="selection"
                          selectionOptions={msg.options || []}
                          backgroundColor="#ffddbf"
                          textColor="#000000"
                          ariaLabel="選択メッセージ"
                          animation={{ fadeIn: true }}
                          disabled={!isLatestMessage}
                          name={msg.direction === 'left' ? 'できたん' : undefined}
                          title={msg.title}
                        />
                      </div>
                    </div>
                  )
                }

                if (msg.type === 'stamp') {
                  return (
                    <div key={`msg-${index}`} className="relative mt-4">
                      <div className="absolute -top-1 -left-1 w-16 h-16 z-10">
                        <Image
                          src="/images/hanasu/dekitan_kaiwa_icon.png"
                          alt=""
                          width={64}
                          height={64}
                          className="rounded-full"
                        />
                      </div>
                      <div className={msg.direction === 'left' ? 'pt-8' : ''}>
                        <div
                          className={`flex ${msg.direction === 'right' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className="relative -top-8 left-10 w-64 h-64">
                            <Image
                              src={
                                STAMP_IMAGE_PATH_LIST[
                                  msg.message as keyof typeof STAMP_IMAGE_PATH_LIST
                                ] || ''
                              }
                              alt="スタンプ"
                              fill
                              className="object-contain"
                              aria-label="スタンプ"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }

                if (msg.type === 'end') {
                  return (
                    <div key={`msg-${index}`} className="relative mt-4">
                      <div className="absolute -top-10 -left-1 w-16 h-16 z-10">
                        <Image
                          src="/images/hanasu/dekitan_kaiwa_icon.png"
                          alt=""
                          width={64}
                          height={64}
                          className="rounded-full"
                        />
                      </div>
                      <MessageCloud
                        message={msg.message || ''}
                        direction="left"
                        type="default"
                        backgroundColor="#FFFFFF"
                        textColor="#000000"
                        ariaLabel="終了メッセージ"
                        animation={{ fadeIn: true }}
                        name="できたん"
                      />
                      <div className="flex justify-center mt-4">
                        <button
                          className={`${messageEndButton({ type: 'default' })} bg-gray-300 text-black py-4 px-8 rounded`}
                          aria-label="おわりボタン"
                          onClick={handleEndButtonClick}
                        >
                          おわり
                        </button>
                      </div>
                    </div>
                  )
                }

                return null
              })}
              <div ref={messagesEndRef} className="pb-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hanasu() {
  return (
    <ProtectedRoute>
      <HanasuContent />
    </ProtectedRoute>
  )
}
