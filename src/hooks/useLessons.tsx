import { Lesson } from '../utils/@types/_Lesson'
import { myUseQuery } from './myUseQuery'

export const useLessons = () => {
  const crudFuncs = myUseQuery<Lesson>({
    singularLabel: 'lesson',
    pluralLabel: 'lessons',
  })

  return crudFuncs
}
