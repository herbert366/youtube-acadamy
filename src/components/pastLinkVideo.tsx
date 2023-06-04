import { useLessons } from '../hooks/useLessons'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function PastLinkLesson() {
  // video único ou video em playlists

  const [clipboardData, setClipboardData] = useState<string | null>(null)
  const createLesson = useLessons().create

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const course_id = Number(router.query.id as string)
  // course id router

  useEffect(() => {
    console.log('init past')
    const handlePaste = (event: ClipboardEvent) => {
      const clipboardContent = event.clipboardData?.getData('text/plain')
      if (!clipboardContent) return

      const replacedContent = clipboardContent
        // .replace(/.*watch\?v\=/gi, '')
        .replace(/.*youtu\.be\//gi, '')
        .replace(/.*youtube\.com\//gi, '')
        .replace(/&.*\=.*/gi, '')
        .replace(/watch\?v=([a-zA-Z0-9_-]+)/gi, '')

      if (replacedContent.length !== 11) {
        return setClipboardData(null)
      }
      debugger
      setClipboardData(replacedContent)
    }

    document.addEventListener('paste', handlePaste)

    return () => {
      document.removeEventListener('paste', handlePaste)
    }
  }, [])

  useEffect(() => {
    if (!clipboardData) return

    async function add() {
      setLoading(true)
      const response = await fetch(`/api/video-data?videoId=${clipboardData}`)
      const responseData = await response.json()

      if (!responseData || course_id === null) return

      createLesson({ ...responseData, course_id })
      setClipboardData(null)
      setLoading(false)
    }
    add()
  }, [clipboardData, course_id])

  return {
    clipboardData,
    loading,
  }
}
