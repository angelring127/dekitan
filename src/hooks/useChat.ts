import { useState, useCallback, useEffect, useRef } from 'react'
import { ChatMessage } from '@/types/chat'
import { useGlobalStore } from '@/store/info'
import type { GlobalState } from '@/types/info'
import {
  STAMP_IMAGE_HAI_KEY,
  STAMP_IMAGE_SUGOI_KEY,
  STAMP_IMAGE_WAKATTA_KEY,
} from '@/constants/hanasu'
import {
  fetchCategoryMessages,
  fetchTaskMessages,
  registerTaskEntry,
  fetchTaskEntryApprove,
} from '@/api/chat'

// ChatMessage 객체의 깊은 복사를 위한 유틸리티 함수
const deepCopyChatMessage = (message: ChatMessage): ChatMessage => {
  return {
    ...message,
    options: message.options
      ? message.options.map((option) => ({
          ...option,
          onClick: option.onClick, // 함수는 참조만 복사
        }))
      : undefined,
  }
}

export const useChat = () => {
  const { name } = useGlobalStore() as GlobalState
  const [step, setStep] = useState(0)
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  // messages 배열의 참조를 유지하기 위한 ref
  const messagesRef = useRef<ChatMessage[]>([])
  // category와 taskId 값을 ref로 관리
  const categoryRef = useRef<number | null>(null)
  const taskIdRef = useRef<number | undefined>(undefined)

  // API에서 카테고리 메시지를 가져오는 함수
  const fetchCategoryData = useCallback(async () => {
    try {
      setIsLoading(true)
      console.log('fetchCategoryData가呼び出されました')
      const response = await fetchCategoryMessages()

      console.log('APIレスポンス:', response)
      console.log('APIレスポンスのカテゴリー:', response.data.category)
      if (response.status === 2000 && response.data.messages.length > 0) {
        // カテゴリー情報を保存
        if (response.data.category) {
          console.log('カテゴリー情報を保存:', response.data.category)
          categoryRef.current = response.data.category
        } else {
          console.log('カテゴリー情報がありません。')
        }

        console.log('カテゴリーメッセージを返します:', response.data.messages[0])
        return response.data.messages[0]
      } else {
        console.error('APIレスポンスが正しくありません:', response)
        setError('APIレスポンスが正しくありません。')
        return null
      }
    } catch (err) {
      console.error('カテゴリーメッセージを取得中にエラーが発生しました。', err)
      setError('カテゴリーメッセージを取得中にエラーが発生しました。')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  // APIからタスクメッセージを取得する関数
  const fetchTaskData = useCallback(async () => {
    if (!categoryRef.current) {
      console.error('カテゴリー情報がありません。')
      return null
    }

    try {
      setIsLoading(true)
      console.log('fetchTaskDataが呼び出されました、カテゴリー:', categoryRef.current)
      const response = await fetchTaskMessages(categoryRef.current)

      console.log('APIレスポンス:', response)
      console.log('APIレスポンスのタスクID:', response.data.task_id)
      if (response.status === 2000 && response.data.messages.length > 0) {
        console.log('タスクメッセージを返します:', response.data.messages[0])
        if (response.data.task_id) {
          taskIdRef.current = response.data.task_id
        } else {
          console.log('タスクIDがありません。')
        }
        return response.data.messages[0]
      } else {
        console.error('APIレスポンスが正しくありません:', response)
        // setError('APIレスポンスが正しくありません。2')
        // エラー時のモックレスポンス
        console.log('モックタスクメッセージを使用します')
        return '逆立ち'
      }
    } catch (err) {
      console.error('タスクメッセージを取得中にエラーが発生しました。', err)
      setError('タスクメッセージを取得中にエラーが発生しました。')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateMessageWithApiData = useCallback(
    async (messageIndex: number) => {
      // 카테고리 메시지 업데이트 (인덱스 1, 2)
      if (messageIndex === 1 || messageIndex === 2) {
        try {
          const categoryMessage = await fetchCategoryData()
          if (categoryMessage) {
            const originalMessage = messagesRef.current[messageIndex]
            const updatedMessage = { ...originalMessage }

            if (messageIndex === 1) {
              updatedMessage.message = categoryMessage
            } else if (messageIndex === 2) {
              updatedMessage.message = `そうなんだ！じゃあ、${categoryMessage}`
            }

            setDisplayedMessages((prev) => [...prev, deepCopyChatMessage(updatedMessage)])
            return true
          }
        } catch (error) {
          console.error('カテゴリーデータの取得中にエラーが発生しました:', error)
          setDisplayedMessages((prev) => [
            ...prev,
            deepCopyChatMessage(messagesRef.current[messageIndex]),
          ])
          return true
        }
      }

      // 태스크 메시지 업데이트 (인덱스 7, 9, 12, 14)
      if (messageIndex === 7 || messageIndex === 9 || messageIndex === 12 || messageIndex === 14) {
        try {
          const taskMessage = await fetchTaskData()
          if (taskMessage) {
            const originalMessage = messagesRef.current[messageIndex]
            const updatedMessage = { ...originalMessage }
            updatedMessage.message = updatedMessage.message.replace('（やること）', taskMessage)

            if (messagesRef.current[8]) {
              messagesRef.current[8].title = taskMessage
            }
            if (messagesRef.current[10]) {
              messagesRef.current[10].title = taskMessage
            }

            setDisplayedMessages((prev) => [...prev, deepCopyChatMessage(updatedMessage)])
            return true
          }
        } catch (error) {
          console.error('タスクデータの取得中にエラーが発生しました:', error)
          setDisplayedMessages((prev) => [
            ...prev,
            deepCopyChatMessage(messagesRef.current[messageIndex]),
          ])
          return true
        }
      }

      // 태스크 등록 (인덱스 13)
      if (messageIndex === 13) {
        try {
          // category와 taskId 값을 ref에서 가져옵니다.
          const currentCategory = categoryRef.current
          const currentTaskId = taskIdRef.current

          console.log('현재 category:', currentCategory)
          console.log('현재 taskId:', currentTaskId)

          if (!currentCategory || !currentTaskId) {
            console.error('カテゴリーまたはタスクIDが設定されていません')
            return false
          }

          const response = await registerTaskEntry(currentCategory, currentTaskId)

          if (response.status === 2000) {
            console.log('タスク登録が成功しました')
            return true
          } else {
            console.error('タスク登録に失敗しました:', response.message)
            return false
          }
        } catch (error) {
          console.error('タスク登録中にエラーが発生しました:', error)
          return false
        }
      }

      return false
    },
    [fetchCategoryData, fetchTaskData]
  )

  const handleSelection = useCallback(
    async (messageIndex: number) => {
      console.log('handleSelection called with index:', messageIndex)
      setStep(messageIndex)

      const updated = await updateMessageWithApiData(messageIndex)
      if (!updated) {
        setDisplayedMessages((prev) => [
          ...prev,
          deepCopyChatMessage(messagesRef.current[messageIndex]),
        ])
      }
    },
    [updateMessageWithApiData]
  )

  const handleNextStep = useCallback(
    async (targetStep?: number) => {
      const nextStep = targetStep !== undefined ? targetStep : step + 1

      if (nextStep < messagesRef.current.length) {
        setStep(nextStep)
        const updated = await updateMessageWithApiData(nextStep)
        if (!updated) {
          setDisplayedMessages((prev) => [
            ...prev,
            deepCopyChatMessage(messagesRef.current[nextStep]),
          ])
        }
      }
    },
    [step, updateMessageWithApiData]
  )

  useEffect(() => {
    const initializeChat = async () => {
      try {
        setIsLoading(true)
        const response = await fetchTaskEntryApprove()

        if (response.data.result) {
          const baseMessages: ChatMessage[] = [
            {
              // 0
              type: 'intro',
              message: `${name}ちゃん、ねえ！ぼくといっしょにできたのげんせきをさがしにいこう！きょうはどんなことしようか？`,
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
              nextStep: 7,
            },
            {
              // 5
              type: 'intro',
              message: 'そうなんだ！',
              nextStep: 6,
            },
            {
              // 6
              type: 'intro',
              message: 'にがてなのにがんばってえらいね！',
            },
            {
              // 7
              type: 'intro',
              message: 'じゃあ、こんなことできるかな？（やること）',
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
              nextStep: 12,
            },
            {
              // 12
              type: 'intro',
              message: `${name}ちゃん、もうできるの？すごいね！そしたらこんなのはどう？（やること）`,
              nextStep: 8,
            },
            {
              // 13
              type: 'stamp',
              message: STAMP_IMAGE_HAI_KEY,
              nextStep: 14,
            },
            {
              // 14
              type: 'end',
              message:
                '（やること）なにごともやってみることがだいじ！がんばっているようすをこんどおしえてね！',
            },
          ]

          console.log('初期メッセージ設定:', baseMessages)
          setMessages(baseMessages)
          messagesRef.current = baseMessages
          console.log('初期displayedMessages設定:', [baseMessages[0]])
          setDisplayedMessages([deepCopyChatMessage(baseMessages[0])])
          setIsInitialized(true)
        } else {
          // fetchTaskEntryApprove에서 status가 2000이 아닐 때만 "今日はもうできない" 메시지를 표시
          const endMessage: ChatMessage = {
            type: 'end',
            message: '今日はもうできない',
          }
          setMessages([endMessage])
          messagesRef.current = [endMessage]
          setDisplayedMessages([deepCopyChatMessage(endMessage)])
          setIsInitialized(true)
        }
      } catch (err) {
        console.error('タスクの進行可否確認中にエラーが発生しました:', err)
        setError('タスクの進行可否確認中にエラーが発生しました。')
      } finally {
        setIsLoading(false)
      }
    }

    if (!isInitialized) {
      initializeChat()
    }
  }, [name, isInitialized])

  return {
    step,
    displayedMessages,
    messages,
    error,
    isLoading,
    isInitialized,
    handleNextStep,
    handleSelection,
  }
}
