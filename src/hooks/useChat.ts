import { useState, useCallback, useEffect } from 'react'
import { ChatMessage } from '@/types/chat'
import { useGlobalStore } from '@/store/info'

export const useChat = () => {
  const { name } = useGlobalStore()
  const [step, setStep] = useState(0)
  const [displayedMessages, setDisplayedMessages] = useState<number[]>([0])
  const [messages, setMessages] = useState<ChatMessage[]>([])

  useEffect(() => {
    const baseMessages: ChatMessage[] = [
      {
        type: 'intro',
        message: `${name}ちゃん、ねえ！ぼくといっしょにできたのげんせきをさがしにいこう！きょうはどんなことしようか？`,
        showCharacter: true,
      },
      {
        type: 'intro',
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
        type: 'intro',
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
        message: `${name}ちゃん、もうできるの？すごいね！そしたらこんなのはどう？（やること）`,
        showCharacter: true,
        nextStep: 7,
      },
      {
        type: 'intro',
        message:
          '（やること）なにごともやってみることがだいじ！がんばっているようすをこんどおしえてね！',
      },
    ]

    setMessages(baseMessages)
  }, [name])

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

  const handleSelection = useCallback((messageIndex: number) => {
    setStep(messageIndex)
    setDisplayedMessages((prev) => [...prev, messageIndex])
  }, [])

  return {
    step,
    displayedMessages,
    messages,
    handleNextStep,
    handleSelection,
  }
}
