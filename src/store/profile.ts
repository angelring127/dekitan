import { create } from 'zustand'
import { getProfileList } from '@/api/profile'
import { ProfileState } from '@/types/profile'

export const useProfileStore = create<ProfileState>((set, get) => ({
  profiles: [],
  currentProfile: null,
  isLoading: false,
  error: null,

  fetchProfiles: async () => {
    set({ isLoading: true, error: null })
    try {
      const profiles = await getProfileList()
      set({ profiles, isLoading: false })

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
