import { useEffect, useState } from 'react'
import { useLessons } from '../hooks/useLessons'
import { useVideoStore } from '../store/VideoStore'
import { Lesson } from '../utils/@types/_Lesson'
import { getPercentByTime, getTimeByPercent } from '../utils/converts'
import { InputControl } from './InputVideoControl'
import { TimeVideoView } from './VideoTimeView'
import { Youtube } from './Youtube'

interface Props {
  lessonData: Lesson
  className?: string
}

export default function Video({ lessonData }: Props) {
  const [loaded, setLoaded] = useState(false)
  const videoTarget = useVideoStore(state => state.videoTarget)
  const isPaused = useVideoStore(state => state.isPaused)
  const setIsPaused = useVideoStore(state => state.setIsPaused)
  const setInputControlValue = useVideoStore(
    state => state.setInputControlValue
  )
  const updateLesson = useLessons().update
  const inputControlValue = useVideoStore(state => state.inputControlValue)

  useEffect(() => {
    if (loaded === false) {
      setInputControlValue((lessonData?.progressPercent || 0) * 100)
    }
  }, [loaded])

  useEffect(() => {
    setLoaded(false)
  }, [lessonData?.id])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        event.preventDefault()
        if (isPaused) setIsPaused(false)
        else setIsPaused(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isPaused])

  useEffect(() => {
    if (videoTarget) {
      setLoaded(true)
    }
    try {
      if (videoTarget?.seekTo && typeof lessonData.startTime === 'number') {
        const timeByPercent = getTimeByPercent({
          percent: lessonData.progressPercent,
          startTime: lessonData.startTime,
          endTime: lessonData.endTime,
        })

        videoTarget.seekTo(timeByPercent || lessonData.startTime, true)
        videoTarget.playVideo()
      }
    } catch (error) {}
  }, [videoTarget, lessonData?.startTime, lessonData?.endTime])

  return (
    <section className="rounded-md overflow-hidden w-full relative">
      <Youtube
        videoId={lessonData?.videoId}
        loaded={loaded}
        onCurrentTimeChange={async currentTime => {
          let videoEndTime = lessonData?.endTime || 0
          let duration = 0

          if (
            !lessonData.endTime &&
            videoTarget &&
            typeof lessonData.startTime === 'number'
          ) {
            duration = await videoTarget.getDuration()
            videoEndTime = duration + lessonData.startTime
          }
          const _newInputValue = getPercentByTime({
            currentTime,
            startTime: lessonData.startTime || 0,
            endTime: videoEndTime,
          })

          const rounded = Number(_newInputValue.toFixed(2))

          setInputControlValue(_newInputValue * 100)

          if (currentTime >= videoEndTime) {
            videoTarget?.pauseVideo()
            videoTarget?.seekTo(videoEndTime, true)
          }
          const no = !lessonData.progressPercent && rounded === 1
          const changed = lessonData.progressPercent !== rounded

          if (changed && !no) {
            try {
              updateLesson(lessonData.id, { progressPercent: rounded })
            } catch (error) {
              console.log('erro ao enviar pro db')
            }
          }
        }}
      />

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
      <InputControl
        value={inputControlValue}
        onChange={async value => {
          if (videoTarget) {
            let videoEndTime = 0

            if (
              !lessonData.endTime &&
              typeof lessonData.startTime === 'number'
            ) {
              videoEndTime = await videoTarget.getDuration()
              videoEndTime += lessonData.startTime
            }

            const secTime = getTimeByPercent({
              percent: value / 100,
              startTime: lessonData.startTime || 0,
              endTime: lessonData.endTime || videoEndTime,
            })
            if (secTime) videoTarget.seekTo(secTime, true)
          }
          setInputControlValue(value)
        }}
      />
      {lessonData?.endTime !== undefined &&
        lessonData?.startTime !== undefined && (
          <TimeVideoView
            lessonData={lessonData}
            inputValue={inputControlValue}
          />
        )}
      {/* {JSON.stringify(lessonData)} */}
    </section>
  )
}
