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

export interface LoginResult {
  success: boolean
  message?: string
  errorCode?: number
}

export const login = async (credentials: LoginRequest): Promise<LoginResult> => {
  try {
    console.log('ログイン試行:', credentials)

    // ログインリクエスト
    const response = await axiosInstance.post<LoginResponse>(LOGIN_URL, credentials)

    const { volatile_token, player_id, message } = response.data.data
    console.log('受け取ったトークン:', volatile_token)
    console.log('受け取ったプレイヤーID:', player_id)

    // ステータスコードによる処理
    if (response.data.status === 2000) {
      // ローカルストレージにトークンを保存
      localStorage.setItem('volatile_token', volatile_token)
      localStorage.setItem('player_id', player_id.toString())

      // 保存後の確認
      console.log('保存されたトークン:', localStorage.getItem('volatile_token'))

      // 認証ストアを更新
      useAuthStore.getState().setToken(volatile_token)

      // プレイヤーIDをグローバルストアに保存
      useGlobalStore.getState().setPlayerId(player_id)

      // ユーザー情報をストアに保存
      const { setName, setHonorificTitle } = useGlobalStore.getState() as GlobalState

      // プロフィールリストを取得
      try {
        const profiles = await getProfileList()
        console.log('プロフィールリスト:', profiles)

        // USER_ROLE.PLAYERの項目からidが最小の項目を探す
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

          // ニックネームを設定
          setName(smallestIdProfile.nickname)
          console.log('設定されたニックネーム:', smallestIdProfile.nickname)
          setHonorificTitle(smallestIdProfile.honorific_title)
          console.log('設定されたニックネーム:', smallestIdProfile.nickname)
        } else {
          console.log('プレイヤーロールのプロフィールがありません。')
        }
      } catch (profileError) {
        console.error('プロフィールリスト取得中にエラーが発生しました:', profileError)
      }

      return { success: true }
    } else {
      // ステータスコードによるエラー処理
      const errorCode = response.data.status
      let errorMessage = message || 'ログインに失敗しました。'

      switch (response.data.status) {
        case 4001:
          errorMessage = 'IDまたはパスワードが正しくありません。再度お試しください。'
          break
        case 4002:
          errorMessage = 'アカウントがロックされています。再度お試しください。'
          break
        case 4016:
          errorMessage = 'メール形式が正しくありません。'
          break
        case 4017:
          errorMessage = 'パスワード形式が正しくありません。'
          break
        case 5011:
          errorMessage = 'データベースの更新に失敗しました。'
          break
        default:
          errorMessage = '不明なエラーが発生しました。'
      }

      return {
        success: false,
        message: errorMessage,
        errorCode: errorCode,
      }
    }
  } catch (err) {
    console.error('ログイン中にエラーが発生しました:', err)
    return {
      success: false,
      message: 'サーバー接続に失敗しました。再度お試しください。',
      errorCode: 5000,
    }
  }
}

export const verifyToken = async (): Promise<boolean> => {
  try {
    const volatile_token = useAuthStore.getState().token
    const player_id = useGlobalStore.getState().playerId

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
    const volatile_token = useAuthStore.getState().token

    if (!volatile_token) {
      console.error('認証トークンがありません。')
    }

    console.log('ログアウト トークン:', volatile_token)
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

// パスワードリセットリクエストタイプ
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
