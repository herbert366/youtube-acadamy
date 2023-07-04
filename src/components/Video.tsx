import { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import { YouTubePlayer } from 'youtube-player/dist/types'
import { Lesson } from '../utils/@types/_Lesson'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

interface Props {
  lessonData: Lesson
  className?: string
}

export default function Video({ lessonData, className }: Props) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
  }, [lessonData?.id])

  const [isPaused, setIsPaused] = useState(true)
  const [videoTarget, setVideoTarget] = useState<YouTubePlayer | null>(null)

  function _onReady(event: { target: YouTubePlayer }) {
    setVideoTarget(event.target)

    // videoTarget?.seekTo(10, true)
    // event.target.seekTo(10)
  }

  useEffect(() => {
    if (videoTarget) {
      setLoaded(true)
    }
    if (videoTarget && lessonData.startTime) {
      videoTarget.seekTo(lessonData.startTime, true)
    }
  }, [videoTarget, lessonData?.startTime])

  // className="flex bg-black relative w-full h-fit pb-[50.25%]  rounded-md justify-center overflow-hidden"
  return (
    <section className="rounded-md overflow-hidden w-full relative">
      <YouTube
        className="w-full pb-[56.25%] h-0 bg-black relative shadow-xl"
        iframeClassName="w-full absolute left-0 top-0 h-full"
        // className={` ${
        //   !loaded ? 'hidden' : ''
        // } `}
        style={{ opacity: loaded ? 1 : 0 }}
        videoId={lessonData?.videoId}
        opts={{
          playerVars: {
            modestbranding: 1,
            fs: 0,
            // controls: 0,
          },
        }}
        onReady={_onReady}
        onPause={() => setIsPaused(true)}
        onPlay={async () => {
          await delay(360)
          setIsPaused(false)
        }}
        onEnd={({ target }) => {
          target.seekTo(0, true)
          setIsPaused(true)
        }}
      />
      {/* <iframe
        className={`absolute top-0 left-0 w-full h-full z-30 ${
          !loaded ? 'hidden' : ''
        } shadow-xl`}
        onLoad={() => {
          setLoaded(true)
        }}
        src={
          'https://www.youtube.com/embed/' +
          lessonData.videoId +
          '?rel=0&showinfo=1&modestbranding=1&autoplay=1'
        }
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        allowFullScreen
        frameBorder={0}
      ></iframe> */}

      {!loaded && (
        <div className="absolute top-0 left-0 right-0 bottom-0 m-auto bg-black flex justify-center items-center inset-0 bg-gradient-to-r from-transparent to-white/30 animate-pulse">
          <p className="absolute text-2xl z-30 animate-pulse transition-shadow text-white">
            Carregando...
          </p>
          <img
            className="w-full h-full object-cover opacity-80"
            src={`https://img.youtube.com/vi/${lessonData?.videoId}/sddefault.jpg`}
            alt=""
          />
        </div>
      )}
      {/* {JSON.stringify(lessonData)} */}
    </section>
  )
}
