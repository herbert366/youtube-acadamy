import Link from 'next/link'
import CreateButton from '../core/CreateButton'
import DeleteButton from '../core/DeleteButton'
import EditButton from '../core/EditButton'
import { useCourses } from '../hooks/useCourses'
interface Props {}

export default function Home({}: Props) {
  const { data: courses } = useCourses().get()
  const createCourse = useCourses().create
  const deleteCourse = useCourses().delete
  const updateCourse = useCourses().update

  return (
    <div className="flex items-center min-h-[92.6vh] min-w-full flex-col">
      <main className="w-[90%] space-y-5 mt-5">
        <CreateButton
          data={{
            name: { initialValue: '', type: 'text' },
            poster: { initialValue: '', type: 'text' },
          }}
          title="Add course"
          onSubmit={v => {
            createCourse(v)
          }}
        />
        <h1 className="text-3xl font-bold">Courses:</h1>
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
