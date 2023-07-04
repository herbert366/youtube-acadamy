import { useEffect, useState } from 'react'
import { useVideoStore } from '../store/VideoStore'
import { _Lesson } from '../utils/@types/_Data'
import { Lesson } from '../utils/@types/_Lesson'
import { secToTimeStr } from '../utils/converts'
import { Youtube } from './Youtube'

interface Props {
  lessonData: Lesson
  className?: string
}

interface InputControlProps {
  onChange: (percent: number) => void
  value: number
}

function InputControl({ onChange }: InputControlProps) {
  const value = useVideoStore(state => state.inputControlValue)
  const setInputControlValue = useVideoStore(
    state => state.setInputControlValue
  )

  return (
    <input
      type="range"
      name=""
      id=""
      className="w-full"
      min={0}
      max={100}
      step={0.2}
      value={value}
      onChange={e => {
        console.log(Number(e.target.value))
        onChange(Number(e.target.value))
        setInputControlValue(Number(e.target.value))
        // setValue(Number(e.target.value))
      }}
    />
  )
}

function TimeVideoView({
  inputValue,
  lessonData,
}: {
  inputValue: number
  lessonData: _Lesson
}) {
  if (
    lessonData?.endTime === undefined ||
    lessonData?.startTime === undefined
  ) {
    return null
  }

  const duration = lessonData?.endTime - lessonData?.startTime
  const showHour = duration >= 3600

  const secStr = (sec: number) => secToTimeStr(sec, showHour)
  return (
    <div>
      {secStr((inputValue / 100) * duration)} / {secStr(duration)}
    </div>
  )
}

function getTimeByPercent(props: {
  percent: number
  startTime: number
  endTime: number
}) {
  const { percent, startTime, endTime } = props

  return (endTime - startTime) * percent + startTime
}

function getPercentByTime(props: {
  startTime: number
  endTime: number
  currentTime: number
}) {
  const { currentTime, startTime, endTime } = props

  console.log({
    ...props,
    result: (currentTime - startTime) / (endTime - startTime),
  })
  return (currentTime - startTime) / (endTime - startTime)
}

export default function Video({ lessonData, className }: Props) {
  const [loaded, setLoaded] = useState(false)
  const videoTarget = useVideoStore(state => state.videoTarget)
  const isPaused = useVideoStore(state => state.isPaused)
  const setIsPaused = useVideoStore(state => state.setIsPaused)
  const setInputControlValue = useVideoStore(
    state => state.setInputControlValue
  )
  const inputControlValue = useVideoStore(state => state.inputControlValue)

  useEffect(() => {
    if (loaded === false) {
      setInputControlValue(0)
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
        videoTarget.playVideo()
        videoTarget.seekTo(lessonData.startTime, true)
      }
    } catch (error) {
      console.log('foda-se negão')
    }
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

          const newInputValue = _newInputValue * 100

          setInputControlValue(newInputValue)

          if (currentTime >= videoEndTime) {
            videoTarget?.pauseVideo()
            videoTarget?.seekTo(videoEndTime, true)
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
            videoTarget.seekTo(secTime, true)
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
