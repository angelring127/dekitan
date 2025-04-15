'use client'

import Image from 'next/image'
import { memo } from 'react'
import type { CardProps } from './types'
import { cn } from '@/lib/utils'

const Card = memo((props: CardProps) => {
  const { variant, className = '', onClick } = props

  if (variant === 'point') {
    const { title, point } = props
    return (
      <div
        className={`w-[47%] rounded-2xl shadow-md overflow-hidden ${className}`}
        role="article"
        aria-label={`${title} カード: ${point} ポイント`}
        onClick={onClick}
      >
        <div className="bg-[#FF9F1C] p-2 text-center text-black">
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <div className="bg-white py-2 flex flex-col items-center justify-center">
          <div className="relative flex items-center gap-1">
            <span className="text-3xl font-bold">{point.toLocaleString()}</span>
            <div className="relative">
              <span className="text-sm text-gray-600">ポイント</span>
              <Image
                src="/images/img_yellow_star.png"
                width={20}
                height={20}
                alt="ポイント スター画像"
                className="w-5 h-5 absolute -top-2 -right-3"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const { headerText, bodyText, headerColor = 'green', headerClassName = '', children } = props
  const headerColorMap = {
    green: 'bg-[#37ae94]',
    red: 'bg-[#e6e6e6]',
    purple: 'bg-[#8B5CF6]',
  }

  return (
    <div
      className={cn('rounded-xl shadow-md overflow-hidden', className)}
      role="article"
      aria-label={`${headerText} カード: ${bodyText}`}
      onClick={onClick}
    >
      <div className={cn(headerColorMap[headerColor], 'py-2 px-4')}>
        <h3 className={cn('font-bold', headerClassName)}>{headerText}</h3>
      </div>
      {children || (
        <div className="bg-white py-4 px-4">
          <p className="text-[60px] font-bold">{bodyText}</p>
        </div>
      )}
    </div>
  )
})

Card.displayName = 'Card'

export default Card
