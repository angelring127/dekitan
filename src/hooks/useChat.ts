import { useState, useCallback, useEffect } from 'react'
import { ChatMessage } from '@/types/chat'
import { fetchChatMessages, formatChatMessages } from '@/api/chat'
import { useGlobalStore } from '@/store/info'
import { TASK_CHAT_SEQUENCE } from '@/constants'

export const useChat = () => {
  const { name } = useGlobalStore()
  const points = 0
  const [step, setStep] = useState(0)
  const [displayedMessages, setDisplayedMessages] = useState<number[]>([0])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadDynamicMessages = useCallback(async (sequence: number) => {
    try {
      const response = await fetchChatMessages(sequence)
      if (response.status_code === 2000) {
        const formattedMessages = formatChatMessages(response.data.messages)
        return formattedMessages
      }
      return []
    } catch (err) {
      console.error('Failed to fetch dynamic messages:', err)
      return []
    }
  }, [])

  useEffect(() => {
    const initializeMessages = async () => {
      if (points === 0) {
        try {
          const response = await fetchChatMessages(TASK_CHAT_SEQUENCE.FIRST_TIME.value)
          if (response.status_code === 2000) {
            const formattedMessages = formatChatMessages(response.data.messages)
            setMessages(formattedMessages)
          }
        } catch (err) {
          console.error('Failed to fetch initial messages:', err)
          setError('메시지를 불러오는데 실패했습니다.')
        }
      } else {
        const baseMessages = [
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

        // // （カテゴリー）와 （やること）가 포함된 메시지를 API에서 가져옴
        // const categoryMessages = await loadDynamicMessages(TASK_CHAT_SEQUENCE.CHOOSE_CATEGORY.value)
        // const taskMessages = await loadDynamicMessages(TASK_CHAT_SEQUENCE.CHOOSE_TASK.value)

        // // 동적 메시지로 교체
        // const finalMessages = baseMessages.map((msg) => {
        //   if (msg.message.includes('（カテゴリー）')) {
        //     return categoryMessages.find((m) => m.message.includes('（カテゴリー）')) || msg
        //   }
        //   if (msg.message.includes('（やること）')) {
        //     return taskMessages.find((m) => m.message.includes('（やること）')) || msg
        //   }
        //   return msg
        // })

        setMessages(finalMessages)
      }
    }

    initializeMessages()
  }, [points, name, loadDynamicMessages])

  const loadMessages = useCallback(async (sequence: number, category?: number) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetchChatMessages(sequence, category)

      if (response.status_code === 2000) {
        const formattedMessages = formatChatMessages(response.data.messages)
        setMessages((prev) => [...prev, ...formattedMessages])
        return response.data
      } else {
        throw new Error(response.message)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '메시지를 불러오는데 실패했습니다.'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleNextStep = useCallback(
    async (targetStep?: number) => {
      const nextStep = targetStep !== undefined ? targetStep : step + 1
      if (nextStep < messages.length) {
        setStep(nextStep)
        setDisplayedMessages((prev) => [...prev, nextStep])
      } else {
        try {
          const response = await loadMessages(step + 1)
          if (response.category) {
            await loadMessages(step + 2, response.category)
          }
        } catch (err) {
          console.error('Failed to fetch next messages:', err)
        }
      }
    },
    [step, messages.length, loadMessages]
  )

  const handleSelection = useCallback((messageIndex: number) => {
    setStep(messageIndex)
    setDisplayedMessages((prev) => [...prev, messageIndex])
  }, [])

  return {
    step,
    displayedMessages,
    messages,
    isLoading,
    error,
    loadMessages,
    handleNextStep,
    handleSelection,
  }
}
