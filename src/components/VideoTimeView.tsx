import { _Lesson } from '../utils/@types/_Data'
import { secToTimeStr } from '../utils/converts'

export function TimeVideoView({
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
