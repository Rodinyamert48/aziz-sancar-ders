import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { ChevronDown, ChevronUp, Expand, LayoutGrid, NotebookPen, Shrink, X } from 'lucide-react'
import { slides } from './slides'
import { Kbd } from './slides/Intro'

export default function App() {
  const deckRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [notesOpen, setNotesOpen] = useState(false)
  const [overview, setOverview] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)

  const { scrollYProgress } = useScroll({ container: deckRef })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  const goTo = useCallback((i: number) => {
    const n = Math.max(0, Math.min(slides.length - 1, i))
    document.getElementById(slides[n].id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Hangi slaytın ekranda olduğunu izle ve adres çubuğuna yaz
  useEffect(() => {
    const root = deckRef.current
    if (!root) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.slide)
            setCurrent(i)
            history.replaceState(null, '', `#${slides[i].id}`)
          }
        }
      },
      { root, threshold: 0.55 },
    )
    root.querySelectorAll('[data-slide]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Paylaşılan bağlantıdaki slayta git
  useEffect(() => {
    const hash = decodeURIComponent(location.hash.slice(1))
    const el = hash && document.getElementById(hash)
    if (el) el.scrollIntoView()
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen?.()
  }, [])

  useEffect(() => {
    const onFs = () => setFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('input, textarea, select') || e.metaKey || e.ctrlKey || e.altKey) return
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault()
          goTo(current + 1)
          break
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          goTo(current - 1)
          break
        case 'Home':
          e.preventDefault()
          goTo(0)
          break
        case 'End':
          e.preventDefault()
          goTo(slides.length - 1)
          break
        case 'n':
        case 'N':
          setNotesOpen((v) => !v)
          break
        case 'o':
        case 'O':
        case 'g':
        case 'G':
          setOverview((v) => !v)
          break
        case 'f':
        case 'F':
          toggleFullscreen()
          break
        case 'Escape':
          setOverview(false)
          setNotesOpen(false)
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, goTo, toggleFullscreen])

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-gold to-helix" style={{ scaleX: progress }} />

      <main ref={deckRef} className="deck h-dvh snap-y snap-mandatory overflow-y-auto">
        {slides.map(({ id, Component }, i) => (
          <Component key={id} index={i} />
        ))}
      </main>

      <div className="pointer-events-none fixed inset-0 z-40 grain opacity-[0.035] mix-blend-overlay" aria-hidden="true" />

      {/* Sağdaki nokta menüsü */}
      <nav className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 flex-col gap-2.5 md:flex" aria-label="Slaytlar">
        {slides.map((s, i) => (
          <button key={s.id} onClick={() => goTo(i)} className="group flex items-center justify-end gap-3" aria-label={s.label}>
            <span className="pointer-events-none rounded-md bg-ink-3 px-2 py-1 text-xs whitespace-nowrap text-paper opacity-0 transition group-hover:opacity-100">
              {s.label}
            </span>
            <span
              className={`block rounded-full transition-all ${i === current ? 'h-5 w-1.5 bg-gold' : 'size-1.5 bg-paper/30 group-hover:bg-paper/70'}`}
            />
          </button>
        ))}
      </nav>

      {/* Alt kontrol çubuğu */}
      <div className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-ink/70 p-1 shadow-2xl backdrop-blur-xl">
        <CtrlButton label="Önceki slayt" onClick={() => goTo(current - 1)} disabled={current === 0}>
          <ChevronUp className="size-4" />
        </CtrlButton>
        <span className="min-w-16 px-2 text-center font-mono whitespace-nowrap text-xs text-mist">
          <span className="text-paper">{String(current + 1).padStart(2, '0')}</span> / {slides.length}
        </span>
        <CtrlButton label="Sonraki slayt" onClick={() => goTo(current + 1)} disabled={current === slides.length - 1}>
          <ChevronDown className="size-4" />
        </CtrlButton>
        <span className="mx-1 h-5 w-px bg-line" />
        <CtrlButton label="Tüm slaytlar (O)" onClick={() => setOverview(true)}>
          <LayoutGrid className="size-4" />
        </CtrlButton>
        <CtrlButton label="Konuşmacı notları (N)" onClick={() => setNotesOpen((v) => !v)} active={notesOpen}>
          <NotebookPen className="size-4" />
        </CtrlButton>
        <CtrlButton label="Tam ekran (F)" onClick={toggleFullscreen}>
          {fullscreen ? <Shrink className="size-4" /> : <Expand className="size-4" />}
        </CtrlButton>
      </div>

      {/* Konuşmacı notları */}
      <AnimatePresence>
        {notesOpen && (
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-4 z-40 w-[min(380px,calc(100vw-2rem))] rounded-2xl border border-gold/30 bg-ink/90 p-5 shadow-2xl backdrop-blur-xl"
            aria-live="polite"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold tracking-widest text-gold uppercase">
                Not · {slides[current].label}
              </p>
              <button onClick={() => setNotesOpen(false)} className="text-mist hover:text-paper" aria-label="Kapat">
                <X className="size-4" />
              </button>
            </div>
            <ul className="space-y-2 text-sm text-paper/85">
              {slides[current].notes.map((n) => (
                <li key={n} className="flex gap-2">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-gold" />
                  {n}
                </li>
              ))}
            </ul>
            {current < slides.length - 1 && (
              <p className="mt-4 border-t border-line pt-3 text-xs text-mist">Sıradaki: {slides[current + 1].label}</p>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Genel bakış */}
      <AnimatePresence>
        {overview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-ink/90 p-6 backdrop-blur-xl md:p-12"
            onClick={() => setOverview(false)}
          >
            <div className="mx-auto max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-display text-3xl font-semibold">Tüm slaytlar</h2>
                <button onClick={() => setOverview(false)} className="rounded-full border border-line p-2 text-mist hover:text-paper" aria-label="Kapat">
                  <X className="size-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {slides.map((s, i) => (
                  <motion.button
                    key={s.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    onClick={() => {
                      setOverview(false)
                      goTo(i)
                    }}
                    className={`flex aspect-video flex-col justify-between rounded-xl border p-4 text-left transition hover:border-gold ${
                      i === current ? 'border-gold bg-gold/10' : 'border-line bg-ink-2'
                    }`}
                  >
                    <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-display text-lg leading-tight">{s.label}</span>
                  </motion.button>
                ))}
              </div>
              <p className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-mist">
                <span><Kbd>←</Kbd> <Kbd>→</Kbd> gezin</span>
                <span><Kbd>N</Kbd> notlar</span>
                <span><Kbd>O</Kbd> genel bakış</span>
                <span><Kbd>F</Kbd> tam ekran</span>
                <span><Kbd>Esc</Kbd> kapat</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function CtrlButton({
  children,
  label,
  onClick,
  disabled,
  active,
}: {
  children: React.ReactNode
  label: string
  onClick: () => void
  disabled?: boolean
  active?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className={`flex size-9 items-center justify-center rounded-full transition hover:bg-white/10 hover:text-paper disabled:opacity-30 disabled:hover:bg-transparent ${
        active ? 'bg-gold/20 text-gold' : 'text-mist'
      }`}
    >
      {children}
    </button>
  )
}
