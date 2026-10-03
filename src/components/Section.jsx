import { motion } from 'framer-motion'

export default function Section({ id, title, subtitle, children, className = '' }) {
  return (
    <section id={id} className={`py-20 px-4 sm:px-8 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold">{title}</h2>
            {subtitle && <p className="mt-3 text-slate-500 dark:text-slate-400">{subtitle}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  )
}
