import { useState, useCallback, useEffect, useRef } from 'react'
import { ChatMessage } from '@/types/chat'
import { useGlobalStore } from '@/store/info'
import type { GlobalState } from '@/types/info'
import {
  STAMP_IMAGE_HAI_KEY,
  STAMP_IMAGE_SUGOI_KEY,
  STAMP_IMAGE_WAKATTA_KEY,
} from '@/constants/hanasu'
import { fetchCategoryMessages, fetchTaskMessages } from '@/api/chat'

export const useChat = () => {
  const { name } = useGlobalStore() as GlobalState
  const [step, setStep] = useState(0)
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  // messages 배열의 참조를 유지하기 위한 ref
  const messagesRef = useRef<ChatMessage[]>([])

  // API에서 카테고리 메시지를 가져오는 함수
  const fetchCategoryData = useCallback(async () => {
    try {
      setIsLoading(true)
      console.log('fetchCategoryData가呼び出されました')
      const response = await fetchCategoryMessages()

      console.log('APIレスポンス:', response)
      if (response.status === 2000 && response.data.messages.length > 0) {
        // カテゴリー情報を保存
        if (response.data.category) {
          console.log('カテゴリー情報を保存:', response.data.category)
          setCategory(response.data.category)
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
    if (!category) {
      console.error('カテゴリー情報がありません。')
      return null
    }

    try {
      setIsLoading(true)
      console.log('fetchTaskDataが呼び出されました、カテゴリー:', category)
      const response = await fetchTaskMessages(category)

      console.log('APIレスポンス:', response)
      if (response.status === 2000 && response.data.messages.length > 0) {
        console.log('タスクメッセージを返します:', response.data.messages[0])
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
  }, [category])

  const handleSelection = useCallback(
    async (messageIndex: number) => {
      console.log('handleSelection called with index:', messageIndex)
      setStep(messageIndex)

      // インデックス1または2に移動する場合、APIからカテゴリーメッセージを取得します。
      if (messageIndex === 1 || messageIndex === 2) {
        console.log('インデックスのカテゴリーデータを取得中:', messageIndex)
        try {
          const categoryMessage = await fetchCategoryData()
          console.log('カテゴリーメッセージを受信:', categoryMessage)

          if (categoryMessage) {
            // messagesRefから元のメッセージを取得
            const originalMessage = messagesRef.current[messageIndex]
            console.log('参照からの元のメッセージ:', originalMessage)
            const updatedMessage = { ...originalMessage }

            if (messageIndex === 1) {
              updatedMessage.message = categoryMessage
            } else if (messageIndex === 2) {
              updatedMessage.message = `そうなんだ！じゃあ、${categoryMessage}`
            }

            console.log('表示する更新されたメッセージ:', updatedMessage)
            // 更新されたメッセージをdisplayedMessagesに追加
            setDisplayedMessages((prev) => [...prev, updatedMessage])
            return
          }
        } catch (error) {
          console.error('カテゴリーデータの取得中にエラーが発生しました:', error)
          // API通信失敗時に元のメッセージを追加
          setDisplayedMessages((prev) => [...prev, messagesRef.current[messageIndex]])
          return
        }
      }

      // インデックス7または9に移動する場合、APIからタスクメッセージを取得して（やること）を更新します。
      if (messageIndex === 7 || messageIndex === 9) {
        console.log('インデックスのタスクデータを取得中（やること用）:', messageIndex)
        try {
          const taskMessage = await fetchTaskData()
          console.log('タスクメッセージを受信（やること用）:', taskMessage)

          if (taskMessage) {
            // messagesRefから元のメッセージを取得
            const originalMessage = messagesRef.current[messageIndex]
            console.log('参照からの元のメッセージ:', originalMessage)
            const updatedMessage = { ...originalMessage }

            // タスクメッセージで（やること）を更新
            updatedMessage.message = updatedMessage.message.replace('（やること）', taskMessage)

            console.log('表示する更新されたメッセージ（やること更新）:', updatedMessage)
            // 更新されたメッセージをdisplayedMessagesに追加
            setDisplayedMessages((prev) => [...prev, updatedMessage])
            return
          }
        } catch (error) {
          console.error('タスクデータの取得中にエラーが発生しました（やること用）:', error)
          // API通信失敗時に元のメッセージを追加
          setDisplayedMessages((prev) => [...prev, messagesRef.current[messageIndex]])
          return
        }
      }

      // インデックス8または10に移動する場合、APIからタスクメッセージを取得してtitleに設定します。
      if (messageIndex === 8 || messageIndex === 10) {
        console.log('インデックスのタスクデータを取得中（title用）:', messageIndex)
        try {
          const taskMessage = await fetchTaskData()
          console.log('タスクメッセージを受信（title用）:', taskMessage)

          if (taskMessage) {
            // messagesRefから元のメッセージを取得
            const originalMessage = messagesRef.current[messageIndex]
            console.log('参照からの元のメッセージ:', originalMessage)
            const updatedMessage = { ...originalMessage }

            // タスクメッセージでtitleを更新
            updatedMessage.title = taskMessage

            console.log('表示する更新されたメッセージ（title更新）:', updatedMessage)
            // 更新されたメッセージをdisplayedMessagesに追加
            setDisplayedMessages((prev) => [...prev, updatedMessage])
            return
          }
        } catch (error) {
          console.error('タスクデータの取得中にエラーが発生しました（title用）:', error)
          // API通信失敗時に元のメッセージを追加
          setDisplayedMessages((prev) => [...prev, messagesRef.current[messageIndex]])
          return
        }
      }

      // インデックス12または14に移動する場合、APIからタスクメッセージを取得して（やること）を更新します。
      if (messageIndex === 12 || messageIndex === 14) {
        console.log('インデックスのタスクデータを取得中（やること用）:', messageIndex)
        try {
          const taskMessage = await fetchTaskData()
          console.log('タスクメッセージを受信（やること用）:', taskMessage)

          if (taskMessage) {
            // messagesRefから元のメッセージを取得
            const originalMessage = messagesRef.current[messageIndex]
            console.log('参照からの元のメッセージ:', originalMessage)
            const updatedMessage = { ...originalMessage }

            // タスクメッセージで（やること）を更新
            updatedMessage.message = updatedMessage.message.replace('（やること）', taskMessage)

            console.log('表示する更新されたメッセージ（やること更新）:', updatedMessage)
            // 更新されたメッセージをdisplayedMessagesに追加
            setDisplayedMessages((prev) => [...prev, updatedMessage])
            return
          }
        } catch (error) {
          console.error('タスクデータの取得中にエラーが発生しました（やること用）:', error)
          // API通信失敗時に元のメッセージを追加
          setDisplayedMessages((prev) => [...prev, messagesRef.current[messageIndex]])
          return
        }
      }

      // API通信が失敗した場合、またはインデックスが1、2、7、9、8、10、12、14でない場合、元のメッセージを追加
      console.log('インデックスの元のメッセージを追加中:', messageIndex)
      setDisplayedMessages((prev) => [...prev, messagesRef.current[messageIndex]])
    },
    [fetchCategoryData, fetchTaskData]
  )

  useEffect(() => {
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
        message: 'にがてなのにがんばるね！',
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
    // messagesRefにも同じメッセージを設定
    messagesRef.current = baseMessages
    // 初期メッセージを追加
    console.log('初期displayedMessages設定:', [baseMessages[0]])
    setDisplayedMessages([baseMessages[0]])
  }, [name])

  const handleNextStep = useCallback(
    async (targetStep?: number) => {
      const nextStep = targetStep !== undefined ? targetStep : step + 1

      if (nextStep < messagesRef.current.length) {
        setStep(nextStep)

        // 次のステップが1または2の場合、APIからカテゴリーメッセージを取得します。
        if (nextStep === 1 || nextStep === 2) {
          console.log('nextStepのカテゴリーデータを取得中:', nextStep)
          try {
            const categoryMessage = await fetchCategoryData()
            console.log('カテゴリーメッセージを受信:', categoryMessage)

            if (categoryMessage) {
              // messagesRefから元のメッセージを取得
              const originalMessage = messagesRef.current[nextStep]
              console.log('参照からの元のメッセージ:', originalMessage)
              const updatedMessage = { ...originalMessage }

              if (nextStep === 1) {
                updatedMessage.message = categoryMessage
              } else if (nextStep === 2) {
                updatedMessage.message = `そうなんだ！じゃあ、${categoryMessage}`
              }

              console.log('表示する更新されたメッセージ:', updatedMessage)
              // 更新されたメッセージをdisplayedMessagesに追加
              setDisplayedMessages((prev) => [...prev, updatedMessage])
              return
            }
          } catch (error) {
            console.error('カテゴリーデータの取得中にエラーが発生しました:', error)
            // API通信失敗時に元のメッセージを追加
            setDisplayedMessages((prev) => [...prev, messagesRef.current[nextStep]])
            return
          }
        }

        // 次のステップが7または9の場合、APIからタスクメッセージを取得して（やること）を更新します。
        if (nextStep === 7 || nextStep === 9) {
          console.log('nextStepのタスクデータを取得中（やること用）:', nextStep)
          try {
            const taskMessage = await fetchTaskData()
            console.log('タスクメッセージを受信（やること用）:', taskMessage)

            if (taskMessage) {
              // messagesRefから元のメッセージを取得
              const originalMessage = messagesRef.current[nextStep]
              console.log('参照からの元のメッセージ:', originalMessage)
              const updatedMessage = { ...originalMessage }

              // タスクメッセージで（やること）を更新
              updatedMessage.message = updatedMessage.message.replace('（やること）', taskMessage)

              console.log('表示する更新されたメッセージ（やること更新）:', updatedMessage)
              // 更新されたメッセージをdisplayedMessagesに追加
              setDisplayedMessages((prev) => [...prev, updatedMessage])
              return
            }
          } catch (error) {
            console.error('タスクデータの取得中にエラーが発生しました（やること用）:', error)
            // API通信失敗時に元のメッセージを追加
            setDisplayedMessages((prev) => [...prev, messagesRef.current[nextStep]])
            return
          }
        }

        // 次のステップが8または10の場合、APIからタスクメッセージを取得してtitleに設定します。
        if (nextStep === 8 || nextStep === 10) {
          console.log('nextStepのタスクデータを取得中（title用）:', nextStep)
          try {
            const taskMessage = await fetchTaskData()
            console.log('タスクメッセージを受信（title用）:', taskMessage)

            if (taskMessage) {
              // messagesRefから元のメッセージを取得
              const originalMessage = messagesRef.current[nextStep]
              console.log('参照からの元のメッセージ:', originalMessage)
              const updatedMessage = { ...originalMessage }

              // タスクメッセージでtitleを更新
              updatedMessage.title = taskMessage

              console.log('表示する更新されたメッセージ（title更新）:', updatedMessage)
              // 更新されたメッセージをdisplayedMessagesに追加
              setDisplayedMessages((prev) => [...prev, updatedMessage])
              return
            }
          } catch (error) {
            console.error('タスクデータの取得中にエラーが発生しました（title用）:', error)
            // API通信失敗時に元のメッセージを追加
            setDisplayedMessages((prev) => [...prev, messagesRef.current[nextStep]])
            return
          }
        }

        // 次のステップが12または14の場合、APIからタスクメッセージを取得して（やること）を更新します。
        if (nextStep === 12 || nextStep === 14) {
          console.log('nextStepのタスクデータを取得中（やること用）:', nextStep)
          try {
            const taskMessage = await fetchTaskData()
            console.log('タスクメッセージを受信（やること用）:', taskMessage)

            if (taskMessage) {
              // messagesRefから元のメッセージを取得
              const originalMessage = messagesRef.current[nextStep]
              console.log('参照からの元のメッセージ:', originalMessage)
              const updatedMessage = { ...originalMessage }

              // タスクメッセージで（やること）を更新
              updatedMessage.message = updatedMessage.message.replace('（やること）', taskMessage)

              console.log('表示する更新されたメッセージ（やること更新）:', updatedMessage)
              // 更新されたメッセージをdisplayedMessagesに追加
              setDisplayedMessages((prev) => [...prev, updatedMessage])
              return
            }
          } catch (error) {
            console.error('タスクデータの取得中にエラーが発生しました（やること用）:', error)
            // API通信失敗時に元のメッセージを追加
            setDisplayedMessages((prev) => [...prev, messagesRef.current[nextStep]])
            return
          }
        }

        // API通信が失敗した場合、またはインデックスが1、2、7、9、8、10、12、14でない場合、元のメッセージを追加
        console.log('nextStepの元のメッセージを追加中:', nextStep)
        setDisplayedMessages((prev) => [...prev, messagesRef.current[nextStep]])
      }
    },
    [step, fetchCategoryData, fetchTaskData]
  )

  return {
    step,
    displayedMessages,
    messages,
    error,
    category,
    isLoading,
    handleNextStep,
    handleSelection,
  }
}
