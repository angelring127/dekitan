'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { panelVariants, itemVariants, typingAnimation } from './styles'
import type { InformationPanelProps } from './types'
import { Button } from '../Button'

export function InformationPanel({
  items,
  background,
  withShadow,
  sequential = false,
  currentIndex = 0,
  onNext,
  useTypingEffect = false,
  buttons,
  inputs,
  // 下位互換性のためのprops
  buttonText,
  onButtonClick,
  inputPlaceholder,
  inputValue,
  onInputChange,
  className,
  style,
  ...props
}: InformationPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [typedText, setTypedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // 下位互換性のための変換
  const allButtons =
    buttons || (buttonText && onButtonClick ? [{ text: buttonText, onClick: onButtonClick }] : [])
  const allInputs =
    inputs ||
    (inputPlaceholder && onInputChange
      ? [{ placeholder: inputPlaceholder, value: inputValue || '', onChange: onInputChange }]
      : [])

  // タイピングエフェクトのためのスタイル注入
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const styleElement = document.createElement('style')
      styleElement.textContent = typingAnimation
      document.head.appendChild(styleElement)
      return () => {
        document.head.removeChild(styleElement)
      }
    }
  }, [])

  // タイピングエフェクトのロジック
  useEffect(() => {
    if (useTypingEffect && sequential && items[currentIndex]) {
      setIsTyping(true)
      const text = items[currentIndex].text
      if (typeof text !== 'string') return
      setTypedText(text.charAt(0))
      let currentChar = 1

      const typingInterval = setInterval(() => {
        if (currentChar < text.length) {
          setTypedText(() => text.substring(0, currentChar + 1))
          currentChar++
        } else {
          setIsTyping(false)
          clearInterval(typingInterval)
        }
      }, 50)

      return () => clearInterval(typingInterval)
    }
  }, [currentIndex, items, useTypingEffect, sequential])

  useEffect(() => {
    if (sequential && containerRef.current) {
      containerRef.current.focus()
    }
  }, [sequential])

  const handleClick = () => {
    if (sequential && !isTyping && onNext) {
      onNext()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (sequential && !isTyping && onNext && (e.key === 'Enter' || e.key === ' ')) {
      onNext()
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        panelVariants({ background, withShadow }),
        sequential && 'relative cursor-pointer',
        'flex flex-col',
        className
      )}
      style={style}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={sequential ? 0 : undefined}
      role={sequential ? 'button' : 'region'}
      aria-label={sequential ? '다음으로 넘어가려면 클릭하세요' : '정보 패널'}
      {...props}
    >
      <div className="flex-1">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              itemVariants({
                visible: !sequential || index === currentIndex,
                sequential,
              })
            )}
          >
            {item.icon && (
              <div className="flex-shrink-0" aria-hidden="true">
                {item.icon}
              </div>
            )}
            <p className={cn('flex-1', !item.icon && 'text-center w-full')}>
              {useTypingEffect && sequential ? (
                <span className="typing-effect">{typedText}</span>
              ) : (
                item.text
              )}
            </p>
          </div>
        ))}
      </div>

      {(allButtons.length > 0 || allInputs.length > 0) && (
        <div className="mt-4 px-4 space-y-2">
          {allInputs.map((input, index) => (
            <input
              key={index}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={input.placeholder}
              value={input.value}
              onChange={(e) => {
                e.stopPropagation()
                input.onChange(e.target.value)
              }}
              onClick={(e) => e.stopPropagation()}
            />
          ))}
          {allButtons.map((button, index) => (
            <Button
              key={index}
              variant={button.variant || 'primary'}
              onClick={(e) => {
                e.stopPropagation()
                button.onClick()
              }}
              fullWidth
            >
              {button.text}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

InformationPanel.displayName = 'InformationPanel'
