'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import parseAPNG from 'apng-js'
import { cn } from '@/lib/utils'
import { ImageViewerProps, APNGPlayer } from './types'

const ImageViewer = ({
  src,
  alt,
  width,
  height,
  className,
  isAPNG = false,
  apngConfig,
  entranceAnimation,
  emphasisAnimation,
  onLoad,
  onClick,
  onDragStart,
  onDragEnd,
  onDrop,
}: ImageViewerProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(apngConfig?.autoPlay ?? true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const apngPlayerRef = useRef<APNGPlayer | null>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [dragImage, setDragImage] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!onDragStart) return

    const img = document.createElement('img')
    img.src = src
    img.width = 100
    img.height = 100
    setDragImage(img)

    return () => {
      setDragImage(null)
    }
  }, [src, onDragStart])

  const getEntranceAnimationClass = () => {
    if (!entranceAnimation) return ''

    const baseClass = 'transition-all'
    const durationClass = `duration-${entranceAnimation.duration ?? 300}`
    const delayClass = entranceAnimation.delay ? `delay-${entranceAnimation.delay}` : ''
    const timingClass = `ease-${entranceAnimation.timingFunction ?? 'out'}`
    const repeatClass =
      entranceAnimation.repeat === 0
        ? 'animate-infinite'
        : `animate-${entranceAnimation.repeat ?? 1}`

    switch (entranceAnimation.type) {
      case 'fade':
        return cn(baseClass, durationClass, delayClass, timingClass, repeatClass, 'animate-fade-in')
      case 'slide':
        const direction = entranceAnimation.slideDirection ?? 'up'
        return cn(
          baseClass,
          durationClass,
          delayClass,
          timingClass,
          repeatClass,
          `animate-slide-in-${direction}`
        )
      case 'scale':
        return cn(
          baseClass,
          durationClass,
          delayClass,
          timingClass,
          repeatClass,
          'animate-scale-in'
        )
      default:
        return ''
    }
  }

  const getEmphasisAnimationClass = () => {
    if (!emphasisAnimation) return ''

    const baseClass = 'transition-all'
    const durationClass = `duration-${emphasisAnimation.duration ?? 300}`
    const delayClass = emphasisAnimation.delay ? `delay-${emphasisAnimation.delay}` : ''
    const timingClass = `ease-${emphasisAnimation.timingFunction ?? 'out'}`
    const repeatClass =
      emphasisAnimation.repeat === 0
        ? 'animate-infinite'
        : `animate-${emphasisAnimation.repeat ?? 1}`

    switch (emphasisAnimation.type) {
      case 'pulse':
        return cn(baseClass, durationClass, delayClass, timingClass, repeatClass, 'animate-pulse')
      case 'shine':
        return cn(baseClass, durationClass, delayClass, timingClass, repeatClass, 'animate-shine')
      case 'shake':
        return cn(baseClass, durationClass, delayClass, timingClass, repeatClass, 'animate-shake')
      default:
        return ''
    }
  }

  useEffect(() => {
    if (!isAPNG || !canvasRef.current) return

    const loadAPNG = async () => {
      try {
        const response = await fetch(src)
        const buffer = await response.arrayBuffer()
        const apng = parseAPNG(buffer)

        if (apng && 'getPlayer' in apng && canvasRef.current) {
          const canvas = canvasRef.current
          const ctx = canvas.getContext('2d')

          if (!ctx) return

          const player = await apng.getPlayer(ctx)
          apngPlayerRef.current = player

          player.playbackRate = apngConfig?.speed ?? 1

          if (isPlaying) {
            player.play()
          }
        }
      } catch (error) {
        console.error('APNG 로딩 실패:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAPNG()

    return () => {
      if (apngPlayerRef.current) {
        apngPlayerRef.current.stop()
      }
    }
  }, [src, isAPNG, isPlaying, apngConfig])

  const handleImageLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleClick = () => {
    if (isAPNG && apngPlayerRef.current) {
      if (isPlaying) {
        apngPlayerRef.current.pause()
      } else {
        apngPlayerRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
    onClick?.()
  }

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation()
    if (dragImage) {
      e.dataTransfer.setData('text/plain', src)
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setDragImage(dragImage, 50, 50)
    }
    onDragStart?.(e)
  }

  const handleDragEnd = (e: React.DragEvent) => {
    e.stopPropagation()
    onDragEnd?.(e)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.stopPropagation()
    onDrop?.(e)
  }

  return (
    <div
      ref={imageRef}
      className={cn(
        'relative w-full h-full',
        getEntranceAnimationClass(),
        getEmphasisAnimationClass(),
        onDragStart && 'cursor-move',
        className
      )}
      onClick={handleClick}
      onDragStart={onDragStart ? handleDragStart : undefined}
      onDragEnd={onDragEnd ? handleDragEnd : undefined}
      onDrop={onDrop ? handleDrop : undefined}
      draggable={!!onDragStart}
      role="img"
      aria-label={alt}
      tabIndex={0}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {isAPNG ? (
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className={cn('w-full h-full object-contain', isLoading ? 'opacity-0' : 'opacity-100')}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn('w-full h-full object-contain', isLoading ? 'opacity-0' : 'opacity-100')}
          onLoad={handleImageLoad}
          loading="lazy"
          unoptimized
          draggable={false}
        />
      )}
    </div>
  )
}

export default ImageViewer
