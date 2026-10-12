# Aziz Sancar — DNA'nın Tamircisi

Proje Tasarım dersi için hazırlanmış, Nobel ödüllü bilim insanı **Aziz Sancar** hakkında etkileşimli web sunumu.

**Canlı site:** https://rodinyamert48.github.io/aziz-sancar-ders/

## Özellikler

- 16 slaytlık tam ekran sunum (kaydırarak ya da klavyeyle gezilir)
- Etkileşimli animasyonlar: dönen DNA sarmalı, fotoliyaz onarımı, adım adım nükleotid eksizyon onarımı, biyolojik saat
- Tıklanabilir hayat çizgisi ve sınıf için mini quiz
- Konuşmacı notları, genel bakış ekranı, tam ekran modu
- Telefon ve tablette de çalışır

## Kısayollar

| Tuş | İşlev |
| --- | --- |
| `→` `↓` `Boşluk` | Sonraki slayt |
| `←` `↑` | Önceki slayt |
| `N` | Konuşmacı notları |
| `O` | Tüm slaytlar |
| `F` | Tam ekran |
| `Esc` | Pencereleri kapat |

## Kişiselleştirme

- Adınızı ve tarihi `src/data/config.ts` dosyasından değiştirin.
- Kapak fotoğrafı için `public/images/aziz-sancar.jpg` dosyasını ekleyin (yoksa stilize bir görsel gösterilir).
- Konuşmacı notları `src/slides/index.ts` içinde.

## Geliştirme

```bash
npm install
npm run dev      # http://localhost:5173/aziz-sancar-ders/
npm run build    # dist/ klasörüne üretim çıktısı
```

Teknolojiler: Vite, React 19, TypeScript, Tailwind CSS 4, Motion (Framer Motion), Lucide ikonları.

## Yayınlama

`.github/workflows/deploy.yml` her push'ta siteyi derleyip GitHub Pages'e yükler.
İlk seferde depo ayarlarından **Settings → Pages → Source: GitHub Actions** seçilmelidir.
