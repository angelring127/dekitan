'use client'

import Image from 'next/image'
import { memo } from 'react'
import type { CardProps } from './types'

const Card = memo((props: CardProps) => {
  const { variant, className = '' } = props

  if (variant === 'point') {
    const { title, point } = props
    return (
      <div
        className={`w-[47%] rounded-2xl shadow-md overflow-hidden ${className}`}
        role="article"
        aria-label={`${title} カード: ${point} ポイント`}
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

  const { headerText, bodyText, headerColor = 'green' } = props
  const headerColorMap = {
    green: 'bg-[#4CAF50]',
    red: 'bg-[#FF0000]',
    purple: 'bg-[#8B5CF6]',
  }

  return (
    <div
      className={`w-[90%] min-h-[120px] mx-auto my-4 rounded-2xl shadow-md overflow-hidden ${className}`}
      role="article"
      aria-label={`${headerText} カード: ${bodyText}`}
    >
      <div className={`${headerColorMap[headerColor]} p-3 text-center text-white`}>
        <h3 className="text-lg font-bold">{headerText}</h3>
      </div>
      <div className="bg-white p-4">
        <p className="text-2xl text-center">{bodyText}</p>
      </div>
    </div>
  )
})

Card.displayName = 'Card'

export default Card
