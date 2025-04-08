import { useState, useCallback, useEffect } from 'react'
import { ChatMessage } from '@/types/chat'
import { useGlobalStore } from '@/store/info'
import type { GlobalState } from '@/types/info'
import {
  STAMP_IMAGE_HAI_KEY,
  STAMP_IMAGE_SUGOI_KEY,
  STAMP_IMAGE_WAKATTA_KEY,
} from '@/constants/hanasu'
export const useChat = () => {
  const { name } = useGlobalStore() as GlobalState
  const [step, setStep] = useState(0)
  const [displayedMessages, setDisplayedMessages] = useState<number[]>([0])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [error] = useState<string | null>(null)

  const handleSelection = useCallback((messageIndex: number) => {
    setStep(messageIndex)
    setDisplayedMessages((prev) => [...prev, messageIndex])
  }, [])

  useEffect(() => {
    const baseMessages: ChatMessage[] = [
      {
        // 0
        type: 'intro',
        message: `${name}ちゃん、ねえ！ぼくといっしょにできたのげんせきをさがしにいこう！きょうはどんなことしようか？`,
        showCharacter: true,
      },
      {
        // 1
        type: 'intro',
        message: '（カテゴリー）はすき？',
        nextStep: 3,
      },
      {
        // 2
        type: 'intro',
        message: 'そうなんだ！じゃあ、（カテゴリー）はすき？',
        showCharacter: true,
      },
      {
        // 3
        type: 'selection',
        message: '',
        direction: 'right',
        options: [
          {
            label: 'はい',
            value: 'like',
            onClick: () => handleSelection(4),
          },
          {
            label: 'にがてだけどやってみる',
            value: 'dontlike_but_try',
            onClick: () => handleSelection(6),
          },
          {
            label: 'にがて',
            value: 'dontlike',
            onClick: () => handleSelection(2),
          },
        ],
      },
      {
        // 4
        type: 'stamp',
        message: STAMP_IMAGE_WAKATTA_KEY,
        showCharacter: true,
        nextStep: 7,
      },
      {
        // 5
        type: 'intro',
        message: 'そうなんだ！',
        showCharacter: true,
        nextStep: 6,
      },
      {
        // 6
        type: 'intro',
        message: 'にがてなのにがんばるね！',
        showCharacter: true,
      },
      {
        // 7
        type: 'intro',
        message: 'じゃあ、こんなことできるか？（やること）',
      },
      {
        // 8
        type: 'selection',
        message: '',
        title: 'さかあがり',
        direction: 'right',
        options: [
          {
            label: 'やってみる',
            value: 'try',
            onClick: () => handleSelection(13),
          },
          {
            label: 'ちがうことにする',
            value: 'different',
            onClick: () => handleSelection(9),
          },
          {
            label: 'できる',
            value: 'can',
            onClick: () => handleSelection(11),
          },
        ],
      },
      {
        // 9
        type: 'intro',
        message: 'わかった！またにしようね！うーんと、これはどうかな？（やること）',
        showCharacter: true,
      },
      {
        // 10
        type: 'selection',
        message: '',
        direction: 'right',
        options: [
          {
            label: 'やってみる',
            value: 'try',
            onClick: () => handleSelection(13),
          },
          {
            label: 'できる',
            value: 'can',
            onClick: () => handleSelection(11),
          },
        ],
      },
      {
        // 11
        type: 'stamp',
        message: STAMP_IMAGE_SUGOI_KEY,
        showCharacter: true,
        nextStep: 12,
      },
      {
        // 12
        type: 'intro',
        message: `${name}ちゃん、もうできるの？すごいね！そしたらこんなのはどう？（やること）`,
        showCharacter: true,
        nextStep: 8,
      },
      {
        // 13
        type: 'stamp',
        message: STAMP_IMAGE_HAI_KEY,
        showCharacter: true,
        nextStep: 14,
      },
      {
        // 14
        type: 'end',
        message:
          '（やること）なにごともやってみることがだいじ！がんばっているようすをこんどおしえてね！',
      },
    ]

    setMessages(baseMessages)
  }, [name, handleSelection])

  const handleNextStep = useCallback(
    (targetStep?: number) => {
      const nextStep = targetStep !== undefined ? targetStep : step + 1
      if (nextStep < messages.length) {
        setStep(nextStep)
        setDisplayedMessages((prev) => [...prev, nextStep])
      }
    },
    [step, messages.length]
  )

  return {
    step,
    displayedMessages,
    messages,
    error,
    handleNextStep,
    handleSelection,
  }
}
