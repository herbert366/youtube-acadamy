import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import { BsYoutube } from 'react-icons/bs'
import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/globals.css'
import CreateButton from '../core/CreateButton'
import { useCourses } from '../hooks/useCourses'

export const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const createCourse = useCourses().create
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>You Academy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex gap-4 p-4 justify-start items-center bg-zinc-800/50">
        <section className="flex gap-4">
          {' '}
          <Link href={'/'}>
            <div className="flex justify-center items-center group">
              <BsYoutube
                color="white"
                size={30}
                className="group-hover:fill-red-500"
              />
              <h1 className="-ml-3 -mt-1 text-2xl font-bold group-hover:text-red-500 py-1 px-4">
                YouCademy
              </h1>
            </div>
          </Link>
          <CreateButton
            data={{
              name: { initialValue: '', type: 'text' },
              poster: { initialValue: '', type: 'text' },
            }}
            title="Add course"
            onSubmit={v => {
              createCourse(v)
            }}
          />
        </section>
      </header>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
