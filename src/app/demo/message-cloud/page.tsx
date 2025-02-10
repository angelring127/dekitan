'use client'

import React, { useState } from 'react'
import { MessageCloud } from '@/components/common/MessageCloud'

export default function MessageCloudDemo() {
  const [messages, setMessages] = useState<string[]>([])

  const handleInputSubmit = (value: string) => {
    setMessages((prev) => [...prev, value])
  }

  const selectionOptions = [
    { label: 'オプション 1', value: '1', onClick: () => console.log('オプション 1 選択') },
    { label: 'オプション 2', value: '2', onClick: () => console.log('オプション 2 選択') },
    { label: 'オプション 3', value: '3', onClick: () => console.log('オプション 3 選択') },
  ]

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-[375px] mx-auto bg-gray-900 min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-4rem)] shadow-2xl rounded-2xl overflow-hidden">
        <div className="sticky top-0 z-10 bg-gray-800 border-b border-gray-700 p-4">
          <h1 className="text-2xl font-bold text-white">メッセージクラウドデモ</h1>
        </div>

        <div className="p-4 space-y-8 pb-8">
          {/* 基本機能デモ */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">基本機能</h2>

            <div className="space-y-2">
              <MessageCloud
                message="こんにちは！👋"
                direction="left"
                animation={{ fadeIn: true }}
                ariaLabel="挨拶メッセージ"
                backgroundColor="#4B5563"
                textColor="#FFFFFF"
              />
              <MessageCloud
                message="これは基本メッセージです。"
                direction="right"
                backgroundColor="#3B82F6"
                textColor="#FFFFFF"
                ariaLabel="基本メッセージ"
              />
              <MessageCloud
                message="絵文字もサポートされています！🎉 🎨 🚀"
                direction="left"
                ariaLabel="絵文字メッセージ"
                backgroundColor="#4B5563"
                textColor="#FFFFFF"
              />
              <MessageCloud
                message="https://example.com リンクも自動的に検出されます。"
                direction="right"
                backgroundColor="#3B82F6"
                textColor="#FFFFFF"
                ariaLabel="リンクメッセージ"
              />
            </div>
          </section>

          {/* スタイルバリエーションデモ */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">スタイルバリエーション</h2>

            <div className="space-y-2">
              <MessageCloud
                message="カスタム背景色"
                backgroundColor="#6D28D9"
                textColor="#FFFFFF"
                ariaLabel="カスタム背景色メッセージ"
              />
              <MessageCloud
                message="角丸の調整"
                borderRadius="24px"
                backgroundColor="#065F46"
                textColor="#FFFFFF"
                ariaLabel="角丸メッセージ"
              />
              <MessageCloud
                message="ボーダースタイル"
                borderStyle="2px dashed #60A5FA"
                backgroundColor="transparent"
                textColor="#FFFFFF"
                ariaLabel="ボーダースタイルメッセージ"
              />
            </div>
          </section>

          {/* メッセージタイプデモ */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">メッセージタイプ</h2>

            <div className="space-y-2">
              <MessageCloud
                message="システムメッセージです。"
                type="system"
                backgroundColor="#374151"
                textColor="#FFFFFF"
                ariaLabel="システムメッセージ"
              />
              <MessageCloud
                message=""
                type="input"
                inputPlaceholder="メッセージを入力してください..."
                onInputSubmit={handleInputSubmit}
                backgroundColor="#1F2937"
                textColor="#FFFFFF"
                ariaLabel="入力メッセージ"
              />
              {messages.map((msg, index) => (
                <MessageCloud
                  key={index}
                  message={msg}
                  direction="right"
                  backgroundColor="#3B82F6"
                  textColor="#FFFFFF"
                  ariaLabel={`ユーザーメッセージ ${index + 1}`}
                />
              ))}
              <MessageCloud
                message="オプションを選択してください"
                type="selection"
                selectionOptions={selectionOptions}
                backgroundColor="#1F2937"
                textColor="#FFFFFF"
                ariaLabel="選択メッセージ"
              />
            </div>
          </section>

          {/* アニメーションデモ */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">アニメーション</h2>

            <div className="space-y-2">
              <MessageCloud
                message="フェードイン効果"
                animation={{ fadeIn: true }}
                backgroundColor="#4B5563"
                textColor="#FFFFFF"
                ariaLabel="フェードインメッセージ"
              />
              <MessageCloud
                message="タイピング効果"
                animation={{ typing: true }}
                backgroundColor="#4B5563"
                textColor="#FFFFFF"
                ariaLabel="タイピングメッセージ"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
