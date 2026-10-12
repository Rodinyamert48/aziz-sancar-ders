import type { ReactNode } from 'react'
import { motion } from 'motion/react'

type SlideProps = {
  id: string
  index: number
  eyebrow?: string
  title?: ReactNode
  children: ReactNode
  className?: string
  bleed?: ReactNode
}

/** Her slayt tam ekran bir bölümdür; başlık ve içerik görünür olunca canlanır. */
export function Slide({ id, index, eyebrow, title, children, className = '', bleed }: SlideProps) {
  return (
    <section
      id={id}
      data-slide={index}
      className="relative flex min-h-dvh w-full snap-start items-center overflow-hidden"
      aria-label={typeof title === 'string' ? title : eyebrow}
    >
      {bleed}
      <div className={`relative z-10 mx-auto w-full max-w-6xl px-5 pt-16 pb-28 sm:px-10 md:py-20 ${className}`}>
        {(eyebrow || title) && (
          <header className="mb-8 md:mb-10">
            {eyebrow && (
              <Reveal>
                <p className="mb-3 flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-gold uppercase">
                  <span className="font-mono text-mist">{String(index + 1).padStart(2, '0')}</span>
                  <span className="h-px w-8 bg-gold/60" />
                  {eyebrow}
                </p>
              </Reveal>
            )}
            {title && (
              <Reveal delay={0.05}>
                <h2 className="font-display text-4xl leading-[1.05] font-semibold text-balance sm:text-5xl md:text-6xl">
                  {title}
                </h2>
              </Reveal>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`glass rounded-2xl p-5 md:p-6 ${className}`}>{children}</div>
}
