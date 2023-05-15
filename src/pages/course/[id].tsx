import { useRouter } from 'next/router'
import { useState } from 'react'
import Video from '../../components/Video'
import CrudForm from '../../core/CrudForm'
import { useLessons } from '../../hooks/useLessons'

export default function Course() {
  const [showForm, setShowForm] = useState(false)
  const router = useRouter()
  const { data: lessons } = useLessons().get({
    params: { course_id: Number(router.query.id as string) },
  })

  const createLesson = useLessons().create

  const [indexSelected, setIndexSelected] = useState(0)

  if (!lessons) return null

  const vidData = lessons[indexSelected]

  return (
    <div className="w-full min-h-[92.6vh] flex justify-center gap-6 p-6 flex-wrap bg-zinc-900">
      <section className="flex flex-[0.6] h-fit flex-wrap bg-zinc-800 rounded-xl justify-center overflow-hidden p-4">
        <Video id={vidData?.videoId} />
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="p-2 bg-red-500 rounded-xl"
          >
            Adicionar Aula
          </button>
        )}
        {showForm && (
          <CrudForm
            title="Add lesson"
            data={{
              course_id: {
                initialValue: router.query.id as string,
                type: 'number',
                block: true,
              },
              videoId: { initialValue: '', type: 'text' },
              name: { initialValue: '', type: 'text' },
            }}
            onSubmit={(v: any) => {
              createLesson({
                ...v,
                videoId: v?.videoId
                  .replace(/.*\?v=/i, '')
                  .replace(/.*youtu\.be\//i, ''),
              })
              setShowForm(false)
            }}
            onRequestClose={() => setShowForm(false)}
          />
        )}
      </section>
      <section className="flex flex-[0.3] p-6 flex-col gap-5 bg-zinc-800 rounded-xl">
        {lessons.map((v, i) => (
          <div
            key={i}
            onClick={() => setIndexSelected(i)}
            className={`rounded-xl ${
              vidData.id === v.id ? 'bg-red-900' : 'bg-zinc-700'
            }  overflow-hidden  hover:bg-red-800 hover:cursor-pointer transition-all hover:scale-105 flex gap-2 items-center`}
          >
            <span className="bg-zinc-600/50 h-full w-7 flex justify-center items-center font-bold">
              {i + 1}
            </span>
            <div className="p-2 flex gap-3  w-full">
              <div className="w-24">
                <img
                  src={`https://img.youtube.com/vi/${v.videoId}/sddefault.jpg`}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-4 w-full">
                <div className=" ">{v.name}</div>
                <div className="h-4 w-[95%] bg-zinc-500 rounded-lg overflow-hidden">
                  <div
                    className=" h-full bg-red-400"
                    style={{
                      width:
                        typeof v.progress === 'number'
                          ? v.progress * 100 + '%'
                          : '50%',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
