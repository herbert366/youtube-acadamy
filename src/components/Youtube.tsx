import { useEffect } from 'react'
import YouTubeRaw from 'react-youtube'
import { YouTubePlayer } from 'youtube-player/dist/types'
import { useVideoStore } from '../store/VideoStore'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export function Youtube({
  videoId,
  loaded,
  onCurrentTimeChange,
}: {
  videoId: string
  loaded: boolean
  onCurrentTimeChange: (currentTime: number) => void
}) {
  const videoTarget = useVideoStore(state => state.videoTarget)
  const setVideoTarget = useVideoStore(state => state.setVideoTarget)
  const setIsPaused = useVideoStore(state => state.setIsPaused)
  const isPaused = useVideoStore(state => state.isPaused)

  function _onReady(event: { target: YouTubePlayer }) {
    setVideoTarget(event.target)
  }

  if (!videoId) return null

  useEffect(() => {
    if (videoTarget) {
      const interval = setInterval(async () => {
        const currentTime = await videoTarget?.getCurrentTime()

        onCurrentTimeChange(currentTime)
      }, 500)

      return () => clearInterval(interval)
    }
  }, [videoTarget, onCurrentTimeChange])

  useEffect(() => {
    if (isPaused) {
      videoTarget?.pauseVideo()
    } else {
      videoTarget?.playVideo()
    }
  }, [isPaused])

  return (
    <YouTubeRaw
      className="w-full pb-[56.25%] h-0 bg-black relative shadow-xl"
      iframeClassName="w-full absolute left-0 top-0 h-full"
      // className={` ${
      //   !loaded ? 'hidden' : ''
      // } `}
      style={{ opacity: loaded ? 1 : 0 }}
      videoId={videoId}
      opts={{
        playerVars: {
          modestbranding: 1,
          fs: 0,
          controls: 0,
          rel: 0,
          disablekb: 1,
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
  )
}
