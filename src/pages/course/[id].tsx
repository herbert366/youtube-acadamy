import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PastLinkVideo from '../../components/pastLinkVideo'
import Video from '../../components/Video'
import CreateButton from '../../core/CreateButton'
import DeleteButton from '../../core/DeleteButton'
import EditButton from '../../core/EditButton'
import { useLessons } from '../../hooks/useLessons'
import { useVideoStore } from '../../store/VideoStore'
import { getDurationStr } from '../../utils/converts'
import { convertLongVideoToCourseData } from '../../utils/descriptionStamp'

export default function Course() {
  const router = useRouter()
  const { data: lessons } = useLessons().get({
    params: { course_id: Number(router.query.id as string) },
  })
  const deleteLesson = useLessons().delete

  const createLesson = useLessons().create
  const updateLesson = useLessons().update
  const setCurrentLesson = useVideoStore(state => state.setCurrentLesson)

  const [indexSelected, setIndexSelected] = useState(0)

  const { loading } = PastLinkVideo()

  useEffect(() => {
    if (lessons) {
      setCurrentLesson(lessons[indexSelected])
    }
  }, [indexSelected])

  if (!lessons) return null

  const vidData = lessons[indexSelected]

  return (
    <div className="w-full min-h-[92.6vh] flex justify-center gap-6 p-6 flex-wrap bg-zinc-900">
      <section className="flex flex-1 h-fit flex-wrap shadow-sm rounded-md justify-center overflow-hidden p-4">
        <Video lessonData={vidData} />
      </section>
      <section className="flex flex-[0.3] p-6 flex-col gap-5 bg-zinc-800 rounded-xl overflow-auto">
        <div className="flex gap-4 w-full justify-between">
          <CreateButton
            data={{
              videoId: { type: 'text' },
              descriptionStamp: { type: 'text' },
              course_id: {
                initialValue: router.query.id as string,
                type: 'number',
                hide: true,
              },
            }}
            title="Adicionar Massive Aulas"
            onSubmit={(v: any) => {
              const lessons = convertLongVideoToCourseData({
                videoId: v.videoId,
                descriptionTime: v.descriptionStamp.replace(/\s(\d)/g, '\n$1'),
                course_id: v.course_id,
              })

              lessons.forEach(lesson => {
                createLesson(lesson)
              })
            }}
          />

          <CreateButton
            data={{
              videoId: { type: 'text' },
              name: { type: 'text' },
              course_id: {
                initialValue: router.query.id as string,
                type: 'number',
                hide: true,
              },
            }}
            title="Adicionar Aula"
            onSubmit={(v: any) => {
              createLesson({
                ...v,
                videoId: v?.videoId
                  .replace(/.*\?v=/i, '')
                  .replace(/.*youtu\.be\//i, ''),
              })
            }}
          />
        </div>

        {lessons.map((v, i) => (
          <div
            key={i}
            onClick={() => setIndexSelected(i)}
            className={`rounded-xl ${
              vidData.id === v.id ? 'bg-slate-900' : 'bg-zinc-700'
            }  overflow-hidden  hover:bg-slate-800 hover:cursor-pointer transition-all hover:scale-105 flex gap-2 items-center group `}
          >
            <DeleteButton onDelete={() => deleteLesson(v.id)} />
            <EditButton
              title="Editar Aula"
              data={{
                videoId: { type: 'text' },
                name: { type: 'text' },
              }}
              onSubmit={(v: any) => {
                updateLesson(v.id, v)
              }}
            />

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
                <div className="flex gap-4">
                  <div>{getDurationStr(v.startTime, v.endTime)}</div>
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
          </div>
        ))}
        <div>
          {loading && (
            <div className="self-center px-20 text-3xl">Loading...</div>
          )}
        </div>
      </section>
    </div>
  )
}
