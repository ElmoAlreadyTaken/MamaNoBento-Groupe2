import { useContext } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import Login from './Login'
import UserContext from '../components/UserContext'

export default function Header({ theme, setTheme }){
  
  const { user, logout } = useContext(UserContext)
  const handleLogout = () => {
    logout()
  }
  const switchTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="flex bg-slate-200 px-10 py-2">
      <Link href={`/`} className="flex-grow flex items-center">
        <Image src="/MamaNoBento.jpg" className='cursor-pointer h-6 mr-5' alt="Adaltas Logo" width={25} height={25} />
        <span className="rounded py-1 px-2 hover:bg-slate-600 hover:text-slate-100">
          Mama no bento
        </span>
      </Link>
      <button onClick={switchTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
      <ul className="flex gap-5">
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
        { user ? (
          <>
            <li className="rounded py-1 px-2 text-slate-600 border border-cyan-700 hover:bg-cyan-500 hover:text-slate-50">
              <Link href="/profile">Profil</Link>
            </li>
            <li className="rounded py-1 px-2 text-slate-600 border border-cyan-700 hover:bg-cyan-500 hover:text-slate-50">
              <Link href="/editProfil">Edit profil</Link>
            </li>
            <li className="rounded py-1 px-2 text-slate-600 border border-cyan-700 hover:bg-cyan-500 hover:text-slate-50">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li className="rounded py-1 px-2 text-slate-600 border border-cyan-700 hover:bg-cyan-500 hover:text-slate-50">
            <Login />
          </li>
        )}
      </ul>
    </header>
  )
}
