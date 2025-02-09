import React, { useState, useRef, useEffect } from 'react'
import { MessageCloudProps } from './types'
import { messageCloud, messageTail, messageInput, messageButton } from './styles'
import { cn } from '@/lib/utils'

export const MessageCloud: React.FC<MessageCloudProps> = ({
  message,
  direction = 'left',
  type = 'default',
  backgroundColor,
  textColor,
  borderStyle,
  borderRadius,
  tailSize = 16,
  tailPosition = 24,
  maxWidth = '70%',
  minHeight = '48px',
  onClick,
  onLongPress,
  selectionOptions,
  inputPlaceholder,
  onInputSubmit,
  animation,
  ariaLabel,
}) => {
  const [inputValue, setInputValue] = useState('')
  const [isLongPress, setIsLongPress] = useState(false)
  const longPressTimer = useRef<NodeJS.Timeout>()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (animation?.fadeIn) {
      setIsVisible(true)
    }
    if (animation?.fadeOut) {
      setIsVisible(false)
    }
  }, [animation])

  const handleMouseDown = () => {
    longPressTimer.current = setTimeout(() => {
      setIsLongPress(true)
      onLongPress?.()
    }, 500)
  }

  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }
  }

  const handleClick = () => {
    if (!isLongPress) {
      onClick?.()
    }
    setIsLongPress(false)
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() && onInputSubmit) {
      onInputSubmit(inputValue)
      setInputValue('')
    }
  }

  const customStyle = {
    maxWidth,
    minHeight,
    backgroundColor,
    color: textColor,
    borderStyle,
    borderRadius,
  }

  const tailStyle = {
    width: `${tailSize}px`,
    height: `${tailSize}px`,
    top: `${tailPosition}px`,
    backgroundColor,
  }

  return (
    <div
      className={cn(
        messageCloud({ direction, type, animation: animation?.typing ? 'typing' : undefined }),
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      style={customStyle}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
    >
      <div className={messageTail({ direction })} style={tailStyle} />

      {type === 'input' ? (
        <form onSubmit={handleInputSubmit}>
          <input
            type="text"
            className={messageInput()}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={inputPlaceholder}
          />
          <button type="submit" className={messageButton()}>
            전송
          </button>
        </form>
      ) : type === 'selection' ? (
        <div className="space-y-2">
          {message && <p className="mb-2">{message}</p>}
          {selectionOptions?.map((option) => (
            <button key={option.value} className={messageButton()} onClick={option.onClick}>
              {option.label}
            </button>
          ))}
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  )
}
