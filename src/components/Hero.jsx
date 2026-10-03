import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaReact, FaPython, FaAndroid, FaFire } from 'react-icons/fa'
import SocialIcons from './SocialIcons'
import { socials } from '../data/socials'
import profileImg from '../assets/profile.jpg'

const roles = ['Full Stack Developer', 'React Developer', 'Mobile Developer (Kotlin)']

function useTyping() {
  const [text, setText] = useState('')
  useEffect(() => {
    let i = 0, dir = 1, role = 0, t
    const tick = () => {
      const current = roles[role]
      i += dir
      setText(current.slice(0, i))
      if (i === current.length) { dir = -1; t = setTimeout(tick, 1600); return }
      if (i === 0) { dir = 1; role = (role + 1) % roles.length }
      t = setTimeout(tick, dir === 1 ? 90 : 50)
    }
    tick()
    return () => clearTimeout(t)
  }, [])
  return text
}

export default function Hero() {
  const typed = useTyping()
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* animated gradient blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-4 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            Hi, I'm <span className="text-brand">Brian Murimi</span>
          </h1>
          <p className="mt-4 text-xl text-slate-500 dark:text-slate-400 h-8">
            {typed}<span className="animate-pulse">|</span>
          </p>
          <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-md">
            Full Stack Software Developer from Kenya building responsive web and mobile applications with React, Django, and Kotlin.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#projects" className="rounded-full bg-brand px-6 py-3 text-white font-medium hover:bg-brand-dark transition-colors">View Projects</a>
            <a href="/cv.pdf" className="rounded-full border border-brand px-6 py-3 text-brand font-medium hover:bg-brand/10 transition-colors">Download CV</a>
            <a href="#contact" className="rounded-full border border-slate-300 dark:border-white/20 px-6 py-3 font-medium hover:border-brand hover:text-brand transition-colors">Contact Me</a>
          </div>
          <div className="mt-8"><SocialIcons /></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative flex justify-center">
          <div className="relative p-1 rounded-3xl bg-gradient-to-tr from-brand via-fuchsia-500 to-brand animate-float">
            <img src={profileImg} alt="Brian Murimi profile" className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl object-cover" />
          </div>
          <FaReact className="absolute -top-4 left-8 text-4xl text-sky-400 animate-float" />
          <FaPython className="absolute top-1/3 -right-2 text-4xl text-yellow-400 animate-float" style={{ animationDelay: '1s' }} />
          <FaAndroid className="absolute -bottom-4 left-16 text-4xl text-green-400 animate-float" style={{ animationDelay: '2s' }} />
          <FaFire className="absolute bottom-10 -left-2 text-4xl text-orange-500 animate-float" style={{ animationDelay: '3s' }} />
        </motion.div>
      </div>
    </section>
  )
}
