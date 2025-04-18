import { useEffect, useRef, useState } from 'react'
import type { InformationItem } from '@/components/common/InformationPanel/types'
import { TypewriterText } from '@/components/common/TypewriterText'
import Image from 'next/image'
import { Button } from '@/components/common/Button'
import { useGlobalStore } from '@/store/info'
import CustomSelect from '@/components/common/Select/Index'
// import { BrowserRouter,useNavigate } from "react-router-dom";
// import { useRouter } from 'next/navigation'
import { PLAYER_HONORIFIC_TITLE, PLAYER_SCHOOLING } from '@/constants'

export const useInitialItems = (onNext: () => void, onOmikuji?: () => void) => {
  const [nickname, setNickname] = useState('')
  const [suffix, setSuffix] = useState('くん')
  const [year, setYear] = useState('')
  // const [omikuji, setOmikuji] = useState(0)
  const { childinfo, setChildInfo } = useGlobalStore()
  // const router = useRouter()
  // const omikujiItem = [
  //   {'omikuji':"鼻歌",'theme': 'はなうた', 'comment': (
  //     <div className="text-center">
  //       <div style={{marginTop: '15px'}}>
  //         空を見上げてゆったりした
  //         時間を過ごしてみるといいかも
  //         何か見つけたらラッキー！
  //       </div>
  //       <div style={{marginTop: '15px'}}>
  //         おもしろい形の雲があったら
  //         <p className='color-red'>小吉</p>
  //       </div>
  //       <div style={{marginTop: '15px'}}>
  //         飛んでいるものを
  //         見つけるもよし
  //       </div>
  //       <div style={{marginTop: '15px'}}>
  //         一番星を家族とさがすもよし
  //       </div>
  //     </div>
  //   )},
  //   {'omikuji':"空",'theme': '空にあるもの'},
  // ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onNext()
  }

  const handleNickName = (value: string) => {
    setNickname(value)
    setChildInfo('name', value)
  }
  const handleSuffix = (value: string) => {
    setSuffix(value)
    setChildInfo('suffix', value)
  }
  const handleSchoolYear = (value: string) => {
    setYear(value)
    setChildInfo('schoolYear', value)
  }

  const parentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateHeight = () => {
      if (parentRef.current) {
        const height = parentRef.current.clientHeight
        parentRef.current.style.setProperty('--parent-height', `${height}px`)
      }
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)

    setChildInfo('suffix', 'くん')

    return () => {
      window.removeEventListener('resize', updateHeight)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const containerRef = useRef<HTMLDivElement>(null)

  const smoothScrollTo = () => {
    setTimeout(() => {
      const duration = 15000
      const targetPosition = 900
      if (!containerRef.current) return

      const start = containerRef.current.scrollTop
      const startTime = performance.now()

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeInOut =
          progress < 0.5 ? 2 * progress ** 2 : 1 - Math.pow(-2 * progress + 2, 2) / 2

        if (containerRef.current) {
          containerRef.current.scrollTop = start + easeInOut * (targetPosition - start)
        }

        if (progress < 1) {
          requestAnimationFrame(animateScroll)
        }
      }

      requestAnimationFrame(animateScroll)
    }, 3000)
  }

  const items: InformationItem[] = [
    {
      id: 'input',
      content: (
        <form
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
          className="flex h-full w-full flex-col items-center justify-between gap-6"
        >
          <div className="flex w-full flex-col items-center gap-3">
            <TypewriterText
              text="まずはやってみよう"
              className="font-bold text-xl text-green-800"
            />
            <div className="border mx-auto mb-4" style={{ borderColor: '#2f855a' ,width:'95%' }}></div>

            <div className="flex flex-col">
              <div className="space-y-2 ">
                <label htmlFor="nickname" style={{ backgroundColor: '#2f855a', borderRadius: '5px',fontSize:'12px', width: '150px' }} className="text-white font-semibold px-6 py-2 text-center mx-auto block">
                  ニックネーム
                </label>
                <div className='flex gap-2'>
                  <input
                    id="nickname"
                    type="text"
                    value={nickname}
                    onChange={(e) => handleNickName(e.target.value)}
                    maxLength={8}
                    className="w-full font-semibold text-center border-2 rounded-md"
                    style={{ borderColor: '#00803a' ,outline:'none', height:'45px' }}
                    aria-label="ニックネームを入力"
                  />


                  <CustomSelect
                    options={PLAYER_HONORIFIC_TITLE}
                    value={suffix}
                    onChange={handleSuffix}
                  />

                </div>

              </div>

              <div className="justify-center mt-10 ">
                <label style={{ backgroundColor: '#2f855a', borderRadius: '5px', fontSize: '14px', width: '150px' }} className="text-white px-6 py-2 font-semibold text-center  mx-auto block mb-3">
                  学年
                </label>
                <div className="flex flex-col items-center">

                  <CustomSelect
                    options={PLAYER_SCHOOLING}
                    value={year}
                    width='150px'
                    onChange={handleSchoolYear}
                  />

                  <span className="text-xs p-2 mt-6 bg-gray-300 font-semibold text-center">
                    ※学年は後からの変更はできませんのでご注意ください。
                  </span>
                </div>
              </div>
            </div>
          </div>
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
          <div className="text-center">
            コクヨが提供する、子どもの「できた！」の発見・体験・応援サイクルのためのアプリです。
          </div>
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
        <div
          className="flex h-full w-full flex-col items-center justify-between gap-6 p-6"
          ref={parentRef}
        >
          <div
            className="whitespace-pre-line text-xl font-medium text-gray-800 overflow-y-auto scrollbar-hide"
            ref={containerRef}
          >
            <p>ワクワクワールドへようこそ！</p>
            <p>
              こんにちは、{nickname}
              {suffix}！
            </p>
            <div style={{ marginTop: '15px' }}>
              <p>ぼくはできたん。 </p>
              <p>ここは子どもたちの心の中にある、好奇心に満ち溢れた世界。 </p>
              <p>ホメロスが、みんなの「できた！」で創ったんだよ！ </p>
            </div>
            <div style={{ marginTop: '15px' }}>
              <p>
                ぼくはみんなの「できた！見つけ屋さん。みんなの「できた！」を見つけるのが大得意！
              </p>
              <p>まだまだ見習いだけどね。 </p>
            </div>
            <div style={{ marginTop: '15px' }}>
              <p>
                ねぇ、{childinfo.name}
                {childinfo.suffix}、{' '}
              </p>
              <p>最近どんなことできた？！ </p>
            </div>
            <div style={{ marginTop: '15px' }}>
              <p>へえ、すごい！ </p>
              <p>え？何もできてない？ </p>
              <p>思い出せない？ </p>
            </div>
            <div style={{ marginTop: '15px' }}>
              <p>できた！は、生活の中のいろんなところに隠れているんだよ。</p>
            </div>
            <div style={{ marginTop: '15px' }}>
              <h1 className="text-center text-2xl font-bold text-gray-800">
                {childinfo.name}
                {childinfo.suffix}の「できた！」<br></br>
                探しにいこう！
              </h1>
            </div>
            <div style={{ marginTop: '15px' }}>
              <p>
                難しく考えなくても大丈夫。まずは何かを始めてみることが大事だよ。挑戦したこと自体がすでにできた！なんだ。{' '}
              </p>
              <p>きっかけなんてなんでもいいんだ。思いつかないときは、 </p>
              <p>「できたみくじ」できまり！</p>
            </div>

            <div style={{ marginTop: '20px' }} className="text-center">
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
            {/* {omikujiItem[omikuji]['theme']} */}
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
            {/* {omikujiItem[omikuji]['comment']} */}
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
            <div style={{ marginTop: '15px' }}>
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
    smoothScrollTo,
  }
}
