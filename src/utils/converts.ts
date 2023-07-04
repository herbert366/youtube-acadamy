export function secToTimeStr(sec: number, showHour: boolean = true) {
  return new Date(sec * 1000).toISOString().slice(showHour ? 11 : 14, 19)
}

export function getDurationStr(start?: number, end?: number) {
  if (start !== undefined && end !== undefined) {
    return secToTimeStr(end - start, end - start >= 3600)
  }
  return ''
}
