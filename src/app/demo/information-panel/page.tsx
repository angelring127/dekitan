'use client'

import { useState } from 'react'
import { InformationPanel } from '@/components/common/InformationPanel'
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

const basicItems = [
  {
    id: '1',
    text: <span className="text-xl font-medium">こんにちは、こうきくん！。\n\n\n テスト</span>,
  },
  {
    id: '2',
    icon: <Heart className="w-5 h-5 text-red-500" />,
    text: 'アイコンとテキストを一緒に表示できます。',
  },
  {
    id: '3',
    icon: <Trophy className="w-5 h-5 text-blue-500" />,
    text: '複数行のテキストも自然に表示されます。このように長いテキストでもうまく動作するかテストしてみましょう。',
  },
]

const tutorialItems = [
  {
    id: 't1',
    icon: <Crown className="w-6 h-6 text-yellow-500" />,
    text: 'ゲームチュートリアルを開始します！',
  },
  {
    id: 't2',
    icon: <Sparkles className="w-6 h-6 text-purple-500" />,
    text: '画面をクリックすると次の説明に進みます。',
  },
  {
    id: 't3',
    icon: <Star className="w-6 h-6 text-blue-500" />,
    text: 'このように順番に情報を表示できます。',
  },
  {
    id: 't4',
    icon: <Heart className="w-6 h-6 text-red-500" />,
    text: 'タイピング効果と組み合わせるとより臨場感があります！',
  },
  {
    id: 't5',
    icon: <Trophy className="w-6 h-6 text-green-500" />,
    text: 'チュートリアルが完了しました。ニックネームを入力して始めましょう！',
  },
]

const achievementItems = [
  {
    id: 'a1',
    icon: <Trophy className="w-6 h-6 text-yellow-500" />,
    text: 'おめでとうございます！新しい実績を達成しました。',
  },
  {
    id: 'a2',
    icon: <Award className="w-6 h-6 text-blue-500" />,
    text: '最初のミッション完了：100ポイント獲得！',
  },
  {
    id: 'a3',
    icon: <Star className="w-6 h-6 text-purple-500" />,
    text: '特別報酬：レアアイテムボックスを獲得しました。開けてみますか？',
  },
]

const levelUpItems = [
  {
    id: 'l1',
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    text: 'レベルアップ！レベル10に到達しました。',
  },
  {
    id: 'l2',
    icon: <Star className="w-6 h-6 text-blue-500" />,
    text: '新しい能力獲得：魔法抵抗力+10',
  },
  {
    id: 'l3',
    icon: <Heart className="w-6 h-6 text-red-500" />,
    text: '体力が増加しました：HP+100',
  },
  {
    id: 'l4',
    icon: <Sparkles className="w-6 h-6 text-purple-500" />,
    text: '新しいスキルを選択してください！',
  },
]

const missionItems = [
  {
    id: 'm1',
    icon: <Target className="w-6 h-6 text-red-500" />,
    text: '新しいミッション：隠された宝物を探せ',
  },
  {
    id: 'm2',
    icon: <Star className="w-6 h-6 text-yellow-500" />,
    text: '目標1：古代の地図の断片3つを収集',
  },
  {
    id: 'm3',
    icon: <Crown className="w-6 h-6 text-blue-500" />,
    text: '目標2：失われた寺院に入場',
  },
  {
    id: 'm4',
    icon: <Trophy className="w-6 h-6 text-purple-500" />,
    text: '目標3：最終ボスを倒す',
  },
  {
    id: 'm5',
    icon: <Award className="w-6 h-6 text-green-500" />,
    text: 'ミッションを受けますか？パーティーメンバーの名前を入力してください。',
  },
]

// テキストのみを含む形式
const textOnlyItems = [
  {
    id: 'text1',
    text: 'テキストのみを含む情報パネルです。',
  },
  {
    id: 'text2',
    text: (
      <span className="text-xl font-medium">アイコンなしでテキストを中央揃えで表示します。</span>
    ),
  },
  {
    id: 'text3',
    text: '複数行のテキストも自然に表示できます。これは長いテキストの例です。',
  },
]

// アイコンリスト形式
const iconListItems = [
  {
    id: 'icon1',
    icon: <Star className="w-5 h-5 text-yellow-500" />,
    text: 'アイコンとテキストが一緒に表示される形式です。',
  },
  {
    id: 'icon2',
    icon: <Heart className="w-5 h-5 text-red-500" />,
    text: '各項目は左のアイコンと右の説明テキストで構成されています。',
  },
  {
    id: 'icon3',
    icon: <Trophy className="w-5 h-5 text-blue-500" />,
    text: 'アイコンはカテゴリーを区別する視覚的要素として使用されます。',
  },
]

// キャラクター紹介シナリオアイテム
const characterItems = [
  {
    id: 'char1',
    icon: <Crown className="w-6 h-6 text-yellow-500" />,
    text: '新しいキャラクターを紹介します！\nこのキャラクターは特別な能力を持っています。このキャラクターは特別な能力を持っています。\nこのキャラクターは特別な能力を持っています。\nこのキャラクターは特別な能力を持っています。\nこのキャラクターは特別な能力を持っています。\nこのキャラクターは特別な能力を持っています。\nこのキャラクターは特別な能力を持っています。\nこのキャラクターは特別な能力を持っています。\nこのキャラクターは特別な能力を持っています。\nこのキャラクターは特別な能力を持っています。',
    image: {
      src: '/images/ic_color_avarta.png',
      alt: 'キャラクターアバター',
      width: 200,
      height: 200,
    },
  },
  {
    id: 'char2',
    icon: <Star className="w-6 h-6 text-blue-500" />,
    text: 'このキャラクターは特別な能力を持っています。',
  },
  {
    id: 'char3',
    icon: <Sparkles className="w-6 h-6 text-purple-500" />,
    text: '一緒に冒険に出かけましょう？',
  },
]

// APNGキャラクターアイテム
const apngCharacterItems = [
  {
    id: 'apng1',
    icon: <Crown className="w-6 h-6 text-yellow-500" />,
    text: 'アニメーション付きのキャラクターです！',
    image: {
      src: '/images/elephant.png',
      alt: 'アニメーションキャラクター',
      width: 200,
      height: 200,
      isApng: true,
      apngControls: {
        autoPlay: true,
        loop: true,
        speed: 1,
      },
    },
  },
  {
    id: 'apng2',
    icon: <Star className="w-6 h-6 text-blue-500" />,
    text: '自動的に動くアニメーションが適用されています。',
  },
  {
    id: 'apng3',
    icon: <Sparkles className="w-6 h-6 text-purple-500" />,
    text: 'APNGフォーマットをサポートし、滑らかなアニメーションを提供します。',
  },
]

// 여백 설정 예제 아이템
const spacingItems = [
  {
    id: 'spacing1',
    icon: <Star className="w-5 h-5 text-yellow-500" />,
    text: '첫 번째 아이템 (기본 여백)',
  },
  {
    id: 'spacing2',
    icon: <Heart className="w-5 h-5 text-red-500" />,
    text: '두 번째 아이템 (큰 상단 여백)',
    spacing: {
      top: 32,
    },
  },
  {
    id: 'spacing3',
    icon: <Trophy className="w-5 h-5 text-blue-500" />,
    text: '세 번째 아이템 (상하단 여백)',
    spacing: {
      top: 24,
      bottom: 24,
    },
  },
  {
    id: 'spacing4',
    text: '네 번째 아이템 (이미지 포함, 커스텀 여백)',
    image: {
      src: '/images/elephant.png',
      alt: '캐릭터 이미지',
      width: 200,
      height: 200,
    },
    spacing: {
      top: 16,
      bottom: 32,
    },
  },
]

export default function InformationPanelDemo() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [achievementIndex, setAchievementIndex] = useState(0)
  const [levelUpIndex, setLevelUpIndex] = useState(0)
  const [missionIndex, setMissionIndex] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [messageValue, setMessageValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [commentValue, setCommentValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [characterIndex, setCharacterIndex] = useState(0)
  const [apngIndex, setApngIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < tutorialItems.length - 1 ? prev + 1 : 0))
  }

  const handleAchievementNext = () => {
    setAchievementIndex((prev) => (prev < achievementItems.length - 1 ? prev + 1 : 0))
  }

  const handleLevelUpNext = () => {
    setLevelUpIndex((prev) => (prev < levelUpItems.length - 1 ? prev + 1 : 0))
  }

  const handleMissionNext = () => {
    setMissionIndex((prev) => (prev < missionItems.length - 1 ? prev + 1 : 0))
  }

  const handleCharacterNext = () => {
    setCharacterIndex((prev) => (prev < characterItems.length - 1 ? prev + 1 : 0))
  }

  const handleApngNext = () => {
    setApngIndex((prev) => (prev < apngCharacterItems.length - 1 ? prev + 1 : 0))
  }

  return (
    <div className="p-4 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">テキストのみを含む形式</h2>
        <InformationPanel items={textOnlyItems} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">アイコンリスト形式</h2>
        <InformationPanel items={iconListItems} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">ボタンを含む形式</h2>
        <InformationPanel
          items={[
            {
              id: 'button1',
              icon: <Crown className="w-5 h-5 text-yellow-500" />,
              text: 'ボタンが含まれた情報パネルです.',
            },
          ]}
          buttonText="確認"
          onButtonClick={() => alert('ボタンがクリックされました!')}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">入力フィールドを含む形式</h2>
        <InformationPanel
          items={[
            {
              id: 'input1',
              icon: <Star className="w-5 h-5 text-purple-500" />,
              text: '入力フィールドが含まれた情報パネルです.',
            },
          ]}
          inputPlaceholder="ここに入力してください"
          inputValue={inputValue}
          onInputChange={setInputValue}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">背景スタイル</h2>
        <div className="space-y-4">
          <InformationPanel
            items={[textOnlyItems[0]]}
            background="white"
            className="bg-gray-100 p-4"
          />
          <InformationPanel
            items={[textOnlyItems[0]]}
            background="transparent"
            className="bg-gray-100 p-4"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">シャドウ効果</h2>
        <div className="space-y-4">
          <InformationPanel items={[basicItems[0]]} withShadow={true} />
          <InformationPanel items={[basicItems[0]]} withShadow={false} />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">順次情報表示</h2>
        <InformationPanel
          items={tutorialItems}
          sequential
          currentIndex={currentIndex}
          onNext={handleNext}
          useTypingEffect
          inputs={
            currentIndex === tutorialItems.length - 1
              ? [
                  {
                    placeholder: 'ニックネームを入力してください',
                    value: nameValue,
                    onChange: setNameValue,
                  },
                ]
              : undefined
          }
          buttons={
            currentIndex === tutorialItems.length - 1
              ? [
                  {
                    text: 'ゲームを開始',
                    variant: 'primary',
                    onClick: () => {
                      if (nameValue.trim()) {
                        alert(`${nameValue}さん, ゲームを開始します!`)
                        setNameValue('')
                        setCurrentIndex(0)
                      } else {
                        alert('ニックネームを入力してください!')
                      }
                    },
                  },
                ]
              : undefined
          }
        />
        <p className="text-sm text-gray-500 mt-2 text-center">
          パネルをクリックして次のメッセージに移動
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">実績達成</h2>
        <InformationPanel
          items={achievementItems}
          sequential
          currentIndex={achievementIndex}
          onNext={handleAchievementNext}
          useTypingEffect
          buttons={
            achievementIndex === achievementItems.length - 1
              ? [
                  {
                    text: 'ボックスを開ける',
                    variant: 'primary',
                    onClick: () => {
                      alert('おめでとうございます！伝説レベルアイテムを獲得しました！')
                      setAchievementIndex(0)
                    },
                  },
                  {
                    text: '後で開ける',
                    variant: 'tertiary',
                    onClick: () => {
                      alert('アイテムをインベントリに保管しました。')
                      setAchievementIndex(0)
                    },
                  },
                ]
              : undefined
          }
        />
        <p className="text-sm text-gray-500 mt-2 text-center">
          パネルをクリックして次のメッセージに移動
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">レベルアップ案内</h2>
        <InformationPanel
          items={levelUpItems}
          sequential
          currentIndex={levelUpIndex}
          onNext={handleLevelUpNext}
          useTypingEffect
          buttons={
            levelUpIndex === levelUpItems.length - 1
              ? [
                  {
                    text: '炎のスキル',
                    variant: 'primary',
                    onClick: () => {
                      alert('炎のスキルを取得しました！')
                      setLevelUpIndex(0)
                    },
                  },
                  {
                    text: '氷の矢のスキル',
                    variant: 'secondary',
                    onClick: () => {
                      alert('氷の矢のスキルを取得しました！')
                      setLevelUpIndex(0)
                    },
                  },
                  {
                    text: 'ヒーリングスキル',
                    variant: 'tertiary',
                    onClick: () => {
                      alert('ヒーリングスキルを取得しました！')
                      setLevelUpIndex(0)
                    },
                  },
                ]
              : undefined
          }
        />
        <p className="text-sm text-gray-500 mt-2 text-center">
          パネルをクリックして次のメッセージに移動
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">ミッション説明</h2>
        <InformationPanel
          items={missionItems}
          sequential
          currentIndex={missionIndex}
          onNext={handleMissionNext}
          useTypingEffect
          inputs={
            missionIndex === missionItems.length - 1
              ? [
                  {
                    placeholder: 'パーティーメンバーの名前を入力してください',
                    value: nameValue,
                    onChange: setNameValue,
                  },
                ]
              : undefined
          }
          buttons={
            missionIndex === missionItems.length - 1
              ? [
                  {
                    text: 'ミッションを受ける',
                    variant: 'primary',
                    onClick: () => {
                      if (nameValue.trim()) {
                        alert(`${nameValue}さんと一緒にミッションを開始します！`)
                        setNameValue('')
                        setMissionIndex(0)
                      } else {
                        alert('パーティーメンバーの名前を入力してください！')
                      }
                    },
                  },
                  {
                    text: 'ミッションを拒否',
                    variant: 'tertiary',
                    onClick: () => {
                      alert('ミッションを拒否しました。')
                      setMissionIndex(0)
                    },
                  },
                ]
              : undefined
          }
        />
        <p className="text-sm text-gray-500 mt-2 text-center">
          パネルをクリックして次のメッセージに移動
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">複数ボタンを含む形式</h2>
        <InformationPanel
          items={[
            {
              id: 'multi-button1',
              icon: <Crown className="w-5 h-5 text-yellow-500" />,
              text: '複数のボタンが含まれた情報パネルです.',
            },
          ]}
          buttons={[
            {
              text: '確認',
              variant: 'primary',
              onClick: () => alert('確認ボタンがクリックされました!'),
            },
            {
              text: 'キャンセル',
              variant: 'tertiary',
              onClick: () => alert('キャンセルボタンがクリックされました!'),
            },
            {
              text: 'もっと見る',
              variant: 'secondary',
              onClick: () => alert('もっと見るボタンがクリックされました!'),
            },
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">複数入力フィールドを含む形式</h2>
        <InformationPanel
          items={[
            {
              id: 'multi-input1',
              icon: <Star className="w-5 h-5 text-purple-500" />,
              text: '複数の入力フィールドが含まれた情報パネルです.',
            },
          ]}
          inputs={[
            {
              placeholder: '名前を入力してください',
              value: nameValue,
              onChange: setNameValue,
            },
            {
              placeholder: 'メールを入力してください',
              value: emailValue,
              onChange: setEmailValue,
            },
            {
              placeholder: 'メッセージを入力してください',
              value: messageValue,
              onChange: setMessageValue,
            },
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">ボタンと入力フィールドを両方含む形式</h2>
        <InformationPanel
          items={[
            {
              id: 'mixed1',
              icon: <Trophy className="w-5 h-5 text-blue-500" />,
              text: '入力フィールドとボタンが両方含まれた情報パネルです.',
            },
          ]}
          inputs={[
            {
              placeholder: 'メッセージを入力してください',
              value: messageValue,
              onChange: setMessageValue,
            },
          ]}
          buttons={[
            {
              text: '送信',
              variant: 'primary',
              onClick: () => alert(`送信されたメッセージ: ${messageValue}`),
            },
            {
              text: '初期化',
              variant: 'tertiary',
              onClick: () => setMessageValue(''),
            },
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">検索パネルの例</h2>
        <InformationPanel
          items={[
            {
              id: 'search1',
              icon: <Search className="w-5 h-5 text-gray-500" />,
              text: '検索キーワードを入力して検索ボタンをクリックしてください.',
            },
          ]}
          inputs={[
            {
              placeholder: '検索キーワードを入力してください',
              value: searchValue,
              onChange: setSearchValue,
            },
          ]}
          buttons={[
            {
              text: '検索',
              variant: 'primary',
              onClick: () => alert(`検索キーワード: ${searchValue}`),
            },
            {
              text: '初期化',
              variant: 'tertiary',
              onClick: () => setSearchValue(''),
            },
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">コメント入力パネルの例</h2>
        <InformationPanel
          items={[
            {
              id: 'comment1',
              icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
              text: 'コメントを入力して掲示ボタンをクリックしてください.',
            },
          ]}
          inputs={[
            {
              placeholder: 'コメントを入力してください',
              value: commentValue,
              onChange: setCommentValue,
            },
          ]}
          buttons={[
            {
              text: '掲示',
              variant: 'primary',
              onClick: () => {
                alert(`掲示されたコメント: ${commentValue}`)
                setCommentValue('')
              },
            },
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">ログインパネルの例</h2>
        <InformationPanel
          items={[
            {
              id: 'login1',
              icon: <User className="w-5 h-5 text-green-500" />,
              text: 'メールとパスワードを入力してください.',
            },
          ]}
          inputs={[
            {
              placeholder: 'メールを入力してください',
              value: emailValue,
              onChange: setEmailValue,
            },
            {
              placeholder: 'パスワードを入力してください',
              value: passwordValue,
              onChange: setPasswordValue,
            },
          ]}
          buttons={[
            {
              text: 'ログイン',
              variant: 'primary',
              onClick: () => {
                alert(`ログイン試行: ${emailValue}`)
                setEmailValue('')
                setPasswordValue('')
              },
            },
            {
              text: '新規登録',
              variant: 'secondary',
              onClick: () => alert('新規登録ページに移動'),
            },
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">画像を含む形式</h2>
        <InformationPanel
          items={[
            {
              id: 'image1',
              icon: <Star className="w-5 h-5 text-yellow-500" />,
              text: '画像を含む情報パネルです。',
              image: {
                src: '/images/elephant.png',
                alt: 'キャラクターアバター',
                width: 200,
                height: 200,
              },
            },
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">キャラクター紹介シナリオ</h2>
        <InformationPanel
          items={characterItems}
          sequential
          currentIndex={characterIndex}
          onNext={handleCharacterNext}
          useTypingEffect
          buttons={
            characterIndex === characterItems.length - 1
              ? [
                  {
                    text: '冒険を始める',
                    variant: 'primary',
                    onClick: () => {
                      alert('冒険を開始します！')
                      setCharacterIndex(0)
                    },
                  },
                ]
              : undefined
          }
        />
        <p className="text-sm text-gray-500 mt-2 text-center">
          パネルをクリックして次のメッセージに移動
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">APNGアニメーションキャラクター</h2>
        <InformationPanel
          items={apngCharacterItems}
          sequential
          currentIndex={apngIndex}
          onNext={handleApngNext}
          useTypingEffect
          buttons={
            apngIndex === apngCharacterItems.length - 1
              ? [
                  {
                    text: 'アニメーションを再生',
                    variant: 'primary',
                    onClick: () => {
                      setApngIndex(0)
                    },
                  },
                ]
              : undefined
          }
        />
        <p className="text-sm text-gray-500 mt-2 text-center">
          パネルをクリックして次のメッセージに移動
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">여백 설정 예제</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">기본 여백 (16px)</h3>
            <InformationPanel items={[spacingItems[0], spacingItems[1]]} />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">커스텀 여백</h3>
            <InformationPanel items={spacingItems} itemSpacing={24} />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">여백 없음</h3>
            <InformationPanel items={[spacingItems[0], spacingItems[1]]} itemSpacing={0} />
          </div>
        </div>
      </section>
    </div>
  )
}
