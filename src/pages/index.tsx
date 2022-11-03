export default function Home({ data }: any) {
  return (
    <div className="flex flex-wrap p-6">
      <div>
        <h2>{JSON.stringify(data)} </h2>
      </div>
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
