/*
 * Uygulama kataloğu — siteye yeni uygulama eklemek ya da metinleri değiştirmek için bu dosyayı
 * düzenleyin, sonra `node scripts/build.mjs` çalıştırın (index.html, <id>/index.html,
 * sitemap.xml ve robots.txt yeniden üretilir).
 *
 * APPS: yayında olan uygulamalar. Ana sayfada kart, /<id>/ adresinde detay sayfası olarak çizilir.
 *   visual:   "terminal" (EYConsol penceresi), "cleaner" (EYCleaner penceresi),
 *             "phones" (iPhone ekran görüntüleri), "tv" (Apple TV + iPhone ekran görüntüleri)
 *   stores:   App Store bağlantıları. href boşsa ("") düğme "Yakında" olarak gösterilir.
 *   download: DMG'yi downloads/ klasörüne koyup dosya adı, boyut ve SHA-256 yazın
 *             (shasum -a 256 dosya.dmg).
 *   seo:      <title> ve meta description. Açıklama ~150-160 karakter olmalı.
 *   about:    detay sayfasındaki uzun açıklama bölümleri.
 *   faq:      sık sorulan sorular (sayfada ve FAQPage yapısal verisinde kullanılır).
 *
 * ROADMAP: yakında gelecek uygulamalar / fikirler.
 */
export const APPS = [
  {
    id: "eycleaner",
    name: "EYCleaner",
    tagline: "Mac'inizi temizleyin — neyin silineceğini önce görün.",
    summary:
      "Mac için yerel bakım uygulaması: önbellek ve günlük temizliği, disk analizi, büyük dosya bulucu, uygulama kaldırıcı ve canlı sistem durumu. Her temizlikten önce önizleme gösterir.",
    icon: "/assets/icons/eycleaner.png",
    platforms: ["macOS"],
    accent: "#4f8bff",
    accent2: "#38c6e0",
    version: "1.2",
    category: "UtilitiesApplication",
    os: "macOS 15",
    visual: "cleaner",
    seo: {
      title: "EYCleaner — Mac temizleme ve disk analizi uygulaması",
      description:
        "EYCleaner ile Mac'inizde önbellek ve günlükleri temizleyin, diski analiz edin, büyük dosyaları bulun, uygulamaları artıklarıyla kaldırın. Ücretsiz, reklamsız."
    },
    features: [
      { t: "Durum", d: "Sağlık skoru; canlı CPU, bellek, disk, ağ ve pil bilgisi, en çok kaynak kullanan süreçler." },
      { t: "Temizle", d: "Önbellek, günlük ve geçici dosyaları önce önizler; onayınızdan sonra temizler." },
      { t: "Optimize Et", d: "Sistem bakım adımlarını bölüm bölüm listeler, önce deneme modunda gösterir." },
      { t: "Disk Analizi", d: "Klasörler arasında gezinerek yeri neyin kapladığını görün, gereksizi Çöp Sepeti'ne taşıyın." },
      { t: "Büyük Dosyalar", d: "100 MB–5 GB eşik, dosya türü filtreleri ve çoklu seçimle büyük dosyaları bulun." },
      { t: "Uygulama Kaldır", d: "Uygulamaları destek dosyaları ve artıklarıyla birlikte, önizleyerek kaldırın." },
      { t: "Proje Artıkları", d: "node_modules, build ve benzeri yeniden üretilebilir klasörleri bulup temizler." },
      { t: "Yükleyiciler", d: "İndirilenler'de unutulan .dmg, .pkg ve arşiv dosyalarını listeler." },
      { t: "Menü çubuğu", d: "✨ simgesinden sağlık skoru ve sistem özeti; pencere kapalıyken de çalışır." }
    ],
    requirements: ["macOS 15+", "Apple Silicon & Intel"],
    price: "Ücretsiz",
    download: {
      file: "/downloads/EYCleaner-1.2.dmg",
      size: "18,4 MB",
      sha256: "f41e35b26cd5101dac39969575e747dcbe1a692e4b95da323218ded7ad66526a",
      note: "Apple tarafından onaylanmış (notarized) Developer ID imzalı."
    },
    note:
      "EYCleaner, temizlik motoru olarak açık kaynaklı Mole aracını (GPL-3.0) uygulamanın içinde barındırır. Lisans metni ve kaynak kodu uygulamada Yardım menüsündedir. EYCleaner, Mole projesiyle bağlantılı değildir.",
    links: {
      support: "mailto:ercanyuzuk@gmail.com?subject=EYCleaner",
      source: "https://github.com/tw93/mole"
    },
    about: [
      {
        h: "Temizlikten önce önizleme",
        p: [
          "EYCleaner hiçbir şeyi sormadan silmez. Temizle, Optimize Et ve Proje Artıkları ekranları önce deneme modunda çalışır: hangi klasörün ne kadar yer kapladığını, toplamda ne kadar alan açılacağını listeler. Siz onayladıktan sonra gerçek işlem başlar.",
          "Disk Analizi, Büyük Dosyalar ve Yükleyiciler ekranlarında seçtiğiniz dosyalar kalıcı olarak silinmez, Çöp Sepeti'ne taşınır; yanlışlıkla seçtiğiniz bir şeyi geri alabilirsiniz."
        ]
      },
      {
        h: "Diskte yer neye gidiyor?",
        p: [
          "Disk Analizi, seçtiğiniz klasördeki alt klasörleri boyutlarına göre sıralar; tıklayarak içeri inebilir, yeri dolduran klasörü birkaç adımda bulabilirsiniz. Büyük Dosyalar ise tüm diski tarayıp eşik değerinden büyük dosyaları tür (video, arşiv, disk görüntüsü…) filtresiyle listeler.",
          "Geliştiriciyseniz Proje Artıkları ekranı unutulmuş node_modules, build ve önbellek klasörlerini bulur; çoğu zaman en çok yer açan adım budur."
        ]
      },
      {
        h: "Uygulamaları artıklarıyla kaldırın",
        p: [
          "Bir uygulamayı Çöp Sepeti'ne sürüklemek; Application Support, önbellek, tercih ve başlangıç öğelerini geride bırakır. Uygulama Kaldır ekranında birden fazla uygulamayı seçip kaldırılacak dosyaları önizleyebilir, hepsini tek seferde temizleyebilirsiniz."
        ]
      },
      {
        h: "Canlı sistem durumu ve menü çubuğu",
        p: [
          "Durum ekranı; CPU (performans ve verimlilik çekirdekleri), bellek, disk, ağ ve pil bilgilerini canlı gösterir, en çok kaynak kullanan süreçleri listeler ve tüm bunları tek bir sağlık skorunda özetler.",
          "Ana pencereyi kapattığınızda EYCleaner menü çubuğunda çalışmaya devam eder: ✨ simgesine tıklayarak skoru ve özet bilgileri görebilir, ilgili ekrana tek tıkla geçebilirsiniz. Ekranlar arasında ⌘1–⌘8 kısayollarıyla dolaşılır."
        ]
      },
      {
        h: "Kurulum",
        p: [
          "DMG dosyasını indirip açın, EYCleaner'ı Applications klasörüne sürükleyin. Uygulama Apple tarafından onaylandığı için ilk açılışta Gatekeeper uyarısı görmezsiniz. Temizlik motoru uygulamanın içinde gelir; Homebrew ya da başka bir kurulum gerekmez.",
          "Masaüstü, Belgeler, İndirilenler ve Mail gibi korumalı klasörlerin de taranması için Sistem Ayarları → Gizlilik ve Güvenlik → Tam Disk Erişimi listesine EYCleaner'ı ekleyebilirsiniz. Yönetici izni gereken adımlarda macOS'un kendi şifre penceresi açılır."
        ]
      }
    ],
    faq: [
      { q: "EYCleaner ücretli mi?", a: "Hayır. EYCleaner ücretsizdir; reklam, hesap ya da abonelik yoktur." },
      { q: "Yanlışlıkla önemli bir dosya silinir mi?", a: "Temizlik işlemleri önce önizleme olarak çalışır ve sizin onayınızı bekler. Disk Analizi, Büyük Dosyalar ve Yükleyiciler ekranlarında seçilen dosyalar Çöp Sepeti'ne taşınır, yani geri alınabilir." },
      { q: "Mole'u ayrıca kurmam gerekiyor mu?", a: "Hayır. Test edilmiş bir Mole sürümü uygulamanın içinde gelir. Sisteminizde Homebrew ile kurulu bir Mole varsa kullanılmaz; böylece güncellemeler EYCleaner'ı bozmaz." },
      { q: "Neden Tam Disk Erişimi istiyor?", a: "İstemez, isteğe bağlıdır. macOS, Masaüstü, Belgeler, İndirilenler ve Mail gibi klasörleri korur. Bu klasörlerin de taranmasını istiyorsanız EYCleaner'a Tam Disk Erişimi verebilirsiniz." },
      { q: "EYCleaner neden App Store'da değil?", a: "Önbellekleri temizlemek ve uygulama artıklarını kaldırmak için App Store'un zorunlu tuttuğu sandbox dışında çalışması gerekir. Bu yüzden Apple onaylı (notarized) DMG olarak buradan dağıtılır." },
      { q: "Hangi Mac'lerde çalışır?", a: "macOS 15 Sequoia ve sonrasını çalıştıran tüm Apple Silicon ve Intel Mac'lerde çalışır (universal uygulama)." }
    ],
    marquee: ["Temizlik", "Disk Analizi", "Uygulama Kaldır"]
  },
  {
    id: "eyconsol",
    name: "EYConsol",
    tagline: "SSH, seri port ve terminal — tek pencerede.",
    summary:
      "Ağ ve sistem yöneticileri için macOS terminal uygulaması. SSH oturumları, switch/router konsolları için seri port, SFTP dosya tarayıcısı ve bölünmüş paneller bir arada.",
    icon: "/assets/icons/eyconsol.png",
    platforms: ["macOS"],
    accent: "#5ab4ff",
    accent2: "#ff9f43",
    version: "0.1.0",
    category: "DeveloperApplication",
    os: "macOS 14",
    visual: "terminal",
    seo: {
      title: "EYConsol — Mac için SSH, seri konsol ve SFTP terminali",
      description:
        "EYConsol: ağ ve sistem yöneticileri için macOS terminali. SSH, switch/router seri konsolu, SFTP dosya tarayıcısı, bölünmüş paneller ve snippet'ler. Ücretsiz."
    },
    features: [
      { t: "SSH", d: "~/.ssh/config, anahtarlar, ssh-agent, ProxyJump ve port yönlendirme. Şifreler isteğe bağlı Keychain'de." },
      { t: "Seri port", d: "/dev/cu.* portları, özel baud hızları, parite/stop bitleri, RTS/CTS, XON/XOFF, BREAK ve DTR." },
      { t: "SFTP tarayıcı", d: "Çift panel, sürükle-bırak, paralel aktarım ve dosyayı yerel editörde düzenleyip otomatik geri yükleme." },
      { t: "Bölünmüş paneller", d: "Yan yana / alt alta bölme ve ⌥⌘I ile tüm panellere aynı anda komut yazma." },
      { t: "Snippet'ler", d: "Kayıtlı çok satırlı komutlar; tek tık ya da ⌃⌘1…9 ile gönderme." },
      { t: "Oturum kaydı", d: "Renk kodlarından arındırılmış düz metin log, isteğe bağlı zaman damgası." }
    ],
    requirements: ["macOS 14+", "Apple Silicon & Intel"],
    price: "Ücretsiz",
    download: {
      file: "/downloads/EYConsol-0.1.0.dmg",
      size: "4,4 MB",
      sha256: "a8aa99eca8c79fc83d519edcfd0d7267f532c3fc21dd56f861d7a770cd44b4ee",
      note: "Apple tarafından onaylanmış (notarized) Developer ID imzalı."
    },
    links: {
      support: "mailto:ercanyuzuk@gmail.com?subject=EYConsol"
    },
    about: [
      {
        h: "SSH oturumları, mevcut ayarlarınızla",
        p: [
          "EYConsol, ~/.ssh/config dosyanızdaki sunucuları, anahtarlarınızı ve ssh-agent'ı olduğu gibi kullanır; yeni bir yapılandırma öğrenmeniz gerekmez. ProxyJump ile bastion sunucular üzerinden bağlanabilir, yerel ve uzak port yönlendirmesi tanımlayabilirsiniz.",
          "Şifreyle bağlandığınız cihazlar için şifreyi isterseniz macOS Keychain'e kaydedebilirsiniz; bir sonraki bağlantıda otomatik girilir."
        ]
      },
      {
        h: "Switch ve router'lar için seri konsol",
        p: [
          "USB-seri adaptörünüzü takın, /dev/cu.* portunu seçin ve bağlanın. Standart ve özel baud hızları, parite, veri ve stop bitleri, RTS/CTS ve XON/XOFF akış kontrolü desteklenir. Cihazı ROMMON ya da bootloader moduna almak için BREAK sinyali gönderebilir, DTR hattını yönetebilirsiniz."
        ]
      },
      {
        h: "SFTP dosya tarayıcısı",
        p: [
          "Açık bir SSH oturumundan SFTP tarayıcısını açın: solda Mac'iniz, sağda uzak sunucu. Dosyaları sürükleyip bırakarak paralel aktarın. Uzak bir dosyayı yerel editörünüzde açın; kaydettiğinizde EYConsol değişikliği sunucuya otomatik geri yükler."
        ]
      },
      {
        h: "Bölünmüş paneller ve toplu komut",
        p: [
          "Bir sekmeyi yan yana ya da alt alta panellere bölün; bir panelde SSH, diğerinde seri konsol açık kalsın. ⌥⌘I ile yazdığınız her tuşu tüm panellere aynı anda gönderebilirsiniz — birden fazla switch'e aynı yapılandırmayı girmek için idealdir.",
          "Sık kullandığınız çok satırlı komutları snippet olarak kaydedin ve tek tıkla ya da ⌃⌘1…9 kısayollarıyla gönderin. Oturum kaydı, çıktıyı renk kodlarından arındırılmış düz metin olarak (isteğe bağlı zaman damgasıyla) dosyaya yazar."
        ]
      }
    ],
    faq: [
      { q: "EYConsol ücretli mi?", a: "Hayır. EYConsol ücretsizdir; reklam, hesap ya da abonelik yoktur." },
      { q: "Mevcut ~/.ssh/config dosyamı kullanabilir miyim?", a: "Evet. Sunucu tanımlarınız, anahtarlarınız, ssh-agent ve ProxyJump ayarlarınız doğrudan kullanılır." },
      { q: "Şifrelerim nerede saklanıyor?", a: "Yalnızca isterseniz, macOS Keychain'de saklanır. Hiçbir sunucuya gönderilmez." },
      { q: "Hangi seri port adaptörleriyle çalışır?", a: "macOS'ta /dev/cu.* olarak görünen USB-seri adaptörlerle çalışır. Adaptörünüz için üreticinin sürücüsü gerekiyorsa önce onu kurun." },
      { q: "Açarken güvenlik uyarısı çıkar mı?", a: "Hayır. EYConsol Developer ID ile imzalı ve Apple tarafından onaylanmıştır (notarized)." }
    ],
    marquee: ["SSH", "Serial", "SFTP"]
  },
  {
    id: "eyiptv",
    name: "eyiptv",
    tagline: "Kendi yayınlarınız, büyük ekranda.",
    summary:
      "Apple TV ve iPhone için sade, hızlı bir medya oynatıcı. Servis sağlayıcınızın bilgileriyle giriş yapın; canlı TV, film ve dizilerinize tek yerden ulaşın.",
    icon: "/assets/icons/eyiptv.png",
    platforms: ["Apple TV", "iPhone"],
    accent: "#8b7bff",
    accent2: "#4d6bff",
    version: "1.0",
    category: "EntertainmentApplication",
    os: "tvOS 26.2, iOS 26.2",
    appStoreId: "6820475557",
    visual: "tv",
    seo: {
      title: "eyiptv — Apple TV ve iPhone için sade IPTV oynatıcı",
      description:
        "eyiptv: Apple TV ve iPhone için hızlı ve sade IPTV oynatıcı. Canlı TV, film ve dizileriniz tek yerde; kumandaya uygun arayüz, cihazda kalan giriş bilgileri."
    },
    shots: {
      tv: [
        "/assets/shots/eyiptv-tv-1_anasayfa.jpg",
        "/assets/shots/eyiptv-tv-2_canli_tv.jpg",
        "/assets/shots/eyiptv-tv-3_filmler.jpg",
        "/assets/shots/eyiptv-tv-4_dizi_detay.jpg",
        "/assets/shots/eyiptv-tv-5_giris.jpg"
      ],
      phone: [
        "/assets/shots/eyiptv-ios-01_live.jpg",
        "/assets/shots/eyiptv-ios-02_vod.jpg",
        "/assets/shots/eyiptv-ios-03_vodList.jpg",
        "/assets/shots/eyiptv-ios-04_series.jpg",
        "/assets/shots/eyiptv-ios-05_seriesDetail.jpg"
      ]
    },
    features: [
      { t: "Canlı TV, Film, Dizi", d: "Her içerik türü için ayrı bölüm, kategorilere göre düzenli görünüm." },
      { t: "Hızlı arama", d: "Tüm kanal, film ve dizilerde anında arama." },
      { t: "Sezon & bölüm", d: "Dizilerde sezon ve bölüm seçimi, kaldığınız yerden devam." },
      { t: "Kumandaya uygun", d: "Apple TV kumandasıyla rahat gezinme; iPhone'da dikey ve yatay izleme." },
      { t: "Bilgiler cihazda", d: "Giriş bilgileri yalnızca cihazınızda saklanır; geliştiriciye ya da üçüncü taraflara gönderilmez." },
      { t: "Apple TV ve iPhone", d: "Tek uygulama, iki cihaz: Apple TV ve iPhone sürümleri App Store'da ücretsiz." }
    ],
    requirements: ["tvOS 26.2+", "iOS 26.2+"],
    price: "Ücretsiz",
    note: "eyiptv herhangi bir yayın, kanal veya içerik sağlamaz; yasal olarak abone olduğunuz servisin bilgileriyle çalışır.",
    stores: [
      { label: "Apple TV · App Store", href: "https://apps.apple.com/us/app/eyiptv/id6820475557" },
      { label: "iPhone · App Store", href: "https://apps.apple.com/tr/app/eyiptv/id6820475557?l=tr" }
    ],
    links: {
      support: "https://www.ercanyuzuk.com/p/eyiptv-destek.html",
      privacy: "https://www.ercanyuzuk.com/p/eyiptv-gizlilik.html"
    },
    about: [
      {
        h: "Apple TV için tasarlandı",
        p: [
          "eyiptv, Apple TV kumandasıyla kullanılmak üzere tasarlandı: büyük, okunaklı kartlar, odak efektleri ve az sayıda adımla izlemek istediğinize ulaşırsınız. Ana sayfadan Canlı TV, Filmler ve Diziler bölümlerine geçebilir, her bölümde kategorilere göre gezinebilirsiniz."
        ]
      },
      {
        h: "Canlı TV, film ve diziler tek yerde",
        p: [
          "Servis sağlayıcınızın verdiği bilgilerle giriş yaptığınızda kanallarınız, filmleriniz ve dizileriniz kategorilere ayrılmış olarak listelenir. Dizilerde sezon ve bölüm seçebilir, yarıda bıraktığınız içeriğe kaldığınız yerden devam edebilirsiniz. Arama, tüm kanal, film ve diziler içinde anında sonuç verir."
        ]
      },
      {
        h: "Gizlilik",
        p: [
          "Hesap açmanız gerekmez. Giriş bilgileriniz yalnızca cihazınızda saklanır ve yalnızca servis sağlayıcınızla bağlantı kurmak için kullanılır; geliştiriciye ya da üçüncü taraflara gönderilmez. Uygulamada reklam ve analitik yoktur."
        ]
      },
      {
        h: "iPhone sürümü",
        p: [
          "eyiptv artık iPhone'da da App Store'da. iPhone sürümü aynı Canlı TV, Film ve Dizi bölümlerini sunar; dikey ve yatay izlemeyi destekler. iOS 26.2 veya sonrasını gerektirir."
        ]
      }
    ],
    faq: [
      { q: "eyiptv kanal ya da içerik sağlıyor mu?", a: "Hayır. eyiptv yalnızca bir oynatıcıdır; herhangi bir yayın, kanal veya içerik sağlamaz. Yasal olarak abone olduğunuz servisin bilgileriyle çalışır." },
      { q: "eyiptv ücretli mi?", a: "eyiptv App Store'dan ücretsiz indirilebilir." },
      { q: "Hangi Apple TV modellerinde çalışır?", a: "tvOS 26.2 veya sonrasını çalıştıran Apple TV HD ve Apple TV 4K modellerinde çalışır." },
      { q: "iPhone'da kullanabilir miyim?", a: "Evet. eyiptv iOS 26.2 veya sonrasını çalıştıran iPhone'larda App Store'dan ücretsiz indirilebilir." },
      { q: "Giriş bilgilerim nereye gönderiliyor?", a: "Yalnızca cihazınızda saklanır ve sadece servis sağlayıcınıza bağlanmak için kullanılır. Geliştiriciye veya üçüncü taraflara gönderilmez." }
    ],
    marquee: ["Canlı TV", "Apple TV", "Dizi & Film"]
  },
  {
    id: "eynetscanner",
    name: "EYNetScanner",
    tagline: "7 ağ aracı. Tek temiz uygulama.",
    summary:
      "Ping, port tarama, subnet tarama, DNS, IP bilgisi, traceroute ve canlı bağlantı izleme — iPhone'unuzda. Hesap yok, reklam yok, takip yok.",
    icon: "/assets/icons/eynetscanner.png",
    platforms: ["iPhone"],
    accent: "#22d3ee",
    accent2: "#a855f7",
    version: "1.0",
    category: "UtilitiesApplication",
    os: "iOS 26.2",
    appStoreId: "6823558559",
    visual: "phones",
    seo: {
      title: "EYNetScanner — iPhone için ping, port ve ağ tarayıcı",
      description:
        "EYNetScanner: iPhone için ücretsiz ağ araçları. Ping, port tarama, subnet tarama, DNS sorgusu, IP bilgisi, traceroute ve bağlantı izleme. Reklamsız, takipsiz."
    },
    shots: {
      phone: [
        "/assets/shots/netscanner-01_IMG_4521.jpg",
        "/assets/shots/netscanner-02_IMG_4524.jpg",
        "/assets/shots/netscanner-03_IMG_4522.jpg",
        "/assets/shots/netscanner-04_IMG_4523.jpg",
        "/assets/shots/netscanner-05_IMG_4525.jpg"
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
    requirements: ["iOS 26.2+"],
    price: "Ücretsiz",
    stores: [{ label: "App Store'dan indir", href: "https://apps.apple.com/us/app/eynetscanner/id6823558559" }],
    links: {
      support: "https://www.ercanyuzuk.com/p/eynetscanner-destek.html",
      privacy: "https://www.ercanyuzuk.com/p/eynetscanner-gizlilik_0656814276.html"
    },
    about: [
      {
        h: "Cebinizde ağ araç çantası",
        p: [
          "EYNetScanner, ağ sorunlarını giderirken en çok ihtiyaç duyulan yedi aracı tek bir iPhone uygulamasında toplar. Sahada bir switch'in ayakta olup olmadığını kontrol etmek, evdeki ağda hangi cihazların bağlı olduğunu görmek ya da bir sunucunun portlarını denetlemek için bilgisayar açmanız gerekmez."
        ]
      },
      {
        h: "Ping ve bağlantı izleme",
        p: [
          "Ping aracı ICMP ile gecikmeyi ölçer; ICMP engelliyse otomatik olarak TCP'ye geçer. Ortalama gecikme, jitter ve paket kaybı tek ekranda görünür. Bonjour ile yerel ağdaki cihazları keşfedip tek dokunuşla hedef seçebilirsiniz. Monitor aracı ise bir hedefe olan bağlantıyı ve gecikmeyi sürekli izler."
        ]
      },
      {
        h: "Subnet ve port tarama",
        p: [
          "Subnet Scanner bağlı olduğunuz alt ağı otomatik algılar ve aktif cihazları listeler. Port Scanner, seçtiğiniz cihazda yaygın TCP portlarını kontrol eder ve açık portların yanıt sürelerini gösterir — yalnızca yetkiniz olan ağ ve cihazlarda kullanın."
        ]
      },
      {
        h: "DNS, IP bilgisi ve traceroute",
        p: [
          "DNS Lookup ile alan adlarının A/AAAA kayıtlarını ve IP adreslerinin ters DNS kaydını sorgulayın. IP Info, genel IP adresinizi ya da girdiğiniz herhangi bir IP'nin konumunu, servis sağlayıcısını ve saat dilimini gösterir. Traceroute, hedefe giden yolu atlama atlama çıkarır."
        ]
      }
    ],
    faq: [
      { q: "EYNetScanner ücretli mi?", a: "Hayır. EYNetScanner App Store'da ücretsizdir; reklam ve uygulama içi takip yoktur." },
      { q: "Hangi iOS sürümü gerekiyor?", a: "iOS 26.2 veya sonrası gerekir." },
      { q: "Neden Yerel Ağ izni istiyor?", a: "Subnet tarama ve Bonjour ile cihaz keşfi için iOS'un Yerel Ağ iznine ihtiyaç vardır. İzin vermezseniz diğer araçlar çalışmaya devam eder." },
      { q: "Hesap açmam gerekiyor mu?", a: "Hayır. Hesap, kayıt ya da giriş yoktur; uygulamayı açıp hemen kullanabilirsiniz." }
    ],
    marquee: ["Ping", "Port Scan", "Traceroute", "DNS"]
  }
];

export const ROADMAP = [
  { name: "EYConsol 0.2", desc: "Yeni özellikler ve iyileştirmeler.", status: "Planlanıyor", platform: "macOS" },
  { name: "Fikrin mi var?", desc: "İhtiyaç duyduğun bir araç varsa yaz, birlikte yapalım.", status: "Açık", platform: "Sen", href: "/#iletisim" }
];
