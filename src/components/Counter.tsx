import { useEffect, useRef } from 'react'
import { animate, useInView } from 'motion/react'

/** Görünür olduğunda 0'dan hedefe sayan sayaç. */
export function Counter({ to, duration = 1.6 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { amount: 0.6 })

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return
    const from = to > 1000 ? to - 60 : 0
    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (el.textContent = String(Math.round(v))),
    })
    return () => controls.stop()
  }, [inView, to, duration])

  return <span ref={ref}>{to}</span>
}
