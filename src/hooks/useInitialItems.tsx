import { useState } from 'react'
import type { InformationItem } from '@/components/common/InformationPanel/types'

export const useInitialItems = (onNext: () => void, onOmikuji: () => void) => {
  const [items] = useState<InformationItem[]>([
    {
      id: '0',
      content: (
        <div className="flex flex-col items-center gap-4">
          <span className="whitespace-pre-line text-center text-xl font-medium">
            ようこそ！
            <br />
            できたのげんせきを集める冒険の始まりです。
          </span>
        </div>
      ),
    },
    {
      id: '1',
      content: (
        <div className="flex flex-col items-center gap-4">
          <span className="whitespace-pre-line text-center text-xl font-medium">
            まずは、おみくじを引いて
            <br />
            今日の運勢を確認しましょう！
          </span>
        </div>
      ),
    },
    {
      id: '2',
      content: (
        <div className="flex flex-col items-center gap-4">
          <span className="whitespace-pre-line text-center text-xl font-medium">
            おみくじを引いてみましょう！
            <br />
            タップしてスタート！
          </span>
          <button
            onClick={onOmikuji}
            className="mt-4 rounded-full bg-red-500 px-6 py-2 text-lg font-bold text-white"
          >
            おみくじを引く
          </button>
        </div>
      ),
    },
    {
      id: '3',
      content: (
        <div className="flex flex-col items-center gap-4">
          <span className="whitespace-pre-line text-center text-xl font-medium">
            おめでとうございます！
            <br />
            今日も素敵な一日になりそうですね。
          </span>
          <button
            onClick={onNext}
            className="mt-4 rounded-full bg-red-500 px-6 py-2 text-lg font-bold text-white"
          >
            次へ
          </button>
        </div>
      ),
    },
  ])

  return {
    items,
  }
}
