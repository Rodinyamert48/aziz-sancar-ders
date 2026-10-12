import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BookOpen, HeartPulse, Home, Stethoscope } from 'lucide-react'
import { Card, Reveal, Slide } from '../components/Slide'

const childhood = [
  {
    icon: Home,
    title: 'Savur, Mardin',
    text: 'Sekiz çocuklu, mütevazı bir ailenin yedinci çocuğu olarak dünyaya geldi. Anne ve babası okuma yazma bilmiyordu ama çocuklarının eğitimine büyük önem veriyorlardı.',
  },
  {
    icon: BookOpen,
    title: 'İdealist öğretmenler',
    text: "Savur'daki ilkokulu ve Mardin Lisesi'ni bitirdi. Sancar, kendisini yetiştiren Cumhuriyet'in idealist öğretmenlerini her fırsatta minnetle anar.",
  },
  {
    icon: Stethoscope,
    title: 'İstanbul Tıp Fakültesi',
    text: "1963'te girdiği İstanbul Üniversitesi Tıp Fakültesi'ni 1969'da birincilikle bitirdi.",
  },
  {
    icon: HeartPulse,
    title: "Savur'da hekimlik",
    text: 'Mezuniyetin ardından memleketine dönüp yaklaşık iki yıl doktorluk yaptı. Ancak asıl tutkusu biyokimya ve araştırmaydı.',
  },
]

export function Childhood({ index }: { index: number }) {
  return (
    <Slide id="cocukluk" index={index} eyebrow="Çocukluk ve eğitim" title="Küçük bir ilçeden büyük hayallere">
      <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="absolute top-10 right-8 left-8 hidden h-px bg-gradient-to-r from-gold/0 via-gold/50 to-gold/0 lg:block" />
        {childhood.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.1}>
            <Card className="relative h-full">
              <span className="mb-4 flex size-12 items-center justify-center rounded-full border border-gold/40 bg-ink text-gold">
                <c.icon className="size-5" />
              </span>
              <h3 className="font-display text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/75">{c.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.45}>
        <blockquote className="mt-10 border-l-2 border-gold pl-5 text-lg text-paper/80 italic md:text-xl">
          Tıp eğitimi ona hastalıkları tanımayı öğretti; ama o, hastalıkların <span className="text-gold-soft">moleküler
          nedenlerini</span> anlamak istiyordu.
        </blockquote>
      </Reveal>
    </Slide>
  )
}

type Event = { year: string; title: string; text: string; place: string; tag: 'hayat' | 'bilim' | 'ödül' }

const events: Event[] = [
  { year: '1946', title: 'Doğum', place: 'Savur, Mardin', tag: 'hayat', text: '8 Eylül 1946’da Mardin’in Savur ilçesinde doğdu.' },
  { year: '1969', title: 'Tıp diploması', place: 'İstanbul', tag: 'hayat', text: 'İstanbul Tıp Fakültesi’ni birincilikle bitirdi, ardından Savur’da hekimlik yaptı.' },
  { year: '1971', title: 'TÜBİTAK bursu', place: 'ABD', tag: 'bilim', text: 'TÜBİTAK bursuyla biyokimya eğitimi için ABD’ye gitti; kısa bir süre sonra Türkiye’ye döndü.' },
  { year: '1973', title: 'Dallas', place: 'Teksas Üniversitesi', tag: 'bilim', text: 'Teksas Üniversitesi Dallas’ta Claud Rupert’in laboratuvarında fotoliyaz enzimi üzerine çalışmaya başladı.' },
  { year: '1977', title: 'Doktora', place: 'Dallas', tag: 'bilim', text: 'Fotoliyaz geninin klonlanmasıyla ilgili çalışmalarıyla doktorasını tamamladı.' },
  { year: '1977', title: 'Yale yılları', place: 'Yale Üniversitesi', tag: 'bilim', text: 'Doktora sonrası araştırmacı olarak Dean Rupp ile birlikte eksizyon onarımı üzerine çalıştı.' },
  { year: '1982', title: 'Chapel Hill', place: 'Kuzey Karolina Üniv.', tag: 'bilim', text: 'Kuzey Karolina Üniversitesi Biyokimya Bölümü’ne katıldı; kariyerinin geri kalanını burada sürdürdü.' },
  { year: '1983', title: 'Eksinükleaz', place: 'Chapel Hill', tag: 'bilim', text: 'Bakterilerde hasarlı DNA parçasını iki uçtan kesen enzim sistemini (ABC eksinükleaz) tanımladı.' },
  { year: '2005', title: 'Ulusal Bilimler Akademisi', place: 'ABD', tag: 'ödül', text: 'ABD Ulusal Bilimler Akademisi’ne üye seçilen ilk Türk kökenli bilim insanı oldu.' },
  { year: '2007', title: 'Sancar Vakfı', place: 'Chapel Hill', tag: 'hayat', text: 'Eşi Gwen Sancar ile vakıf kurdular; Türk öğrenci ve araştırmacılara ev sahipliği yapan Türk Evi’ni açtılar.' },
  { year: '2015', title: 'Nobel Kimya Ödülü', place: 'Stockholm', tag: 'ödül', text: 'Tomas Lindahl ve Paul Modrich ile birlikte “DNA onarımının mekanizmalarına yönelik çalışmaları” için Nobel Kimya Ödülü’nü aldı.' },
  { year: '2016', title: 'Anıtkabir', place: 'Ankara', tag: 'hayat', text: 'Nobel madalyasını ve beratını Atatürk’e olan minnetinin simgesi olarak Anıtkabir’e bağışladı.' },
]

const tagColor = { hayat: 'bg-helix', bilim: 'bg-uv', ödül: 'bg-gold' } as const

export function Timeline({ index }: { index: number }) {
  const [active, setActive] = useState(0)
  const e = events[active]
  return (
    <Slide id="hayat-cizgisi" index={index} eyebrow="Hayat çizgisi" title="Yetmiş yılı aşan bir yolculuk">
      <Reveal>
        <div className="mb-6 flex flex-wrap gap-4 text-xs text-mist">
          {Object.entries(tagColor).map(([k, c]) => (
            <span key={k} className="flex items-center gap-2 capitalize">
              <span className={`size-2 rounded-full ${c}`} /> {k}
            </span>
          ))}
          <span className="ml-auto hidden md:inline">Bir yıla tıklayın</span>
        </div>
      </Reveal>
      <Reveal>
        <div className="relative -mx-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:px-0" role="tablist" aria-label="Zaman çizelgesi">
          <div className="relative flex min-w-max gap-2 md:min-w-0 md:justify-between">
            <div className="absolute top-[34px] right-0 left-0 h-px bg-line" />
            {events.map((ev, i) => (
              <button
                key={ev.year + ev.title}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className="group relative flex w-16 flex-col items-center gap-2 pt-1"
              >
                <span
                  className={`font-mono text-xs transition ${i === active ? 'text-gold' : 'text-mist group-hover:text-paper'}`}
                >
                  {ev.year}
                </span>
                <span
                  className={`relative z-10 size-3.5 rounded-full ring-4 ring-ink transition ${tagColor[ev.tag]} ${
                    i === active ? 'scale-150 shadow-[0_0_20px_currentColor]' : 'opacity-60 group-hover:opacity-100'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </Reveal>
      <div className="mt-6 min-h-56">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
            transition={{ duration: 0.4 }}
            className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center"
          >
            <p className="font-display text-7xl font-semibold text-gold/90 md:text-9xl">{e.year}</p>
            <div>
              <p className="text-xs tracking-widest text-mist uppercase">{e.place}</p>
              <h3 className="mt-1 font-display text-3xl font-semibold">{e.title}</h3>
              <p className="mt-3 max-w-xl text-lg text-paper/80">{e.text}</p>
              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => setActive((a) => Math.max(0, a - 1))}
                  disabled={active === 0}
                  className="rounded-full border border-line px-4 py-1.5 text-sm text-mist transition hover:border-gold hover:text-paper disabled:opacity-30"
                >
                  ← Önceki
                </button>
                <button
                  onClick={() => setActive((a) => Math.min(events.length - 1, a + 1))}
                  disabled={active === events.length - 1}
                  className="rounded-full border border-line px-4 py-1.5 text-sm text-mist transition hover:border-gold hover:text-paper disabled:opacity-30"
                >
                  Sonraki →
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Slide>
  )
}
