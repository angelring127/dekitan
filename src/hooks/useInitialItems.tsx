import { useState } from 'react'
import type { InformationItem } from '@/components/common/InformationPanel/types'
import { TypewriterText } from '@/components/common/TypewriterText'
import Image from 'next/image'
import { Button } from '@/components/common/Button'

interface BirthDate {
  year: string
  month: string
  day: string
}

export const useInitialItems = (onNext: () => void) => {
  const [nickname, setNickname] = useState('こうき')
  const [suffix, setSuffix] = useState('くん')
  const [birthDate, setBirthDate] = useState<BirthDate>({ year: '', month: '', day: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onNext()
  }

  const items: InformationItem[] = [
    {
      id: 'start',
      content: (
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 p-6">
          <h1 className="text-center text-2xl font-bold text-gray-800">できたアプリを始める</h1>
          <Image
            src="/images/ic_color_avarta.png"
            alt="カラーアバター"
            width={200}
            height={200}
            className="animate-bounce"
          />
        </div>
      ),
      size: {
        width: '100%',
        height: '100%',
      },
    },
    {
      id: 'input',
      content: (
        <form
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
          className="flex h-full w-full flex-col items-center justify-between gap-6 p-6"
        >
          <div className="flex w-full flex-col items-center gap-6">
            <TypewriterText
              text="まずはやってみよう！"
              className="text-2xl font-bold text-gray-800"
            />
            <div className="flex w-full flex-col gap-4">
              <div className="space-y-2">
                <label htmlFor="nickname" className="text-sm font-medium text-gray-700">
                  【ニックネーム】
                </label>
                <input
                  id="nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  style={{ borderBottom: '2px solid black' }}
                  className="w-full px-4 py-2 text-center text-3xl font-bold !text-green-600 focus:border-b-green-500 focus:outline-none focus:ring-0 bg-transparent"
                  aria-label="ニックネームを入力"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">呼び方</label>
                <div className="flex gap-4">
                  {['くん', 'ちゃん', 'なし'].map((suffixItem) => (
                    <button
                      type="button"
                      key={suffixItem}
                      onClick={() => setSuffix(suffixItem === 'なし' ? '' : suffixItem)}
                      className={`flex-1 rounded-full px-6 py-2 transition-colors ${
                        suffix === (suffixItem === 'なし' ? '' : suffixItem)
                          ? 'bg-green-700 text-white'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                      aria-pressed={suffix === (suffixItem === 'なし' ? '' : suffixItem)}
                    >
                      {suffixItem}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">【誕生日】</label>
                <div className="flex gap-4">
                  {[
                    { key: 'year', placeholder: '年' },
                    { key: 'month', placeholder: '月' },
                    { key: 'day', placeholder: '日' },
                  ].map((item) => (
                    <div key={item.key} className="flex-1">
                      <input
                        type="text"
                        placeholder={item.placeholder}
                        value={birthDate[item.key as keyof BirthDate]}
                        onChange={(e) =>
                          setBirthDate((prev) => ({ ...prev, [item.key]: e.target.value }))
                        }
                        style={{ borderBottom: '2px solid black' }}
                        className="w-full px-4 py-2 text-center text-3xl font-bold !text-green-600 focus:border-b-green-500 focus:outline-none focus:ring-0 bg-transparent"
                        aria-label={`${item.placeholder}を入力`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-green-500 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            確認
          </button>
        </form>
      ),
      size: {
        width: '100%',
        height: '100%',
      },
    },
    {
      id: 'welcome',
      content: (
        <div className="flex h-full w-full flex-col items-center justify-between gap-6 p-6 overflow-y-auto">
          <div className="whitespace-pre-line text-center text-xl font-medium text-gray-800">
            <p>ワクワクワールドへようこそ！</p>
            <p>
              こんにちは、{nickname}
              {suffix}！
            </p>
            <p>ぼくはできたん。</p>
            <p>ここは子どもたちの心の中にある、</p>
            <p>好奇心に満ちあれた世界。</p>
            <p>ホメロスが、みんなの「できた！」</p>
            <p>で創ったんだよ！</p>
          </div>
          <Button
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation()
            }}
            className="rounded-full text-2xl font-bold p-8 min-w-[400px]"
          >
            おみくじをひく
          </Button>
          <Image
            src="/images/img_character.png"
            alt="キャラクター"
            width={350}
            height={350}
            className="animate-bounce"
          />
        </div>
      ),
      size: {
        width: '100%',
        height: '100%',
      },
    },
  ]

  return {
    items,
    nickname,
    suffix,
    birthDate,
    setNickname,
    setSuffix,
    setBirthDate,
  }
}
