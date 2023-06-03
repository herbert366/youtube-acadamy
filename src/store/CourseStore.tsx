import { Course } from '../utils/@types/_Course'
import { create } from 'zustand'

interface MyState {
  courseIdSelected: Course['id']
  setCourseIdSelected: (courseId: Course['id']) => void
}

export const useCourseStore = create<MyState>()(set => ({
  courseIdSelected: 1,
  setCourseIdSelected: courseId => {
    set({ courseIdSelected: courseId })
  },
}))
