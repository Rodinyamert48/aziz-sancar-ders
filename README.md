# Aziz Sancar — DNA'yı onaran adam

Proje Tasarım dersi için hazırlanmış, Nobel ödüllü bilim insanı **Aziz Sancar**'ı tanıtan web sitesi.

**Canlı site:** https://rodinyamert48.github.io/aziz-sancar-ders/

Aşağı kaydırdıkça hikâyeyi anlatan tek sayfalık, dergi/müze sergisi tarzında bir site:

1. **Giriş** — "DNA'yı onaran adam." ve kısa künye
2. **Bölüm I · Hayatı** — Savur'dan Stockholm'e zaman çizelgesi
3. **Bölüm II · Keşifleri** — fotoliyaz, nükleotid eksizyon onarımı, biyolojik saat ve onarımın dört adımı
4. **Bölüm III · Nobel 2015** — ödül gerekçesi ve üç bilim insanı
5. **Bölüm IV · Mirası** — bilime ve Türkiye'ye katkıları

## Kişiselleştirme

- Tüm metinler `src/data/site.ts` dosyasında. Adınızı `presenter` alanına yazın.
- Portre için `src/assets/aziz-sancar.jpg` (veya `.png`/`.webp`) ekleyin; Astro görseli otomatik optimize eder.

## Geliştirme

```bash
npm install
npm run dev      # http://localhost:4321/aziz-sancar-ders/
npm run build    # dist/ klasörüne üretim çıktısı
```

Teknolojiler: [Astro](https://astro.build) (statik site, sıfır JS çerçevesi yükü), TypeScript, Fraunces · Instrument Sans · IBM Plex Mono yazı tipleri (yerel olarak barındırılır).

## Yayınlama

`.github/workflows/deploy.yml` her push'ta siteyi derleyip GitHub Pages'e yükler.
