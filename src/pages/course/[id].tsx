import { useRouter } from 'next/router'
import Video from '../../components/Video'

export default function Course() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div className="flex flex-wrap p-6">
      <Video id="WmV31ypcc3w" />
    </div>
  )
}
