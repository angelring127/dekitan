'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { panelVariants, itemVariants, typingAnimation } from './styles'
import type { InformationPanelProps, InformationItem } from './types'
import { Button } from '../Button'
import Image from 'next/image'
import { parseAPNG } from 'apng-js'
import React, { ReactElement } from 'react'

const processNewlines = (text: string) => {
  return text.split('\\n').map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </span>
  ))
}

const processText = (text: string | JSX.Element) => {
  if (typeof text === 'string') {
    return processNewlines(text)
  }

  if (React.isValidElement(text)) {
    const element = text as ReactElement
    if (typeof element.props.children === 'string') {
      return React.cloneElement(
        element,
        { ...element.props },
        processNewlines(element.props.children)
      )
    }
  }

  return text
}

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
  itemSpacing = 16,
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

  const renderImage = (item: InformationItem) => {
    if (!item.image) return null

    const imageSpacing = item.spacing || {}
    const topSpacing = imageSpacing.top !== undefined ? imageSpacing.top : itemSpacing
    const bottomSpacing = imageSpacing.bottom !== undefined ? imageSpacing.bottom : 0

    if (item.image.isApng) {
      return (
        <div style={{ marginTop: topSpacing, marginBottom: bottomSpacing }}>
          <img
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width || 200}
            height={item.image.height || 200}
            className="rounded-lg"
            style={{
              width: item.image.width || 200,
              height: item.image.height || 200,
              objectFit: 'contain',
            }}
          />
        </div>
      )
    }

    return (
      <div style={{ marginTop: topSpacing, marginBottom: bottomSpacing }}>
        <Image
          src={item.image.src}
          alt={item.image.alt}
          width={item.image.width || 200}
          height={item.image.height || 200}
          className="rounded-lg"
        />
      </div>
    )
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
        {items.map((item, index) => {
          const spacing = item.spacing || {}
          const topSpacing = spacing.top !== undefined ? spacing.top : itemSpacing
          const bottomSpacing = spacing.bottom !== undefined ? spacing.bottom : 0

          return (
            <div
              key={item.id}
              className={cn(
                itemVariants({
                  visible: !sequential || index === currentIndex,
                  sequential,
                })
              )}
              style={{
                marginTop: index === 0 ? 0 : topSpacing,
                marginBottom: bottomSpacing,
              }}
            >
              {item.icon && (
                <div className="flex-shrink-0" aria-hidden="true">
                  {item.icon}
                </div>
              )}
              <div
                className={cn(
                  'flex-1 flex flex-col items-center',
                  !item.icon && 'text-center w-full'
                )}
              >
                <p className="w-full">
                  {useTypingEffect && sequential ? (
                    <>
                      <span className="typing-effect">{processNewlines(typedText)}</span>
                      <span className="invisible absolute" aria-hidden="true">
                        {processNewlines(items[currentIndex].text as string)}
                      </span>
                    </>
                  ) : (
                    processText(item.text)
                  )}
                </p>
                {renderImage(item)}
              </div>
            </div>
          )
        })}
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
