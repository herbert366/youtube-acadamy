import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'

const apiKey = process.env.YOUTUBE_API_KEY

const youtube = google.youtube({
  version: 'v3',
  auth: apiKey,
}) as any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { videoId } = req.query as { videoId: string }
  if (!videoId) {
    return res.status(400).json({ error: 'videoId is required' })
  }

  const response = await youtube.videos.list({
    part: 'snippet,statistics',
    id: videoId,
  })

  const video = response.data.items[0]
  const name = video.snippet.title
  const views = video.statistics.viewCount
  const publishedAt = video.snippet.publishedAt

  res.status(200).json({
    videoId: videoId,
    name,
    viewsAmount: Number(views),
    publishedAt: new Date(publishedAt).getTime(),
  })
}
