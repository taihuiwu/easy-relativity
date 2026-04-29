import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SettingsState {
  theme: 'light' | 'dark' | 'system'
  language: 'zh' | 'en'
  showAnimations: boolean
  particleQuality: 'low' | 'medium' | 'high'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setLanguage: (language: 'zh' | 'en') => void
  setShowAnimations: (show: boolean) => void
  setParticleQuality: (quality: 'low' | 'medium' | 'high') => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      language: 'zh',
      showAnimations: true,
      particleQuality: 'medium',

      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setShowAnimations: (showAnimations) => set({ showAnimations }),
      setParticleQuality: (particleQuality) => set({ particleQuality }),
    }),
    {
      name: 'relativity-settings',
    }
  )
)
