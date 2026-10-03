import { ArrowUp } from 'lucide-react'
import SocialIcons from './SocialIcons'

const links = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact']

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-white/10 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
        <SocialIcons />
        <ul className="flex flex-wrap justify-center gap-5 text-sm">
          {links.map((l) => <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-brand">{l}</a></li>)}
        </ul>
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} Brian Murimi Murithi. All rights reserved.</p>
        <a href="#home" aria-label="Back to top" className="p-3 rounded-full border border-brand text-brand hover:bg-brand/10"><ArrowUp size={16} /></a>
      </div>
    </footer>
  )
}
