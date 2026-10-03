import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Desktop-only smooth cursor follower; disabled on touch / reduced motion.
export default function CursorFollower() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(pointer: fine)').matches
    setEnabled(!reduced && fine)
    if (reduced || !fine) return
    const move = (e) => { x.set(e.clientX - 8); y.set(e.clientY - 8) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  if (!enabled) return null
  return <motion.div style={{ x: sx, y: sy }} className="fixed top-0 left-0 w-4 h-4 rounded-full bg-brand/60 blur-[2px] pointer-events-none z-[60]" />
}
