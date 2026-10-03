import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { X, Send, RotateCcw } from 'lucide-react'
import { socials } from '../data/socials'
import profileImg from '../assets/profile.jpg'

const STORAGE_KEY = 'brian-chat'
const GREETING = "Hi! I'm Brian's AI assistant. Ask me about his skills, projects, or how to work with him."
const CHIPS = ['What does Brian do?', 'Show his projects', 'What tech does he use?', 'How can I hire him?']

// Local rule-based responder so the chat works even without the Netlify/Anthropic backend.
const LOCAL_REPLIES = [
  { keys: ['hi', 'hello', 'hey'], reply: "Hello! I'm Brian's assistant. Ask me about his skills, projects, or how to hire him." },
  { keys: ['what does brian do', 'who is brian', 'about'], reply: "Brian Murimi is a Full Stack Software Developer based in Kenya. He builds responsive web apps with React.js, JavaScript, Python, Django, Kotlin, Firebase, and REST APIs." },
  { keys: ['project'], reply: "Brian's projects:\n• Academic Achievers — a learning app (Kotlin, MVVM, Firebase)\n• Mtoni Resort Website (React.js, Tailwind CSS)\n• Stanbic Flexible Funding App frontend (React.js, REST APIs)" },
  { keys: ['tech', 'skill', 'stack'], reply: "Brian's tech stack: React.js, JavaScript, HTML5, CSS3, Python, Django, Kotlin, Jetpack Compose, Firebase, REST APIs, MVVM, Git & GitHub, M-Pesa API." },
  { keys: ['experience', 'work', 'job'], reply: "Experience:\n• Software Developer Intern at Stanbic Bank — Flexible Funding Application Project (June 2026 – Present)\n• Software Developer, Cyber Solutions & Delivery (June 2025 – March 2026)\n• Software Developer, Mtoni Resort Website (Jan 2025 – Mar 2025)" },
  { keys: ['education', 'school', 'study'], reply: "Education:\n• Full Stack Software Development, eMobilis Training Institute (Jan 2024 – Dec 2024)\n• KCSE, Kajiunduthi High School (2020 – 2023)\n• KCPE, St. Moses Primary School" },
  { keys: ['hire', 'contact', 'reach', 'whatsapp', 'email', 'phone'], reply: "To hire or contact Brian:\n• WhatsApp: https://wa.me/254718711759\n• Email: brianmurimi120@gmail.com\n• Phone: +254 718 711 759\n• GitHub: https://github.com/Brian254murithi" },
]

function localReply(text) {
  const t = text.toLowerCase()
  for (const r of LOCAL_REPLIES) {
    if (r.keys.some((k) => t.includes(k))) return r.reply
  }
  return "I can tell you about Brian's skills, projects, experience, education, or how to contact him. For anything specific, reach out to Brian directly: https://wa.me/254718711759"
}

export default function ChatPanel({ onClose }) {
  const [messages, setMessages] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || [{ role: 'assistant', content: GREETING }] }
    catch { return [{ role: 'assistant', content: GREETING }] }
  })
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages)) }, [messages])
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }) }, [messages, loading])
  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [onClose])

  const send = async (text) => {
    const content = (text ?? input).trim().slice(0, 500)
    if (!content || loading) return
    const next = [...messages, { role: 'user', content }]
    setMessages(next)
    setInput('')
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-10) }),
      })
      const data = await res.json()
      if (!res.ok || !data.reply) throw new Error('bad')
      setMessages([...next, { role: 'assistant', content: data.reply }])
    } catch {
      // Backend unavailable (no Netlify function / API key) — reply locally instead.
      setMessages([...next, { role: 'assistant', content: localReply(content) }])
    } finally {
      setLoading(false)
    }
  }

  const reset = () => { setMessages([{ role: 'assistant', content: GREETING }]); setError(false) }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      className="fixed bottom-0 right-0 sm:bottom-5 sm:right-5 z-50 w-full sm:w-[380px] h-[80vh] sm:h-[560px] flex flex-col rounded-t-3xl sm:rounded-3xl bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl border border-white/20 shadow-2xl"
      role="dialog" aria-label="AI assistant chat"
    >
      <div className="flex items-center gap-3 p-4 border-b border-slate-200 dark:border-white/10">
        <img src={profileImg} alt="Brian" className="w-9 h-9 rounded-full object-cover" />
        <div className="flex-1">
          <p className="font-semibold text-sm">Brian's AI Assistant</p>
          <p className="text-xs text-emerald-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulseDot" />Online</p>
        </div>
        <button onClick={reset} aria-label="Reset conversation" className="p-2 hover:text-brand"><RotateCcw size={16} /></button>
        <button onClick={onClose} aria-label="Close chat" className="p-2 hover:text-brand"><X size={18} /></button>
      </div>

      <div ref={scrollRef} aria-live="polite" className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${m.role === 'user' ? 'ml-auto bg-brand text-white' : 'bg-slate-100 dark:bg-white/10'}`}>
            {m.content}
          </motion.div>
        ))}
        {loading && (
          <div className="flex gap-1 bg-slate-100 dark:bg-white/10 w-fit rounded-2xl px-4 py-3">
            {[0, 1, 2].map((i) => <span key={i} className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
          </div>
        )}
        {error && (
          <a href={socials.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full bg-emerald-500 text-white text-sm px-4 py-2">Chat on WhatsApp</a>
        )}
      </div>

      <div className="flex flex-wrap gap-2 px-4 pb-2">
        {CHIPS.map((c) => (
          <button key={c} onClick={() => send(c)} className="text-xs rounded-full border border-brand/40 text-brand px-3 py-1 hover:bg-brand/10">{c}</button>
        ))}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); send() }} className="p-3 flex gap-2">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
          placeholder="Ask about Brian..."
          aria-label="Chat message"
          className="flex-1 resize-none rounded-xl border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-brand"
        />
        <button disabled={loading || !input.trim()} aria-label="Send" className="rounded-xl bg-brand px-3 text-white disabled:opacity-40"><Send size={16} /></button>
      </form>
      <div className="flex gap-2 px-3 pb-3">
        <a href={socials.whatsapp} target="_blank" rel="noopener noreferrer" className="flex-1 text-center text-xs rounded-full bg-emerald-500/20 text-emerald-500 py-2">Chat on WhatsApp</a>
        <a href={socials.email} className="flex-1 text-center text-xs rounded-full bg-brand/20 text-brand py-2">Email Brian</a>
      </div>
    </motion.div>
  )
}
