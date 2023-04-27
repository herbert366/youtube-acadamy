import type { AppProps } from 'next/app'
import Link from 'next/link'
import { BsYoutube } from 'react-icons/bs'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <header className="flex gap-4 p-4 justify-start items-center bg-zinc-800/50">
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
      </header>
      <Component {...pageProps} />
    </div>
  )
}
