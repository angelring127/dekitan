'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/common/Button'
import Card from '@/components/common/Card'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { logout } from '@/api/auth'
import { getTasks, Task } from '@/api/task'
import { useGlobalStore } from '@/store/info'

const RoomPage = () => {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const playerId = useGlobalStore((state) => state.playerId)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true)

        if (!playerId) {
          console.error('プレイヤーIDが見つかりません')
          return
        }

        const response = await getTasks({
          player_id: playerId,
        })

        console.log(response)
        if (response.status === 2000) {
          setTasks(response.data.list)
          useGlobalStore.getState().setTasks(response.data.list)
        } else {
          console.error(`エラーが発生しました: ${response.message}`)
        }
      } catch (err) {
        console.error('タスクの取得に失敗しました:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [playerId])

  const handleHanasuClick = () => {
    router.push('/hanasu')
  }

  const handleLogout = async () => {
    const success = await logout()
    if (success) {
      router.push('/login')
    }
  }

  const handleTaskClick = (taskId: number) => {
    router.push(`/dekitakakunin?id=${taskId}`)
  }

  return (
    <div className="relative flex w-full flex-col bg-white text-black h-[1500px]">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0">
          <Image
            src="/images/room/bg_dekitan_home.png"
            alt="実験室背景"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>

      {/* 포인트 표시 영역 */}
      <div className="relative z-10 flex items-center gap-3 p-4 pb-[15px]">
        <div className="flex gap-2 flex-1">
          <div className="relative w-[140px]">
            <Image
              src="/images/room/point_frame_now.png"
              alt="今のポイント背景"
              width={160}
              height={50}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 flex items-end justify-center pb-1">
              <p className="text-lg font-bold text-emerald-600">102 ポイント</p>
            </div>
          </div>
          <div className="relative w-[140px]">
            <Image
              src="/images/room/point_frame_all.png"
              alt="これまでのポイント背景"
              width={160}
              height={50}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 flex items-end justify-center pb-1">
              <p className="text-lg font-bold text-emerald-600">200 ポイント</p>
            </div>
          </div>
        </div>
        <button
          className="w-[75px] h-[75px] transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg"
          onClick={handleLogout}
          aria-label="ログアウト"
        >
          <Image
            src="/images/room/invent_icon_shadow.png"
            alt="ログアウトアイコン"
            width={85}
            height={85}
            className="w-full h-auto"
          />
        </button>
      </div>

      {/* 실험실 영역 */}
      <div className="relative z-10 h-[640px] w-full">
        <div className="absolute inset-0 flex flex-col items-center justify-between py-[15px]">
          {/* 발명 버튼 */}
          <div className="relative z-10 w-[95%] px-4"></div>
          {/* 캐릭터 이미지 */}
          <div className="flex justify-center">
            <Image
              src="/images/room/animA1_zlib.png"
              alt="キャラクター"
              width={160}
              height={160}
              className="mb-[-60px] object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="relative z-10 px-4 space-y-3 pb-20">
        <div className="pt-[20px]">
          <button
            className="relative w-[300px] mx-auto block transition-transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-lg"
            onClick={() => {}}
            aria-label="ハッピーテーマ"
          >
            <Image
              src="/images/room/happy_theme_button.png"
              alt="ハッピーテーマ背景"
              width={300}
              height={60}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 flex items-end justify-center pb-4">
              <p className="text-xl font-black text-black">空にあるもの</p>
            </div>
          </button>
          <div className="pt-3 w-[300px] mx-auto">
            <Button
              variant="secondary"
              className="w-full h-12 text-xl font-bold rounded-full bg-[#e40075] text-white hover:bg-[#e40075]/90 shadow-[4px_4px_0_0_rgba(0,0,0,0.25)]"
              onClick={() => {
                router.push('/unapproved')
              }}
            >
              未承認リスト
            </Button>
          </div>
        </div>
      </div>

      {/* 카드 영역 */}
      <div className="relative z-10 px-4 space-y-3">
        <div className="w-[85%] mx-auto space-y-3">
          <Card
            variant="text"
            headerText="できたんと話す"
            headerColor="red"
            bodyText=""
            className="w-full shadow-[0_4px_0_0_rgba(0,0,0,0.25)]"
            headerClassName="text-xl font-bold text-black text-center"
          >
            <div className="bg-white py-4 px-4 flex justify-center">
              <button
                onClick={handleHanasuClick}
                className="transition-transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg"
                aria-label="できたんと話す"
              >
                <Image
                  src="/images/icons/plus_icon_g.png"
                  alt="プラスアイコン"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </button>
            </div>
          </Card>

          {/* できたリスト 표시 */}
          {isLoading ? (
            <div className="text-center py-4">
              <p className="text-lg">読み込み中...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-lg">タスクがありません</p>
            </div>
          ) : (
            tasks.map((task) => (
              <Card
                key={task.id}
                variant="text"
                headerText="できた？"
                headerColor="green"
                bodyText={task.title}
                className="w-full shadow-[0_4px_0_0_rgba(0,0,0,0.25)] cursor-pointer hover:shadow-lg transition-shadow"
                headerClassName="text-xl font-bold text-white text-center"
                onClick={() => handleTaskClick(task.id)}
              >
                <div className="bg-white py-4 px-4">
                  <p className="text-3xl font-bold text-center">{task.title}</p>
                  <p className="text-sm text-gray-500 text-center mt-2">
                    {new Date(task.updated_at).toLocaleString('ja-JP')}
                  </p>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* 아이콘 버튼 영역 */}
      <div className="relative z-10 px-4 pt-6">
        <div className="w-[85%] mx-auto">
          <div className="grid grid-cols-4 gap-2">
            {/* はつめいする */}
            <button className="flex flex-col items-center gap-1" onClick={() => {router.push('/award/exchange')}}>
              <div className="w-[75px] h-[75px] transition-transform hover:scale-105 active:scale-95">
                <Image
                  src="/images/icons/invent_maru_icon.png"
                  alt="はつめいする"
                  width={75}
                  height={75}
                  className="w-full h-auto"
                />
              </div>
              <span className="text-sm font-bold">はつめいする</span>
            </button>

            {/* できたカレンダー */}
            <button className="flex flex-col items-center gap-1">
              <div className="w-[75px] h-[75px] transition-transform hover:scale-105 active:scale-95">
                <Image
                  src="/images/icons/calendar_maru_icon.png"
                  alt="できたカレンダー"
                  width={75}
                  height={75}
                  className="w-full h-auto"
                />
              </div>
              <span className="text-sm font-bold">できたカレンダー</span>
            </button>

            {/* コレクションをみる */}
            <button className="flex flex-col items-center gap-1" onClick={() => {router.push('/award/collect')}}>
              <div className="w-[75px] h-[75px] transition-transform hover:scale-105 active:scale-95">
                <Image
                  src="/images/icons/collection_maru_icon.png"
                  alt="コレクションをみる"
                  width={75}
                  height={75}
                  className="w-full h-auto"
                />
              </div>
              <span className="text-sm font-bold">コレクション</span>
            </button>

            {/* まだリスト */}
            <button className="flex flex-col items-center gap-1">
              <div className="w-[75px] h-[75px] transition-transform hover:scale-105 active:scale-95">
                <Image
                  src="/images/icons/list_maru_icon.png"
                  alt="まだリスト"
                  width={75}
                  height={75}
                  className="w-full h-auto"
                />
              </div>
              <span className="text-sm font-bold">まだリスト</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProtectedRoomPage() {
  return (
    <ProtectedRoute>
      <RoomPage />
    </ProtectedRoute>
  )
}
