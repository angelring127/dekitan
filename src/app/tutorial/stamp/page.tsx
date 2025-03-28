'use client'

import Link from 'next/link'
import Image from 'next/image'
import ImageViewer from '@/components/common/ImageViewer'
import { memo, useState } from 'react'
import { InformationPanel } from '@/components/common/InformationPanel'
import { Button } from '@/components/common/Button'
import { Radius } from 'lucide-react'
import { TypewriterText } from '@/components/common/TypewriterText'
import { EmphasisConfig } from '@/components/common/ImageViewer/types'

const textItems = [
  {
    id: 'text',
    content: (
      <div className="flex flex-col items-center w-full px-4">
        こうきくん、できたんだね！<br/>やったー！<br/>すごい、すごーい！
      </div>
    ),
  },
  {
    id: 'text2',
    content: (
      <div className="flex flex-col items-center w-full px-4">
        「︎できた」の原石が<br/>みつかったよ！<br/>おうちの人にみてもらおうよ！
      </div>
    ),
  },
  {
    id: 'text3',
    content: 'ねぇ、ねぇ！こうきくん、\n「はなうた」ができたんだよ！\nすごいよね！',
  },
  {
    id: 'text4',
    content: 'こうきくん、やったね！\nパワーがチャージされたよ！\nぼくもうれしい！',
  },
  {
    id: 'text5',
    content: 'げんせきのエネルギーが\n100ポイントあつまると、すてきなアイテムがはつめいできるんだ！\nきょうはとくべつにパワーをあげるよ！',
  },
]

const CardDemo = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isStamp, setIsStamp] = useState(false)
  const [isScore, setIsScore] = useState(0)
  const handleNext = () => {
    setCurrentIndex(currentIndex != 2 && currentIndex != 4 ? currentIndex + 1 : currentIndex)
  }

  const stampEmphasis: EmphasisConfig = {
    type: 'shine',
    duration: 1500,
    repeat: 0,
  }

  const gensekiEmphasis: EmphasisConfig = {
    type: 'shine',
    duration: 1500,
    repeat: 0,
  }

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const selectScore = async (score: number) => {
    setIsScore(score)
    await sleep(1000)

    setCurrentIndex(currentIndex + 1)
  }

  return (
    <div style={{ backgroundImage: `url('/images/messages/bg_message.png')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="mx-auto min-h-screen">
        <main className="p-4">
          <section className="mb-8" aria-labelledby="point-card-section">
            <div className='mx-auto h-auto'>
              {
                !isStamp && <Image
                  src="/images/circle.png"
                  alt="Stamp"
                  width={400}
                  height={400}
                  className="mx-auto h-auto mb-5"
                  onClick={() => setIsStamp(true)}
                />
              }
              {
                (isStamp && currentIndex == 0) && <ImageViewer
                  src="/images/circle_stamp.png"
                  alt="Stamp"
                  width={400}
                  height={400}
                  // className="mx-auto h-auto mb-5 animate-stamp"
                  className={`${
                    currentIndex == 0
                      ? 'mx-auto h-auto mb-5 animate-stamp'
                      : 'mx-auto h-auto mb-5 animate-stamp'
                  }`}
                  emphasisAnimation={stampEmphasis}
                />
              }
              {
                currentIndex != 0 && <ImageViewer
                  src="/images/gensekiok.png"
                  alt="Stamp"
                  width={400}
                  height={400}
                  className="mx-auto h-auto mb-5 animate-fade-in-up"
                  emphasisAnimation={gensekiEmphasis}
                />
              }
            </div>
            <div className="mx-auto h-auto">
              {
                isStamp && <InformationPanel
                  items={textItems}
                  sequential
                  currentIndex={currentIndex}
                  onNext={handleNext}
                  useTypingEffect
                  className="block mb-5"
                />
              }
              {
                currentIndex == 1 && <div className="mx-auto max-w-[320px] text-center flex flex-col gap-3">
                  <Button className="rounded-full" onClick={handleNext}>みてもらう</Button>
                  <Button className="rounded-full" onClick={handleNext}>あとでみてもらう</Button>
                </div>
              }
              {
                currentIndex == 2 && <div className="mx-auto flex flex-col gap-3 max-w-[320px] text-center">
                  <Button className="rounded-full" onClick={() => selectScore(3)}>
                    めちゃすごい！ 3pt
                    {isScore == 3 && <Image
                      src="/images/ic_great_job_circle.png"
                      alt="Stamp"
                      width={85}
                      height={85}
                      style={{position: 'absolute', right: 0, left: 250, margin: 'auto'}}
                      className="animate-stamp"
                    />}
                  </Button>
                  <Button className="rounded-full" onClick={() => selectScore(2)}>
                    グッド！ 2pt
                    {isScore == 2 && <Image
                      src="/images/ic_great_job_circle.png"
                      alt="Stamp"
                      width={85}
                      height={85}
                      style={{position: 'absolute', right: 0, left: 250, margin: 'auto'}}
                      className="animate-stamp"
                    />}
                  </Button>
                  <Button className="rounded-full" onClick={() => selectScore(1)}>
                    がんばったね！ 1pt
                    {isScore == 1 && <Image
                      src="/images/ic_great_job_circle.png"
                      alt="Stamp"
                      width={85}
                      height={85}
                      style={{position: 'absolute', right: 0, left: 250, margin: 'auto'}}
                      className="animate-stamp"
                    />}
                  </Button>
                </div>
              }
              {
                currentIndex == 3 && <div className="mx-auto flex flex-col gap-3 max-w-[320px] text-center">
                  <Button className="rounded-full" onClick={() => setCurrentIndex(currentIndex + 1)}>次へ</Button>
                </div>
              }
              {
                currentIndex == 4 && <div className="mx-auto flex flex-col gap-3 max-w-[320px] text-center">
                  <a href='/tutorial/gacha'>
                    <Button className="rounded-full">原石をつかう</Button>
                  </a>
                </div>
              }
            </div>
          </section>
        </main>
      </div>
    </div>
  )
})

CardDemo.displayName = 'CardDemo'

export default CardDemo
