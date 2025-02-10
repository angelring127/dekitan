import { HTMLAttributes, ReactNode } from 'react'
import { ButtonVariant } from '../Button/types'

export interface InformationItem {
  id: string
  icon?: ReactNode
  text: string | JSX.Element
}

export interface ButtonConfig {
  text: string
  variant?: ButtonVariant
  onClick: () => void
}

export interface InputConfig {
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export interface InformationPanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 情報パネルのアイテムリスト
   */
  items: InformationItem[]
  /**
   * 情報パネルの背景色スタイル
   * @default 'white'
   */
  background?: 'white' | 'transparent'
  /**
   * シャドウ効果の適用有無
   * @default true
   */
  withShadow?: boolean
  /**
   * 角丸のサイズ (px)
   * @default 16
   */
  borderRadius?: number
  /**
   * 内部パディングのサイズ (px)
   * @default 16
   */
  padding?: number
  /**
   * 順次表示の有無
   * @default false
   */
  sequential?: boolean
  /**
   * 順次表示時の現在表示中のアイテムインデックス
   */
  currentIndex?: number
  /**
   * 順次表示時の次のアイテムへの移動イベントハンドラー
   */
  onNext?: () => void
  /**
   * テキストタイピング効果の使用有無
   * @default false
   */
  useTypingEffect?: boolean
  /**
   * ボタン設定リスト
   */
  buttons?: ButtonConfig[]
  /**
   * 入力フィールド設定リスト
   */
  inputs?: InputConfig[]
  /**
   * @deprecated 単一ボタンサポート用（下位互換性）
   */
  buttonText?: string
  /**
   * @deprecated 単一ボタンサポート用（下位互換性）
   */
  onButtonClick?: () => void
  /**
   * @deprecated 単一入力フィールドサポート用（下位互換性）
   */
  inputPlaceholder?: string
  /**
   * @deprecated 単一入力フィールドサポート用（下位互換性）
   */
  inputValue?: string
  /**
   * @deprecated 単一入力フィールドサポート用（下位互換性）
   */
  onInputChange?: (value: string) => void
}
