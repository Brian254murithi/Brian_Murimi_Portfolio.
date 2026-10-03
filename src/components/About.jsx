import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import aboutImg from '../assets/about.jpg'

const stats = [
  { value: 1, suffix: '+', label: 'Years Experience' },
  { value: 3, suffix: '+', label: 'Projects' },
  { value: 5, suffix: '+', label: 'Technologies' },
]

function Counter({ value, suffix, label }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      let start = 0
      const t = setInterval(() => {
        start++
        setN(start)
        if (start >= value) clearInterval(t)
      }, 120)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [value])
  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl font-bold text-brand">{n}{suffix}</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  )
}

export default function About() {
  return (
    <Section id="about" title="About Me">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-brand via-fuchsia-500 to-brand shadow-[0_0_30px_rgba(99,102,241,0.8)]">
          <motion.img initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} src={aboutImg} alt="Brian Murimi" className="rounded-2xl w-full max-w-[240px] shadow-xl object-contain" />
        </div>
        <div className="max-w-xl">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Full Stack Software Developer with hands-on experience building responsive web applications and practical software solutions. Skilled in React.js, JavaScript, Python, Django, Kotlin, Firebase, REST APIs, and MVVM architecture. Experienced in reusable UI components, integrating frontends with backend services, authentication, form validation, and responsive design across devices.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {stats.map((s) => <Counter key={s.label} {...s} />)}
          </div>
        </div>
      </div>
    </Section>
  )
}
