import type { ComponentType } from 'react'
import { Agenda, Cover, WhoIs } from './Intro'
import { Childhood, Timeline } from './Life'
import { DnaBasics, Photolyase } from './Dna'
import { Circadian, Excision } from './Repair'
import { Impact, Lessons, Nobel, Quiz, Sources, Thanks, Turkey } from './Legacy'

export type SlideDef = {
  id: string
  label: string
  Component: ComponentType<{ index: number }>
  /** Konuşmacı notları — sunum sırasında N tuşuyla açılır */
  notes: string[]
}

export const slides: SlideDef[] = [
  {
    id: 'kapak',
    label: 'Kapak',
    Component: Cover,
    notes: [
      'Kendini tanıt, dersin adını söyle.',
      'Soru ile aç: “Güneşte kaldığımızda hücrelerimizde ne oluyor, hiç düşündünüz mü?”',
    ],
  },
  { id: 'icerik', label: 'İçindekiler', Component: Agenda, notes: ['Sunumun akışını kısaca anlat; sonunda quiz olduğunu söyle.'] },
  {
    id: 'kimdir',
    label: 'Kimdir?',
    Component: WhoIs,
    notes: ['Tek cümlede: DNA onarımını açıklayan, bilimde Nobel alan ilk Türk.', 'Hem doktor hem biyokimyacı olduğunu vurgula.'],
  },
  {
    id: 'cocukluk',
    label: 'Çocukluk',
    Component: Childhood,
    notes: [
      'Mütevazı bir aileden geldiğini, ailesinin eğitime verdiği önemi anlat.',
      'Öğretmenlerinin etkisi — bu kısım sınıfa ilham verir.',
    ],
  },
  {
    id: 'hayat-cizgisi',
    label: 'Hayat çizgisi',
    Component: Timeline,
    notes: ['Önemli yıllara tıklayarak ilerle: 1969, 1977, 1983, 2015.', 'Renkler: yeşil hayat, mor bilim, altın ödül.'],
  },
  {
    id: 'dna',
    label: 'DNA ve hasar',
    Component: DnaBasics,
    notes: ['DNA’yı bir kitaba / kullanım kılavuzuna benzet.', 'Hasarın kaynaklarını say; güneş kremi örneği ver.'],
  },
  {
    id: 'fotoliyaz',
    label: 'Fotoliyaz',
    Component: Photolyase,
    notes: [
      'Önce “UV ışını gönder” butonuna bas, iki T’nin yapıştığını göster.',
      'Sonra fotoliyaz butonu: enzim ışık enerjisiyle bağı koparıyor.',
      'İnsanlarda fotoliyaz olmadığını, bir sonraki slayta köprü olarak kullan.',
    ],
  },
  {
    id: 'eksizyon',
    label: 'Eksizyon onarımı',
    Component: Excision,
    notes: [
      '“Otomatik oynat” ile 6 adımı göster.',
      'Benzetme: Kitaptaki hatalı satırı makasla kesip yerine doğrusunu yazmak.',
      'Bu mekanizma Nobel’i getiren çalışmanın kalbi.',
    ],
  },
  {
    id: 'biyolojik-saat',
    label: 'Biyolojik saat',
    Component: Circadian,
    notes: ['Saat kaydırıcısını oynatarak döngüyü göster.', 'Kronoterapi: ilacın saatinin bile önemli olabileceğini vurgula.'],
  },
  {
    id: 'nobel',
    label: 'Nobel 2015',
    Component: Nobel,
    notes: ['Üç bilim insanının üç farklı onarım yolunu bulduğunu söyle.', 'Sancar’ın kartını öne çıkar.'],
  },
  { id: 'onem', label: 'Neden önemli?', Component: Impact, notes: ['Kanser, ilaçlar, cilt hastalıkları — günlük hayata bağla.'] },
  {
    id: 'turkiye',
    label: 'Türkiye ile bağı',
    Component: Turkey,
    notes: ['Anıtkabir’e madalya bağışı ve Türk Evi’ni anlat.', 'Eşi Gwen Sancar’ın da biyokimyacı olduğunu belirt.'],
  },
  {
    id: 'dersler',
    label: 'Öğrendiklerimiz',
    Component: Lessons,
    notes: ['Proje Tasarım dersine bağla: problem tanımı, yineleme, ekip çalışması.'],
  },
  { id: 'quiz', label: 'Quiz', Component: Quiz, notes: ['Sınıfa sor, el kaldıranlara söz ver, cevabı birlikte işaretle.'] },
  { id: 'kaynaklar', label: 'Kaynakça', Component: Sources, notes: ['Kaynakları kısaca göster.'] },
  { id: 'tesekkurler', label: 'Teşekkürler', Component: Thanks, notes: ['Teşekkür et ve soruları al.'] },
]
