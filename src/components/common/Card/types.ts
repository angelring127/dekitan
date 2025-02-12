export type CardVariant = 'point' | 'text'

export interface BaseCardProps {
  className?: string
  children?: React.ReactNode
}

export interface PointCardProps extends BaseCardProps {
  variant: 'point'
  title: string
  point: number
}

export interface TextCardProps extends BaseCardProps {
  variant: 'text'
  headerText: string
  bodyText: string
  headerColor?: 'green' | 'red' | 'purple'
  headerClassName?: string
}

export type CardProps = PointCardProps | TextCardProps
