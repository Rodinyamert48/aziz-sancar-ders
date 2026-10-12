import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Moon, Pause, Play, Scissors, Sun } from 'lucide-react'
import { Card, Reveal, Slide } from '../components/Slide'

const colors: Record<string, string> = { A: '#5eead4', T: '#e8b04a', G: '#a78bfa', C: '#60a5fa' }
const comp: Record<string, string> = { A: 'T', T: 'A', G: 'C', C: 'G' }
const seq = 'GCATGCATTCAGCTAG'.split('')
const LESION = [7, 8]
const CUT = [2, 12] // bu indekslerden sonra kesilir → 3..12 çıkarılır
const inSegment = (i: number) => i > CUT[0] && i <= CUT[1]

const steps = [
  {
    title: 'Hasar oluşur',
    text: 'UV ışığı yan yana iki timini birbirine bağlar. Bu düğüm, DNA’nın okunmasını ve kopyalanmasını engeller.',
  },
  {
    title: 'Hasar tanınır',
    text: 'Onarım proteinleri DNA boyunca tarama yapar ve bükülmeyi fark eder. Bakterilerde UvrA–UvrB, insanda XPC ve TFIIH gibi proteinler görev alır.',
  },
  {
    title: 'Çift kesim',
    text: 'Sancar’ın keşfettiği eksinükleaz, hasarın iki yanından birer kesik atar. İşte “eksizyon” (kesip çıkarma) adı buradan gelir.',
  },
  {
    title: 'Parça çıkarılır',
    text: 'Hasarı içeren kısa parça uzaklaştırılır: bakterilerde 12–13, insanlarda 24–32 nükleotit uzunluğundadır.',
  },
  {
    title: 'Boşluk doldurulur',
    text: 'DNA polimeraz, karşıdaki sağlam ipliği kalıp olarak kullanır ve eksik harfleri doğru sırayla yerleştirir.',
  },
  {
    title: 'Bağlanır — iş tamam!',
    text: 'DNA ligaz son boşluğu mühürler. Molekül artık hasarsız; hücre yaşamına sağlıklı devam eder.',
  },
]

export function Excision({ index }: { index: number }) {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (step >= steps.length - 1) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setStep((s) => s + 1), 2600)
    return () => clearTimeout(t)
  }, [playing, step])

  const W = 50
  const x0 = 20
  const cx = (i: number) => x0 + i * W + W / 2
  const lesionX = (cx(LESION[0]) + cx(LESION[1])) / 2

  return (
    <Slide id="eksizyon" index={index} eyebrow="Nobel getiren keşif" title="Nükleotid eksizyon onarımı">
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <Card className="p-0 md:p-0">
            <svg viewBox={`0 0 ${seq.length * W + 40} 290`} className="w-full" role="img" aria-label={steps[step].title}>
              <defs>
                <radialGradient id="ligGlow">
                  <stop offset="0%" stopColor="#5eead4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* omurgalar */}
              <line x1={x0} x2={x0 + seq.length * W} y1={228} y2={228} stroke="#5eead4" strokeWidth={4} strokeLinecap="round" />
              {seq.map((_, i) => {
                const gone = step >= 3 && inSegment(i)
                const filled = step >= 4 && inSegment(i)
                return (
                  <motion.line
                    key={`bb${i}`}
                    x1={x0 + i * W}
                    x2={x0 + (i + 1) * W}
                    y1={120}
                    y2={120}
                    stroke="#e8b04a"
                    strokeWidth={4}
                    animate={{ opacity: gone && !filled ? 0 : 1 }}
                    transition={{ delay: filled ? (i - CUT[0]) * 0.08 : 0 }}
                  />
                )
              })}
              {/* alt iplik */}
              {seq.map((b, i) => (
                <g key={`b${i}`}>
                  <rect x={x0 + i * W + 4} y={180} width={W - 8} height={42} rx={6} fill={colors[comp[b]]} opacity={0.85} />
                  <text x={cx(i)} y={207} textAnchor="middle" className="fill-ink font-mono text-[17px] font-bold">
                    {comp[b]}
                  </text>
                </g>
              ))}
              {/* üst iplik — orijinal */}
              {seq.map((b, i) => {
                const lesion = LESION.includes(i)
                const bulge = step >= 1 && step < 3 && i >= 5 && i <= 10 ? -10 : 0
                const removed = step >= 3 && inSegment(i)
                return (
                  <motion.g
                    key={`t${i}`}
                    animate={removed ? { y: -110, opacity: 0, rotate: 0 } : { y: bulge, opacity: 1 }}
                    transition={{ duration: removed ? 1.1 : 0.6, ease: 'easeInOut' }}
                  >
                    <rect
                      x={x0 + i * W + 4}
                      y={126}
                      width={W - 8}
                      height={38}
                      rx={6}
                      fill={lesion && step < 3 ? '#fb7185' : colors[b]}
                      opacity={0.9}
                    />
                    <text x={cx(i)} y={153} textAnchor="middle" className="fill-ink font-mono text-[17px] font-bold">
                      {b}
                    </text>
                  </motion.g>
                )
              })}
              {/* dimer bağı */}
              {step < 3 && (
                <motion.rect
                  x={lesionX - 7}
                  y={140}
                  width={14}
                  height={8}
                  rx={4}
                  fill="#fff"
                  animate={{ attrY: step >= 1 ? 130 : 140, opacity: [0.6, 1, 0.6] }}
                  transition={{ opacity: { repeat: Infinity, duration: 1.2 } }}
                />
              )}
              {/* yeni nükleotitler */}
              {step >= 4 &&
                seq.map((b, i) =>
                  inSegment(i) ? (
                    <motion.g
                      key={`n${i}`}
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (i - CUT[0]) * 0.08, type: 'spring', stiffness: 200, damping: 18 }}
                    >
                      <rect
                        x={x0 + i * W + 4}
                        y={126}
                        width={W - 8}
                        height={38}
                        rx={6}
                        fill={colors[b]}
                        stroke="#fff"
                        strokeWidth={step === 4 ? 2 : 0}
                      />
                      <text x={cx(i)} y={153} textAnchor="middle" className="fill-ink font-mono text-[17px] font-bold">
                        {b}
                      </text>
                    </motion.g>
                  ) : null,
                )}
              {/* tanıma kompleksi */}
              <AnimatePresence>
                {(step === 1 || step === 2) && (
                  <motion.g
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -120 }}
                    transition={{ duration: 0.7 }}
                  >
                    <ellipse cx={lesionX} cy={78} rx={150} ry={34} fill="#a78bfa" opacity={0.25} stroke="#a78bfa" />
                    <text x={lesionX} y={84} textAnchor="middle" className="fill-[#ddd6fe] text-[15px] font-semibold">
                      Onarım kompleksi
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>
              {/* kesik işaretleri */}
              <AnimatePresence>
                {step === 2 &&
                  CUT.map((c, k) => (
                    <motion.g
                      key={c}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.2 + k * 0.35, type: 'spring' }}
                      style={{ transformOrigin: `${x0 + (c + 1) * W}px 120px` }}
                    >
                      <line x1={x0 + (c + 1) * W} x2={x0 + (c + 1) * W} y1={104} y2={170} stroke="#fb7185" strokeWidth={3} />
                      <circle cx={x0 + (c + 1) * W} cy={104} r={11} fill="#fb7185" />
                      <text x={x0 + (c + 1) * W} y={109} textAnchor="middle" className="fill-ink text-[13px] font-bold">
                        ✂
                      </text>
                    </motion.g>
                  ))}
              </AnimatePresence>
              {/* ligaz parıltısı */}
              <AnimatePresence>
                {step === 5 &&
                  CUT.map((c, k) => (
                    <motion.circle
                      key={`g${c}`}
                      cx={x0 + (c + (k === 0 ? 1 : 1)) * W}
                      cy={120}
                      r={34}
                      fill="url(#ligGlow)"
                      initial={{ opacity: 0, scale: 0.2 }}
                      animate={{ opacity: [0, 1, 0.4], scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, delay: k * 0.2 }}
                    />
                  ))}
              </AnimatePresence>
              <text x={x0} y={270} className="fill-mist text-[12px]">
                Üst iplik: hasarlı · Alt iplik: kalıp
              </text>
            </svg>
          </Card>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex h-full flex-col">
            <ol className="space-y-1.5">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <button
                    onClick={() => {
                      setPlaying(false)
                      setStep(i)
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${
                      i === step ? 'bg-gold/15 text-paper' : i < step ? 'text-paper/60 hover:bg-white/5' : 'text-mist hover:bg-white/5'
                    }`}
                  >
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-xs ${
                        i <= step ? 'bg-gold text-ink' : 'border border-line'
                      }`}
                    >
                      {i === 2 ? <Scissors className="size-3" /> : i + 1}
                    </span>
                    {s.title}
                  </button>
                </li>
              ))}
            </ol>
            <AnimatePresence mode="wait">
              <motion.p
                key={step}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="mt-4 min-h-24 rounded-xl border border-line bg-ink-2/60 p-4 text-sm leading-relaxed text-paper/85 md:text-base"
                aria-live="polite"
              >
                {steps[step].text}
              </motion.p>
            </AnimatePresence>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  if (step >= steps.length - 1) setStep(0)
                  setPlaying((p) => !p)
                }}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink transition hover:brightness-110"
              >
                {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
                {playing ? 'Durdur' : 'Otomatik oynat'}
              </button>
              <button
                onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                disabled={step === steps.length - 1}
                className="rounded-full border border-line px-4 py-2 text-sm text-mist transition hover:text-paper disabled:opacity-30"
              >
                Sonraki adım
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </Slide>
  )
}

/* ---------------------------- BİYOLOJİK SAAT ---------------------------- */

const loop = [
  { label: 'CLOCK–BMAL1', text: 'Bu ikili, saat genlerini “açar”.' },
  { label: 'PER & CRY üretilir', text: 'Per ve Cry genlerinden proteinler yapılır.' },
  { label: 'CRY–PER birikir', text: 'Proteinler birikip çekirdeğe girer.' },
  { label: 'Fren!', text: 'CRY–PER, CLOCK–BMAL1’i baskılar; kendi üretimini durdurur.' },
]

export function Circadian({ index }: { index: number }) {
  const [hour, setHour] = useState(8)
  const day = hour >= 6 && hour < 18
  const phase = Math.floor(((hour + 18) % 24) / 6) // 6'dan başlayarak 4 evre
  const angle = (hour / 24) * 360

  return (
    <Slide id="biyolojik-saat" index={index} eyebrow="İkinci büyük alan" title="Kriptokrom ve biyolojik saat">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="space-y-4 text-paper/80 md:text-lg">
            <p>
              Sancar, fotoliyaza çok benzeyen ama DNA onarmayan <b className="text-helix">kriptokrom</b> proteinlerini
              araştırdı. Ekibi, memelilerde kriptokromların <b className="text-paper">biyolojik saatin temel
              parçası</b> olduğunu gösterdi.
            </p>
            <p>
              Vücudumuz yaklaşık 24 saatlik bir ritimle çalışır: uyku, hormonlar, vücut ısısı ve hatta{' '}
              <b className="text-paper">DNA onarımının hızı</b> günün saatine göre değişir.
            </p>
            <p className="rounded-xl border border-helix/30 bg-helix/5 p-4 text-base text-helix">
              Bu bilgi, kemoterapi ilaçlarının vücudun en dayanıklı olduğu saatte verilmesini hedefleyen{' '}
              <b>kronoterapi</b> çalışmalarına ilham veriyor.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Card>
            <div className="grid items-center gap-6 sm:grid-cols-[180px_1fr]">
              <div className="relative mx-auto size-44">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    background: day
                      ? 'radial-gradient(circle at 50% 35%, rgba(232,176,74,.35), rgba(13,18,32,.9) 70%)'
                      : 'radial-gradient(circle at 50% 35%, rgba(94,234,212,.25), rgba(7,9,15,.95) 70%)',
                  }}
                />
                <div className="absolute inset-0 rounded-full border border-line" />
                {Array.from({ length: 24 }).map((_, h) => (
                  <span
                    key={h}
                    className={`absolute top-1/2 left-1/2 h-2 w-px origin-[0_0] ${h % 6 === 0 ? 'h-3 bg-paper/70' : 'bg-line'}`}
                    style={{ transform: `rotate(${h * 15 + 180}deg) translate(0, 80px)` }}
                  />
                ))}
                <motion.div
                  className="absolute top-1/2 left-1/2 h-[70px] w-0.5 origin-top rounded bg-gold"
                  animate={{ rotate: angle + 180 }}
                  transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {day ? <Sun className="size-6 text-gold" /> : <Moon className="size-6 text-helix" />}
                  <span className="mt-1 font-mono text-lg">{String(hour).padStart(2, '0')}:00</span>
                </div>
              </div>
              <ol className="space-y-2">
                {loop.map((l, i) => (
                  <motion.li
                    key={l.label}
                    animate={{ opacity: i === phase ? 1 : 0.35, x: i === phase ? 4 : 0 }}
                    className={`rounded-lg border px-3 py-2 text-sm ${i === phase ? 'border-helix/60 bg-helix/10' : 'border-line'}`}
                  >
                    <p className="font-semibold">{l.label}</p>
                    <p className="text-xs text-paper/70">{l.text}</p>
                  </motion.li>
                ))}
              </ol>
            </div>
            <label className="mt-6 block">
              <span className="text-xs tracking-widest text-mist uppercase">Günün saati — kaydırın</span>
              <input
                type="range"
                min={0}
                max={23}
                value={hour}
                onChange={(e) => setHour(Number(e.target.value))}
                onKeyDown={(e) => e.stopPropagation()}
                className="mt-2 w-full accent-gold"
              />
            </label>
            <p className="mt-2 text-xs text-mist">
              Döngü yaklaşık 24 saatte bir tekrarlanır. (Evreler basitleştirilmiş bir gösterimdir.)
            </p>
          </Card>
        </Reveal>
      </div>
    </Slide>
  )
}
