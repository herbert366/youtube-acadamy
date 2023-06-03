import Link from 'next/link'
import DeleteButton from '../core/DeleteButton'
import EditButton from '../core/EditButton'

import { useCourses } from '../hooks/useCourses'
import Poster from '../components/Poster'
interface Props {}

export default function Home({}: Props) {
  const { data: courses } = useCourses().get()
  const deleteCourse = useCourses().delete
  const updateCourse = useCourses().update

  return (
    <div className="flex items-center min-h-[92.6vh] min-w-full flex-col">
      <Poster src="https://images8.alphacoders.com/107/thumb-1920-1074175.png" />
      <main className="w-[90%] space-y-5 mt-5">
        <h1 className="text-5xl font-bold">Courses:</h1>
        <div className="flex flex-wrap p-6 gap-6 bg-zinc-800  h-fit">
          {courses?.map((course, i) => (
            <div className="group relative">
              <DeleteButton
                onDelete={() => {
                  deleteCourse(course.id)
                }}
              />
              <EditButton
                title="Edit course"
                data={{
                  name: { initialValue: course.name, type: 'text' },
                  poster: { initialValue: course.poster, type: 'text' },
                }}
                onSubmit={data => {
                  updateCourse(course.id, data)
                }}
              />
              <Link href={'/course/' + course.id}>
                <div className="w-52 bg-slate-700 min-h-full text-xl">
                  <img src={course.poster} alt="" className="w-full" />
                  <div
                    className="flex justify-center items-center   text-center  rounded-xl"
                    key={i}
                  >
                    <h2>{course.name}</h2>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
