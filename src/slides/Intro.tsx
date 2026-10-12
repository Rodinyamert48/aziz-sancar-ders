import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowDown, Award, GraduationCap, MapPin, Microscope } from 'lucide-react'
import { Helix } from '../components/Helix'
import { Card, Reveal, Slide } from '../components/Slide'
import { config } from '../data/config'
import { Counter } from '../components/Counter'

export function Cover({ index }: { index: number }) {
  return (
    <Slide
      id="kapak"
      index={index}
      bleed={
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(94,234,212,0.12),transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(232,176,74,0.12),transparent_50%)]" />
          <Helix className="absolute inset-y-0 right-0 h-full w-full opacity-40 md:w-[55%] md:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent md:via-ink/60" />
        </>
      }
    >
      <div className="max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium tracking-widest text-gold-soft uppercase"
        >
          <Award className="size-3.5" /> 2015 Nobel Kimya Ödülü
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl leading-[0.95] font-semibold tracking-tight sm:text-7xl md:text-8xl"
        >
          Aziz
          <br />
          <span className="bg-gradient-to-r from-gold via-gold-soft to-helix bg-clip-text text-transparent">Sancar</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg text-paper/80 md:text-2xl"
        >
          DNA'nın tamircisi: <span className="text-paper">Savur'dan Stockholm'e</span> uzanan bir bilim yolculuğu
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-mist"
        >
          <span>{config.course}</span>
          <span className="hidden h-4 w-px bg-line sm:block" />
          <span>{config.presenter}</span>
          <span className="hidden h-4 w-px bg-line sm:block" />
          <span>{config.date}</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-14 flex items-center gap-3 text-xs text-mist"
        >
          <ArrowDown className="size-4 animate-bounce text-gold" />
          İlerlemek için <Kbd>→</Kbd> <Kbd>Boşluk</Kbd> ya da kaydırın · Konuşmacı notları <Kbd>N</Kbd>
        </motion.div>
      </div>
    </Slide>
  )
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded-md border border-line bg-ink-3 px-1.5 py-0.5 font-mono text-[11px] text-paper/90">
      {children}
    </kbd>
  )
}

const agenda = [
  'Kimdir?',
  'Çocukluk ve eğitim',
  'Hayat çizgisi',
  'DNA ve hasar',
  'Fotoliyaz',
  'Nükleotid eksizyon onarımı',
  'Biyolojik saat',
  '2015 Nobel Ödülü',
  'Neden önemli?',
  'Türkiye ile bağı',
  'Ondan öğrendiklerimiz',
  'Mini quiz',
]

export function Agenda({ index }: { index: number }) {
  return (
    <Slide id="icerik" index={index} eyebrow="Yol haritası" title="Bugün neler konuşacağız?">
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {agenda.map((item, i) => (
          <Reveal key={item} delay={i * 0.04}>
            <li className="group flex items-center gap-4 rounded-xl border border-line bg-ink-2/60 px-5 py-4 transition hover:border-gold/50 hover:bg-ink-3">
              <span className="font-mono text-sm text-gold">{String(i + 3).padStart(2, '0')}</span>
              <span className="text-paper/90 group-hover:text-paper">{item}</span>
            </li>
          </Reveal>
        ))}
      </ol>
    </Slide>
  )
}

function Portrait() {
  const [failed, setFailed] = useState(false)
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-3 to-ink">
      {!failed ? (
        <img
          src={config.photo}
          alt="Aziz Sancar"
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <>
          <Helix className="absolute inset-0 h-full w-full opacity-60" speed={0.5} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-8xl font-semibold text-paper/90 drop-shadow-[0_0_30px_rgba(232,176,74,0.4)]">
              AS
            </span>
          </div>
        </>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-5">
        <p className="font-display text-2xl">Aziz Sancar</p>
        <p className="text-sm text-mist">Biyokimyacı · Moleküler biyolog</p>
      </div>
    </div>
  )
}

const facts = [
  { icon: MapPin, label: 'Doğum', value: '8 Eylül 1946, Savur / Mardin' },
  { icon: GraduationCap, label: 'Eğitim', value: 'İstanbul Tıp Fakültesi (1969), Teksas Üniv. Dallas doktora (1977)' },
  { icon: Microscope, label: 'Kurum', value: 'Kuzey Karolina Üniversitesi, Chapel Hill (1982–)' },
  { icon: Award, label: 'Ödül', value: '2015 Nobel Kimya Ödülü — DNA onarımı' },
]

export function WhoIs({ index }: { index: number }) {
  return (
    <Slide id="kimdir" index={index} eyebrow="Kimdir?" title="Bir doktor, bir biyokimyacı, bir öncü">
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,300px)_1fr] md:gap-12">
        <Reveal className="mx-auto w-full max-w-[300px]">
          <Portrait />
        </Reveal>
        <div className="space-y-6">
          <Reveal>
            <p className="text-lg leading-relaxed text-paper/80 md:text-xl">
              Aziz Sancar, hücrelerimizin hasar gören DNA'yı <strong className="text-paper">nasıl onardığını</strong> moleküler
              düzeyde açıklayan bilim insanıdır. Bilim dalında Nobel Ödülü alan <strong className="text-gold">ilk Türk</strong>{' '}
              bilim insanıdır.
            </p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {facts.map((f, i) => (
              <Reveal key={f.label} delay={0.08 * i}>
                <Card className="h-full">
                  <f.icon className="mb-3 size-5 text-gold" />
                  <p className="text-xs tracking-widest text-mist uppercase">{f.label}</p>
                  <p className="mt-1 text-paper/90">{f.value}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div className="grid grid-cols-3 gap-3 text-center">
              <Stat value={1946} label="Doğum yılı" />
              <Stat value={40} suffix="+" label="Yıllık araştırma" />
              <Stat value={2015} label="Nobel yılı" />
            </div>
          </Reveal>
        </div>
      </div>
    </Slide>
  )
}

function Stat({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  return (
    <div className="rounded-2xl border border-line bg-ink-2/60 p-4">
      <p className="font-display text-3xl font-semibold text-gold md:text-4xl">
        <Counter to={value} />
        {suffix}
      </p>
      <p className="mt-1 text-xs text-mist">{label}</p>
    </div>
  )
}
