import { _Lesson } from '../utils/@types/_Data'
import { myUseQuery } from './myUseQuery'

export const useLessons = () => {
  const crudFuncs = myUseQuery<_Lesson>({
    singularLabel: 'lesson',
    pluralLabel: 'lessons',
  })

  return crudFuncs
}
