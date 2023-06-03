import { Course } from '../utils/@types/_Course'
import { myUseQuery } from './myUseQuery'

export const useCourses = () => {
  const crudFuncs = myUseQuery<Course>({
    singularLabel: 'course',
    pluralLabel: 'courses',
  })

  return crudFuncs
}
