// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { _Data } from '../../utils/@types/_Data'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<_Data>
) {
  res.status(200).json({
    courses: [],
  })
}
