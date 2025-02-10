export type MessageDirection = 'left' | 'right'

export type MessageType = 'default' | 'system' | 'selection' | 'input'

// 메시지 데이터 타입
export interface Message {
  type: 'intro' | 'selection' | 'input' | 'left' | 'right'
  message: string
  showCharacter?: boolean
  options?: Array<{
    label: string
    value: string
    onClick: () => void
  }>
  placeholder?: string
}

export interface MessageCloudProps {
  /** 메시지 내용 */
  message: string
  /** 메시지 방향 (왼쪽/오른쪽) */
  direction?: MessageDirection
  /** 메시지 타입 */
  type?: MessageType
  /** 배경색 */
  backgroundColor?: string
  /** 텍스트 색상 */
  textColor?: string
  /** 테두리 스타일 */
  borderStyle?: string
  /** 모서리 반경 */
  borderRadius?: string
  /** 꼬리 크기 */
  tailSize?: number
  /** 꼬리 위치 */
  tailPosition?: number
  /** 최대 너비 (기본값: 70%) */
  maxWidth?: string
  /** 최소 높이 (기본값: 48px) */
  minHeight?: string
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void
  /** 롱프레스 이벤트 핸들러 */
  onLongPress?: () => void
  /** 선택형 버튼 옵션 */
  selectionOptions?: Array<{
    label: string
    value: string
    onClick: () => void
  }>
  /** 입력 필드 placeholder */
  inputPlaceholder?: string
  /** 입력 전송 핸들러 */
  onInputSubmit?: (value: string) => void
  /** 애니메이션 효과 */
  animation?: {
    fadeIn?: boolean
    fadeOut?: boolean
    typing?: boolean
  }
  /** 접근성 레이블 */
  ariaLabel?: string
}
