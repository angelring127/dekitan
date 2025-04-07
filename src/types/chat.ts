export interface ChatResponse {
  status_code: number
  message: string
  data: {
    messages: string[]
    category?: number
    task_id?: number
  }
}

export interface ChatRequestParams {
  player_id: number
  sequence: number
  category?: number
  volatile_token?: string
}

export interface ChatMessage {
  type: 'input' | 'intro' | 'selection'
  message: string
  showCharacter?: boolean
  nextStep?: number
  direction?: 'left' | 'right'
  title?: string
  options?: {
    label: string
    value: string
    onClick: () => void
  }[]
}
