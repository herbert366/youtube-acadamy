import { useLessons } from '../hooks/useLessons'
import { useCourses } from '../hooks/useCourses'
import { AiFillPlayCircle } from 'react-icons/ai'

export default function Poster({ src }: { src: string }) {
  const { data: courses } = useCourses().get()

  const { data: lessons } = useLessons().get({
    params: { course_id: Number(courses?.[0]?.id) },
  })

  return (
    <main className="progress py-6 h-fit w-fit mx-auto relative group">
      <article className="absolute bottom-14 md:bottom-20 left-4 xl:left-20 lg:left-10 flex flex-col gap-6 z-40">
        <p className="xl:text-xl flex gap-5 place-items-start min-w-min flex-col">
          <span>{courses?.[0]?.name}</span>
          <span className="border border-zinc-500 px-5 py-2 rounded-lg font-light">
            {lessons?.[2].name}
          </span>
        </p>

        <button className=" text-base w-fit  px-8 py-2 md:px-10 md:py-4 rounded-lg bg-zinc-700 md:text-2xl  xl:text-3xl shadow-xl shadow-black/40 hover:bg-red-600 hover:scale-105 hover:rounded-lg flex gap-4 justify-center items-center">
          <AiFillPlayCircle /> <span>Continuar</span>
        </button>
      </article>

      <div className="w-full h-full relative rounded-r-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-gray-900 to-transparent absolute w-[90%] h-full z-10"></div>
        <img
          draggable={false}
          className="group-hover:scale-[102%] lg:rounded-l-none h-full w-full ml-auto min-h-full object-fill"
          src={`https://img.youtube.com/vi/${lessons?.[2].videoId}/sddefault.jpg`}
          alt=""
        />
      </div>
    </main>
  )
}
