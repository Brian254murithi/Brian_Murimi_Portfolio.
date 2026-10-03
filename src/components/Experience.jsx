import { motion } from 'framer-motion'
import Section from './Section'
import { experience } from '../data/experience'

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="relative max-w-3xl mx-auto">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand/40 origin-top"
        />
        {experience.map((e, i) => (
          <motion.div
            key={e.company}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`relative pl-12 md:pl-0 md:w-1/2 pb-12 ${i % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:ml-auto md:pl-10'}`}
          >
            <span className="absolute left-2.5 md:left-auto md:-right-2.5 top-1 w-3 h-3 rounded-full bg-brand md:[inset-inline-start:auto]" style={i % 2 === 1 ? { left: '-0.4rem', right: 'auto' } : {}} />
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 p-5 text-left">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold">{e.role}</h3>
                {e.current && <span className="text-xs rounded-full bg-emerald-500/20 text-emerald-400 px-2 py-0.5">Current</span>}
              </div>
              <p className="text-brand text-sm">{e.company}</p>
              <p className="text-xs text-slate-400 mt-1">{e.period}</p>
              <ul className="mt-3 list-disc list-inside text-sm text-slate-500 dark:text-slate-400 space-y-1">
                {e.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
