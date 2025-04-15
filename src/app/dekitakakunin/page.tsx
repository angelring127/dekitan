'use client'
import { useState, useEffect, Suspense } from 'react'
import { Button } from '@/components/common/Button'
import Image from 'next/image'
import { TaskStatus } from '@/constants'
import { useSearchParams, useRouter } from 'next/navigation'
import { useGlobalStore } from '@/store/info'
import { updateTaskStatus } from '@/api/task'

// DekitaKakuninContent 컴포넌트로 분리하여 useSearchParams를 사용하는 부분을 Suspense로 감싸기
function DekitaKakuninContent() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [taskTitle, setTaskTitle] = useState<string>('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const taskId = searchParams.get('id') ? parseInt(searchParams.get('id') as string, 10) : null
  const playerId = useGlobalStore((state) => state.playerId)
  const getTaskById = useGlobalStore((state) => state.getTaskById)

  useEffect(() => {
    // 페이지 진입 시 currentIndex를 0으로 초기화
    setCurrentIndex(0)
    // localStorage에서 currentIndex 삭제
    localStorage.removeItem('currentIndex')
  }, [])

  useEffect(() => {
    if (currentIndex !== null) {
      localStorage.setItem('currentIndex', currentIndex.toString())
    }
  }, [currentIndex])

  // 태스크 정보 가져오기
  useEffect(() => {
    const fetchTaskInfo = async () => {
      if (!taskId || !playerId) {
        router.push('/room')
        return
      }

      try {
        // 스토어에서 태스크 정보 가져오기
        const task = getTaskById(taskId)
        if (task) {
          setTaskTitle(task.title)
        } else {
          // 스토어에 없는 경우 API 호출 (필요시 구현)
          // 예: const response = await getTaskInfo(taskId);
          // setTaskTitle(response.data.title);

          // 임시로 하드코딩된 값 사용
          setTaskTitle('おさらあらい')
        }
      } catch (error) {
        console.error('タスク情報を取得中にエラーが発生しました:', error)
      }
    }

    fetchTaskInfo()
  }, [taskId, playerId, router, getTaskById])

  const updateStatus = async () => {
    if (!taskId || !playerId) return

    try {
      await updateTaskStatus({
        player_id: playerId,
        task_id: taskId,
        status: TaskStatus.FINISHED,
      })

      // 상태 업데이트 후 dekita 페이지로 이동
      router.replace('/dekita')
    } catch (error) {
      console.error('태스크 상태 업데이트 중 오류가 발생했습니다:', error)
    }
  }

  if (currentIndex === null || !taskId) return null

  return (
    <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
      {currentIndex !== 0 && (
        <Image
          src="/images/img_character.png"
          alt="img_character"
          width={120}
          height={120}
          className="mt-20 w-full max-w-[120px] object-contain z-0"
        />
      )}

      {currentIndex === 0 && (
        <div className="relative min-h-auto pt-10 w-[320px] flex flex-col items-center bg-cyan-300 justify-center">
          <div className="relative m-5 p-4 common_panel_style justify-center w-[300px] font-bold mt-20 text-center border-20px rounded-[10px] z-10 shadow-xl">
            <span className="m-3">
              <h1 className="text-2xl font-bold text-red-500">{taskTitle}</h1>
              <br />
              <h1 className="text-2xl font-bold">できたかな？</h1>
            </span>
          </div>

          <Image
            src="/images/img_character.png"
            alt="img_character"
            width={120}
            height={120}
            className="absolute top-[100px] right-10 translate-x-1/2 -translate-y-1/2 z-0"
          />

          <Button
            variant="primary"
            className="text-lg w-full bg-white text-black font-bold rounded-l-full rounded-r-full mt-10"
            onClick={() => updateStatus()}
          >
            できた！
          </Button>
          <Button
            variant="primary"
            className="text-lg w-full bg-white text-black font-bold rounded-l-full rounded-r-full mt-10"
            onClick={() => setCurrentIndex(1)}
          >
            チャレンジ中
          </Button>
          <Button
            variant="primary"
            className="text-lg w-full bg-white text-black font-bold rounded-l-full rounded-r-full mt-10"
            onClick={() => setCurrentIndex(2)}
          >
            きょうはやってない
          </Button>
          <Button
            variant="primary"
            className="text-lg w-full bg-white text-black font-bold rounded-l-full rounded-r-full mt-10 mb-3"
            onClick={() => setCurrentIndex(3)}
          >
            ほかのことにする
          </Button>
        </div>
      )}

      {currentIndex === 1 && (
        <div className="flex flex-col mt-10 items-center">
          <h1 className="text-2xl font-bold">がんばって</h1>
          <br />
          <h1 className="text-2xl font-bold">つづけてね</h1>
          <Button
            variant="primary"
            className="text-3xl w-[200px] h-[80px] bg-blue-500 text-white font-bold rounded-full mt-10 mb-3"
            onClick={() => router.replace('/room')}
          >
            もどる
          </Button>
        </div>
      )}

      {currentIndex === 2 && (
        <div className="flex flex-col items-center  mt-10">
          <h1 className="text-2xl font-bold">わかった！、</h1>
          <br />
          <h1 className="text-2xl text-center font-bold">
            また今度 <br></br>チャレンジしてね
          </h1>
          <Button
            variant="primary"
            className="text-3xl w-[200px] h-[80px] bg-blue-500 text-white font-bold rounded-full mt-10 mb-3"
            onClick={() => setCurrentIndex(0)}
          >
            もどる
          </Button>
        </div>
      )}

      {currentIndex === 3 && (
        <div className="relative m-5 p-4 common_panel_style justify-center w-[300px] font-bold mt-20 text-center border-20px rounded-[10px] z-10">
          <span className="m-3">
            <h1 className="text-2xl font-bold text-black-500">
              [{taskTitle}]をやめて違うことにするの？
            </h1>
            <br />
            <div className="flex flex-row">
              <Button
                variant="primary"
                className="text-lg w-full bg-white text-black font-bold rounded-l-full rounded-r-full  mb-3"
                onClick={() => router.replace('/room')}
              >
                はい
              </Button>
              <Button
                variant="primary"
                className="text-lg w-full bg-white text-black font-bold rounded-l-full rounded-r-full mb-3"
                onClick={() => setCurrentIndex(0)}
              >
                いいえ
              </Button>
            </div>
          </span>
        </div>
      )}
    </div>
  )
}

// 로딩 상태를 표시할 컴포넌트
function LoadingFallback() {
  return (
    <div className="flex h-[844px] w-[390px] items-center justify-center">
      <div className="text-xl font-bold">로딩 중...</div>
    </div>
  )
}

// 메인 페이지 컴포넌트
export default function DekitaKakuninPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DekitaKakuninContent />
    </Suspense>
  )
}
