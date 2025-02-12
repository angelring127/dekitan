import { useState } from 'react'
import type { InformationItem } from '@/components/common/InformationPanel/types'
import Image from 'next/image'

interface BirthDate {
  year: string
  month: string
  day: string
}

export const useInitialItems = () => {
  const [nickname, setNickname] = useState('こうき')
  const [suffix, setSuffix] = useState('くん')
  const [birthDate, setBirthDate] = useState<BirthDate>({ year: '', month: '', day: '' })

  const items: InformationItem[] = [
    {
      id: 'start',
      text: <span className="text-center text-xl">できたアプリを始める</span>,
      image: {
        src: '/images/ic_color_avarta.png',
        alt: 'カラーアバター',
        width: 200,
        height: 200,
      },
      spacing: {
        top: 350,
        bottom: 80,
      },
    },
    {
      id: 'input',
      text: (
        <div className="flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
          <span className="text-xl font-medium">まずはやってみよう！</span>
          <div className="flex w-full flex-col gap-2">
            <label className="text-sm">ニックネーム</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-2"
            />
            <div className="flex gap-2">
              {['くん', 'ちゃん', 'なし'].map((suffixItem) => (
                <button
                  key={suffixItem}
                  onClick={() => {
                    setSuffix(suffixItem === 'なし' ? '' : suffixItem)
                  }}
                  className={`flex-1 rounded-lg border px-4 py-2 ${
                    suffix === (suffixItem === 'なし' ? '' : suffixItem)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200'
                  }`}
                >
                  {suffixItem}
                </button>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <label className="text-sm">誕生日</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="年"
                value={birthDate.year}
                onChange={(e) => setBirthDate((prev) => ({ ...prev, year: e.target.value }))}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2"
              />
              <input
                type="text"
                placeholder="月"
                value={birthDate.month}
                onChange={(e) => setBirthDate((prev) => ({ ...prev, month: e.target.value }))}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2"
              />
              <input
                type="text"
                placeholder="日"
                value={birthDate.day}
                onChange={(e) => setBirthDate((prev) => ({ ...prev, day: e.target.value }))}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'welcome',
      text: (
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center overflow-y-auto max-h-[calc(100%-200px)]">
            <span className="text-xl font-medium mb-4">ワクワクワールドへようこそ！</span>
            <span className="whitespace-pre-line text-center px-4">
              こんにちは、{nickname}
              {suffix}！{'\n\n'}
              ぼくはできたん。{'\n\n'}
              ここは子どもたちの心の中にある、{'\n'}
              好奇心に満ちあれた世界。{'\n\n'}
              ホメロスが、みんなの「できた！」{'\n'}
              で創ったんだよ！{'\n\n'}
              ぼくはみんなの「できた！」見つけ屋{'\n'}
              さん。みんなの「できた！」を見つ{'\n'}
              けるのが大仕事！{'\n\n'}
              まだまだ見習いだけどね。{'\n\n'}
              わぁ、{nickname}
              {suffix}、{'\n'}
              最近どんなことできた？！{'\n\n'}
              へぇ、すごい！{'\n'}
              え？何ができてない？{'\n'}
              思い出せない？{'\n\n'}
              できた！は、生活の中のいろんなと{'\n'}
              ころに隠れているんだよ。{'\n\n'}
              {nickname}
              {suffix}の「できた！」{'\n'}
              探しにいこう！{'\n\n'}
              難しく考えなくても大丈夫。まずは{'\n'}
              何かを始めてみることが大事だよ。{'\n\n'}
              挑戦したこと自体がすでにできた！{'\n'}
              なんだ。{'\n\n'}
              きっかけなんてなんでもいいんだ。{'\n'}
              思いつかないときは、{'\n'}
              「できたくじ」できまり！
            </span>
          </div>
          <div className="mt-4">
            <Image
              src="/images/img_character.png"
              alt="キャラクター"
              width={128}
              height={128}
              className="mx-auto"
            />
          </div>
        </div>
      ),
      spacing: {
        top: 20,
        bottom: 20,
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
