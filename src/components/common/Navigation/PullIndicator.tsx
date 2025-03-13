'use client'

import { useNavigation } from './NavigationContext'

export function PullIndicator() {
  const { isPulling, pullProgress } = useNavigation()

  if (!isPulling) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center bg-white bg-opacity-90 py-2 shadow-md transition-all duration-300">
      <div className="flex flex-col items-center">
        <div className="w-32 h-1 bg-gray-200 rounded-full mb-1">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-100"
            style={{ width: `${pullProgress}%` }}
          />
        </div>
        <span className="text-sm font-medium">
          {pullProgress >= 100 ? 'ナビゲーション表示済み' : 'ナビゲーション表示'}
        </span>
      </div>
    </div>
  )
}
