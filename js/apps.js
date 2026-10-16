/*
 * Uygulama kataloğu — siteye yeni uygulama eklemek için bu dosyayı düzenleyin.
 *
 * APPS: yayında olan uygulamalar. Her biri kart + detay bölümü olarak çizilir.
 *   visual: "terminal" (macOS pencere animasyonu), "phones" (iPhone ekran görüntüleri),
 *           "tv" (Apple TV + iPhone ekran görüntüleri)
 *   links:  boş bırakılan bağlantı ("") "Yakında" olarak gösterilir.
 *   download: DMG'yi downloads/ klasörüne koyup dosya adı, boyut ve SHA-256 yazın
 *             (shasum -a 256 dosya.dmg). links.download aynı yolu göstermeli.
 *
 * ROADMAP: yakında gelecek uygulamalar / fikirler.
 */
window.APPS = [
  {
    id: "eyconsol",
    name: "EYConsol",
    tagline: "SSH, seri port ve terminal — tek pencerede.",
    summary:
      "Ağ ve sistem yöneticileri için macOS terminal uygulaması. SSH oturumları, switch/router konsolları için seri port, SFTP dosya tarayıcısı ve bölünmüş paneller bir arada.",
    icon: "assets/icons/eyconsol.png",
    platforms: ["macOS"],
    accent: "#5ab4ff",
    accent2: "#ff9f43",
    version: "0.1.0",
    visual: "terminal",
    features: [
      { t: "SSH", d: "~/.ssh/config, anahtarlar, ssh-agent, ProxyJump ve port yönlendirme. Şifreler isteğe bağlı Keychain'de." },
      { t: "Seri port", d: "/dev/cu.* portları, özel baud hızları, parite/stop bitleri, RTS/CTS, XON/XOFF, BREAK ve DTR." },
      { t: "SFTP tarayıcı", d: "Çift panel, sürükle-bırak, paralel aktarım ve dosyayı yerel editörde düzenleyip otomatik geri yükleme." },
      { t: "Bölünmüş paneller", d: "Yan yana / alt alta bölme ve ⌥⌘I ile tüm panellere aynı anda komut yazma." },
      { t: "Snippet'ler", d: "Kayıtlı çok satırlı komutlar; tek tık ya da ⌃⌘1…9 ile gönderme." },
      { t: "Oturum kaydı", d: "Renk kodlarından arındırılmış düz metin log, isteğe bağlı zaman damgası." }
    ],
    requirements: ["macOS 14+", "Apple Silicon & Intel"],
    download: {
      file: "downloads/EYConsol-0.1.0.dmg",
      size: "4,4 MB",
      sha256: "a8aa99eca8c79fc83d519edcfd0d7267f532c3fc21dd56f861d7a770cd44b4ee",
      note: "Apple tarafından onaylanmış (notarized) Developer ID imzalı."
    },
    links: {
      download: "downloads/EYConsol-0.1.0.dmg",
      support: "mailto:ercanyuzuk@gmail.com?subject=EYConsol"
    }
  },
  {
    id: "eyiptv",
    name: "eyiptv",
    tagline: "Kendi yayınlarınız, büyük ekranda.",
    summary:
      "Apple TV ve iPhone için sade, hızlı bir medya oynatıcı. Servis sağlayıcınızın bilgileriyle giriş yapın; canlı TV, film ve dizilerinize tek yerden ulaşın. Tek satın alma ile iki cihazda.",
    icon: "assets/icons/eyiptv.png",
    platforms: ["Apple TV", "iPhone"],
    accent: "#8b7bff",
    accent2: "#4d6bff",
    version: "1.0",
    visual: "tv",
    shots: {
      tv: [
        "assets/shots/eyiptv-tv-1_anasayfa.jpg",
        "assets/shots/eyiptv-tv-2_canli_tv.jpg",
        "assets/shots/eyiptv-tv-3_filmler.jpg",
        "assets/shots/eyiptv-tv-4_dizi_detay.jpg",
        "assets/shots/eyiptv-tv-5_giris.jpg"
      ],
      phone: [
        "assets/shots/eyiptv-ios-01_live.jpg",
        "assets/shots/eyiptv-ios-02_vod.jpg",
        "assets/shots/eyiptv-ios-03_vodList.jpg",
        "assets/shots/eyiptv-ios-04_series.jpg",
        "assets/shots/eyiptv-ios-05_seriesDetail.jpg"
      ]
    },
    features: [
      { t: "Canlı TV, Film, Dizi", d: "Her içerik türü için ayrı bölüm, kategorilere göre düzenli görünüm." },
      { t: "Hızlı arama", d: "Tüm kanal, film ve dizilerde anında arama." },
      { t: "Sezon & bölüm", d: "Dizilerde sezon ve bölüm seçimi, kaldığınız yerden devam." },
      { t: "Kumandaya uygun", d: "Apple TV kumandasıyla rahat gezinme; iPhone'da dikey ve yatay izleme." },
      { t: "Bilgiler cihazda", d: "Giriş bilgileri yalnızca cihazınızda saklanır, hiçbir sunucuya gönderilmez." },
      { t: "Universal satın alma", d: "Bir kez indirin, Apple TV ve iPhone'da kullanın." }
    ],
    note: "eyiptv herhangi bir yayın, kanal veya içerik sağlamaz; yasal olarak abone olduğunuz servisin bilgileriyle çalışır.",
    links: {
      appStore: "",
      support: "https://www.ercanyuzuk.com/p/eyiptv-destek.html",
      privacy: "https://www.ercanyuzuk.com/p/eyiptv-gizlilik.html"
    }
  },
  {
    id: "eynetscanner",
    name: "EYNetScanner",
    tagline: "7 ağ aracı. Tek temiz uygulama.",
    summary:
      "Ping, port tarama, subnet tarama, DNS, IP bilgisi, traceroute ve canlı bağlantı izleme — iPhone'unuzda. Hesap yok, reklam yok, takip yok.",
    icon: "assets/icons/eynetscanner.png",
    platforms: ["iPhone"],
    accent: "#22d3ee",
    accent2: "#a855f7",
    version: "1.0",
    visual: "phones",
    shots: {
      phone: [
        "assets/shots/netscanner-01_IMG_4521.jpg",
        "assets/shots/netscanner-02_IMG_4524.jpg",
        "assets/shots/netscanner-03_IMG_4522.jpg",
        "assets/shots/netscanner-04_IMG_4523.jpg",
        "assets/shots/netscanner-05_IMG_4525.jpg"
      ]
    },
    features: [
      { t: "Ping", d: "ICMP gecikme, otomatik TCP yedeği; ortalama, jitter, paket kaybı. Bonjour ile cihaz keşfi." },
      { t: "Port Scanner", d: "Yaygın TCP portlarını kontrol eder, açık portların yanıt sürelerini gösterir." },
      { t: "Subnet Scanner", d: "Bulunduğunuz alt ağı otomatik algılar ve aktif cihazları bulur." },
      { t: "DNS Lookup", d: "İleri (A/AAAA) ve ters DNS sorguları." },
      { t: "IP Info", d: "Genel IP'niz ya da herhangi bir IP'nin konumu, ISS'si ve saat dilimi." },
      { t: "Traceroute & Monitor", d: "Atlama atlama yol analizi ve sürekli bağlantı/gecikme izleme." }
    ],
    links: {
      appStore: "",
      support: "https://www.ercanyuzuk.com/p/eynetscanner-destek.html",
      privacy: "https://www.ercanyuzuk.com/p/eynetscanner-gizlilik_0656814276.html"
    }
  }
];

window.ROADMAP = [
  { name: "Sıradaki uygulama", desc: "Yeni bir araç üzerinde çalışıyorum. Yakında burada.", status: "Geliştiriliyor", platform: "?" },
  { name: "EYConsol 0.2", desc: "Yeni özellikler ve iyileştirmeler.", status: "Planlanıyor", platform: "macOS" },
  { name: "Fikrin mi var?", desc: "İhtiyaç duyduğun bir araç varsa yaz, birlikte yapalım.", status: "Açık", platform: "Sen", href: "#iletisim" }
];
