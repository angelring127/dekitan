import { create } from 'zustand'
import { getProfileList } from '@/api/profile'
import { Profile, ProfileState } from '@/types/profile'

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

      // 프로필이 있지만 현재 프로필이 없는 경우 첫 번째 프로필을 현재 프로필로 설정
      if (profiles.length > 0 && !get().currentProfile) {
        set({ currentProfile: profiles[0] })
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : '프로필 목록을 가져오는 중 오류가 발생했습니다.',
        isLoading: false,
      })
    }
  },

  setCurrentProfile: (profile) => {
    set({ currentProfile: profile })
  },
}))
