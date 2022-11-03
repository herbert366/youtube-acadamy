export type _Lesson = {
  id: string
  name?: string
}

export type _Course = {
  name: string
  lessons: _Lesson[]
}

export type _Data = {
  courses: _Course[]
}
