# Dekitan

Next.jsをベースにしたモダンウェブアプリケーションプロジェクトです。

## 技術スタック

- **フロントエンドフレームワーク:** Next.js 14
- **言語:** TypeScript
- **スタイリング:** TailwindCSS
- **状態管理:** Zustand
- **UIコンポーネント:** Radix UI
- **API通信:** TanStack Query (React Query)
- **アニメーション:** Framer Motion, React Spring
- **テスト:** Jest, React Testing Library
- **コード品質:** ESLint, Prettier

## プロジェクト構造

```
src/
├── app/           # Next.js 14+ App Routerページ
├── components/    # 再利用可能なUIコンポーネント
├── hooks/         # カスタムReactフック
├── store/         # Zustand状態管理
├── services/      # APIサービスロジック
├── constants/    # 定数値定義
└── lib/          # ユーティリティ関数と設定
```

## はじめに

### 必要要件

- Node.js 18.0.0以上
- npm または yarn または pnpm

### インストール

```bash
# 依存関係のインストール
npm install
# または
yarn install
# または
pnpm install
```

### 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
```

http://localhost:3000 でアプリケーションを確認できます。

## 利用可能なスクリプト

- `npm run dev`: 開発サーバーの起動
- `npm run build`: プロダクション用ビルド
- `npm run start`: プロダクションモードでサーバー起動
- `npm run lint`: ESLintによるコード検査
- `npm run test`: Jestによるテスト実行
- `npm run test:watch`: テスト監視モード実行

## 主な機能

- モダンなUI/UXコンポーネント
- レスポンシブデザイン
- アクセシビリティ対応
- 型安全性
- テスト自動化

## コーディング規約

- コンポーネントは関数コンポーネントで作成
- Propsの型は明示的に定義
- スタイリングはTailwindCSSクラスを使用
- 状態管理はZustandを使用
- 非同期データ処理はTanStack Queryを使用

## コンポーネントガイド

### 1. イメージビューワー (`ImageViewer`)

デモページ: `/demo/image-viewer`

#### 主な機能

- 静的画像表示
- APNGアニメーション対応
- 様々なアニメーション効果
  - 登場: フェードイン、スライド、スケール
  - 強調: パルス、キラキラ、シェイク
- ドラッグ＆ドロップ
- 画像遷移効果

#### 使用例

```tsx
import { ImageViewer } from '@/components/common/ImageViewer';

// 基本使用
<ImageViewer
  src="/images/img_great_job.png"
  alt="お祝いメッセージ"
  animation="pulse"
  duration={1000}
/>

// APNGアニメーション
<ImageViewer
  src="/images/animation.apng"
  alt="アニメーション"
  repeat={3}
  autoPlay
/>
```

### 2. ボタン (`Button`)

デモページ: `/demo/buttons`

#### 種類

- Primary (赤色)
- Secondary (オレンジ色)
- Tertiary (グレー)
- Quaternary (ターコイズ)
- Quinary (紫色)

#### スタイルバリエーション

- 基本型
- アウトライン型
- 全幅/固定幅

#### 使用例

```tsx
import { Button } from '@/components/common/Button';

// 基本ボタン
<Button variant="primary">
  ボタンテキスト
</Button>

// アウトラインボタン
<Button
  variant="secondary"
  outline
  fullWidth
>
  全幅ボタン
</Button>
```

### 3. 情報パネル (`InformationPanel`)

デモページ: `/demo/information-panel`

#### 機能

- 説明カード表示
- 順次情報表示
- アイコンとテキストリスト
- 様々なテキストスタイル

#### 使用例

```tsx
import { InformationPanel } from '@/components/common/InformationPanel';

// 基本情報パネル
<InformationPanel
  items={[
    {
      icon: "🎮",
      text: "ゲームチュートリアル",
      description: "詳細説明"
    }
  ]}
/>

// 順次情報表示
<InformationPanel
  sequential
  items={sequentialItems}
  onComplete={() => console.log('完了')}
/>
```

### 4. メッセージクラウド (`MessageCloud`)

デモページ: `/demo/messages`

#### 機能

- 様々な方向設定
- アニメーション効果
- 絵文字とリンク対応
- 様々なスタイルバリエーション

#### 使用例

```tsx
import { MessageCloud } from '@/components/common/MessageCloud';

// 基本メッセージ
<MessageCloud
  direction="left"
  text="こんにちは！👋"
/>

// システムメッセージ
<MessageCloud
  variant="system"
  text="システム通知です。"
  centered
/>
```

### 5. カード (`Card`)

デモページ: `/demo/cards`

#### 種類

- ポイント/スコアカード
- テキスト表示カード

#### 使用例

```tsx
import { Card } from '@/components/common/Card';

// ポイントカード
<Card
  type="point"
  title="獲得ポイント"
  points={1000}
  stars={3}
/>

// テキストカード
<Card
  type="text"
  headerColor="green"
  headerText="ミッション成功！"
  bodyText="おめでとうございます！"
/>
```

## デモページ構成

各デモページは `/demo` パスで確認でき、以下のような構成になっています：

1. `/demo/image-viewer`

   - 静的画像表示
   - アニメーション効果
   - APNG対応
   - ドラッグ＆ドロップ

2. `/demo/buttons`

   - 全ボタン種類の展示
   - スタイルバリエーション
   - インタラクション効果

3. `/demo/information-panel`

   - 基本情報パネル
   - 順次情報表示
   - 様々なシナリオ

4. `/demo/messages`

   - メッセージクラウド表示
   - 方向設定
   - スタイルバリエーション

5. `/demo/message-cloud`

   - メッセージクラウドコンポーネント専用デモ
   - 方向別メッセージ表示
   - 様々なスタイルバリエーション
   - アニメーション効果

6. `/demo/cards`

   - ポイントカード
   - テキストカード
   - スタイルバリエーション

7. `/demo/shake-image`

   - 画像シェイクアニメーション
   - おみくじシェイク効果
   - アニメーション繰り返し回数設定
   - アニメーション完了後の遷移効果

8. `/demo/init-page`

   - 初期画面デモ
   - 順次情報表示
   - ユーザー情報入力フォーム
   - ウェルカムメッセージシナリオ

9. `/demo/dashboard`
   - ダッシュボードレイアウトデモ
   - ポイントカード表示
   - 実験室エリア実装
   - メニューナビゲーション
   - おみくじセクション

### デモページ共通事項

- **画面サイズ**: モバイル環境最適化 (390x844, iPhone 14基準)
- **レスポンシブ**: デスクトップでモバイルフレーム表示
- **アクセシビリティ**: キーボードナビゲーションとスクリーンリーダー対応
- **インタラクション**: タッチ/クリックイベントとアニメーション効果

## ライセンス

このプロジェクトはMITライセンスに従います。
