'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MessageCloud } from '@/components/common/MessageCloud'

export default function MessagesDemo() {
  const [step, setStep] = useState(0)
  const [displayedMessages, setDisplayedMessages] = useState<number[]>([0])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 일반 탭을 위한 함수 - 다음 메시지나 지정된 메시지를 화면에 추가
  const handleNextStep = (targetStep?: number) => {
    const nextStep = targetStep !== undefined ? targetStep : step + 1
    if (nextStep < messages.length) {
      setStep(nextStep)
      setDisplayedMessages((prev) => [...prev, nextStep])
    }
  }

  // 선택지를 위한 함수 - 선택된 메시지를 화면에 추가
  const handleSelection = (messageIndex: number) => {
    setStep(messageIndex)
    setDisplayedMessages((prev) => [...prev, messageIndex])
  }

  const messages = [
    {
      type: 'intro',
      message:
        '（ニックネーム）（呼び名）ねえ、ねえ！ぼくといっしょにできたのげんせきをさがしにいこう！きょうはどんなことしようか？',
      showCharacter: true,
    },
    {
      type: 'default',
      message: '（カテゴリー）はすき？',
      nextStep: 3,
    },
    {
      type: 'intro',
      message: 'そうなんだ！じゃあ、（カテゴリー）はすき？',
      showCharacter: true,
    },
    {
      type: 'selection',
      message: '',
      direction: 'right',
      options: [
        {
          label: '好き',
          value: 'like',
          onClick: () => handleSelection(4),
        },
        {
          label: 'にがてだけどやってみる',
          value: 'dontlike_but_try',
          onClick: () => handleSelection(5),
        },
        {
          label: 'にがて',
          value: 'dontlike',
          onClick: () => handleSelection(6),
        },
      ],
    },
    {
      type: 'intro',
      message: 'そうなんだ！',
      showCharacter: true,
      nextStep: 6,
    },
    {
      type: 'intro',
      message: 'にがてなのにがんばるね！',
      showCharacter: true,
    },
    {
      type: 'default',
      message: 'じゃあ、こんなことできるか？（やること）',
    },
    {
      type: 'selection',
      message: '',
      direction: 'right',
      options: [
        {
          label: 'やってみる',
          value: 'try',
          onClick: () => handleSelection(11),
        },
        {
          label: 'ちがうことにする',
          value: 'different',
          onClick: () => handleSelection(8),
        },
        {
          label: 'できる',
          value: 'can',
          onClick: () => handleSelection(10),
        },
      ],
    },
    {
      type: 'intro',
      message: 'わかった！またにしようね！うーんと、これはどうかな？（やること）',
      showCharacter: true,
    },
    {
      type: 'selection',
      message: '',
      direction: 'right',
      options: [
        {
          label: 'やってみる',
          value: 'try',
          onClick: () => handleSelection(11),
        },
        {
          label: 'できる',
          value: 'can',
          onClick: () => handleSelection(10),
        },
      ],
    },
    {
      type: 'intro',
      message:
        '（ニックネーム）（呼び名）もうできるの？すごいね！そしたらこんなのはどう？（やること）',
      showCharacter: true,
      nextStep: 7,
    },

    {
      type: 'default',
      message:
        '（やること）なにごともやってみることがだいじ！がんばっているようすをこんどおしえてね！',
    },
  ]

  const handleScreenClick = () => {
    const currentMessage = messages[step]
    if (currentMessage.type !== 'selection' && currentMessage.type !== 'input') {
      // nextStep이 있으면 해당 메시지로, 없으면 다음 메시지로
      handleNextStep(currentMessage.nextStep)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [step])

  return (
    <div className="relative w-full h-[100dvh] flex justify-center bg-black">
      <div className="w-full max-w-[430px] h-[100dvh] relative">
        {/* 배경 이미지 */}
        <div className="absolute inset-0">
          <Image
            src="/images/messages/bg_message.png"
            alt="メッセージ背景"
            width={375}
            height={667}
            className="w-full h-full object-cover"
            priority
            sizes="(max-width: 430px) 100vw, 430px"
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
            className="h-full overflow-y-auto px-4 pt-20 pb-safe"
            onClick={handleScreenClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleScreenClick()}
          >
            <div className="min-h-full flex flex-col justify-end space-y-4 pb-4">
              {displayedMessages.map((messageIndex, index) => {
                const msg = messages[messageIndex]
                const isLatestMessage = index === displayedMessages.length - 1

                if (msg.type === 'intro') {
                  return (
                    <div key={`${messageIndex}-${index}`} className="relative">
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
                          message={msg.message || ''}
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
                    <div key={`${messageIndex}-${index}`} className="mt-4">
                      <MessageCloud
                        message={msg.message || ''}
                        direction={msg.direction === 'right' ? 'right' : 'left'}
                        type="selection"
                        selectionOptions={msg.options || []}
                        backgroundColor="#1F2937"
                        textColor="#FFFFFF"
                        ariaLabel="選択メッセージ"
                        animation={{ fadeIn: true }}
                        disabled={!isLatestMessage}
                      />
                    </div>
                  )
                }

                if (msg.type === 'input') {
                  return (
                    <MessageCloud
                      key={`${messageIndex}-${index}`}
                      message=""
                      type="input"
                      inputPlaceholder={msg.placeholder}
                      onInputSubmit={(value) => {
                        console.log('입력된 메시지:', value)
                        handleSelection(messageIndex + 1)
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
                    key={`${messageIndex}-${index}`}
                    message={msg.message || ''}
                    direction={msg.direction === 'right' ? 'right' : 'left'}
                    type="default"
                    backgroundColor={msg.direction === 'right' ? '#3B82F6' : '#4B5563'}
                    textColor="#FFFFFF"
                    ariaLabel={`メッセージ ${messageIndex + 1}`}
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
