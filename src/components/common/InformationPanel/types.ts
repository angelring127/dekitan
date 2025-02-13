export interface InformationPanelPosition {
  top?: number
  left?: number
  right?: number
  bottom?: number
}

export interface InformationPanelSize {
  width?: number | string
  height?: number | string
  maxWidth?: number | string
  maxHeight?: number | string
}

export interface InformationItem {
  id: string
  content: React.ReactNode
  position?: InformationPanelPosition
  size?: InformationPanelSize
  panelPosition?: {
    transform: string
  }
}

export interface InformationPanelProps {
  items: InformationItem[]
  currentIndex: number
  onNext?: () => void
  background?: 'white' | 'transparent'
  withShadow?: boolean
  className?: string
  style?: React.CSSProperties
  height?: number | string
}
