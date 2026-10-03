import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { Mail, Phone } from 'lucide-react'
import Section from './Section'
import { socials } from '../data/socials'

const cards = [
  { label: 'WhatsApp', handle: '+254 718 711 759', href: socials.whatsapp, Icon: FaWhatsapp, ext: true },
  { label: 'Email', handle: socials.emailText, href: socials.email, Icon: Mail },
  { label: 'Phone', handle: socials.phoneText, href: socials.phone, Icon: Phone },
  { label: 'LinkedIn', handle: 'Brian Murimi', href: socials.linkedin, Icon: FaLinkedin, ext: true },
  { label: 'GitHub', handle: '@Brian254murithi', href: socials.github, Icon: FaGithub, ext: true },
  { label: 'Instagram', handle: '@brayo_devstack', href: socials.instagram, Icon: FaInstagram, ext: true },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Valid email required'
    if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters'
    setErrors(errs)
    if (Object.keys(errs).length) return
    // TODO: replace with your Formspree/EmailJS endpoint
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'
    try {
      await fetch(FORMSPREE_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(form) })
    } catch {}
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <Section id="contact" title="Let's work together" subtitle="Have a project in mind? Reach out.">
      <div className="grid lg:grid-cols-2 gap-10">
        <form onSubmit={submit} className="space-y-4" noValidate>
          {['name', 'email'].map((f) => (
            <div key={f}>
              <input
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-transparent px-4 py-3 focus:border-brand outline-none"
                placeholder={f === 'name' ? 'Your name' : 'Your email'}
                value={form[f]}
                onChange={(e) => setForm({ ...form, [f]: e.target.value })}
              />
              {errors[f] && <p className="text-red-400 text-sm mt-1">{errors[f]}</p>}
            </div>
          ))}
          <div>
            <textarea
              rows={5}
              className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-transparent px-4 py-3 focus:border-brand outline-none"
              placeholder="Tell me about your project"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
          </div>
          <button className="rounded-full bg-brand px-8 py-3 text-white font-medium hover:bg-brand-dark transition-colors">Send Message</button>
          {sent && <p className="text-emerald-400">Thanks! Your message has been sent — I'll get back to you soon.</p>}
        </form>
        <div className="grid sm:grid-cols-2 gap-4">
          {cards.map(({ label, handle, href, Icon, ext }) => (
            <motion.a
              key={label}
              href={href}
              {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              aria-label={label}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 p-5 flex items-center gap-4 hover:shadow-xl hover:shadow-brand/10 transition-shadow"
            >
              <Icon className="text-2xl text-brand" />
              <div>
                <p className="font-medium">{label}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{handle}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  )
}
