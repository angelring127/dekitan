'use client'

import { useState } from 'react'
import Image from 'next/image'
import ImageViewer from '@/components/common/ImageViewer'
import { AnimationConfig, EmphasisConfig } from '@/components/common/ImageViewer/types'
import { cn } from '@/lib/utils'

const ImageViewerDemo = () => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [droppedImage, setDroppedImage] = useState<string | null>(null)
  const [currentImage, setCurrentImage] = useState<'success' | 'normal'>('normal')

  const handleDragStart = (imageName: string) => () => {
    setDraggedItem(imageName)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  const handleDrop = (targetArea: string) => (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedItem) {
      console.log(`${draggedItem}を${targetArea}にドロップしました。`)
      if (targetArea === 'target') {
        setDroppedImage(draggedItem)
      }
    }
    setDraggedItem(null)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleImageTransition = () => {
    setCurrentImage((prev) => (prev === 'normal' ? 'success' : 'normal'))
  }

  const greatJobAnimation: AnimationConfig = {
    type: 'fade',
    duration: 1000,
    timingFunction: 'ease-out',
  }

  const greatJobEmphasis: EmphasisConfig = {
    type: 'pulse',
    duration: 1000,
    repeat: 0,
  }

  const omikujiAnimation: AnimationConfig = {
    type: 'slide',
    duration: 1000,
    slideDirection: 'up',
    timingFunction: 'ease-out',
  }

  const omikujiEmphasis: EmphasisConfig = {
    type: 'shake',
    duration: 2000,
    repeat: 0,
  }

  const elephantAnimation: AnimationConfig = {
    type: 'scale',
    duration: 1000,
    timingFunction: 'ease-out',
  }

  const elephantEmphasis: EmphasisConfig = {
    type: 'shine',
    duration: 1500,
    repeat: 0,
  }

  return (
    <div className="mx-auto w-[390px] min-h-[844px] bg-white relative overflow-hidden">
      {/* 헤더 */}
      <header className="sticky top-0 left-0 right-0 h-14 bg-white border-b flex items-center px-4 z-10">
        <button
          onClick={() => window.history.back()}
          className="w-12 h-12 flex items-center justify-center"
          aria-label="戻る"
        >
          <Image src="/images/ic_back.png" alt="" width={48} height={48} priority />
        </button>
        <h1 className="text-lg font-medium ml-2">画像ビューアーデモ</h1>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="p-4">
        {/* 정적 이미지 섹션 */}
        <section className="mt-4">
          <h2 className="text-lg font-medium mb-4">静的画像 & アニメーション</h2>

          <div className="space-y-6">
            {/* 축하 메시지 이미지 */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600 mb-2">パルスアニメーション</h3>
              <div className="w-full aspect-square relative">
                <ImageViewer
                  src="/images/img_great_job.png"
                  alt="おめでとう！"
                  width={300}
                  height={300}
                  entranceAnimation={greatJobAnimation}
                  emphasisAnimation={greatJobEmphasis}
                />
              </div>
            </div>

            {/* 오미쿠지 이미지 */}
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600 mb-2">シェイクアニメーション</h3>
              <div className="w-full aspect-square relative">
                <ImageViewer
                  src="/images/img_omikuji.png"
                  alt="오미쿠지"
                  width={300}
                  height={300}
                  entranceAnimation={omikujiAnimation}
                  emphasisAnimation={omikujiEmphasis}
                />
              </div>
            </div>

            {/* 코끼리 이미지 */}
            <div className="bg-sky-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600 mb-2">キラキラアニメーション</h3>
              <div className="w-full aspect-square relative">
                <ImageViewer
                  src="/images/elephant.png"
                  alt="象"
                  width={300}
                  height={300}
                  entranceAnimation={elephantAnimation}
                  emphasisAnimation={elephantEmphasis}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 드래그 앤 드롭 섹션 */}
        <section className="mt-8">
          <h2 className="text-lg font-medium mb-4">ドラッグ & ドロップ</h2>

          <div className="grid grid-cols-2 gap-4">
            {/* 드래그 가능한 이미지들 */}
            <div
              className={cn(
                'border-2 border-dashed p-4 rounded-lg transition-colors',
                draggedItem ? 'border-gray-200 bg-gray-50' : 'border-gray-300'
              )}
            >
              <h3 className="text-sm text-gray-600 mb-2">ドラッグ可能な画像</h3>
              <div className="w-full aspect-square relative">
                <ImageViewer
                  src="/images/img_great_job.png"
                  alt="ドラッグ可能な画像"
                  width={150}
                  height={150}
                  onDragStart={handleDragStart('great_job')}
                  onDragEnd={handleDragEnd}
                  className="cursor-move"
                />
              </div>
            </div>

            {/* 드롭 영역 */}
            <div
              className={cn(
                'border-2 border-dashed p-4 rounded-lg transition-colors',
                draggedItem ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50'
              )}
              onDragOver={handleDragOver}
              onDrop={handleDrop('target')}
            >
              <h3 className="text-sm text-gray-600 mb-2">ここにドロップしてください</h3>
              <div className="w-full aspect-square relative">
                {droppedImage ? (
                  <ImageViewer
                    src="/images/img_great_job.png"
                    alt="ドロップされた画像"
                    width={150}
                    height={150}
                    entranceAnimation={{
                      type: 'fade',
                      duration: 300,
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    ドロップエリア
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 이미지 전환 효과 섹션 */}
        <section className="mt-8 mb-6">
          <h2 className="text-lg font-medium mb-4">画像切り替え効果</h2>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm text-gray-600 mb-2">クリックして切り替え ({currentImage})</h3>
            <div
              className="w-full aspect-square relative cursor-pointer"
              onClick={handleImageTransition}
            >
              <ImageViewer
                src={
                  currentImage === 'normal'
                    ? '/images/img_great_job.png'
                    : '/images/img_omikuji.png'
                }
                alt="전환 이미지"
                width={300}
                height={300}
                entranceAnimation={{
                  type: 'fade',
                  duration: 500,
                }}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ImageViewerDemo
