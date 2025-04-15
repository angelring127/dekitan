'use client'

import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { InformationPanel } from '@/components/common/InformationPanel'
import type { InformationItem } from '@/components/common/InformationPanel/types'
import { useGlobalStore } from '@/store/info'
import { Button } from '@/components/common/Button'
import { getTasks, addPoint } from '@/api/task'
import { TaskStatus } from '@/constants'
import { checkSpecialPoint } from '@/api/task'

function DekitaContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [showStamp, setShowStamp] = useState(false)
  const [showEffect, setShowEffect] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [effectPosition, setEffectPosition] = useState('translate-y-[40%]')
  const [showNewCharacter, setShowNewCharacter] = useState(false)
  const [showSmokeEffect, setShowSmokeEffect] = useState(false)
  const [showJewelry, setShowJewelry] = useState(false)
  const [showLight, setShowLight] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [showEvaluationButtons, setShowEvaluationButtons] = useState(false)
  const [canGiveSpecialPoint, setCanGiveSpecialPoint] = useState(false)
  const [taskData, setTaskData] = useState<{
    title: string
    point: number
    kind: number
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showPointText, setShowPointText] = useState(false)
  const [showPointCharacter, setShowPointCharacter] = useState(false)
  const [currentPoint, setCurrentPoint] = useState<number>(0)
  const [jewelryAnimation, setJewelryAnimation] = useState(false)
  const [jewelryPosition, setJewelryPosition] = useState({ x: 0, y: 0 })
  const [jewelryScale, setJewelryScale] = useState(1)

  // useGlobalStore에서 name과 getHonorific 함수를 가져옵니다
  const name = useGlobalStore((state) => state.name)
  const getHonorific = useGlobalStore((state) => state.getHonorific)
  const playerId = useGlobalStore((state) => state.playerId)

  // URL에서 task_id를 가져옵니다
  const taskId = searchParams.get('id')

  // task_id가 없거나 playerId가 없는 경우 room으로 리다이렉트
  useEffect(() => {
    if (!taskId || !playerId) {
      router.replace('/room')
      return
    }

    const fetchData = async () => {
      try {
        setIsLoading(true)
        // 태스크 데이터 가져오기
        const taskResponse = await getTasks({
          player_id: playerId,
          status: TaskStatus.FINISHED,
        })

        // 특별 포인트 부여 가능 여부 확인
        const specialPointResponse = await checkSpecialPoint({
          player_id: playerId,
        })

        if (specialPointResponse.status === 2000) {
          setCanGiveSpecialPoint(specialPointResponse.data.result)
        }

        if (taskResponse.status === 2000) {
          // taskId와 일치하는 항목을 찾습니다
          const task = taskResponse.data.list.find((task) => task.id === parseInt(taskId, 10))

          if (task) {
            // task 정보를 설정합니다
            setTaskData({
              title: task.title,
              point: 0, // API에서 point 정보가 없으므로 임시로 0으로 설정
              kind: 0, // API에서 kind 정보가 없으므로 임시로 0으로 설정
            })
          } else {
            // taskId와 일치하는 항목이 없는 경우 에러 메시지를 표시하고 room으로 리다이렉트
            setError('タスクが見つかりませんでした')
            setTimeout(() => {
              router.replace('/room')
            }, 3000)
          }
        } else {
          setError('タスク情報の取得に失敗しました')
          setTimeout(() => {
            router.replace('/room')
          }, 3000)
        }
      } catch (error) {
        console.error('데이터 로드 중 에러 발생:', error)
        setError('タスク情報の取得中にエラーが発生しました')
        setTimeout(() => {
          router.replace('/room')
        }, 3000)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [taskId, playerId, router])

  // 동적으로 메시지 내용을 생성합니다
  const messages: InformationItem[] = [
    {
      id: 'message1',
      content: `${name}${getHonorific()}、<br>できたんだね！すごい<br>すごーい！`,
    },
    {
      id: 'message2',
      content: 'できたの原石をみつけたよ。<br>おうちの人にもみせて<br>原石をゲットしよう!',
    },
    {
      id: 'message3',
      content: `ねぇ、ねぇ! <br> こうきくん「${taskData?.title || ''}」が <br>できたんだよ!すごいよね!`,
    },
  ]

  useEffect(() => {
    const imageUrls = [
      '/images/dekita/bg_landscape.png',
      '/images/dekita/GJ_stamp_mono.png',
      '/images/dekita/animC2_dekitan.png',
      '/images/dekita/animC2eff_stamp.png',
    ]

    let loadedCount = 0
    const totalImages = imageUrls.length

    imageUrls.forEach((url) => {
      const img = new window.Image()
      img.src = url
      img.onload = () => {
        loadedCount++
        if (loadedCount === totalImages) {
          setImagesLoaded(true)
        }
      }
    })
  }, [])

  useEffect(() => {
    if (imagesLoaded && !animationComplete && !isLoading) {
      const timer1 = setTimeout(() => setShowStamp(true), 500)
      const timer2 = setTimeout(() => setShowEffect(true), 2000)
      const timer3 = setTimeout(() => {
        setShowMessage(true)
        setAnimationComplete(true)
        setEffectPosition('translate-y-[25%]')
      }, 3000)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    }
  }, [imagesLoaded, animationComplete, isLoading])

  useEffect(() => {
    if (showEffect && !animationComplete) {
      const timer = setTimeout(() => {
        setEffectPosition('translate-y-[25%]')
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [showEffect, animationComplete])

  const handleNextMessage = () => {
    console.log('handleNextMessage called, currentMessageIndex:', currentMessageIndex)

    // 첫 번째 메시지에서 다음으로 넘어갈 때
    if (currentMessageIndex === 0) {
      setCurrentMessageIndex(1)
      setShowEffect(false)
      setShowStamp(false)
      setShowNewCharacter(true)
      setShowSmokeEffect(true)

      // 연기 이펙트가 거의 끝나기 직전에 보석 표시
      setTimeout(() => {
        setShowJewelry(true)
        setShowLight(true)
      }, 200)
    }
    // 두 번째 메시지에서 다음으로 넘어갈 때
    else if (currentMessageIndex === 1) {
      console.log('두 번째 메시지에서 次へ 버튼 클릭')
      setShowMessage(false)
      setShowButtons(true)
    }
  }

  const handleShowMessage = () => {
    console.log('みてもらう 버튼 클릭')
    setShowMessage(true)
    setShowButtons(false)
    setCurrentMessageIndex(2)
  }

  const handleNextAfterMessage = () => {
    console.log('마지막 메시지에서 次へ 버튼 클릭')
    setShowMessage(false)
    setShowNewCharacter(false)
    setShowEvaluationButtons(true)
  }

  const handleEvaluation = async (points: number) => {
    try {
      if (!taskId || !playerId) return

      const response = await addPoint({
        player_id: playerId,
        task_id: parseInt(taskId, 10),
        point: points,
      })

      // 성공 시 애니메이션 시작
      if (response.status === 2000) {
        // 평가 버튼 그룹 비표시
        setShowEvaluationButtons(false)
        setCurrentPoint(points)

        // 보석 이미지 변경
        setTimeout(() => {
          setShowJewelry(true)
        }, 100)

        // 포인트 텍스트 표시
        setShowPointText(true)

        // 캐릭터 이미지 표시
        setTimeout(() => {
          setShowPointCharacter(true)
        }, 200)

        // 보석 애니메이션 시작
        setTimeout(() => {
          setJewelryAnimation(true)

          // 0.8초 동안 애니메이션
          const startTime = Date.now()
          const animate = () => {
            const progress = (Date.now() - startTime) / 800 // 0에서 1 사이의 값
            if (progress < 1) {
              // 시계 반대 방향으로 회전 (PI에서 시작하여 0으로 이동)
              const angle = Math.PI - progress * Math.PI // 180도에서 0도로
              const radius = 1000 * (1 - progress) // 반지름을 더 크게, 천천히 작아지도록

              // x, y 좌표 계산
              const x = radius * Math.cos(angle)
              const y = radius * Math.sin(angle) + progress // 위에서 시작해서 아래로 이동

              setJewelryPosition({ x, y })
              setJewelryScale(1 - progress * 1.5) // 크기 변화를 더 빠르게
              requestAnimationFrame(animate)
            } else {
              // 애니메이션 종료
              setShowJewelry(false)
              setTimeout(() => {
                router.replace('/room')
              }, 7500)
            }
          }
          animate()
        }, 2700)
      } else if (response.status === 4003 || response.status === 4004) {
        // 인증 관련 에러
        // router.replace('/login')
      } else if (
        response.status === 4008 ||
        response.status === 4020 ||
        response.status === 4032 ||
        response.status === 4034 ||
        response.status === 4041
      ) {
        // 유효성 검사 에러
        setError('ポイントの付与に失敗しました')
        setTimeout(() => {
          router.replace('/room')
        }, 3000)
      } else if (
        response.status === 5007 ||
        response.status === 5008 ||
        response.status === 5009 ||
        response.status === 5011
      ) {
        // 시스템 에러
        router.replace('/error')
      }
    } catch (error) {
      console.error('포인트 부여 중 에러 발생:', error)
      setError('ポイントの付与中にエラーが発生しました')
      setTimeout(() => {
        router.replace('/room')
      }, 3000)
    }
  }

  const handleLater = () => {
    router.replace('/room')
  }

  if (isLoading) {
    return (
      <div className="w-full h-[100dvh] flex items-center justify-center bg-black">
        <div className="text-white text-xl">読み込み中...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-[100dvh] flex items-center justify-center bg-black">
        <div className="text-white text-xl">{error}</div>
        <div className="text-white text-sm mt-4">3秒後にルームに戻ります...</div>
      </div>
    )
  }

  if (!imagesLoaded) {
    return (
      <div className="w-full h-[100dvh] flex items-center justify-center bg-black">
        <div className="text-white text-xl">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[100dvh] flex justify-center bg-black overflow-hidden">
      <div className="w-full h-full relative">
        {/* 타이틀 */}
        <div className="absolute top-0 left-0 right-0 w-full h-20 flex items-center justify-center bg-white z-[11]">
          <h1 className="font-title">できたほうこく</h1>
        </div>

        {/* 배경 이미지 */}
        <div className="absolute inset-0">
          <Image
            src="/images/dekita/bg_landscape.png"
            alt="メッセージ背景"
            width={100}
            height={200}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* 스탬프 이미지 */}
        {showStamp && !showEffect && (
          <div className="absolute top-[10%] left-[10%] transform -translate-x-[5%] translate-y-[50%] z-10 scale-150">
            <Image
              src="/images/dekita/GJ_stamp_mono.png"
              alt="スタンプ"
              width={2000}
              height={2000}
            />
          </div>
        )}

        {/* 연기 이펙트 */}
        {showSmokeEffect && (
          <div className="absolute top-[10%] left-[10%] transform -translate-x-[15%] -translate-y-[10%] z-30">
            <Image
              src="/images/dekita/animC3eff_smoke_zlib.png"
              alt="煙エフェクト"
              width={2000}
              height={2000}
              className="transition-all duration-1000"
            />
          </div>
        )}

        {/* 보석 이미지 */}
        {showJewelry && (
          <div
            className={`absolute top-[10%] left-[10%] transform -translate-x-[15%] -translate-y-[10%] z-20 transition-all duration-300 ${
              jewelryAnimation ? 'transition-transform duration-1000' : ''
            }`}
            style={{
              transform: jewelryAnimation
                ? `translate(${jewelryPosition.x}px, ${jewelryPosition.y}px) scale(${jewelryScale})`
                : 'translate(-5%, -10%)',
            }}
          >
            <Image
              src={`/images/dekita/jewelry/stone_${jewelryAnimation ? 'b' : 'g'}.png`}
              alt="宝石"
              width={2000}
              height={2000}
              className="transition-all duration-500"
            />
          </div>
        )}

        {/* 빛 효과 */}
        {showLight && (
          <div className="absolute top-[10%] left-[10%] transform -translate-x-[5%] -translate-y-[10%] z-10">
            <Image
              src="/images/dekita/genseki_light.png"
              alt="光エフェクト"
              width={2000}
              height={2000}
              className="transition-all duration-1000 opacity-0 animate-fadeIn"
            />
          </div>
        )}

        {/* 캐릭터 이미지 */}
        {showStamp && !showNewCharacter && (
          <div className="absolute top-[45%] left-[45%] transform -translate-x-[40%] -translate-y-[70%] z-30 scale-150">
            <Image
              src="/images/dekita/animC2_dekitan.png"
              alt="キャラクター"
              width={500}
              height={500}
              className="transition-all duration-300"
            />
          </div>
        )}

        {/* 새로운 캐릭터 이미지 */}
        {showNewCharacter && (
          <div className="absolute top-[45%] left-[45%] transform -translate-x-[10%] -translate-y-[30%] z-30 scale-100">
            <Image
              src="/images/dekita/animC3.png"
              alt="新しいキャラクター"
              width={500}
              height={500}
              className="transition-all duration-300"
            />
          </div>
        )}

        {/* 이펙트 이미지 */}
        {showEffect && (
          <div
            className={`absolute transform z-20 transition-transform duration-500 ${effectPosition} scale-150`}
          >
            <Image
              src="/images/dekita/animC2eff_stamp.png"
              alt="エフェクト"
              width={2000}
              height={2000}
            />
          </div>
        )}

        {/* 메시지 패널 */}
        {showMessage && (
          <div className="absolute left-0 right-0 px-4 z-40 bottom-[10%]">
            <InformationPanel
              items={messages}
              currentIndex={currentMessageIndex}
              onNext={currentMessageIndex === 2 ? handleNextAfterMessage : handleNextMessage}
              background="white"
              withShadow={true}
            />
            <div className="flex justify-center mt-4">
              <Button
                variant="primary"
                onClick={currentMessageIndex === 2 ? handleNextAfterMessage : handleNextMessage}
                className="w-52"
              >
                次へ
              </Button>
            </div>
          </div>
        )}

        {/* 평가 버튼 그룹 */}
        {showEvaluationButtons && (
          <div className="absolute left-0 right-0 px-4 z-40 bottom-[1%] flex flex-col items-center gap-2">
            {canGiveSpecialPoint && (
              <Button
                variant="primary"
                onClick={() => handleEvaluation(6)}
                className="w-60 bg-gradient-to-r from-purple-500 to-pink-500"
              >
                スペシャルすごい! 6pt
              </Button>
            )}
            <Button
              variant="primary"
              onClick={() => handleEvaluation(3)}
              className="w-60 bg-gradient-to-r from-blue-500 to-cyan-500"
            >
              めちゃすごい! 3pt
            </Button>
            <Button
              variant="primary"
              onClick={() => handleEvaluation(2)}
              className="w-60 bg-gradient-to-r from-green-500 to-emerald-500"
            >
              グッド! 2pt
            </Button>
            <Button
              variant="primary"
              onClick={() => handleEvaluation(1)}
              className="w-60 bg-gradient-to-r from-yellow-500 to-orange-500"
            >
              がんばったね! 1pt
            </Button>
          </div>
        )}

        {/* 포인트 텍스트 이미지 */}
        {showPointText && (
          <div className="absolute bg-white left-0 right-0 px-4 z-40 bottom-[15%] flex justify-center">
            <Image
              src={`/images/dekita/points/${currentPoint === 6 ? '6' : currentPoint}pt_txt@2x.png`}
              alt={`${currentPoint}ポイント`}
              width={300}
              height={100}
              className="object-contain"
            />
          </div>
        )}

        {/* 포인트 캐릭터 이미지 */}
        {showPointCharacter && (
          <div className="absolute left-0 right-0 bottom-[30%] z-50 flex justify-center scale-150">
            <Image
              src="/images/dekita/animC4_zlib.png"
              alt="キャラクター"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        )}

        {/* 버튼 그룹 */}
        {showButtons && (
          <div className="absolute left-0 right-0 px-4 z-40 bottom-[15%] flex flex-col items-center gap-4">
            <Button variant="primary" onClick={handleShowMessage} className="w-60">
              みてもらう
            </Button>
            <Button variant="secondary" onClick={handleLater} className="w-60">
              あとでみてもらう
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function Loading() {
  return (
    <div className="w-full h-[100dvh] flex items-center justify-center bg-black">
      <div className="text-white text-xl">読み込み中...</div>
    </div>
  )
}

export default function Dekita() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<Loading />}>
        <DekitaContent />
      </Suspense>
    </ProtectedRoute>
  )
}
