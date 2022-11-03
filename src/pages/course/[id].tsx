import { useState } from 'react'
import Video from '../../components/Video'
import { _Course, _Data, _Lesson } from '../../utils/@types/_Data'

export default function Course({ course }: { course: _Course }) {
  const [vidData, setVidData] = useState<_Lesson>({} as _Lesson)

  return (
    <div className="w-full min-h-screen flex justify-center gap-6 p-6 flex-wrap bg-zinc-900">
      <section className="flex flex-wrap bg-black w-[600px] h-[280px] rounded-xl justify-center overflow-hidden">
        <Video id={vidData.id || course.lessons[0].id} />
        <p>Carregando...</p>
      </section>
      <section className="flex flex-[0.5] p-6 flex-col gap-5 bg-zinc-800 rounded-xl">
        {course.lessons.map((v, i) => (
          <div className="rounded-xl bg-zinc-600 p-2 hover:bg-red-600 hover:cursor-pointer transition-all hover:scale-105 flex gap-2 items-center">
            <span className="bg-zinc-500 rounded-xl px-2 py-1">{i + 1}</span>
            <div className=" " onClick={() => setVidData(v)}>
              {v.name}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export async function getServerSideProps({ query }: any) {
  const response = await fetch('http://localhost:3000/api/data')
  const data: _Data = await response.json()

  return {
    props: { course: data.courses.find(v => v.name === query.id) }, // will be passed to the page component as props
  }
}
