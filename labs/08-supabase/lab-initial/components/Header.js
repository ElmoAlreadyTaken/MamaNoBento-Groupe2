import Link from 'next/link'
import Adaltas from '/assets/adaltas.svg'
import LoggedIn from './header/LoggedIn'
import LoggedOut from './header/LoggedOut'

export default function Header(){
  const user = null
  return (
    <header className="flex bg-slate-200 px-10 py-2">
      <Link href={`/`}>
        <a className="flex-grow flex items-center">
          <Adaltas
            className='cursor-pointer h-6 mr-5'
          />
          <span className="rounded py-1 px-2 hover:bg-slate-600 hover:text-slate-100">
            Web technologies
          </span>
        </a>
      </Link>
      <ul className="flex items-center gap-5">
        <li className="rounded py-1 px-2 hover:bg-slate-600 hover:text-slate-100">
          <Link href="/articles">
            Articles
          </Link>
        </li>
        <li className="rounded py-1 px-2 hover:bg-slate-600 hover:text-slate-100">
          <Link href="/about">
            About us
          </Link>
        </li>
        <li className="rounded py-1 px-2 hover:bg-slate-600 hover:text-slate-100">
          <Link href="/contact">
            Contact us
          </Link>
        </li>
        <li className="rounded py-1 px-2 text-slate-600 border border-cyan-700 hover:bg-cyan-500 hover:text-slate-50">
          {user ? <LoggedIn /> : <LoggedOut />}
        </li>
      </ul>
    </header>
  )
}
