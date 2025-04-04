'use client'

import { Button } from '@/components/common/Button'
import { useEffect, useRef, useState } from 'react'
import { InformationPanel } from '@/components/common/InformationPanel'

const notifications = [
  { date: '2024.12.19', title: 'メンテナンスのお知らせ', detail: 'メンテナンスのお知らせ詳細' },
  { date: '2024.12.05', title: 'アワード受賞のお知らせ', detail: 'アワード受賞のお知らせ詳細' },
]

export default function Home() {
  const [dialogContent, setDialogContent] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect((): void => {
    const dialogElement = dialogRef.current
    if (!dialogElement) {
      return
    }
    if (isOpen) {
      if (dialogElement.hasAttribute('open')) {
        return
      }
      dialogElement.showModal()
    } else {
      if (!dialogElement.hasAttribute('open')) {
        return
      }
      dialogElement.close()
    }
  }, [isOpen])

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid gap-6 items-center">
          <div className="flex justify-evenly">
            <Button className="min-w-[150px]">新しくはじめる</Button>
            <Button className="min-w-[150px]">ログイン</Button>
          </div>
          <div className="flex flex-col gap-6">
            <InformationPanel
              items={[{ id: 'title', content: 'ワクワクワールドって何？' }]}
              className="w-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px] border-2 border-solid"
              currentIndex={0}
            />
            ワクワクワールドは～。
            <div className="flex justify-end">
              <a href="">
                <Button className="w-[150px]">詳しく見る</Button>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <InformationPanel
              items={[{ id: 'title', content: 'お知らせ' }]}
              className="w-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px] border-2 border-solid"
              currentIndex={0}
            />
            {notifications.map((item) => {
              return (
                <div
                  key={item.date}
                  onClick={() => {
                    setDialogContent(item.detail)
                    setIsOpen(true)
                  }}
                >
                  <p>{item.date}</p>
                  <p>{item.title}</p>
                </div>
              )
            })}
            <dialog ref={dialogRef} className="max-w-[430px] w-[80%]">
              <div>
                <div className="">
                  <button onClick={() => setIsOpen(false)}>×</button>
                </div>
                <div>{dialogContent}</div>
              </div>
            </dialog>
            <div className="flex justify-end">
              <a href="">
                <Button className="w-[150px]">お知らせ一覧へ</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
