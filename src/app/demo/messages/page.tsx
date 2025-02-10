'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MessageCloud } from '@/components/common/MessageCloud'

export default function MessagesDemo() {
  const [step, setStep] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const messages = [
    {
      type: 'intro',
      message: 'こんにちは！メッセージ画面の体験を始めましょうか？',
      showCharacter: true,
    },
    {
      type: 'selection',
      message: '始めますか？',
      options: [
        {
          label: 'はい、始めましょう！',
          value: 'start',
          onClick: () => setStep((step) => step + 1),
        },
        {
          label: 'いいえ、後でします',
          value: 'later',
          onClick: () => setStep(0),
        },
      ],
    },
    {
      type: 'left',
      message: 'メッセージ画面では様々な形式のメッセージを表示できます。',
    },
    {
      type: 'left',
      message: '絵文字も使えて 👋、リンクも自動的に検出されます！',
    },
    {
      type: 'right',
      message: 'ユーザーの返信はこのように表示されます。',
    },
    {
      type: 'input',
      placeholder: 'メッセージを入力してください...',
    },
  ] as const

  const handleScreenClick = () => {
    if (
      step < messages.length - 1 &&
      messages[step].type !== 'selection' &&
      messages[step].type !== 'input'
    ) {
      setStep((step) => step + 1)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [step])

  return (
    <div className="relative w-full h-screen flex justify-center bg-black">
      <div className="w-[375px] h-[667px] relative">
        {/* 배경 이미지 */}
        <div className="absolute inset-0">
          <Image
            src="/images/messages/bg_message.png"
            alt="메시지 배경"
            width={375}
            height={667}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* 뒤로가기 버튼 - 고정 위치 */}
        <div className="absolute top-0 right-0 z-30 px-4 py-3">
          <Link href="/" className="w-16 h-16 flex items-center justify-center" aria-label="戻る">
            <Image src="/images/ic_back.png" alt="" width={48} height={48} className="text-white" />
          </Link>
        </div>

        {/* 콘텐츠 영역 */}
        <div className="absolute inset-0">
          {/* 메시지 컨테이너 */}
          <div
            className="h-full overflow-y-auto px-4 pt-20"
            onClick={handleScreenClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleScreenClick()}
          >
            <div className="min-h-full flex flex-col justify-end space-y-4 pb-4">
              {messages.slice(0, step + 1).map((msg, index) => {
                if (msg.type === 'intro') {
                  return (
                    <div key={index} className="relative">
                      {msg.showCharacter && (
                        <div className="absolute -top-6 left-0 w-16 h-16">
                          <Image
                            src="/images/ic_character.png"
                            alt=""
                            width={64}
                            height={64}
                            className="rounded-full"
                          />
                        </div>
                      )}
                      <div className="pt-8">
                        <MessageCloud
                          message={msg.message}
                          direction="left"
                          type="default"
                          backgroundColor="#4B5563"
                          textColor="#FFFFFF"
                          ariaLabel="開始メッセージ"
                          animation={{ fadeIn: true }}
                        />
                      </div>
                    </div>
                  )
                }

                if (msg.type === 'selection') {
                  return (
                    <div key={index} className="mt-4">
                      <MessageCloud
                        message={msg.message}
                        type="selection"
                        selectionOptions={
                          msg.options as Array<{
                            label: string
                            value: string
                            onClick: () => void
                          }>
                        }
                        backgroundColor="#1F2937"
                        textColor="#FFFFFF"
                        ariaLabel="選択メッセージ"
                        animation={{ fadeIn: true }}
                      />
                    </div>
                  )
                }

                if (msg.type === 'input') {
                  return (
                    <MessageCloud
                      key={index}
                      message=""
                      type="input"
                      inputPlaceholder={msg.placeholder}
                      onInputSubmit={(value) => {
                        console.log('입력된 메시지:', value)
                        setStep((step) => step + 1)
                      }}
                      backgroundColor="#1F2937"
                      textColor="#FFFFFF"
                      ariaLabel="メッセージ入力"
                      animation={{ fadeIn: true }}
                    />
                  )
                }

                return (
                  <MessageCloud
                    key={index}
                    message={msg.message}
                    direction={msg.type as 'left' | 'right'}
                    backgroundColor={msg.type === 'right' ? '#3B82F6' : '#4B5563'}
                    textColor="#FFFFFF"
                    ariaLabel={`メッセージ ${index + 1}`}
                    animation={{ fadeIn: true }}
                  />
                )
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
