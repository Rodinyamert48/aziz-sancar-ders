import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Cigarette, FlaskConical, Lightbulb, RotateCcw, Sun, Zap } from 'lucide-react'
import { Helix } from '../components/Helix'
import { Card, Reveal, Slide } from '../components/Slide'

const sources = [
  { icon: Sun, title: 'Güneşin UV ışınları', text: 'Yan yana iki timin bazını birbirine yapıştırır (timin dimeri).' },
  { icon: Cigarette, title: 'Sigara dumanı', text: 'İçindeki kimyasallar DNA bazlarına bağlanarak hasar oluşturur.' },
  { icon: FlaskConical, title: 'Kimyasal maddeler', text: 'Bazı çevresel kirleticiler ve ilaçlar DNA’yı bozar.' },
  { icon: Zap, title: 'Hücrenin kendisi', text: 'Normal metabolizmada oluşan serbest radikaller de DNA’ya zarar verir.' },
]

export function DnaBasics({ index }: { index: number }) {
  return (
    <Slide
      id="dna"
      index={index}
      eyebrow="Temel kavramlar"
      title={
        <>
          DNA her gün <span className="text-damage">saldırı</span> altında
        </>
      }
      bleed={<Helix className="absolute top-0 right-0 hidden h-full w-[28%] opacity-25 lg:block" damaged speed={0.6} />}
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:pr-[18%]">
        <Reveal>
          <div className="space-y-4 text-lg leading-relaxed text-paper/80">
            <p>
              DNA, hücrelerimizin <strong className="text-paper">kullanım kılavuzudur</strong>. Dört harfli bir alfabeyle
              yazılır: <Base l="A" /> <Base l="T" /> <Base l="G" /> <Base l="C" />. A her zaman T ile, G her zaman C ile
              eşleşir.
            </p>
            <p>
              Ancak bu kılavuz sürekli hasar görür. Hasar onarılmazsa hücre ölebilir ya da kontrolsüz bölünerek
              <strong className="text-damage"> kansere</strong> dönüşebilir.
            </p>
            <p className="rounded-xl border border-gold/30 bg-gold/5 p-4 text-base text-gold-soft">
              Peki DNA’mız neden dağılıp gitmiyor? Çünkü hücrelerimizde sürekli çalışan <b>onarım ekipleri</b> var.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2">
          {sources.map((s, i) => (
            <Reveal key={s.title} delay={0.08 * i}>
              <Card className="h-full transition hover:border-damage/40">
                <s.icon className="mb-3 size-6 text-damage" />
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-paper/70">{s.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Slide>
  )
}

const baseColor: Record<string, string> = { A: '#5eead4', T: '#e8b04a', G: '#a78bfa', C: '#60a5fa' }
const pair: Record<string, string> = { A: 'T', T: 'A', G: 'C', C: 'G' }

function Base({ l }: { l: string }) {
  return (
    <span
      className="inline-flex size-7 items-center justify-center rounded-md font-mono text-sm font-bold text-ink"
      style={{ background: baseColor[l] }}
    >
      {l}
    </span>
  )
}

/* ---------------------------- FOTOLİYAZ ---------------------------- */

const photoSeq = 'GACTTAGCATTCG'.split('')
const TT = [3, 4] // dimerleşen timinler

type PhotoState = 'saglam' | 'uv' | 'hasar' | 'onariliyor' | 'onarildi'

export function Photolyase({ index }: { index: number }) {
  const [state, setState] = useState<PhotoState>('saglam')
  const damaged = state === 'hasar' || state === 'onariliyor'

  const fireUv = () => {
    setState('uv')
    setTimeout(() => setState('hasar'), 1400)
  }
  const repair = () => {
    setState('onariliyor')
    setTimeout(() => setState('onarildi'), 2000)
  }

  const W = 52
  const status: Record<PhotoState, { text: string; color: string }> = {
    saglam: { text: 'DNA sağlam. Bazlar karşılıklı eşleşmiş durumda.', color: 'text-helix' },
    uv: { text: 'UV ışınları DNA’ya çarpıyor…', color: 'text-uv' },
    hasar: { text: 'Hasar! Yan yana iki timin birbirine yapıştı (timin dimeri). DNA büküldü.', color: 'text-damage' },
    onariliyor: { text: 'Fotoliyaz hasarı buldu, mavi ışığın enerjisini kullanarak bağı kırıyor…', color: 'text-sky-300' },
    onarildi: { text: 'Onarıldı! DNA tek adımda eski haline döndü.', color: 'text-helix' },
  }

  return (
    <Slide id="fotoliyaz" index={index} eyebrow="İlk büyük keşif" title="Fotoliyaz: ışıkla çalışan tamirci">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <Reveal>
          <div className="space-y-4 text-paper/80 md:text-lg">
            <p>
              Sancar doktorasında, bakterilerin UV hasarını <b className="text-paper">görünür ışık</b> yardımıyla nasıl
              onardığını araştırdı. Bu işi yapan enzim <b className="text-sky-300">fotoliyaz</b>dır.
            </p>
            <p>
              1976’da fotoliyaz genini <b className="text-paper">klonladı</b> ve enzimi saf olarak elde etti. Daha sonra
              enzimin ışığı nasıl yakalayıp kimyasal enerjiye çevirdiğini ayrıntısıyla açıkladı.
            </p>
            <p className="text-sm text-mist">
              Not: Fotoliyaz bakterilerde, bitkilerde ve birçok hayvanda bulunur; insanlarda yoktur. İnsanlar bu hasarı
              başka bir yolla, “nükleotid eksizyon onarımı” ile tamir eder.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Card className="overflow-hidden p-0 md:p-0">
            <div className="relative bg-ink-2/80">
              <svg viewBox={`0 0 ${photoSeq.length * W + 40} 260`} className="w-full" role="img" aria-label="Fotoliyaz animasyonu">
                {/* UV ışınları */}
                <AnimatePresence>
                  {state === 'uv' &&
                    [0, 1, 2, 3, 4].map((i) => (
                      <motion.line
                        key={i}
                        x1={120 + i * 70}
                        x2={20 + TT[0] * W + 50 + (i - 2) * 6}
                        y1={-10}
                        y2={95}
                        stroke="#a78bfa"
                        strokeWidth={3}
                        strokeDasharray="6 8"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, delay: i * 0.08 }}
                      />
                    ))}
                </AnimatePresence>
                {/* Mavi ışık */}
                <AnimatePresence>
                  {state === 'onariliyor' && (
                    <motion.circle
                      cx={20 + TT[0] * W + W}
                      cy={110}
                      r={90}
                      fill="url(#blueGlow)"
                      initial={{ opacity: 0, scale: 0.3 }}
                      animate={{ opacity: [0, 0.9, 0.6, 0.9], scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.6 }}
                    />
                  )}
                </AnimatePresence>
                <defs>
                  <radialGradient id="blueGlow">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* omurgalar */}
                <line x1={20} x2={20 + photoSeq.length * W} y1={70} y2={70} stroke="#e8b04a" strokeWidth={4} strokeLinecap="round" />
                <line x1={20} x2={20 + photoSeq.length * W} y1={190} y2={190} stroke="#5eead4" strokeWidth={4} strokeLinecap="round" />
                {photoSeq.map((b, i) => {
                  const x = 20 + i * W + 8
                  const isTT = TT.includes(i)
                  const shift = damaged && isTT ? (i === TT[0] ? 7 : -7) : 0
                  return (
                    <g key={i}>
                      <motion.g animate={{ x: shift, y: damaged && isTT ? -8 : 0 }} transition={{ type: 'spring', stiffness: 120 }}>
                        <rect x={x} y={78} width={W - 16} height={42} rx={7} fill={baseColor[b]} opacity={damaged && isTT ? 1 : 0.9} />
                        <text x={x + (W - 16) / 2} y={105} textAnchor="middle" className="fill-ink font-mono text-[18px] font-bold">
                          {b}
                        </text>
                      </motion.g>
                      <rect x={x} y={140} width={W - 16} height={42} rx={7} fill={baseColor[pair[b]]} opacity={0.9} />
                      <text x={x + (W - 16) / 2} y={167} textAnchor="middle" className="fill-ink font-mono text-[18px] font-bold">
                        {pair[b]}
                      </text>
                      <motion.line
                        x1={x + (W - 16) / 2}
                        x2={x + (W - 16) / 2}
                        y1={122}
                        y2={138}
                        stroke="#94a3b8"
                        strokeWidth={2}
                        strokeDasharray="3 3"
                        animate={{ opacity: damaged && isTT ? 0 : 0.7 }}
                      />
                    </g>
                  )
                })}
                {/* dimer bağı */}
                <AnimatePresence>
                  {damaged && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.5 }}>
                      {[80, 100].map((y) => (
                        <rect key={y} x={20 + TT[0] * W + 8 + 7 + (W - 16) - 8} y={y} width={18} height={7} rx={3.5} fill="#fb7185" />
                      ))}
                    </motion.g>
                  )}
                </AnimatePresence>
                {/* fotoliyaz enzimi */}
                <AnimatePresence>
                  {(state === 'onariliyor' || state === 'onarildi') && (
                    <motion.g
                      initial={{ x: -260, opacity: 0 }}
                      animate={state === 'onarildi' ? { x: 360, opacity: 0 } : { x: 0, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: state === 'onarildi' ? 1.4 : 0.9, ease: 'easeInOut' }}
                    >
                      <ellipse cx={20 + TT[0] * W + W} cy={46} rx={70} ry={30} fill="#0ea5e9" opacity={0.85} />
                      <text x={20 + TT[0] * W + W} y={52} textAnchor="middle" className="fill-white text-[15px] font-semibold">
                        Fotoliyaz
                      </text>
                    </motion.g>
                  )}
                </AnimatePresence>
                <text x={20} y={240} className="fill-mist text-[12px]">5′</text>
                <text x={photoSeq.length * W + 10} y={240} className="fill-mist text-[12px]">3′</text>
              </svg>
            </div>
            <div className="space-y-4 border-t border-line p-5">
              <AnimatePresence mode="wait">
                <motion.p
                  key={state}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className={`min-h-12 text-sm md:text-base ${status[state].color}`}
                  aria-live="polite"
                >
                  {status[state].text}
                </motion.p>
              </AnimatePresence>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={fireUv}
                  disabled={state !== 'saglam'}
                  className="inline-flex items-center gap-2 rounded-full bg-uv px-4 py-2 text-sm font-semibold text-ink transition hover:brightness-110 disabled:opacity-30"
                >
                  <Sun className="size-4" /> 1. UV ışını gönder
                </button>
                <button
                  onClick={repair}
                  disabled={state !== 'hasar'}
                  className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-4 py-2 text-sm font-semibold text-ink transition hover:brightness-110 disabled:opacity-30"
                >
                  <Lightbulb className="size-4" /> 2. Fotoliyaz + mavi ışık
                </button>
                <button
                  onClick={() => setState('saglam')}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-mist transition hover:text-paper"
                >
                  <RotateCcw className="size-4" /> Sıfırla
                </button>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </Slide>
  )
}
