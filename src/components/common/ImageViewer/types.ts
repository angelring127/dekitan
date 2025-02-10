export type AnimationType = 'fade' | 'slide' | 'scale'
export type SlideDirection = 'up' | 'down' | 'left' | 'right'
export type EmphasisType = 'pulse' | 'shine' | 'shake'
export type TimingFunction = 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear'

export interface AnimationConfig {
  type: AnimationType
  duration?: number // ms
  delay?: number // ms
  timingFunction?: TimingFunction
  repeat?: number // 0 = infinite
  slideDirection?: SlideDirection
}

export interface EmphasisConfig {
  type: EmphasisType
  duration?: number // ms
  delay?: number // ms
  timingFunction?: TimingFunction
  repeat?: number // 0 = infinite
}

export interface APNGConfig {
  repeat?: number // 0 = infinite, 1-100
  speed?: number // 0.1-2.0
  autoPlay?: boolean
}

export interface ImageViewerProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  isAPNG?: boolean
  apngConfig?: APNGConfig
  entranceAnimation?: AnimationConfig
  emphasisAnimation?: EmphasisConfig
  onLoad?: () => void
  onClick?: () => void
  onDragStart?: (e: React.DragEvent) => void
  onDragEnd?: (e: React.DragEvent) => void
  onDrop?: (e: React.DragEvent) => void
}
