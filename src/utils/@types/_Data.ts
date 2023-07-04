import { Lesson } from './_Lesson'

export type _Lesson = Lesson
// {
//   id: number
//   course_id: number
//   videoId: string
//   name: string
//   progress?: number
// }

export type _Module = {}

export type _Course = {
  id: number
  name: string
  lessons: _Lesson[]
  poster: string
}

export type _Data = {
  courses: _Course[]
}
