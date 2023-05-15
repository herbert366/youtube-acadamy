import Link from 'next/link'
import { useState } from 'react'
import CrudForm from '../core/CrudForm'
import { useCourses } from '../hooks/useCourses'

interface Props {}

export default function Home({}: Props) {
  const { data: courses } = useCourses().get()
  const createCourse = useCourses().create
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="flex items-center min-h-[92.6vh] min-w-full flex-col">
      <main className="w-[90%] space-y-5 mt-5">
        {!showModal && (
          <button
            onClick={() => setShowModal(true)}
            className="p-2 bg-red-500 rounded-xl"
          >
            Adicionar Módulo
          </button>
        )}
        {showModal && (
          <CrudForm
            title="Add course"
            data={{
              name: { initialValue: '', type: 'text' },
              poster: { initialValue: '', type: 'text' },
            }}
            onSubmit={v => {
              createCourse(v)
            }}
            onRequestClose={() => setShowModal(false)}
          />
        )}
        <h1 className="text-3xl font-bold">Courses:</h1>
        <div className="flex flex-wrap p-6 gap-6 bg-zinc-800  h-fit">
          {courses?.map((v, i) => (
            <Link href={'/course/' + v.id}>
              <div
                className="flex justify-center items-center  h-52 w-32 text-center bg-slate-700 rounded-xl"
                key={i}
              >
                <h2>{v.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
