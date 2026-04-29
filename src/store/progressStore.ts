import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ChapterProgress {
  id: number
  completed: boolean
  quizScore: number | null
  lastVisitedSection: number
}

export interface ProgressState {
  currentChapter: number
  chapters: ChapterProgress[]
  totalProgress: number
  setCurrentChapter: (chapterId: number) => void
  completeSection: (chapterId: number, sectionId: number) => void
  completeChapter: (chapterId: number, quizScore: number) => void
  getChapterProgress: (chapterId: number) => ChapterProgress | undefined
  resetProgress: () => void
}

const initialChapters: ChapterProgress[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  completed: false,
  quizScore: null,
  lastVisitedSection: 0,
}))

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      currentChapter: 1,
      chapters: initialChapters,
      totalProgress: 0,

      setCurrentChapter: (chapterId: number) => {
        set({ currentChapter: chapterId })
      },

      completeSection: (chapterId: number, sectionId: number) => {
        set((state) => ({
          chapters: state.chapters.map((chapter) =>
            chapter.id === chapterId
              ? { ...chapter, lastVisitedSection: Math.max(chapter.lastVisitedSection, sectionId) }
              : chapter
          ),
        }))
      },

      completeChapter: (chapterId: number, quizScore: number) => {
        set((state) => {
          const newChapters = state.chapters.map((chapter) =>
            chapter.id === chapterId
              ? { ...chapter, completed: true, quizScore }
              : chapter
          )
          const completedCount = newChapters.filter((c) => c.completed).length
          return {
            chapters: newChapters,
            totalProgress: Math.round((completedCount / 8) * 100),
          }
        })
      },

      getChapterProgress: (chapterId: number) => {
        return get().chapters.find((c) => c.id === chapterId)
      },

      resetProgress: () => {
        set({
          currentChapter: 1,
          chapters: initialChapters,
          totalProgress: 0,
        })
      },
    }),
    {
      name: 'relativity-progress',
    }
  )
)
