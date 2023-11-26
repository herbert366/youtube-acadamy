import { _Course } from './@types/_Data'

function textTimeToSec(text: String) {
  const splitter = text.split(':')
  const reversed = splitter.reverse()

  return reversed.reduce((acc, cur, i) => {
    const sec = 60 ** i
    const curNumber = Number(cur)
    return acc + curNumber * sec
  }, 0)
}

interface ConvertLongVideoProps {
  videoId: string
  descriptionTime: string
  course_id: _Course['id']
}

export function convertLongVideoToCourseData({
  videoId,
  descriptionTime,
  course_id,
}: ConvertLongVideoProps) {
  // Padrão para extrair o tempo e o título
  const padrao = /(\d+:\d+:\d+|\d+:\d+)(?: - )?(.+?)(?=\d+:|$)/g

  // Array para armazenar os resultados
  const data: {
    name: string
    startTime: number
    course_id: _Course['id']
    videoId: string
  }[] = []

  let match
  while ((match = padrao.exec(descriptionTime)) !== null) {
    const time = match[1]
    const title = match[2]
    data.push({
      startTime: textTimeToSec(time),
      name: title.trim(),
      course_id: Number(course_id),
      videoId,
    })
  }

  const dataTimeWithEndTime = data.map((d, i) => {
    const nextStartTime = data[i + 1]?.startTime

    if (!nextStartTime) return d

    return {
      ...d,
      endTime: nextStartTime,
    }
  })

  console.log(dataTimeWithEndTime)
  return dataTimeWithEndTime
}

// console.log(
//   convertLongVideoToCourseData({
//     videoId: '5miHyP6lExg',
//     course_id: 6,
//     descriptionTime: `00:00 Intro
// 11:13 Environment setup (Admin)
// 27:48 Clerk Authentication (Admin)
// 43:27 Modal components (Admin)
// 01:06:20 Form components (Admin)
// 01:21:28 Prisma, PlanetScale, MySQL setup (Admin)
// 01:45:02 Dashboard setup (Admin)
// 02:03:43 Navigation bar (Admin)
// 02:38:57 Settings page (Admin)
// 03:35:01 Billboards Entity (Admin)
// 04:29:58 Data Table (Admin)
// 05:18:15 Categories Entity (Admin)
// 05:50:13 Sizes Entity (Admin)
// 06:05:18 Colors Entity (Admin)
// 06:19:41 Products Entity (Admin)
// 07:14:38 Orders Entity (Admin)
// 07:26:15 Environment setup & featured products (Store)
// 08:22:14 Individual product screen (Store)
// 08:45:47 Individual category screen (Store)
// 09:07:17 Product preview modal components (Store)
// 09:20:29 Add to Cart functionality (Store)
// 09:46:14 Stripe Setup & Checkout finalization (Admin, Store)
// 10:08:07 Dashboard page (Admin)
// 10:27:34 Dark Mode (Admin)
// 10:30:22 Deployment to Vercel (Admin, Store)`,
//   })
// )
