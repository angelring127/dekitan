import { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary'
export type ButtonStyle = 'solid' | 'outline'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  /**
   * ボタンの種類を指定します。
   * @default 'primary'
   */
  variant?: ButtonVariant
  /**
   * ボタンのスタイルを指定します。
   * @default 'solid'
   */
  style?: ButtonStyle
  /**
   * ボタンの幅を100%に設定します。
   * @default false
   */
  fullWidth?: boolean
  /**
   * ボタンの無効状態を設定します。
   * @default false
   */
  disabled?: boolean
  /**
   * ボタンのローディング状態を設定します。
   * @default false
   */
  loading?: boolean
} 