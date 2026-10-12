// Sitedeki tüm metinler burada. Kendi adınızı `presenter` alanına yazın.

export const site = {
  title: "Aziz Sancar — DNA'yı onaran adam",
  description:
    "Nobel Kimya Ödülü sahibi Aziz Sancar'ın Savur'dan Stockholm'e uzanan hayatı, DNA onarımı üzerine keşifleri ve bıraktığı miras.",
  course: 'Proje Tasarım Dersi',
  presenter: '[Adınız Soyadınız]',
}

export const nav = [
  { href: '#hayati', label: 'Hayatı' },
  { href: '#kesifleri', label: 'Keşifleri' },
  { href: '#nobel', label: 'Nobel 2015' },
  { href: '#mirasi', label: 'Mirası' },
]

export const facts = [
  { year: '1946', text: "Savur, Mardin'de doğdu" },
  { year: '1969', text: "İstanbul Tıp'ı birincilikle bitirdi" },
  { year: '1982', text: "Chapel Hill'de laboratuvarını kurdu" },
  { year: '2015', text: 'Nobel Kimya Ödülü', highlight: true },
]

export const timeline = [
  {
    year: '1946',
    title: 'Savur, Mardin',
    text: "8 Eylül'de doğdu. İlkokulu Savur'da, liseyi Mardin'de okudu.",
  },
  {
    year: '1969',
    title: 'İstanbul Tıp Fakültesi',
    text: 'Birincilikle mezun oldu, memleketine dönüp yaklaşık iki yıl hekimlik yaptı. Ama hastalıkların moleküler nedenlerini merak ediyordu.',
  },
  {
    year: '1977',
    title: 'Teksas Üniversitesi, Dallas',
    text: "TÜBİTAK bursuyla gittiği ABD'de, ışıkla DNA onaran fotoliyaz enzimi üzerine doktorasını tamamladı.",
  },
  {
    year: '1977–82',
    title: 'Yale Üniversitesi',
    text: "Dean Rupp'un laboratuvarında DNA'nın kesip çıkarılarak onarılmasını incelemeye başladı.",
  },
  {
    year: '1982',
    title: 'Kuzey Karolina Üniversitesi',
    text: "Chapel Hill'de kendi laboratuvarını kurdu. Eşi biyokimyacı Gwen Sancar ile kariyerinin geri kalanını burada sürdürdü.",
  },
  {
    year: '2015',
    title: 'Stockholm',
    text: "Tomas Lindahl ve Paul Modrich ile birlikte Nobel Kimya Ödülü'nü aldı.",
    highlight: true,
  },
]

export const discoveries = [
  {
    no: '01',
    era: "1970'ler",
    title: 'Fotoliyaz',
    text: 'Bakterilerde güneş hasarını görünür ışığın enerjisiyle tek adımda onaran enzim. Sancar geninin klonlanması ve enzimin saflaştırılmasında öncü rol oynadı; ışığı nasıl kimyasal işe çevirdiğini açıkladı.',
  },
  {
    no: '02',
    era: '1983 → Nobel',
    title: 'Nükleotid eksizyon onarımı',
    text: 'Hasarlı DNA parçasının iki ucundan kesilip çıkarıldığını ve boşluğun doğrusuyla doldurulduğunu gösterdi. Önce bakterilerde, sonra insan hücrelerinde bu mekanizmayı haritaladı.',
    highlight: true,
  },
  {
    no: '03',
    era: "1990'lar →",
    title: 'Biyolojik saat',
    text: 'Fotoliyazın akrabası kriptokrom proteinlerinin memelilerde 24 saatlik iç saatin temel parçası olduğunu gösterdi. Bu, ilaçların günün doğru saatinde verilmesi fikrine yol açtı.',
  },
]

/** DNA şeridindeki bir bazın görünümü */
export type Base = 'ok' | 'hurt' | 'cut' | 'gap' | 'fresh' | 'none'

const N = 12
const row = (fn: (i: number) => Base): Base[] => Array.from({ length: N }, (_, i) => fn(i))
const lesion = (i: number) => i === 5 || i === 6
const inPatch = (i: number) => i >= 2 && i <= 9

export const repairSteps = [
  {
    no: '01',
    title: 'Tanıma',
    text: 'Onarım proteinleri DNA boyunca tarar ve hasarın yarattığı bükülmeyi bulur.',
    lifted: row(() => 'none'),
    top: row((i) => (lesion(i) ? 'hurt' : 'ok')),
  },
  {
    no: '02',
    title: 'Çift kesim',
    text: 'Sancar’ın keşfettiği eksinükleaz, hasarın iki yanından birer kesik atar.',
    lifted: row(() => 'none'),
    top: row((i) => (lesion(i) ? 'hurt' : i === 2 || i === 9 ? 'cut' : 'ok')),
  },
  {
    no: '03',
    title: 'Çıkarma',
    text: 'Hasarı taşıyan kısa parça uzaklaştırılır: insanda 24–32 nükleotit.',
    lifted: row((i) => (inPatch(i) ? (lesion(i) ? 'hurt' : 'ok') : 'none')),
    top: row((i) => (inPatch(i) ? 'gap' : 'ok')),
  },
  {
    no: '04',
    title: 'Doldurma',
    text: 'DNA polimeraz karşı ipliği kalıp alıp boşluğu doldurur, ligaz mühürler.',
    lifted: row(() => 'none'),
    top: row((i) => (inPatch(i) ? 'fresh' : 'ok')),
  },
]

export const laureates = [
  {
    country: 'İsveç / Birleşik Krallık',
    name: 'Tomas Lindahl',
    text: 'Baz eksizyon onarımı: tek tek bozulan harflerin değiştirilmesi.',
  },
  {
    country: 'ABD',
    name: 'Paul Modrich',
    text: 'Yanlış eşleşme onarımı: kopyalama sırasında yapılan yazım hatalarının düzeltilmesi.',
  },
  {
    country: 'Türkiye / ABD',
    name: 'Aziz Sancar',
    text: 'Nükleotid eksizyon onarımı: UV ve kimyasal hasarın kesilip çıkarılması.',
    highlight: true,
  },
]

export const legacy = [
  {
    title: 'Kanseri anlamak',
    text: 'Onarım bozulduğunda mutasyonlar birikir. Bu mekanizma birçok kanserin temelinde yatar.',
  },
  {
    title: 'Daha iyi tedaviler',
    text: "Sisplatin gibi kemoterapi ilaçları DNA'ya hasar vererek çalışır. Onarımı anlamak tedaviyi iyileştirir.",
  },
  {
    title: "Madalya Anıtkabir'de",
    text: "Nobel madalyasını ve beratını, Atatürk'e minnetinin simgesi olarak Anıtkabir'e bağışladı.",
  },
  {
    title: 'Türk Evi',
    text: "Eşiyle kurduğu vakıf, Chapel Hill'de Türk öğrenci ve araştırmacılara kapısını açan bir ev işletiyor.",
  },
]

export const sources = [
  { label: 'NobelPrize.org', href: 'https://www.nobelprize.org/prizes/chemistry/2015/sancar/facts/' },
  { label: 'Vikipedi', href: 'https://tr.wikipedia.org/wiki/Aziz_Sancar' },
  { label: 'UNC Biyokimya', href: 'https://www.med.unc.edu/biochem/' },
]
