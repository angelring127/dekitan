import { useEffect, useRef, useState } from 'react'
import type { InformationItem } from '@/components/common/InformationPanel/types'
import { TypewriterText } from '@/components/common/TypewriterText'
import Image from 'next/image'
import { Button } from '@/components/common/Button'

export const useInitialItems = (onNext: () => void, onOmikuji?: () => void) => {
  const [nickname, setNickname] = useState('')
  const [suffix, setSuffix] = useState('くん')
  const [year, setYear] = useState("")
  const [omikuji, setOmikuji] = useState(0)
  const omikujiItem = [
    {'omikuji':"鼻歌",'theme': 'はなうた', 'comment': (
      <div className="text-center">
        <div style={{marginTop: '15px'}}>
          空を見上げてゆったりした 
          時間を過ごしてみるといいかも 
          何か見つけたらラッキー！ 
        </div>
        <div style={{marginTop: '15px'}}>
          おもしろい形の雲があったら 
          <p className='color-red'>小吉</p>
        </div>
        <div style={{marginTop: '15px'}}>
          飛んでいるものを 
          見つけるもよし　 
        </div>
        <div style={{marginTop: '15px'}}>
          一番星を家族とさがすもよし
        </div>
      </div>
    )},
    {'omikuji':"空",'theme': '空にあるもの'},
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onNext()
  }

  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (parentRef.current) {
        const height = parentRef.current.clientHeight;
        parentRef.current.style.setProperty("--parent-height", `${height}px`);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const items: InformationItem[] = [
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
                  {['くん', 'ちゃん', 'さん'].map((suffixItem) => (
                    <button
                      type="button"
                      key={suffixItem}
                      onClick={() => setSuffix(suffixItem === 'なし' ? '' : suffixItem)}
                      className={`flex-1 rounded-full px-6 py-2 transition-colors max-w-[30%] ${
                        suffix === (suffixItem === 'なし' ? '' : suffixItem)
                          ? 'bg-green-100 text-back'
                          : 'bg-green-500 text-white hover:bg-green-200'
                      }`}
                      aria-pressed={suffix === (suffixItem === 'なし' ? '' : suffixItem)}
                    >
                      {suffixItem}
                    </button>
                  ))}
                </div>
                <div className="gap-4 text-center">
                  {['なし'].map((suffixItem) => (
                    <button
                      type="button"
                      key={suffixItem}
                      onClick={() => setSuffix(suffixItem === 'なし' ? '' : suffixItem)}
                      style={{width: '30%'}}
                      className={`flex-1 rounded-full px-6 py-2 transition-colors w-[30%] ${
                        suffix === (suffixItem === 'なし' ? '' : suffixItem)
                          ? 'bg-green-100 text-black'
                          : 'bg-green-500 text-white hover:bg-green-200'
                      }`}
                      aria-pressed={suffix === (suffixItem === 'なし' ? '' : suffixItem)}
                    >
                      {suffixItem}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">【がくねん】</label>
                <div className="flex flex-col">
                  <select className="block w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500" id="year" onChange={(e) => setYear(e.target.value)}>
                    {["","年少","年中","年長","小学1年生","小学2年生","小学3年生","小学4年生","小学5年生","小学6年生"]
                      .map((item) => (
                        <option value={item} key={item}>{item}</option>
                    ))}
                  </select>
                  ※学年は後からの変更はできませんのでご注意ください。
                </div>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="rounded-full w-full"
            disabled={!(year && nickname)}
          >
            つぎへ
          </Button>
        </form>
      ),
      size: {
        width: '100%',
        height: '100%',
      },
    },
    {
      id: 'start',
      content: (
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 p-6">
          <h1 className="text-center text-2xl font-bold text-gray-800">できたアプリを始める</h1>
          <div className="text-center">コクヨが提供する、子どもの「できた！」の発見・体験・応援サイクルのためのアプリです。</div>
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
      id: 'welcome',
      content: (
        <div className="flex h-full w-full flex-col items-center justify-between gap-6 p-6 overflow-hidden" ref={parentRef}>
          <div className="whitespace-pre-line text-xl font-medium text-gray-800 animate-scroll" style={{animationDelay: "3s"}}>
            <p>ワクワクワールドへようこそ！</p>
            <p>
              こんにちは、{nickname}
              {suffix}！
            </p>
            <div style={{marginTop:'15px'}}>
              <p>ぼくはできたん。 </p>
              <p>ここは子どもたちの心の中にある、好奇心に満ち溢れた世界。 </p>
              <p>ホメロスが、みんなの「できた！」で創ったんだよ！ </p>
            </div>
            <div style={{marginTop:'15px'}}>
              <p>ぼくはみんなの「できた！見つけ屋さん。みんなの「できた！」を見つけるのが大得意！</p>
              <p>まだまだ見習いだけどね。 </p>
            </div>
            <div style={{marginTop:'15px'}}>
              <p>ねぇ、こうきくん、 </p>
              <p>最近どんなことできた？！ </p>
            </div>
            <div style={{marginTop:'15px'}}>
              <p>へえ、すごい！ </p>
              <p>え？何もできてない？ </p>
              <p>思い出せない？ </p>
            </div>
            <div style={{marginTop:'15px'}}>
              <p>できた！は、生活の中のいろんなところに隠れているんだよ。</p>
            </div>
            <div style={{marginTop:'15px'}}>
              <h1 className="text-center text-2xl font-bold text-gray-800">
                こうき君の「できた！」<br></br>
                  探しにいこう！
              </h1>
            </div>
            <div style={{marginTop:'15px'}}>
              <p>難しく考えなくても大丈夫。まずは何かを始めてみることが大事だよ。挑戦したこと自体がすでにできた！なんだ。 </p>
              <p>きっかけなんてなんでもいいんだ。思いつかないときは、 </p>
              <p>「できたみくじ」できまり！</p>
            </div>

            <div style={{marginTop: '20px'}} className='text-center'>
              {onOmikuji && (
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    onOmikuji()
                  }}
                  className="rounded-full text-2xl font-bold p-8 min-w-[450px]"
                >
                  おみくじをひく
                </Button>
              )}
              <Image
                src="/images/img_character.png"
                alt="キャラクター"
                width={350}
                height={350}
                className="animate-bounce"
              />
            </div>
          </div>
        </div>
      ),
      size: {
        width: '100%',
        height: '100%',
      },
    },
    {
      id: 'omikuji-first',
      content: (
        <div className="flex flex-col items-center gap-4">
          <span className="whitespace-pre-line text-center text-2xl font-bold">
            きょうはこれ！<br></br>
            ハッピーテーマ<br></br>
            {omikujiItem[omikuji]['theme']}
          </span>
          <Button
            variant="quinary"
            className="shadow-[0_0_10px_rgba(255,255,255,0.5)] text-lg font-bold rounded-full"
            onClick={onNext}
          >
            つぎへ
          </Button>
        </div>
      ),
      size: {
        width: '100%',
        height: 'auto',
      },
    },
    {
      id: 'omikuji-second',
      content: (
        <div className="flex flex-col items-center gap-4">
          <span className="whitespace-pre-line text-center text-2xl font-bold">
            {omikujiItem[omikuji]['comment']}
          </span>
          <Button
            variant="quinary"
            className="shadow-[0_0_10px_rgba(255,255,255,0.5)] text-lg font-bold rounded-full"
          >
            つぎへ
          </Button>
        </div>
      ),
      size: {
        width: '100%',
        height: '100%',
      },
    },
    {
      id: 'omikuji-final',
      content: (
        <div className="flex flex-col items-center gap-4">
          <span className="whitespace-pre-line text-center text-2xl font-bold">
            新しい発見があるといいね<br></br>
            <div style={{marginTop: '15px'}}>
              何かみつけたら<br></br>
              できたんにおしえてね！
            </div>
          </span>
          <a href="/tutorial/stamp">
            <Button
              variant="primary"
              className="shadow-[0_0_10px_rgba(255,255,255,0.5)] text-lg font-bold rounded-full"
            >
              やってみた！
            </Button>
          </a>
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
    year,
    setNickname,
    setSuffix,
    setYear,
  }
}
