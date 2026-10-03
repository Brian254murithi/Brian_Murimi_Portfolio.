import { motion } from 'framer-motion'
import Section from './Section'
import { education, goal } from '../data/experience'

export default function Education() {
  return (
    <Section id="education" title="Education">
      <div className="max-w-3xl mx-auto space-y-4">
        {education.map((e, i) => (
          <motion.div key={e.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 p-5">
            <h3 className="font-semibold">{e.title}</h3>
            <p className="text-brand text-sm">{e.place}</p>
            <p className="text-xs text-slate-400 mt-1">{e.period}</p>
            {e.awards && (
              <div className="mt-3">
                <h4 className="text-sm font-semibold">Awards & Achievements</h4>
                <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 mt-1 space-y-1">
                  {e.awards.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
        <p className="text-center text-slate-500 dark:text-slate-400 italic mt-4">{goal}</p>
      </div>
    </Section>
  )
}
