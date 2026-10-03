import { useEffect, useState } from 'react'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { socials } from '../data/socials'

const links = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(true)
  const [active, setActive] = useState('Home')

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const isDark = saved ? saved === 'dark' : true
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const offsets = links.map((l) => {
        const el = document.getElementById(l.toLowerCase())
        return el ? { name: l, top: el.offsetTop - 120 } : null
      }).filter(Boolean)
      const current = offsets.filter((o) => window.scrollY >= o.top).pop()
      if (current) setActive(current.name)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-lg bg-white/70 dark:bg-slate-950/70 border-b border-slate-200/50 dark:border-white/10">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-8 h-16">
        <a href="#home" className="font-display text-xl font-bold text-brand">BM</a>
        <ul className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className={`relative pb-1 transition-colors ${active === l ? 'text-brand' : 'hover:text-brand'}`}>
                {l}
                <span className={`absolute left-0 -bottom-0.5 h-0.5 bg-brand transition-all ${active === l ? 'w-full' : 'w-0'}`} />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-white/10">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href={socials.whatsapp} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex rounded-full bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark transition-colors">
            Let's talk
          </a>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.25 }}
            className="md:hidden fixed right-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-slate-950 border-l border-white/10 p-8 flex flex-col gap-6"
          >
            {links.map((l) => (
              <li key={l}><a onClick={() => setOpen(false)} href={`#${l.toLowerCase()}`} className="text-lg">{l}</a></li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
