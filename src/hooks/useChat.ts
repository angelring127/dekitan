import { useState, useCallback, useEffect, useRef } from 'react'
import { ChatMessage } from '@/types/chat'
import { useGlobalStore } from '@/store/info'
import type { GlobalState } from '@/types/info'
import {
  STAMP_IMAGE_HAI_KEY,
  STAMP_IMAGE_SUGOI_KEY,
  STAMP_IMAGE_WAKATTA_KEY,
  TASK_CHAT_SEQUENCE,
} from '@/constants/hanasu'
import {
  fetchCategoryMessages,
  fetchTaskMessages,
  registerTaskEntry,
  fetchTaskEntryApprove,
  fetchChatMessages,
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
  const { name, total_point, tasks } = useGlobalStore() as GlobalState
  const getHonorific = useGlobalStore((state) => state.getHonorific)
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
  const taskMessageRef = useRef<string | undefined>(undefined)
  // API 호출 상태를 추적하기 위한 ref
  const isRegisteringRef = useRef<boolean>(false)

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
          taskMessageRef.current = response.data.messages[0]
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
      if (messageIndex === 12) {
        try {
          // 이미 등록 진행 중인 경우 중복 호출 방지
          if (isRegisteringRef.current) {
            console.log('タスク登録が既に進行中です')
          } else {
            // category와 taskId 값을 ref에서 가져옵니다.
            const currentCategory = categoryRef.current
            const currentTaskId = taskIdRef.current

            console.log('현재 category:', currentCategory)
            console.log('현재 taskId:', currentTaskId)

            if (!currentCategory || !currentTaskId) {
              console.error('カテゴリーまたはタスクIDが設定されていません')
              return false
            }

            // API 호출 시작 전 상태 설정
            isRegisteringRef.current = true

            const response = await registerTaskEntry(currentCategory, currentTaskId)

            if (response.status === 2000) {
              console.log('タスク登録が成功しました')
            } else {
              console.error('タスク登録に失敗しました:', response.message)
              return false
            }
          }
        } catch (error) {
          console.error('タスク登録中にエラーが発生しました:', error)
          return false
        } finally {
          // API 호출 완료 후 상태 초기화
          isRegisteringRef.current = false
        }
      }

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

      // 태스크 메시지 업데이트 (인덱스 6, 9, 13)
      if (messageIndex === 6 || messageIndex === 9 || messageIndex === 13) {
        try {
          const taskMessage = await fetchTaskData()
          if (taskMessage) {
            const originalMessage = messagesRef.current[messageIndex]
            const updatedMessage = { ...originalMessage }
            updatedMessage.message = updatedMessage.message.replace('（やること）', taskMessage)

            if (messagesRef.current[7]) {
              messagesRef.current[7].title = taskMessage
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

      if (messageIndex === 14) {
        const taskMessage = taskMessageRef.current
        if (!taskMessage) {
          console.error('タスクメッセージが未定義です。先に取得されていない可能性があります。')
          return false
        }

        const originalMessage = messagesRef.current[messageIndex]
        const updatedMessage = { ...originalMessage }
        updatedMessage.message = updatedMessage.message.replace('（やること）', taskMessage)

        setDisplayedMessages((prev) => [...prev, deepCopyChatMessage(updatedMessage)])
        return true
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
              message: `${name}${getHonorific()}、ねえ！ぼくといっしょにできたのげんせきをさがしにいこう！きょうはどんなことしようか？`,
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
                  label: 'すき',
                  value: 'like',
                  onClick: () => handleSelection(6),
                },
                {
                  label: 'にがてだけどやってみる',
                  value: 'dontlike_but_try',
                  onClick: () => handleSelection(5),
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
              type: 'intro',
              message: 'そうなんだ！',
              nextStep: 5,
            },
            {
              // 5
              type: 'intro',
              message: 'にがてなのにがんばってえらいね！',
            },
            {
              // 6
              type: 'intro',
              message: 'じゃあ、こんなことできるかな？（やること）',
            },
            {
              // 7
              type: 'selection',
              message: '',
              title: 'さかあがり',
              direction: 'right',
              options: [
                {
                  label: 'やってみる',
                  value: 'try',
                  onClick: () => handleSelection(12),
                },
                {
                  label: 'ちがうことにする',
                  value: 'different',
                  onClick: () => handleSelection(8),
                },
                {
                  label: 'できる',
                  value: 'can',
                  onClick: () => handleSelection(11),
                },
              ],
            },
            {
              // 8
              type: 'stamp',
              message: STAMP_IMAGE_WAKATTA_KEY,
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
                  onClick: () => handleSelection(12),
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
              nextStep: 13,
            },
            {
              // 12
              type: 'stamp',
              message: STAMP_IMAGE_HAI_KEY,
              nextStep: 14,
            },
            {
              // 13
              type: 'intro',
              message: `${name}ちゃん、もうできるの？すごいね！そしたらこんなのはどう？（やること）`,
              nextStep: 7,
            },
            {
              // 14
              type: 'end',
              message:
                '（やること）<br>なにごともやってみることがだいじ！<br>がんばっているようすをこんどおしえてね！',
            },
          ]

          console.log('初期メッセージ設定:', baseMessages)
          setMessages(baseMessages)
          messagesRef.current = baseMessages

          // total_point가 0인 경우 FIRST_TIME 시퀀스의 메시지를 가져옵니다
          if (total_point === 0 && tasks.length === 0) {
            try {
              const firstTimeResponse = await fetchChatMessages(TASK_CHAT_SEQUENCE.FIRST_TIME.value)
              if (firstTimeResponse.status === 2000 && firstTimeResponse.data.messages.length > 0) {
                // 첫 번째 메시지를 API 응답으로 대체합니다
                const firstTimeMessage = firstTimeResponse.data.messages[0]
                baseMessages[0].message = `${name}${getHonorific()}<br>${firstTimeMessage}`
                console.log('初回メッセージを設定:', firstTimeMessage)
              }
            } catch (err) {
              console.error('初回メッセージの取得中にエラーが発生しました:', err)
              // 에러가 발생해도 기본 메시지를 사용합니다
            }
          }

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
  }, [name, isInitialized, total_point])

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
