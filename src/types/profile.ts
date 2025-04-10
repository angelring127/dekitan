export interface Profile {
  id: number
  nickname: string
  role: number
  honorific_title: number
}

export interface ProfileListResponse {
  status: number
  message: string
  data: {
    list: Profile[]
  }
}

export interface ProfileState {
  profiles: Profile[]
  currentProfile: Profile | null
  isLoading: boolean
  error: string | null
  lastFetchTime: number
  fetchProfiles: (force?: boolean) => Promise<void>
  setCurrentProfile: (profile: Profile) => void
}
