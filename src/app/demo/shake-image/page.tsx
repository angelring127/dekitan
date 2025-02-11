'use client'

import Image from 'next/image'

export default function ShakeImageDemo() {
  return (
    <div className="mx-auto flex h-[844px] w-[390px] flex-col items-center overflow-hidden bg-[url('/images/messages/bg_message.png')] bg-cover bg-center bg-no-repeat">
      {/* 헤더 */}
      <div className="flex w-full justify-end p-6">
        <button
          className="flex h-24 w-24 items-center justify-center"
          onClick={() => window.history.back()}
          aria-label="뒤로가기"
        >
          <img src="/images/ic_back.png" alt="뒤로가기" className="h-24 w-24" />
        </button>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex w-full flex-1 flex-col items-center -mt-0">
        <div className="animate-shake">
          <Image
            src="/images/img_omikuji.png"
            alt="오미쿠지"
            width={300}
            height={300}
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  )
}
