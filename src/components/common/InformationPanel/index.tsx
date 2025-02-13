'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { panelVariants, itemVariants } from './styles'
import type { InformationPanelProps } from './types'

export function InformationPanel({
  items,
  currentIndex,
  onNext,
  background = 'white',
  withShadow = true,
  className,
  style,
  height,
}: InformationPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    if (onNext) {
      onNext()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onNext && (e.key === 'Enter' || e.key === ' ')) {
      onNext()
    }
  }

  // 현재 아이템의 size와 position 값을 가져옵니다
  const currentItem = items[currentIndex]
  const currentSize = currentItem?.size || {}

  return (
    <div
      ref={containerRef}
      className={cn(
        panelVariants({ background, withShadow }),
        'relative cursor-pointer overflow-hidden',
        'flex flex-col',
        'w-full transition-all duration-300',
        className
      )}
      style={{
        ...style,
        height: height
          ? typeof height === 'number'
            ? `${height}px`
            : height
          : currentSize.height
            ? `${currentSize.height}px`
            : 'fit-content',
        minHeight: height
          ? typeof height === 'number'
            ? `${height}px`
            : height
          : currentSize.height
            ? `${currentSize.height}px`
            : 'fit-content',
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label="다음으로 넘어가려면 클릭하세요"
    >
      <div className="w-full h-full relative">
        {items.map((item, index) => {
          const position = item.position || {}
          const size = item.size || {}

          return (
            <div
              key={item.id}
              className={cn(
                itemVariants({
                  visible: index === currentIndex,
                }),
                'w-full transition-all duration-300',
                'flex items-center justify-center',
                index === currentIndex ? 'relative' : 'absolute inset-0 invisible'
              )}
              style={{
                top: position.top ? `${position.top}px` : 0,
                left: position.left ? `${position.left}px` : 0,
                right: position.right ? `${position.right}px` : 0,
                bottom: position.bottom ? `${position.bottom}px` : 0,
                height: '100%',
                width: size.width ? `${size.width}px` : '100%',
                maxWidth: size.maxWidth ? `${size.maxWidth}px` : '100%',
                maxHeight: size.maxHeight ? `${size.maxHeight}px` : 'none',
              }}
            >
              {item.content}
            </div>
          )
        })}
      </div>
    </div>
  )
}

InformationPanel.displayName = 'InformationPanel'
