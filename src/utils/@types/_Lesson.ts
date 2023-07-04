export interface Lesson {
  id: number
  course_id?: number
  videoId: string
  name: string
  progress?: number
  url?: string
  thumbnailUrl?: string
  publishedAt: number
  createdAt?: number
  updatedAt?: number
  startTime?: number
  endTime?: number
}
export interface LessonCreate extends Omit<Lesson, 'id'> {
  id?: number
}
