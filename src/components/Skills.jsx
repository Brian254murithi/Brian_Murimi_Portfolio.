import { motion } from 'framer-motion'
import { FaReact, FaPython, FaAndroid, FaFire, FaGitAlt } from 'react-icons/fa'
import Section from './Section'
import { skills } from '../data/skills'

const iconMap = { FaReact, FaPython, FaAndroid, FaFire, FaGitAlt }

export default function Skills() {
  return (
    <Section id="skills" title="Skills" subtitle="Technologies I work with day to day">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((g, i) => {
          const Icon = iconMap[g.icon]
          return (
            <motion.div
              key={g.group}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur p-6 hover:-translate-y-1 hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                {Icon && <Icon className="text-2xl text-brand" />}
                <h3 className="font-display text-lg font-semibold">{g.group}</h3>
              </div>
              <div className="space-y-3">
                {g.items.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-sm"><span>{s.name}</span><span className="text-slate-400">{s.level}%</span></div>
                    <div className="h-2 mt-1 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="h-full rounded-full bg-gradient-to-r from-brand to-fuchsia-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
