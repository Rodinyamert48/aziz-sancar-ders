import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Activity,
  ArrowUpRight,
  Check,
  Dna,
  Flag,
  HandHeart,
  Home,
  Lightbulb,
  Medal,
  Pill,
  RefreshCw,
  Repeat,
  ShieldCheck,
  Sun,
  Target,
  Users,
  X,
} from 'lucide-react'
import { Helix } from '../components/Helix'
import { Card, Reveal, Slide } from '../components/Slide'

const laureates = [
  {
    name: 'Tomas Lindahl',
    country: 'İsveç · Francis Crick Enstitüsü, İngiltere',
    method: 'Baz eksizyon onarımı',
    text: 'DNA’nın kendiliğinden bozulduğunu ve tek tek hasarlı bazların nasıl değiştirildiğini gösterdi.',
  },
  {
    name: 'Paul Modrich',
    country: 'ABD · Duke Üniversitesi',
    method: 'Yanlış eşleşme onarımı',
    text: 'DNA kopyalanırken yapılan “yazım hatalarının” nasıl düzeltildiğini açıkladı.',
  },
  {
    name: 'Aziz Sancar',
    country: 'Türkiye / ABD · Kuzey Karolina Üniversitesi',
    method: 'Nükleotid eksizyon onarımı',
    text: 'UV ışığı ve kimyasalların yol açtığı hasarların kesip çıkarılarak onarıldığı mekanizmayı haritaladı.',
    highlight: true,
  },
]

export function Nobel({ index }: { index: number }) {
  return (
    <Slide
      id="nobel"
      index={index}
      eyebrow="7 Ekim 2015 · Stockholm"
      title={
        <>
          <span className="bg-gradient-to-r from-gold via-gold-soft to-gold bg-clip-text text-transparent">Nobel Kimya Ödülü</span>
        </>
      }
      bleed={
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(232,176,74,0.18),transparent_60%)]" />
      }
    >
      <Reveal>
        <p className="mb-8 max-w-3xl text-lg text-paper/80 md:text-xl">
          Ödül, üç bilim insanına <b className="text-gold-soft">“DNA onarımının mekanizmalarına yönelik çalışmaları”</b>{' '}
          için verildi. Her biri hücrenin farklı bir “tamir kutusunu” keşfetmişti. Ödül töreni 10 Aralık 2015’te
          Stockholm’de yapıldı.
        </p>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-3">
        {laureates.map((l, i) => (
          <Reveal key={l.name} delay={0.12 * i}>
            <motion.div
              whileHover={{ y: -6 }}
              className={`relative h-full overflow-hidden rounded-2xl border p-6 ${
                l.highlight ? 'border-gold/60 bg-gradient-to-b from-gold/15 to-ink-2' : 'border-line bg-ink-2/70'
              }`}
            >
              {l.highlight && (
                <span className="absolute top-4 right-4 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-ink uppercase">
                  Bilimde ilk Türk
                </span>
              )}
              <Medal className={`mb-4 size-8 ${l.highlight ? 'text-gold' : 'text-mist'}`} />
              <h3 className="font-display text-2xl font-semibold">{l.name}</h3>
              <p className="mt-1 text-xs text-mist">{l.country}</p>
              <p className="mt-4 inline-block rounded-md bg-white/5 px-2 py-1 text-sm font-medium text-helix">{l.method}</p>
              <p className="mt-3 text-sm leading-relaxed text-paper/75">{l.text}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Slide>
  )
}

const impacts = [
  { icon: ShieldCheck, title: 'Kanseri anlamak', text: 'Onarım sistemleri bozulduğunda hücrelerde mutasyon birikir; bu, birçok kanser türünün temelinde yatar.' },
  { icon: Sun, title: 'Kseroderma pigmentozum', text: 'Eksizyon onarımı genlerinde kusuru olan kişiler güneşe aşırı duyarlıdır ve cilt kanseri riskleri çok yüksektir.' },
  { icon: Pill, title: 'Daha akıllı ilaçlar', text: 'Sisplatin gibi kemoterapi ilaçları DNA’ya hasar vererek etki eder; onarımı anlamak tedaviyi iyileştirir.' },
  { icon: Activity, title: 'Kronoterapi', text: 'Biyolojik saat bilgisiyle ilacın en etkili ve en az yan etkili saatte verilmesi araştırılıyor.' },
]

export function Impact({ index }: { index: number }) {
  return (
    <Slide id="onem" index={index} eyebrow="Neden önemli?" title="Laboratuvardan hayata">
      <div className="grid gap-4 sm:grid-cols-2">
        {impacts.map((m, i) => (
          <Reveal key={m.title} delay={0.08 * i}>
            <Card className="flex h-full gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-helix/10 text-helix">
                <m.icon className="size-6" />
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold">{m.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-paper/75 md:text-base">{m.text}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.4}>
        <p className="mt-8 text-center text-lg text-paper/70">
          Temel bilim “işe yarar mı?” diye sorulmadan yapılır; ama yıllar sonra <span className="text-gold">milyonlarca
          insanın</span> hayatına dokunur.
        </p>
      </Reveal>
    </Slide>
  )
}

const ties = [
  {
    icon: Medal,
    title: 'Madalya Anıtkabir’de',
    text: 'Nobel madalyasını ve beratını, eğitim aldığı Cumhuriyet’in kurucusuna minnetinin simgesi olarak Anıtkabir’e bağışladı.',
  },
  {
    icon: Home,
    title: 'Türk Evi',
    text: 'Eşi Prof. Dr. Gwen Sancar ile kurdukları vakıf aracılığıyla Chapel Hill’de Türk öğrenci ve araştırmacılara kapısını açan bir ev kurdular.',
  },
  {
    icon: Users,
    title: 'Genç bilim insanları',
    text: 'Laboratuvarında yıllar boyunca pek çok Türk araştırmacı yetiştirdi; Türkiye’deki gençlerle buluşmalarda bilime teşvik etti.',
  },
  {
    icon: HandHeart,
    title: 'Mütevazılık',
    text: 'Başarısını ailesine, öğretmenlerine ve birlikte çalıştığı ekibe borçlu olduğunu her fırsatta vurguladı.',
  },
]

export function Turkey({ index }: { index: number }) {
  return (
    <Slide
      id="turkiye"
      index={index}
      eyebrow="Türkiye ile bağı"
      title={
        <>
          Köklerini hiç <span className="text-damage">unutmadı</span>
        </>
      }
      bleed={
        <div className="absolute -right-40 -bottom-40 size-[520px] rounded-full bg-damage/10 blur-3xl" aria-hidden="true" />
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {ties.map((t, i) => (
          <Reveal key={t.title} delay={0.08 * i}>
            <Card className="h-full">
              <div className="mb-3 flex items-center gap-3">
                <t.icon className="size-5 text-damage" />
                <h3 className="font-display text-xl font-semibold">{t.title}</h3>
              </div>
              <p className="text-paper/75">{t.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.4}>
        <div className="mt-8 flex items-center gap-3 text-sm text-mist">
          <Flag className="size-4 text-damage" />
          Sancar, Nobel’i kazandıktan sonra da Türk vatandaşlığını ve kimliğini gururla taşıdığını vurguladı.
        </div>
      </Reveal>
    </Slide>
  )
}

const lessons = [
  { icon: Target, title: 'Problemi net tanımla', text: '“UV hasarı nasıl onarılıyor?” gibi açık bir soruyla başladı ve onlarca yıl o soruyu derinleştirdi.' },
  { icon: Lightbulb, title: 'Merakla başla', text: 'Doktorken yetinmedi; hastalığın kökenini merak edip biyokimyaya yöneldi.' },
  { icon: Repeat, title: 'Yinele ve sabret', text: 'Deney → başarısızlık → yeniden deneme. Büyük sonuçlar yılların birikimidir.' },
  { icon: Users, title: 'Ekip ve mentorluk', text: 'Rupert ve Rupp gibi hocalarından öğrendi, sonra kendi öğrencilerini yetiştirdi.' },
  { icon: Dna, title: 'Temele in', text: 'Sorunu en küçük parçalarına (moleküllere) kadar inceleyip mekanizmayı ortaya koydu.' },
]

export function Lessons({ index }: { index: number }) {
  return (
    <Slide id="dersler" index={index} eyebrow="Proje tasarımı açısından" title="Aziz Sancar’dan öğrendiklerimiz">
      <div className="grid gap-3 md:grid-cols-5">
        {lessons.map((l, i) => (
          <Reveal key={l.title} delay={0.08 * i}>
            <div className="group relative h-full rounded-2xl border border-line bg-ink-2/70 p-5 transition hover:border-gold/50">
              <span className="absolute top-4 right-4 font-mono text-xs text-mist">0{i + 1}</span>
              <l.icon className="mb-6 size-7 text-gold transition group-hover:scale-110" />
              <h3 className="font-semibold">{l.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/70">{l.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.5}>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm">
          {['Soru', 'Hipotez', 'Deney', 'Analiz', 'Paylaşım'].map((s, i, a) => (
            <span key={s} className="flex items-center gap-2">
              <span className="rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-gold-soft">{s}</span>
              {i < a.length - 1 && <span className="text-mist">→</span>}
            </span>
          ))}
        </div>
      </Reveal>
    </Slide>
  )
}

/* ---------------------------- QUIZ ---------------------------- */

const questions = [
  {
    q: 'Aziz Sancar nerede doğdu?',
    options: ['Diyarbakır', 'Savur, Mardin', 'Midyat, Mardin', 'Şanlıurfa'],
    answer: 1,
  },
  {
    q: 'Sancar hangi yıl Nobel Ödülü kazandı?',
    options: ['2009', '2012', '2015', '2018'],
    answer: 2,
  },
  {
    q: 'Nobel’i hangi dalda aldı?',
    options: ['Tıp', 'Fizik', 'Kimya', 'Barış'],
    answer: 2,
  },
  {
    q: 'Sancar’ın aydınlattığı onarım mekanizmasının adı nedir?',
    options: ['Baz eksizyon onarımı', 'Yanlış eşleşme onarımı', 'Nükleotid eksizyon onarımı', 'Rekombinasyon'],
    answer: 2,
  },
  {
    q: 'Işığın enerjisiyle DNA hasarını onaran enzim hangisidir?',
    options: ['Fotoliyaz', 'Amilaz', 'Helikaz', 'Pepsin'],
    answer: 0,
  },
  {
    q: 'Sancar Nobel madalyasını nereye bağışladı?',
    options: ['TÜBİTAK', 'İstanbul Üniversitesi', 'Anıtkabir', 'Mardin Müzesi'],
    answer: 2,
  },
]

export function Quiz({ index }: { index: number }) {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const done = i >= questions.length
  const q = questions[i]

  const choose = (k: number) => {
    if (picked !== null) return
    setPicked(k)
    if (k === q.answer) setScore((s) => s + 1)
  }
  const next = () => {
    setPicked(null)
    setI((x) => x + 1)
  }
  const reset = () => {
    setI(0)
    setPicked(null)
    setScore(0)
  }

  return (
    <Slide id="quiz" index={index} eyebrow="Sınıfla etkileşim" title="Mini quiz: Ne kadar dinlediniz?">
      <Reveal>
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full bg-gold"
                animate={{ width: `${(Math.min(i, questions.length) / questions.length) * 100}%` }}
              />
            </div>
            <span className="font-mono text-xs text-mist">
              {Math.min(i + 1, questions.length)}/{questions.length}
            </span>
          </div>
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="mb-6 font-display text-2xl font-semibold md:text-3xl">{q.q}</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {q.options.map((o, k) => {
                    const correct = picked !== null && k === q.answer
                    const wrong = picked === k && k !== q.answer
                    return (
                      <motion.button
                        key={o}
                        onClick={() => choose(k)}
                        animate={wrong ? { x: [0, -8, 8, -4, 0] } : {}}
                        className={`flex items-center justify-between rounded-xl border px-5 py-4 text-left transition ${
                          correct
                            ? 'border-helix bg-helix/15 text-paper'
                            : wrong
                              ? 'border-damage bg-damage/15'
                              : picked !== null
                                ? 'border-line opacity-50'
                                : 'border-line bg-ink-2/70 hover:border-gold/60 hover:bg-ink-3'
                        }`}
                      >
                        <span>
                          <span className="mr-3 font-mono text-sm text-mist">{String.fromCharCode(65 + k)}</span>
                          {o}
                        </span>
                        {correct && <Check className="size-5 text-helix" />}
                        {wrong && <X className="size-5 text-damage" />}
                      </motion.button>
                    )
                  })}
                </div>
                <div className="mt-6 h-10">
                  {picked !== null && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={next}
                      className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-ink"
                    >
                      {i === questions.length - 1 ? 'Sonucu gör' : 'Sonraki soru →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <p className="font-display text-7xl font-semibold text-gold">
                  {score}/{questions.length}
                </p>
                <p className="mt-3 text-lg text-paper/80">
                  {score === questions.length
                    ? 'Mükemmel! Aziz Sancar gurur duyardı.'
                    : score >= questions.length / 2
                      ? 'Harika! Konuyu çok iyi takip ettiniz.'
                      : 'Fena değil — tekrar denemeye ne dersiniz?'}
                </p>
                <button
                  onClick={reset}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2 text-sm text-mist hover:text-paper"
                >
                  <RefreshCw className="size-4" /> Tekrar oyna
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </Slide>
  )
}

const sources = [
  { title: 'The Nobel Prize in Chemistry 2015 — Basın bülteni', url: 'https://www.nobelprize.org/prizes/chemistry/2015/press-release/' },
  { title: 'Aziz Sancar — Nobel biyografisi', url: 'https://www.nobelprize.org/prizes/chemistry/2015/sancar/biographical/' },
  { title: 'Aziz Sancar — Nobel konferansı', url: 'https://www.nobelprize.org/prizes/chemistry/2015/sancar/lecture/' },
  { title: 'Aziz Sancar — Vikipedi', url: 'https://tr.wikipedia.org/wiki/Aziz_Sancar' },
  { title: 'UNC School of Medicine — Biyokimya ve Biyofizik Bölümü', url: 'https://www.med.unc.edu/biochem/' },
  { title: 'Nucleotide excision repair — Wikipedia', url: 'https://en.wikipedia.org/wiki/Nucleotide_excision_repair' },
]

export function Sources({ index }: { index: number }) {
  return (
    <Slide id="kaynaklar" index={index} eyebrow="Kaynakça" title="Daha fazlasını okumak için">
      <ul className="grid gap-3 md:grid-cols-2">
        {sources.map((s, i) => (
          <Reveal key={s.url} delay={0.05 * i}>
            <li>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-ink-2/60 px-5 py-4 transition hover:border-gold/50"
              >
                <span>
                  <span className="block text-paper/90">{s.title}</span>
                  <span className="block truncate text-xs text-mist">{new URL(s.url).hostname}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-mist transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
              </a>
            </li>
          </Reveal>
        ))}
      </ul>
    </Slide>
  )
}

export function Thanks({ index }: { index: number }) {
  return (
    <Slide
      id="tesekkurler"
      index={index}
      className="text-center"
      bleed={
        <>
          <Helix className="absolute inset-0 h-full w-full opacity-30" speed={0.4} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,var(--color-ink)_70%)]" />
        </>
      }
    >
      <Reveal>
        <p className="mb-6 text-xs tracking-[0.3em] text-gold uppercase">Dinlediğiniz için</p>
        <h2 className="font-display text-6xl font-semibold md:text-8xl">Teşekkürler</h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mx-auto mt-8 max-w-2xl font-display text-xl text-paper/80 italic md:text-2xl">
          “Bilim, merakla sorulan bir soruyla başlar; azim ve emekle cevabını bulur.”
        </p>
        <p className="mt-3 text-sm text-mist">— Aziz Sancar’ın hikâyesinden çıkan ders</p>
      </Reveal>
      <Reveal delay={0.35}>
        <p className="mt-12 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2 text-paper/80">
          Sorularınız? <span className="text-gold">🙋</span>
        </p>
      </Reveal>
    </Slide>
  )
}
