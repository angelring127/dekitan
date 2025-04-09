import axios from 'axios'

// 세션 토큰을 가져오는 함수
const getSessionToken = () => {
  try {
    // localStorage에서 토큰 가져오기
    const token = localStorage.getItem('volatile_token')

    // 토큰이 없으면 콘솔에 경고 출력
    if (!token) {
      console.warn('세션 토큰이 없습니다. 로그인이 필요합니다.')
    }

    return token
  } catch (error) {
    console.error('세션 토큰을 가져오는 중 오류가 발생했습니다:', error)
    return null
  }
}

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true, // 쿠키를 포함하여 요청을 보냅니다
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    // 세션 토큰이 있으면 헤더와 본문에 추가
    const sessionToken = getSessionToken()
    if (sessionToken) {
      // 헤더에는 my_token으로 추가
      config.headers['my_token'] = sessionToken

      // 요청 본문에는 volatile_token으로 추가
      if (config.data && typeof config.data === 'object') {
        config.data.volatile_token = sessionToken
      }
    } else {
      // 세션 토큰이 없는 경우 경고 출력
      console.warn('세션 토큰이 없어 API 요청이 실패할 수 있습니다.')
    }

    return config
  },
  (error) => {
    console.error('요청 인터셉터 오류:', error)
    return Promise.reject(error)
  }
)

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답 헤더에서 쿠키 확인
    const setCookieHeader = response.headers['set-cookie']
    if (setCookieHeader) {
      console.log('서버가 설정한 쿠키:', setCookieHeader)
    }

    return response
  },
  (error) => {
    // 401 Unauthorized 또는 403 Forbidden 오류 처리
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // 세션 만료 또는 인증 오류 처리
      localStorage.removeItem('volatile_token')
      localStorage.removeItem('player_id')

      // 로그인 페이지로 리다이렉트
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
