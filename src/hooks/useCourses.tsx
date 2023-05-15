import { _Course } from '../utils/@types/_Data'
import { myUseQuery } from './myUseQuery'

export const useCourses = () => {
  const crudFuncs = myUseQuery<_Course>({
    singularLabel: 'course',
    pluralLabel: 'courses',
  })

  return crudFuncs
}
