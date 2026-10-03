import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { Mail } from 'lucide-react'
import { socials } from '../data/socials'

const items = [
  { key: 'linkedin', label: 'LinkedIn', href: () => socials.linkedin, Icon: FaLinkedin, glow: 'hover:shadow-[0_0_18px_#0a66c2]' },
  { key: 'github', label: 'GitHub', href: () => socials.github, Icon: FaGithub, glow: 'hover:shadow-[0_0_18px_#9ca3af]' },
  { key: 'instagram', label: 'Instagram', href: () => socials.instagram, Icon: FaInstagram, glow: 'hover:shadow-[0_0_18px_#e1306c]' },
  { key: 'whatsapp', label: 'WhatsApp', href: () => socials.whatsapp, Icon: FaWhatsapp, glow: 'hover:shadow-[0_0_18px_#25d366]' },
  { key: 'email', label: 'Email', href: () => socials.email, Icon: Mail, glow: 'hover:shadow-[0_0_18px_#6366f1]' },
]

export default function SocialIcons({ delay = 0 }) {
  return (
    <div className="flex items-center gap-3">
      {items.map(({ key, label, href, Icon, glow }, i) => (
        <a
          key={key}
          href={href()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`group relative w-10 h-10 grid place-items-center rounded-full bg-white/10 backdrop-blur border border-white/20 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:scale-110 ${glow}`}
          style={{ animation: `float 5s ease-in-out ${delay + i * 0.15}s infinite` }}
        >
          <Icon size={18} />
          <span className="pointer-events-none absolute -top-8 whitespace-nowrap rounded bg-slate-800 px-2 py-0.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
            {label}
          </span>
        </a>
      ))}
    </div>
  )
}
