import { useEffect } from 'react'
import { useVideoStore } from '../store/VideoStore'
import { useLessons } from './useLessons'

export function useSaveProgressDataBase() {
  const videoTarget = useVideoStore(state => state.videoTarget)
  const inputControlValue = useVideoStore(state => state.inputControlValue)
  const lessonData = useVideoStore(state => state.currentLesson)
  const updateLesson = useLessons().update

  useEffect(() => {
    if (lessonData && videoTarget) {
      const newInputValueRound = Number(inputControlValue.toFixed(0))
      const changed = lessonData.progressPercent !== newInputValueRound

      if (inputControlValue && changed) {
        // console.log({ inputControlValue, changed })
        updateLesson(lessonData.id, {
          progressPercent: newInputValueRound / 100,
        })
      }
    }
  }, [videoTarget, inputControlValue])
}
