import { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary'
export type ButtonStyle = 'solid' | 'outline'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  /**
   * 버튼의 종류를 지정합니다.
   * @default 'primary'
   */
  variant?: ButtonVariant
  /**
   * 버튼의 스타일을 지정합니다.
   * @default 'solid'
   */
  style?: ButtonStyle
  /**
   * 버튼의 너비를 100%로 설정합니다.
   * @default false
   */
  fullWidth?: boolean
  /**
   * 버튼의 비활성화 상태를 설정합니다.
   * @default false
   */
  disabled?: boolean
  /**
   * 버튼의 로딩 상태를 설정합니다.
   * @default false
   */
  loading?: boolean
} 