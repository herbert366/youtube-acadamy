import { useEffect, useState } from 'react'

interface Props {
  id: string
  className?: string
}

export default function Video({ id, className }: Props) {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(false)
  }, [id])
  console.log(loaded)

  return (
    <section className="flex bg-black relative w-full h-fit pb-[50.25%]  rounded-xl justify-center overflow-hidden">
      <iframe
        className={`absolute top-0 left-0 w-full h-full z-30 ${
          !loaded ? 'hidden' : ''
        } shadow-xl`}
        onLoad={() => {
          setLoaded(true)
        }}
        src={'https://www.youtube.com/embed/' + id}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder={0}
      ></iframe>
      {JSON.stringify(loaded)}
      <div className="absolute top-0 left-0 right-0 bottom-0 m-auto bg-black flex justify-center items-center inset-0 bg-gradient-to-r from-transparent to-white/30 animate-pulse">
        <p>Carregando...</p>
      </div>
    </section>
  )
}
