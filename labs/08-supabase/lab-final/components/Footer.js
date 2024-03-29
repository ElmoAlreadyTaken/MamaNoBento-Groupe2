
import Adaltas from '/assets/adaltas.svg'

export default function Footer(){
  return (
    <footer className="bg-slate-200 px-10 py-2 text-center [&_svg]:inline-block">
      <a
        href="https://www.adaltas.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <Adaltas alt="Adaltas Logo" height={20} />
      </a>
    </footer>
  )
}
