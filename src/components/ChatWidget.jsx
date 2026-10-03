import { useEffect, useRef, useState, lazy, Suspense } from 'react'

// Lazy-load the heavy chat panel so first paint stays fast.
const Panel = lazy(() => import('./ChatPanel'))

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [showLabel, setShowLabel] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowLabel(true), 5000)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      {!open && (
        <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
          {showLabel && (
            <span className="rounded-full bg-slate-900 text-white text-xs px-3 py-1.5 shadow-lg dark:bg-white dark:text-slate-900">
              Ask me about Brian
            </span>
          )}
          <button
            onClick={() => { setOpen(true); setShowLabel(false) }}
            aria-label="Open chat assistant"
            className="relative w-14 h-14 rounded-full bg-brand text-white shadow-xl shadow-brand/40 hover:scale-105 transition-transform"
          >
            <span className="absolute inset-0 rounded-full bg-brand animate-ping opacity-30" />
            💬
          </button>
        </div>
      )}
      {open && (
        <Suspense fallback={null}>
          <Panel onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </>
  )
}
