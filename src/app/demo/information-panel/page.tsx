'use client'

import { useState } from 'react'
import { InformationPanel } from '@/components/common/InformationPanel'
import { TypewriterText } from '@/components/common/TypewriterText'
import {
  Star,
  Heart,
  Trophy,
  Sparkles,
  Crown,
  Award,
  Zap,
  Target,
  Search,
  MessageSquare,
  User,
} from 'lucide-react'
import Image from 'next/image'

const createBasicItems = () => [
  {
    id: '1',
    content: (
      <div className="flex flex-col items-center w-full px-4">
        <TypewriterText
          text="こんにちは、こうきくん！"
          className="text-xl font-medium text-black"
        />
      </div>
    ),
  },
  {
    id: '2',
    content: (
      <div className="flex flex-col items-center w-full px-4">
        <TypewriterText
          text="アイコンとテキストを一緒に表示できます。"
          className="text-lg text-black break-keep"
        />
      </div>
    ),
  },
  {
    id: '3',
    content: (
      <div className="flex flex-col items-center w-full px-4">
        <TypewriterText
          text="複数行のテキストも自然に表示されます。このように長いテキストでもうまく動作するかテストしてみましょう。"
          className="text-lg text-black whitespace-pre-wrap break-keep text-center"
        />
      </div>
    ),
  },
]

const createTutorialItems = () => [
  {
    id: 't1',
    content: (
      <div className="flex flex-col items-center w-full px-4">
        <TypewriterText
          text="ゲームチュートリアルを開始します！"
          className="text-lg text-black text-center"
        />
      </div>
    ),
  },
  {
    id: 't2',
    content: (
      <div className="flex flex-col items-center w-full px-4">
        <TypewriterText
          text="画面をクリックすると次の説明に進みます。"
          className="text-lg text-black text-center"
        />
      </div>
    ),
  },
  {
    id: 't3',
    content: (
      <div className="flex flex-col items-center w-full px-4">
        <TypewriterText
          text="このように順番に情報を表示できます。"
          className="text-lg text-black text-center"
        />
      </div>
    ),
  },
]

const createAchievementItems = () => [
  {
    id: 'a1',
    content: (
      <div className="flex items-center gap-2 w-full px-4">
        <TypewriterText
          text="おめでとうございます！新しい実績を達成しました。"
          className="text-lg text-black"
        />
      </div>
    ),
  },
  {
    id: 'a2',
    content: (
      <div className="flex items-center gap-2 w-full px-4">
        <TypewriterText
          text="最初のミッション完了：100ポイント獲得！"
          className="text-lg text-black"
        />
      </div>
    ),
  },
]

const createLevelUpItems = () => [
  {
    id: 'l1',
    content: (
      <div className="flex items-center gap-2 w-full px-4">
        <TypewriterText
          text="レベルアップ！レベル10に到達しました。"
          className="text-lg text-black"
        />
      </div>
    ),
  },
  {
    id: 'l2',
    content: (
      <div className="flex items-center gap-2 w-full px-4">
        <TypewriterText text="新しい能力獲得：魔法抵抗力+10" className="text-lg text-black" />
      </div>
    ),
  },
]

const createMissionItems = () => [
  {
    id: 'm1',
    content: (
      <div className="flex items-center gap-2 w-full px-4">
        <TypewriterText
          text="新しいミッション：隠された宝物を探せ"
          className="text-lg text-black"
        />
      </div>
    ),
  },
  {
    id: 'm2',
    content: (
      <div className="flex items-center gap-2 w-full px-4">
        <TypewriterText text="目標1：古代の地図の断片3つを収集" className="text-lg text-black" />
      </div>
    ),
  },
]

const createCharacterItems = () => [
  {
    id: 'char1',
    content: (
      <div className="flex flex-col items-center gap-4 w-full px-4">
        <TypewriterText
          text="新しいキャラクターを紹介します！"
          className="text-lg text-center text-black"
        />
        <Image
          src="/images/ic_color_avarta.png"
          alt="キャラクターアバター"
          width={200}
          height={200}
          className="mt-4"
        />
      </div>
    ),
    size: {
      height: 300,
    },
  },
  {
    id: 'char2',
    content: (
      <div className="flex flex-col items-center gap-4 w-full px-4">
        <TypewriterText
          text="このキャラクターは特別な能力を持っています。"
          className="text-lg text-center text-black"
        />
      </div>
    ),
  },
]

const createSpacingItems = () => [
  {
    id: 'spacing1',
    content: (
      <div className="flex items-center gap-2 w-full px-4">
        <span className="text-black">最初のアイテム（デフォルトマージン）</span>
      </div>
    ),
    size: {
      height: 200,
    },
  },
  {
    id: 'spacing2',
    content: (
      <div className="flex items-center gap-2 w-full px-4">
        <span className="text-black">2番目のアイテム（大きい上部マージン）</span>
      </div>
    ),
    position: {
      top: 32,
    },
    size: {
      height: 100,
    },
  },
  {
    id: 'spacing3',
    content: (
      <div className="flex items-center gap-2 w-full px-4">
        <span className="text-black">3番目のアイテム（上下マージン）</span>
      </div>
    ),
    position: {
      top: 24,
      bottom: 24,
    },
    size: {
      height: 100,
    },
  },
  {
    id: 'spacing4',
    content: (
      <div className="flex flex-col items-center gap-4 w-full px-4">
        <span className="text-black">4番目のアイテム（画像付き、カスタムマージン）</span>
        <Image src="/images/elephant.png" alt="キャラクター画像" width={200} height={200} />
      </div>
    ),
    position: {
      top: 16,
      bottom: 32,
    },
    size: {
      height: 300,
    },
  },
]

const createPositionItems = () => [
  {
    id: 'pos1',
    content: (
      <div className="flex items-center gap-2">
        <TypewriterText text="標準位置のパネルです。" className="text-lg text-black" />
      </div>
    ),
    panelPosition: {
      transform: 'translateY(0px)',
    },
  },
  {
    id: 'pos2',
    content: (
      <div className="flex items-center gap-2">
        <TypewriterText text="上に50px移動したパネルです。" className="text-lg text-black" />
      </div>
    ),
    panelPosition: {
      transform: 'translateY(-50px)',
    },
  },
  {
    id: 'pos3',
    content: (
      <div className="flex items-center gap-2">
        <TypewriterText text="下に50px移動したパネルです。" className="text-lg text-black" />
      </div>
    ),
    panelPosition: {
      transform: 'translateY(50px)',
    },
  },
  {
    id: 'pos4',
    content: (
      <div className="flex items-center gap-2">
        <TypewriterText text="上に100px移動したパネルです。" className="text-lg text-black" />
      </div>
    ),
    panelPosition: {
      transform: 'translateY(-100px)',
    },
  },
]

const createFixedHeightItems = () => [
  {
    id: 'fixed1',
    content: (
      <div className="flex items-center gap-2">
        <TypewriterText text="コンテンツが少ないパネルです。" className="text-lg text-black" />
      </div>
    ),
  },
  {
    id: 'fixed2',
    content: (
      <div className="flex flex-col items-center gap-4">
        <TypewriterText text="コンテンツが多いパネルです。" className="text-lg text-black" />
        <div className="w-full h-[200px] bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">大きなコンテンツエリア</span>
        </div>
      </div>
    ),
  },
  {
    id: 'fixed3',
    content: (
      <div className="flex items-center gap-2">
        <TypewriterText text="パネルの高さは300pxで固定されます。" className="text-lg text-black" />
      </div>
    ),
  },
]

export default function InformationPanelDemo() {
  const [basicIndex, setBasicIndex] = useState(0)
  const [tutorialIndex, setTutorialIndex] = useState(0)
  const [achievementIndex, setAchievementIndex] = useState(0)
  const [levelUpIndex, setLevelUpIndex] = useState(0)
  const [missionIndex, setMissionIndex] = useState(0)
  const [characterIndex, setCharacterIndex] = useState(0)
  const [apngIndex, setApngIndex] = useState(0)
  const [spacingIndex, setSpacingIndex] = useState(0)
  const [positionIndex, setPositionIndex] = useState(0)
  const [inputButtonIndex, setInputButtonIndex] = useState(0)
  const [fixedHeightIndex, setFixedHeightIndex] = useState(0)

  // 입력 필드 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    hobby: '',
    comment: '',
  })

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }))
    }

  const handleInputButtonNext = () => {
    setInputButtonIndex((prev) => (prev + 1) % createInputButtonItems().length)
  }

  const createInputButtonItems = () => [
    {
      id: 'input1',
      content: (
        <div className="flex flex-col items-center w-full px-4">
          <TypewriterText
            text="ユーザー情報を入力してください"
            className="text-xl font-medium text-black mb-4"
          />
          <div className="w-full max-w-sm space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-black">名前</label>
              <input
                type="text"
                value={formData.name}
                onChange={handleInputChange('name')}
                placeholder="サンプル太郎"
                className="w-full rounded-lg border border-gray-200 px-4 py-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-black">メール</label>
              <input
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                placeholder="example@mail.com"
                className="w-full rounded-lg border border-gray-200 px-4 py-2"
              />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleInputButtonNext()
              }}
              className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors"
            >
              次へ
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'input2',
      content: (
        <div className="flex flex-col items-center w-full px-4">
          <TypewriterText
            text="趣味を教えてください"
            className="text-xl font-medium text-black mb-4"
          />
          <div className="w-full max-w-sm space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-black">趣味</label>
              <input
                type="text"
                value={formData.hobby}
                onChange={handleInputChange('hobby')}
                placeholder="読書、スポーツなど"
                className="w-full rounded-lg border border-gray-200 px-4 py-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-black">コメント</label>
              <textarea
                value={formData.comment}
                onChange={handleInputChange('comment')}
                placeholder="自由にコメントを入力してください"
                className="w-full rounded-lg border border-gray-200 px-4 py-2 h-24 resize-none"
              />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleInputButtonNext()
              }}
              className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors"
            >
              次へ
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'input3',
      content: (
        <div className="flex flex-col items-center w-full px-4">
          <TypewriterText
            text="ありがとうございます！"
            className="text-xl font-medium text-black mb-4"
          />
          <div className="w-full max-w-sm space-y-4">
            <p className="text-black text-center">
              入力が完了しました。
              <br />
              プロファイル設定は後でも変更できます。
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleInputButtonNext()
              }}
              className="w-full rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600 transition-colors"
            >
              完了
            </button>
          </div>
        </div>
      ),
    },
  ]

  const handleBasicNext = () => {
    setBasicIndex((prev) => (prev + 1) % createBasicItems().length)
  }

  const handleTutorialNext = () => {
    setTutorialIndex((prev) => (prev + 1) % createTutorialItems().length)
  }

  const handleAchievementNext = () => {
    setAchievementIndex((prev) => (prev + 1) % createAchievementItems().length)
  }

  const handleLevelUpNext = () => {
    setLevelUpIndex((prev) => (prev + 1) % createLevelUpItems().length)
  }

  const handleMissionNext = () => {
    setMissionIndex((prev) => (prev + 1) % createMissionItems().length)
  }

  const handleCharacterNext = () => {
    setCharacterIndex((prev) => (prev + 1) % createCharacterItems().length)
  }

  const handleSpacingNext = () => {
    setSpacingIndex((prev) => (prev + 1) % createSpacingItems().length)
  }

  const handlePositionNext = () => {
    setPositionIndex((prev) => (prev + 1) % createPositionItems().length)
  }

  const handleFixedHeightNext = () => {
    setFixedHeightIndex((prev) => (prev + 1) % createFixedHeightItems().length)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-[390px] min-h-[844px] overflow-y-auto bg-gray-800 shadow-lg p-4 sm:p-6 md:p-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">基本的な使い方</h2>
            <InformationPanel
              items={createBasicItems()}
              currentIndex={basicIndex}
              onNext={handleBasicNext}
              className="w-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px]"
              background="white"
              withShadow
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">チュートリアル</h2>
            <InformationPanel
              items={createTutorialItems()}
              currentIndex={tutorialIndex}
              onNext={handleTutorialNext}
              className="w-full min-h-[200px]"
              background="white"
              withShadow
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">実績達成</h2>
            <InformationPanel
              items={createAchievementItems()}
              currentIndex={achievementIndex}
              onNext={handleAchievementNext}
              className="w-full min-h-[200px]"
              background="white"
              withShadow
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">レベルアップ</h2>
            <InformationPanel
              items={createLevelUpItems()}
              currentIndex={levelUpIndex}
              onNext={handleLevelUpNext}
              className="w-full min-h-[200px]"
              background="white"
              withShadow
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">ミッション</h2>
            <InformationPanel
              items={createMissionItems()}
              currentIndex={missionIndex}
              onNext={handleMissionNext}
              className="w-full min-h-[200px]"
              background="white"
              withShadow
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">キャラクター紹介</h2>
            <InformationPanel
              items={createCharacterItems()}
              currentIndex={characterIndex}
              onNext={handleCharacterNext}
              className="w-full min-h-[400px]"
              background="white"
              withShadow
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">マージン設定例</h2>
            <InformationPanel
              items={createSpacingItems()}
              currentIndex={spacingIndex}
              onNext={handleSpacingNext}
              className="w-full min-h-[300px]"
              background="white"
              withShadow
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">入力フォーム＆ボタン</h2>
            <InformationPanel
              items={createInputButtonItems()}
              currentIndex={inputButtonIndex}
              className="w-full min-h-[400px]"
              background="white"
              withShadow
            />
          </section>

          <section className="relative h-[500px]">
            <h2 className="text-2xl font-bold mb-4 text-white">パネル 位置 移動 テスト</h2>
            <InformationPanel
              items={createPositionItems()}
              currentIndex={positionIndex}
              onNext={handlePositionNext}
              className="w-full min-h-[200px]"
              background="white"
              withShadow
              style={createPositionItems()[positionIndex].panelPosition}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">固定高さパネル</h2>
            <InformationPanel
              items={createFixedHeightItems()}
              currentIndex={fixedHeightIndex}
              onNext={handleFixedHeightNext}
              className="w-full"
              background="white"
              withShadow
              height={300}
            />
          </section>
        </div>
      </div>
    </div>
  )
}
