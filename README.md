# apps.ercanyuzuk.com

Ercan Yüzük'ün uygulamalarını (EYConsol, eyiptv, EYNetScanner) tanıtan statik site. Build adımı yok; GitHub Pages doğrudan yayınlar.

## Yeni uygulama eklemek

1. İkonu `assets/icons/<id>.png` (512 px), ekran görüntülerini `assets/shots/` altına koyun.
2. `js/apps.js` içindeki `APPS` dizisine yeni bir nesne ekleyin (`visual`: `terminal`, `phones` veya `tv`).
3. App Store bağlantısı hazır olunca `links.appStore` alanını doldurun; boş alan "Yakında" olarak görünür.
4. Yakında gelecekler için `ROADMAP` dizisini düzenleyin.

## Yerelde çalıştırma

```sh
python3 -m http.server 8765
# http://localhost:8765
```

## Yayın (GitHub Pages)

- Repo → Settings → Pages → Source: `main` branch, `/ (root)`.
- `CNAME` dosyası `apps.ercanyuzuk.com` alan adını tanımlar.
- DNS: `apps` için `CNAME` kaydı → `<github-kullanici-adi>.github.io`.
- Sertifika verildikten sonra "Enforce HTTPS" işaretleyin.
