'use client'

import Image from 'next/image'
import { Button } from '@/components/common/Button'
import Card from '@/components/common/Card'

export default function DashboardDemo() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white text-black">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0">
          <Image
            src="/images/img_lab.png"
            alt="実験室背景"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 top-[540px]">
          <Image
            src="/images/messages/bg_message.png"
            alt="メッセージ背景"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* 포인트 표시 영역 */}
      <div className="relative z-10 flex gap-3 p-4 pb-[15px]">
        <Card variant="point" title="今の持ちポイント" point={73} className="flex-1" />
        <Card variant="point" title="これまでのポイント" point={124} className="flex-1" />
      </div>

      {/* 실험실 영역 */}
      <div className="relative z-10 h-[340px] w-full">
        <div className="absolute inset-0 flex flex-col items-center justify-between py-[15px]">
          {/* 발명 버튼 */}
          <div className="relative z-10 w-[90%] px-4">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-300 px-4 py-0.5 rounded-full text-center text-xs text-red-500 font-bold whitespace-nowrap shadow-sm">
              発明できるよ！
            </div>
            <Button
              variant="secondary"
              className="w-full h-16 text-xl font-bold rounded-full text-white shadow-[0_4px_0_0_rgba(255,255,255,1)]"
              onClick={() => {}}
            >
              原石を使って発明する
            </Button>
          </div>
          {/* 캐릭터 이미지 */}
          <div className="flex justify-center">
            <Image
              src="/images/img_character.png"
              alt="キャラクター"
              width={160}
              height={160}
              className="mb-[-30px] object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* 메시지 카드 영역 */}
      <div className="relative z-10 px-4 space-y-3 pb-40">
        <Card
          variant="text"
          headerText="できたんと話す"
          headerColor="red"
          bodyText="やってみるをさがす"
          className="w-full text-3xl font-black"
          headerClassName="text-3xl font-black"
        />
        <Card
          variant="text"
          headerText="できた？"
          headerColor="green"
          bodyText="おさらあらい"
          className="w-full text-3xl font-black"
          headerClassName="text-3xl font-black"
        />
        <Card
          variant="text"
          headerText="できた？"
          headerColor="green"
          bodyText="じてんしゃにのる"
          className="w-full text-3xl font-black"
          headerClassName="text-3xl font-black"
        />
        <Card
          variant="text"
          headerText="ハッピーおみくじ"
          headerColor="purple"
          bodyText="空にあるもの"
          className="w-full text-3xl font-black"
          headerClassName="text-3xl font-black"
        />
        <div className="pt-14">
          <Button
            variant="secondary"
            className="w-full h-16 text-xl font-bold rounded-full bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-50"
            onClick={() => {}}
          >
            未承認リスト
          </Button>
        </div>
      </div>
    </div>
  )
}
