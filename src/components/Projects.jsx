import { useState } from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import { projects } from '../data/projects'
import { SiKotlin, SiJetpackcompose, SiFirebase, SiReact, SiTailwindcss } from 'react-icons/si'
import { FaLayerGroup, FaPuzzlePiece, FaServer, FaMobileAlt } from 'react-icons/fa'

const techIcons = {
  'Kotlin': SiKotlin,
  'Jetpack Compose': SiJetpackcompose,
  'MVVM': FaLayerGroup,
  'Firebase': SiFirebase,
  'React.js': SiReact,
  'Tailwind CSS': SiTailwindcss,
  'Responsive Design': FaMobileAlt,
  'REST APIs': FaServer,
  'Component UI': FaPuzzlePiece,
}

function TiltCard({ p, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className="text-left rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 overflow-hidden hover:shadow-2xl hover:shadow-brand/20 transition-shadow"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="overflow-hidden">
        <img src={p.image} alt={p.title} loading="lazy" className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110" />
      </div>
      <div className="p-5">
        <h3 className="font-semibold">{p.title}</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{p.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {p.tech.map((t) => {
            const Icon = techIcons[t]
            return (
              <span key={t} className="inline-flex items-center gap-1 text-xs rounded-full bg-brand/10 text-brand px-2 py-0.5">
                {Icon && <Icon />} {t}
              </span>
            )
          })}
        </div>
      </div>
    </motion.button>
  )
}

export default function Projects() {
  const [active, setActive] = useState(null)
  return (
    <Section id="projects" title="Projects">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <TiltCard p={p} onClick={() => setActive(p)} />
          </motion.div>
        ))}
      </div>
      {active && (
        <div className="fixed inset-0 z-50 bg-black/70 grid place-items-center p-4" onClick={() => setActive(null)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-lg w-full rounded-2xl bg-white dark:bg-slate-900 p-6" onClick={(e) => e.stopPropagation()}>
            <img src={active.image} alt={active.title} className="rounded-xl w-full h-56 object-cover" />
            <h3 className="mt-4 text-xl font-semibold">{active.title}</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{active.description}</p>
            <div className="mt-4 flex gap-3">
              {active.demo && <a href={active.demo} target="_blank" rel="noopener noreferrer" className="rounded-full bg-brand px-4 py-2 text-sm text-white">Live Demo</a>}
              {active.github && <a href={active.github} target="_blank" rel="noopener noreferrer" className="rounded-full border border-brand px-4 py-2 text-sm text-brand">GitHub</a>}
              <button onClick={() => setActive(null)} className="ml-auto rounded-full border px-4 py-2 text-sm">Close</button>
            </div>
          </motion.div>
        </div>
      )}
    </Section>
  )
}
