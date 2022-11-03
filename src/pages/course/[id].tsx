import Video from '../../components/Video'
import { _Course, _Data } from '../../utils/@types/_Data'

export default function Course({ course }: { course: _Course }) {
  return (
    <div className="flex flex-wrap p-6">
      {course.lessons.map(v => (
        <Video id={v.id} key={v.id} />
      ))}
    </div>
  )
}

export async function getServerSideProps({ query }: any) {
  const response = await fetch('http://localhost:3000/api/data')
  const data: _Data = await response.json()

  return {
    props: { course: data.courses.find(v => v.name === query.id) }, // will be passed to the page component as props
  }
}
