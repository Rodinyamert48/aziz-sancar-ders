import { useEffect, useRef } from 'react'

type Props = {
  className?: string
  /** Hasar (timin dimeri) halkalarını kırmızı vurgula */
  damaged?: boolean
  speed?: number
}

/** Kanvas üzerinde dönen, derinlik hissi veren DNA sarmalı. */
export function Helix({ className, damaged = false, speed = 1 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let raf = 0
    let visible = true

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)

    const gold = [232, 176, 74]
    const teal = [94, 234, 212]
    const rose = [251, 113, 133]

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw)
      if (!visible || w < 2 || h < 2) return
      const time = reduced ? 0 : (t / 1000) * speed
      ctx.clearRect(0, 0, w, h)

      const vertical = h > w * 0.9
      const length = vertical ? h : w
      const amp = (vertical ? w : h) * 0.22
      const center = (vertical ? w : h) / 2
      const steps = Math.max(28, Math.floor(length / 26))
      const freq = (Math.PI * 4) / length

      type P = { x: number; y: number; z: number; strand: number; i: number }
      const pts: P[] = []
      for (let i = 0; i <= steps; i++) {
        const s = (i / steps) * length
        const phase = s * freq + time
        for (let k = 0; k < 2; k++) {
          const a = phase + k * Math.PI
          const off = Math.sin(a) * amp
          const z = Math.cos(a)
          pts.push(
            vertical
              ? { x: center + off, y: s, z, strand: k, i }
              : { x: s, y: center + off, z, strand: k, i },
          )
        }
      }

      // basamaklar (baz çiftleri)
      for (let i = 0; i <= steps; i++) {
        const a = pts[i * 2]
        const b = pts[i * 2 + 1]
        const isDamage = damaged && (i === Math.floor(steps * 0.45) || i === Math.floor(steps * 0.45) + 1)
        const depth = (a.z + b.z) / 2
        const alpha = 0.12 + (depth + 1) * 0.12
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
        const c1 = isDamage ? rose : gold
        const c2 = isDamage ? rose : teal
        grad.addColorStop(0, `rgba(${c1},${isDamage ? 0.9 : alpha})`)
        grad.addColorStop(1, `rgba(${c2},${isDamage ? 0.9 : alpha})`)
        ctx.strokeStyle = grad
        ctx.lineWidth = isDamage ? 3 : 1.4
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }

      // omurgalar ve nükleotidler – arkadan öne doğru çiz
      pts.sort((p, q) => p.z - q.z)
      for (const p of pts) {
        const c = p.strand === 0 ? gold : teal
        const r = 2 + (p.z + 1) * 2.4
        const alpha = 0.25 + (p.z + 1) * 0.37
        ctx.beginPath()
        ctx.fillStyle = `rgba(${c},${alpha})`
        ctx.shadowColor = `rgba(${c},${alpha})`
        ctx.shadowBlur = p.z > 0.4 ? 14 : 0
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [damaged, speed])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
