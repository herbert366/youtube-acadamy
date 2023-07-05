import { _Lesson } from './_Data'
import { Lesson } from './_Lesson'

export interface Course {
  id: number
  name: string
  createdAt?: number
  updatedAt?: number
  lessons: Lesson[]
  poster: string
  lastLessonWatchedId: _Lesson['id']
}

export interface CourseCreate extends Omit<Course, 'id'> {
  id?: number
}
