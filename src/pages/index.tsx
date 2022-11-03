import Link from 'next/link'
import { _Data } from '../utils/@types/_Data'

interface Props {
  data: _Data
}

export default function Home({ data }: Props) {
  return (
    <div className="flex flex-wrap p-6 gap-6">
      {data.courses.map((v, i) => (
        <Link href={'/course/' + v.name}>
          <div
            className="flex justify-center items-center  h-52 w-32 text-center bg-slate-500"
            key={i}
          >
            <h2>{v.name}</h2>
          </div>
        </Link>
      ))}
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
