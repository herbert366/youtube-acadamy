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

export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/data')
  const data = await response.json()

  return {
    props: { data }, // will be passed to the page component as props
  }
}
