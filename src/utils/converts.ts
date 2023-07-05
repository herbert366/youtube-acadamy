export function secToTimeStr(sec: number, showHour: boolean = true) {
  return new Date(sec * 1000).toISOString().slice(showHour ? 11 : 14, 19)
}

export function getDurationStr(start?: number, end?: number) {
  if (start !== undefined && end !== undefined) {
    return secToTimeStr(end - start, end - start >= 3600)
  }
  return ''
}

export function getTimeByPercent(props: {
  percent: number | undefined
  startTime: number | undefined
  endTime: number | undefined
}) {
  const { percent, startTime, endTime } = props

  if (
    percent === undefined ||
    startTime === undefined ||
    endTime === undefined
  ) {
    return null
  }

  return (endTime - startTime) * percent + startTime
}

export function getPercentByTime(props: {
  startTime: number
  endTime: number
  currentTime: number
}) {
  const { currentTime, startTime, endTime } = props

  // console.log({
  //   ...props,
  //   result: (currentTime - startTime) / (endTime - startTime),
  // })
  return (currentTime - startTime) / (endTime - startTime)
}
