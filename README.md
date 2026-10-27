# apps.ercanyuzuk.com

Ercan Yüzük'ün uygulamalarını (EYCleaner, EYConsol, eyiptv, EYNetScanner) tanıtan statik site. GitHub Pages doğrudan yayınlar.

Sayfalar arama motorları için statik HTML olarak üretilir: tüm içerik `src/apps.mjs` dosyasındadır,
`node scripts/build.mjs` şunları yeniden yazar (üretilen dosyaları elle düzenlemeyin, commit'leyin):

- `index.html` — ana sayfa
- `<id>/index.html` — her uygulamanın detay sayfası (ör. `/eycleaner/`)
- `sitemap.xml`, `robots.txt`

Her sayfada canonical, Open Graph/Twitter etiketleri ve JSON-LD yapısal veri (SoftwareApplication,
BreadcrumbList, FAQPage; ana sayfada WebSite + ItemList) bulunur. `js/main.js` yalnızca animasyon ve etkileşimleri yönetir.

## Yeni uygulama eklemek / güncellemek

1. İkonu `assets/icons/<id>.png` (512 px), ekran görüntülerini `assets/shots/` altına koyun.
2. `src/apps.mjs` içindeki `APPS` dizisine bir nesne ekleyin (`visual`: `terminal`, `cleaner`, `phones` veya `tv`);
   `seo`, `about` ve `faq` alanlarını doldurun.
3. App Store bağlantıları `stores` dizisindedir; `href` boşsa düğme "Yakında" olarak görünür.
4. macOS DMG'leri GitHub Releases'tan dağıtılır (`ercanyuzuk/eycleaner-releases`, `ercanyuzuk/eyconsol-releases`).
   `download.repo` alanına depoyu yazın; build son sürümün numarasını, DMG adresini, boyutunu ve SHA-256'sını
   (asset digest'i ya da sürüm notundaki `shasum` satırı) oradan alır ve `src/releases.json`'a yazar.
   Yeni sürüm yayınlandıktan sonra yalnızca build alıp commit'lemek yeterlidir.
5. `node scripts/build.mjs` çalıştırın.

## Yerelde çalıştırma

```sh
node scripts/build.mjs
python3 -m http.server 8765
# http://localhost:8765
```

## Yayın (GitHub Pages)

- Repo → Settings → Pages → Source: `main` branch, `/ (root)`.
- `CNAME` dosyası `apps.ercanyuzuk.com` alan adını tanımlar.
- DNS: `apps` için `CNAME` kaydı → `<github-kullanici-adi>.github.io`.
- Sertifika verildikten sonra "Enforce HTTPS" işaretleyin.
- Yayından sonra Google Search Console'da alan adını doğrulayıp `https://apps.ercanyuzuk.com/sitemap.xml` gönderin.
