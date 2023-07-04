import { YouTubePlayer } from 'youtube-player/dist/types'
import { create } from 'zustand'
import { Lesson } from '../utils/@types/_Lesson'

interface MyState {
  isPaused: boolean
  setIsPaused: (isPause: boolean) => void
  videoTarget: YouTubePlayer | null
  setVideoTarget: (videoTarget: YouTubePlayer) => void
  loaded: boolean
  setLoaded: (loaded: boolean) => void
  inputControlValue: number
  setInputControlValue: (inputValue: number) => void
  currentLesson: Lesson | null
  setCurrentLesson: (currentLesson: Lesson) => void
}

export const useVideoStore = create<MyState>()(set => ({
  isPaused: false,
  setIsPaused: (isPause: boolean) => set({ isPaused: isPause }),
  videoTarget: null,
  setVideoTarget: (videoTarget: YouTubePlayer) => set({ videoTarget }),
  loaded: false,
  setLoaded: (loaded: boolean) => set({ loaded }),
  inputControlValue: 0,
  setInputControlValue: (inputValue: number) =>
    set({ inputControlValue: inputValue }),
  currentLesson: null,
  setCurrentLesson: currentLesson => set({ currentLesson }),
}))
