import { create } from 'zustand'
import { getProfileList } from '@/api/profile'
import { ProfileState } from '@/types/profile'

export const useProfileStore = create<ProfileState>((set, get) => ({
  profiles: [],
  currentProfile: null,
  isLoading: false,
  error: null,
  lastFetchTime: 0, // 마지막 fetch 시간을 저장

  fetchProfiles: async (force = false) => {
    // 이미 로딩 중이면 중복 요청 방지
    if (get().isLoading) return

    // 마지막 fetch로부터 5분이 지나지 않았고, force가 false면 캐시된 데이터 사용
    const now = Date.now()
    if (!force && now - get().lastFetchTime < 5 * 60 * 1000 && get().profiles.length > 0) {
      console.log('캐시된 프로필 데이터 사용')
      return
    }

    set({ isLoading: true, error: null })
    try {
      const profiles = await getProfileList()
      set({
        profiles,
        isLoading: false,
        lastFetchTime: now, // fetch 시간 업데이트
      })

      // プロフィールがあるが、現在のプロフィールがない場合、最初のプロフィールを現在のプロフィールに設定
      if (profiles.length > 0 && !get().currentProfile) {
        set({ currentProfile: profiles[0] })
      }
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'プロフィールリストの取得中にエラーが発生しました。',
        isLoading: false,
      })
    }
  },

  setCurrentProfile: (profile) => {
    set({ currentProfile: profile })
  },
}))
