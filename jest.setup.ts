import '@testing-library/jest-dom'

// 필요한 경우 추가 전역 설정을 여기에 작성
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveStyle: (style: Record<string, any>) => R
      toBeVisible: () => R
      toBeInTheDocument: () => R
    }
  }
} 