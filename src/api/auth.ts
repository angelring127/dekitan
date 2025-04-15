import axiosInstance from './axios'
import { useGlobalStore } from '@/store/info'
import { useAuthStore } from '@/store/auth'
import { AxiosHeaders, AxiosRequestConfig } from 'axios'
import type { GlobalState } from '@/types/info'
import { getProfileList } from './profile'
import { USER_ROLE } from '@/constants'

const LOGIN_URL = '/account/auth/login'
const VERIFY_URL = '/account/auth/verify'
const RESET_PASSWORD_URL = '/account/auth/reset/password'

export interface LoginResponse {
  data: {
    player_id: number
    volatile_token: string
    message: string
    status: number
  }
  status: number
  statusText: string
  headers: AxiosHeaders
  config: AxiosRequestConfig
}

export interface LoginRequest {
  login_id: string
  password: string
}

export const login = async (credentials: LoginRequest): Promise<boolean> => {
  try {
    console.log('ログイン試行:', credentials)

    // ログインリクエスト
    const response = await axiosInstance.post<LoginResponse>(LOGIN_URL, credentials)

    console.log('ログイン応答:', response.data)
    console.log('ログイン応答ヘッダー:', response.headers)

    // 応答ヘッダーからクッキー確認
    const setCookieHeader = response.headers['set-cookie']
    if (setCookieHeader) {
      console.log('ログイン後サーバーが設定したクッキー:', setCookieHeader)
    }

    // クッキー確認
    const cookies = document.cookie.split(';')
    console.log('ログイン後の全てのクッキー:', cookies)

    // セッションクッキー確認 (karenainsworth_session または session)
    const sessionCookie = cookies.find(
      (cookie) =>
        cookie.trim().startsWith('karenainsworth_session=') || cookie.trim().startsWith('session=')
    )

    if (sessionCookie) {
      console.log('ログイン後セッションクッキーが発見されました:', sessionCookie)
    }

    // セッションクッキーが発見された場合のみ、ログイン成功と判断
    if (sessionCookie) {
      const { volatile_token, player_id } = response.data.data
      console.log('受け取ったトークン:', volatile_token)
      console.log('受け取ったプレイヤーID:', player_id)

      // ローカルストレージにトークンを保存
      localStorage.setItem('volatile_token', volatile_token)

      // 保存後確認
      console.log('保存されたトークン:', localStorage.getItem('volatile_token'))

      // 認証ストアを更新
      useAuthStore.getState().setToken(volatile_token)

      // プレイヤーIDをグローバルストアに保存
      useGlobalStore.getState().setPlayerId(player_id)

      // ユーザー情報をストアに保存
      const { setName } = useGlobalStore.getState() as GlobalState

      // プロフィールリストを取得
      try {
        const profiles = await getProfileList()
        console.log('プロフィールリスト:', profiles)

        // USER_ROLE.PLAYERの項目の中でidが最小の項目を探す
        const playerProfiles = profiles.filter((profile) => profile.role === USER_ROLE.PLAYER)

        if (playerProfiles.length > 0) {
          // idが最小の項目を探す
          const smallestIdProfile = playerProfiles.reduce((prev, current) =>
            prev.id < current.id ? prev : current
          )

          console.log('最小IDのプレイヤープロフィール:', smallestIdProfile)

          // player_idを更新
          useGlobalStore.getState().setPlayerId(smallestIdProfile.id)
          console.log('更新されたプレイヤーID:', smallestIdProfile.id)

          // nicknameを設定
          setName(smallestIdProfile.nickname)
          console.log('設定されたニックネーム:', smallestIdProfile.nickname)
        } else {
          console.log('プレイヤーロールのプロフィールがありません。')
        }
      } catch (profileError) {
        console.error('プロフィールリストの取得中にエラーが発生しました:', profileError)
      }

      return true
    }

    console.error('ログイン失敗:', response.data)
    return false
  } catch (err) {
    console.error('ログイン中にエラーが発生しました:', err)
    return false
  }
}

export const verifyToken = async (): Promise<boolean> => {
  try {
    const volatile_token = localStorage.getItem('volatile_token')
    const player_id = localStorage.getItem('player_id')

    if (!volatile_token || !player_id) {
      console.error('認証トークンまたはプレイヤーIDがありません。')
      return false
    }

    // トークン検証リクエスト - トークンはインターセプターで自動的にヘッダーと本文に追加される
    const response = await axiosInstance.post(VERIFY_URL, {
      player_id: Number(player_id),
      // volatile_tokenはインターセプターで自動的に追加される
    })

    console.log('トークン検証応答:', response.data)
    console.log('トークン検証応答ヘッダー:', response.headers)

    // 応答ヘッダーからクッキー確認
    const setCookieHeader = response.headers['set-cookie']
    if (setCookieHeader) {
      console.log('トークン検証後サーバーが設定したクッキー:', setCookieHeader)
    }

    // クッキー確認
    const cookies = document.cookie.split(';')
    console.log('トークン検証後の全てのクッキー:', cookies)

    // セッションクッキー確認 (karenainsworth_session または session)
    const sessionCookie = cookies.find(
      (cookie) =>
        cookie.trim().startsWith('karenainsworth_session=') || cookie.trim().startsWith('session=')
    )

    if (sessionCookie) {
      console.log('トークン検証後セッションクッキーが発見されました:', sessionCookie)
    }

    // 応答ステータスコードに基づいて有効性を判断
    if (response.data.status === 2000) {
      return true
    }

    // 認証トークン関連のエラー処理
    if (response.data.status === 4003 || response.data.status_code === 4004) {
      console.error('認証トークンエラー:', response.data.message)
      localStorage.removeItem('volatile_token')
      localStorage.removeItem('player_id')

      // ログインページにリダイレクト
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }

    return false
  } catch (err) {
    console.error('トークン検証中にエラーが発生しました:', err)
    return false
  }
}

export const logout = async (): Promise<boolean> => {
  try {
    const volatile_token = localStorage.getItem('volatile_token')

    if (!volatile_token) {
      console.error('認証トークンがありません。')
      return false
    }

    // ログアウトリクエスト
    const response = await axiosInstance.post('/account/auth/logout', {
      volatile_token,
    })

    console.log('ログアウト応答:', response.data)

    // ログアウト成功時はローカルストレージを整理
    if (response.data.status === 2000) {
      localStorage.removeItem('volatile_token')
      localStorage.removeItem('player_id')

      // 認証ストアを更新
      useAuthStore.getState().logout()

      return true
    }

    // エラー処理
    if ([4003, 4004, 4008].includes(response.data.status)) {
      console.error('ログアウト中に認証エラーが発生しました:', response.data.message)
      localStorage.removeItem('volatile_token')
      localStorage.removeItem('player_id')

      // 認証ストアを更新
      useAuthStore.getState().logout()

      return true
    }

    console.error('ログアウト失敗:', response.data)
    return false
  } catch (err) {
    console.error('ログアウト中にエラーが発生しました:', err)
    return false
  }
}

// 비밀번호 재설정 요청 타입
export interface ResetPasswordRequest {
  email: string
  nickname: string
}

// 비밀번호 재설정 응답 타입
export interface ResetPasswordResponse {
  status: number
  message: string
  data: Record<string, unknown>
}

// 비밀번호 재설정 API 호출 함수
export const requestPasswordReset = async (
  params: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  try {
    console.log('비밀번호 재설정 요청:', params)
    const response = await axiosInstance.post<ResetPasswordResponse>(RESET_PASSWORD_URL, params)
    console.log('비밀번호 재설정 응답:', response.data)
    return response.data
  } catch (error) {
    console.error('비밀번호 재설정 중 오류가 발생했습니다:', error)
    throw error
  }
}
