#!/usr/bin/env node
/*
 * Statik site üreticisi. src/apps.mjs'teki verilerden şunları yazar:
 *   index.html, <id>/index.html (her uygulama için), sitemap.xml, robots.txt
 * Bağımlılık yok: `node scripts/build.mjs`
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { APPS, ROADMAP } from "../src/apps.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://apps.ercanyuzuk.com";
const AUTHOR = { "@type": "Person", name: "Ercan Yüzük", url: "https://www.ercanyuzuk.com" };
const TODAY = new Date().toISOString().slice(0, 10);

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const abs = (p) => (p.startsWith("http") ? p : SITE + p);
const pad = (n) => String(n).padStart(2, "0");
const ldJson = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`;

const arrow = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12h14m0 0-6-6m6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/* ---------- shared chrome ---------- */
function head({ title, description, path, image = "/assets/og.jpg", card = "summary_large_image", extra = "", ld = [] }) {
  return `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="author" content="Ercan Yüzük">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#07080d">
  <link rel="canonical" href="${SITE}${path}">
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <link rel="apple-touch-icon" href="/assets/favicon.png">
  <link rel="sitemap" type="application/xml" href="/sitemap.xml">${extra}

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="EY Apps">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${SITE}${path}">
  <meta property="og:image" content="${abs(image)}">
  <meta name="twitter:card" content="${card}">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${abs(image)}">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
  ${ld.map(ldJson).join("\n  ")}
</head>
<body>
  <canvas id="bg" aria-hidden="true"></canvas>
  <div class="cursor-glow" aria-hidden="true"></div>
  <div class="grain" aria-hidden="true"></div>
`;
}

const nav = (active) => `
  <header class="nav" id="nav">
    <a href="/" class="brand" aria-label="EY Apps ana sayfa">
      <span class="brand-mark">EY</span><span class="brand-text">apps</span>
    </a>
    <nav class="nav-links" aria-label="Uygulamalar">
      ${APPS.map((a) => `<a href="/${a.id}/"${a.id === active ? ' class="active" aria-current="page"' : ""}>${esc(a.name)}</a>`).join("\n      ")}
    </nav>
    <a class="nav-cta" href="/#iletisim">İletişim</a>
  </header>
`;

const foot = `
  <footer class="footer">
    <span>© <span id="year">${new Date().getFullYear()}</span> Ercan Yüzük</span>
    <span class="footer-mid">Swift ile, Türkiye'de yapıldı.</span>
    <nav class="footer-links" aria-label="Uygulamalar">${APPS.map((a) => `<a href="/${a.id}/">${esc(a.name)}</a>`).join("")}</nav>
    <a href="#top">Başa dön ↑</a>
  </footer>

  <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Ekran görüntüsü">
    <button class="lb-close" aria-label="Kapat">×</button>
    <button class="lb-nav lb-prev" aria-label="Önceki">‹</button>
    <img alt="">
    <button class="lb-nav lb-next" aria-label="Sonraki">›</button>
  </div>

  <script src="/js/main.js" defer></script>
</body>
</html>
`;

/* ---------- pieces ---------- */
const chips = (list) => list.map((p) => `<span class="chip">${esc(p)}</span>`).join("");

const btn = (href, label, primary, extra = "") => {
  const cls = `btn ${primary ? "btn-primary" : "btn-ghost"}`;
  if (!href) return `<span class="${cls} disabled"><span>${esc(label)} · Yakında</span></span>`;
  const ext = href.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
  const dl = href.endsWith(".dmg") ? " download" : "";
  return `<a class="${cls} magnetic" href="${esc(href)}"${ext}${dl}${extra}><span>${esc(label)}</span></a>`;
};

/** Short availability line for cards. */
const availability = (a) => {
  if (a.download) return "Ücretsiz · DMG";
  const live = (a.stores || []).filter((s) => s.href);
  return live.length ? "App Store'da" : "Yakında";
};

function visualFor(a) {
  if (a.visual === "terminal") {
    return `
      <div class="visual reveal" style="--d:.1s" aria-hidden="true">
        <div class="window tilt-soft">
          <div class="win-bar"><i></i><i></i><i></i>
            <div class="win-tabs"><span class="on">sw01</span><span>usbserial-1420</span><span>zsh</span></div>
          </div>
          <div class="win-body"><div class="pane" data-term="ssh"></div><div class="pane" data-term="serial"></div></div>
          <div class="win-status"><span><b>●</b> SSH bağlı · 9600 8N1</span><span>Yazı Tipi · JetBrains Mono 13</span></div>
        </div>
        <div class="float-key k1"><em>⌘D</em>Paneli böl</div>
        <div class="float-key k2"><em>⌥⌘I</em>Tüm panellere yaz</div>
      </div>`;
  }
  if (a.visual === "cleaner") {
    const side = [
      ["Bakım", [["Durum", "#2dd4bf", true], ["Temizle", "#5ab4ff"], ["Optimize Et", "#ff9f43"]]],
      ["Depolama", [["Disk Analizi", "#34d399"], ["Büyük Dosyalar", "#a855f7"], ["Uygulama Kaldır", "#ff5f57"], ["Proje Artıkları", "#818cf8"], ["Yükleyiciler", "#f472b6"]]]
    ];
    const meters = [["CPU", 23], ["Bellek", 61], ["Disk", 74], ["Ağ", 12]];
    const items = [["Kullanıcı önbellekleri", "3,2 GB"], ["Xcode DerivedData", "2,5 GB"], ["Günlük dosyaları", "1,1 GB"]];
    return `
      <div class="visual reveal" style="--d:.1s" aria-hidden="true">
        <div class="window cleaner tilt-soft" data-cleaner>
          <div class="win-bar"><i></i><i></i><i></i><div class="win-tabs"><span class="on">EYCleaner — Durum</span></div></div>
          <div class="cl-body">
            <div class="cl-side">
              ${side.map(([h, rows]) => `<small>${h}</small>${rows.map(([t, c, on]) => `<span${on ? ' class="on"' : ""} style="--t:${c}">${t}</span>`).join("")}`).join("")}
              <div class="cl-mole"><b>●</b> Mole motoru<br><em>Sürüm 1.61.0</em></div>
            </div>
            <div class="cl-main">
              <div class="cl-top">
                <div class="cl-score"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.5"/><circle class="v" cx="18" cy="18" r="15.5" pathLength="100"/></svg><b data-score>89</b><span>sağlık</span></div>
                <div class="cl-meters">${meters.map(([t, v]) => `<div class="cl-m"><span>${t}</span><i style="--v:${v}%"></i><em>${v}%</em></div>`).join("")}</div>
              </div>
              <div class="cl-list">
                <div class="cl-list-h"><span>Temizlenebilir</span><b>6,8 GB</b></div>
                ${items.map(([t, s]) => `<div class="cl-row"><span>${t}</span><em>${s}</em></div>`).join("")}
              </div>
            </div>
          </div>
          <div class="win-status"><span><b>●</b> Önizleme · henüz hiçbir şey silinmedi</span><span>⌘1–⌘8</span></div>
        </div>
        <div class="float-key k1"><em>✨</em>Menü çubuğunda</div>
        <div class="float-key k2"><em>⌘2</em>Temizle</div>
      </div>`;
  }
  const imgs = (list, alt) =>
    list.map((s, i) => `<img src="${s}" alt="${esc(alt)} ekran görüntüsü ${i + 1}" ${i === 0 ? 'class="on" fetchpriority="high"' : 'loading="lazy"'} decoding="async">`).join("");
  const dots = (n) => `<div class="dots">${Array.from({ length: n }, (_, i) => `<button aria-label="Görsel ${i + 1}"${i === 0 ? ' class="on"' : ""}></button>`).join("")}</div>`;
  if (a.visual === "tv") {
    return `
      <div class="visual reveal carousel" style="--d:.1s">
        <div class="stage tv-stage">
          <div class="tv"><div class="screen" data-slides>${imgs(a.shots.tv, a.name + " Apple TV")}</div></div>
          <div class="phone"><div class="screen" data-slides>${imgs(a.shots.phone, a.name + " iPhone")}</div></div>
        </div>
        ${dots(a.shots.tv.length)}
      </div>`;
  }
  const p = a.shots.phone;
  return `
      <div class="visual reveal carousel" style="--d:.1s">
        <div class="stage phones">
          <div class="phone back" aria-hidden="true"><div class="screen" data-slides data-offset="${p.length - 1}">${imgs(p, a.name)}</div></div>
          <div class="phone back2" aria-hidden="true"><div class="screen" data-slides data-offset="1">${imgs(p, a.name)}</div></div>
          <div class="phone front"><div class="screen" data-slides>${imgs(p, a.name)}</div></div>
          <div class="radar" aria-hidden="true"><i style="left:30%;top:28%"></i><i style="left:68%;top:40%;animation-delay:-1s"></i><i style="left:44%;top:70%;animation-delay:-2s"></i></div>
        </div>
        ${dots(p.length)}
      </div>`;
}

const card = (a, i, headingTag = "h3") => `
        <a class="card reveal tilt" href="/${a.id}/" style="--a:${a.accent};--d:${(i % 2) * 0.08}s">
          <div class="card-top">
            <img class="card-icon" src="${a.icon}" alt="${esc(a.name)} simgesi" width="78" height="78" loading="lazy">
            <span class="avail">${esc(availability(a))}</span>
          </div>
          <${headingTag}>${esc(a.name)}</${headingTag}>
          <p class="tag">${esc(a.tagline)}</p>
          <p class="card-sum">${esc(a.summary)}</p>
          <div class="platforms">${chips(a.platforms)}</div>
          <span class="arrow">${arrow}</span>
        </a>`;

/* ---------- home ---------- */
function homePage() {
  const platforms = [...new Set(APPS.flatMap((a) => a.platforms))];
  const words = [...APPS.flatMap((a) => a.marquee || []), "SwiftUI", "macOS", "iPhone", "Gizlilik", "Reklamsız"];
  const mq = words.map((w) => `<span>${esc(w)}</span>`).join("");
  const description = `Ercan Yüzük'ün macOS, iPhone ve Apple TV uygulamaları: ${APPS.map((a) => a.name).join(", ")}. Sade, hızlı, reklamsız ve verinizi toplamayan araçlar.`;

  const ld = [
    { "@context": "https://schema.org", "@type": "WebSite", name: "EY Apps", url: SITE + "/", inLanguage: "tr", author: AUTHOR },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "EY Apps uygulamaları",
      itemListElement: APPS.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/${a.id}/`, name: a.name }))
    }
  ];

  return (
    head({ title: "EY Apps — Mac, iPhone ve Apple TV uygulamaları | Ercan Yüzük", description, path: "/", ld }) +
    nav() +
    `
  <main id="top">
    <section class="hero">
      <div class="hero-orbs" aria-hidden="true">
        <span class="orb o1"></span><span class="orb o2"></span><span class="orb o3"></span>
      </div>
      <p class="eyebrow reveal"><span class="dot"></span> ${platforms.map(esc).join(" · ")}</p>
      <h1 class="hero-title">
        <span class="line reveal"><span class="scramble" data-text="Küçük uygulamalar,">Küçük uygulamalar,</span></span>
        <span class="line reveal"><span class="gradient-text">büyük kolaylıklar.</span></span>
      </h1>
      <p class="hero-sub reveal">
        Günlük işlerimde ihtiyaç duyduğum Mac, iPhone ve Apple TV araçlarını kendim yazıyorum. Sade, hızlı, reklamsız ve
        verinizi toplamayan uygulamalar — hepsi burada.
      </p>
      <div class="hero-actions reveal">
        <a class="btn btn-primary magnetic" href="#uygulamalar"><span>Uygulamaları keşfet</span><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 5v14m0 0-6-6m6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
        <a class="btn btn-ghost magnetic" href="#yakinda"><span>Yol haritası</span></a>
      </div>

      <div class="hero-icons reveal">
        ${APPS.map((a) => `<a href="/${a.id}/" style="--glow:${a.accent}" aria-label="${esc(a.name)}"><img src="${a.icon}" alt="" width="96" height="96"></a>`).join("\n        ")}
      </div>

      <div class="stats reveal">
        <div class="stat"><b data-count="${APPS.length}">${APPS.length}</b><span>Uygulama</span></div>
        <div class="stat"><b data-count="${platforms.length}">${platforms.length}</b><span>Platform</span></div>
        <div class="stat"><b data-count="0">0</b><span>Reklam & takip</span></div>
        <div class="stat"><b data-count="100" data-suffix="%">100%</b><span>Swift & SwiftUI</span></div>
      </div>
    </section>

    <div class="marquee" aria-hidden="true">
      <div class="marquee-track">${mq}${mq}</div>
    </div>

    <section class="section" id="uygulamalar">
      <div class="section-head reveal">
        <p class="kicker">01 — Uygulamalar</p>
        <h2>Her biri tek bir işi <em>çok iyi</em> yapar.</h2>
      </div>
      <div class="cards">${APPS.map((a, i) => card(a, i)).join("")}
      </div>
    </section>

    <section class="section" id="ilkeler">
      <div class="section-head reveal">
        <p class="kicker">02 — İlkeler</p>
        <h2>Her uygulamada aynı söz.</h2>
      </div>
      <div class="principles">
        <article class="principle reveal tilt">
          <div class="p-icon"><svg viewBox="0 0 24 24"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg></div>
          <h3>Gizlilik önce gelir</h3>
          <p>Hesap yok, analitik yok, takip yok. Verileriniz cihazınızdan çıkmaz.</p>
        </article>
        <article class="principle reveal tilt">
          <div class="p-icon"><svg viewBox="0 0 24 24"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/></svg></div>
          <h3>Yerel ve hızlı</h3>
          <p>Swift ve SwiftUI ile yazıldı; Apple çatıları dışında bağımlılık neredeyse yok.</p>
        </article>
        <article class="principle reveal tilt">
          <div class="p-icon"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 12h8"/></svg></div>
          <h3>Sade arayüz</h3>
          <p>Gereksiz menü yok. Açarsınız, işinizi yaparsınız, kapatırsınız.</p>
        </article>
        <article class="principle reveal tilt">
          <div class="p-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/></svg></div>
          <h3>Reklamsız</h3>
          <p>Ekranınızda yalnızca kullandığınız şey olur. Reklam ve açılır pencere yok.</p>
        </article>
      </div>
    </section>

    <section class="section" id="yakinda">
      <div class="section-head reveal">
        <p class="kicker">03 — Yakında</p>
        <h2>Atölyede neler var?</h2>
      </div>
      <div class="roadmap">${ROADMAP.map(
        (r, i) => `
        <${r.href ? `a href="${r.href}"` : "div"} class="soon reveal tilt" style="--d:${i * 0.08}s">
          <div class="q">${r.href ? "+" : "?"}</div>
          <h3>${esc(r.name)}</h3>
          <p>${esc(r.desc)}</p>
          <div class="row"><span class="status">${esc(r.status)}</span><span class="chip">${esc(r.platform)}</span></div>
        </${r.href ? "a" : "div"}>`
      ).join("")}
      </div>
    </section>

    <section class="section contact" id="iletisim">
      <div class="contact-card reveal">
        <div class="contact-glow" aria-hidden="true"></div>
        <p class="kicker">04 — İletişim</p>
        <h2>Bir fikriniz, öneriniz ya da<br>bir hata mı buldunuz?</h2>
        <p>Geri bildirimler uygulamaları daha iyi yapıyor. Yazmaktan çekinmeyin.</p>
        <div class="hero-actions">
          <a class="btn btn-primary magnetic" href="mailto:ercanyuzuk@gmail.com"><span>E-posta gönder</span></a>
          <a class="btn btn-ghost magnetic" href="https://www.ercanyuzuk.com" target="_blank" rel="noopener"><span>ercanyuzuk.com</span></a>
        </div>
      </div>
    </section>
  </main>
` +
    foot
  );
}

/* ---------- app page ---------- */
function appPage(a, i) {
  const url = `${SITE}/${a.id}/`;
  const liveStores = (a.stores || []).filter((s) => s.href);
  const specs = [
    ["Sürüm", a.version],
    ["Platform", a.platforms.join(", ")],
    ["Gereksinim", (a.requirements || []).join(" · ")],
    ["Fiyat", a.price],
    a.download && ["Boyut", a.download.size],
    ["Dil", "Türkçe"],
    ["Geliştirici", "Ercan Yüzük"]
  ].filter(Boolean);

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": a.platforms.includes("macOS") ? "SoftwareApplication" : "MobileApplication",
      name: a.name,
      description: a.summary,
      url,
      image: abs(a.icon),
      applicationCategory: a.category,
      operatingSystem: a.os,
      softwareVersion: a.version,
      inLanguage: "tr",
      author: AUTHOR,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      ...(a.download && { downloadUrl: abs(a.download.file), fileSize: a.download.size.replace(",", ".") }),
      ...(liveStores.length && { installUrl: liveStores[0].href, sameAs: liveStores.map((s) => s.href) }),
      ...(a.shots && { screenshot: [...(a.shots.tv || []), ...(a.shots.phone || [])].map(abs) }),
      featureList: a.features.map((f) => f.t)
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "EY Apps", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: a.name, item: url }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: a.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
    }
  ];

  const extra = a.appStoreId ? `\n  <meta name="apple-itunes-app" content="app-id=${a.appStoreId}">` : "";

  const actions = [
    ...(a.download ? [btn(a.download.file, `Mac için indir · ${a.download.size}`, true)] : []),
    ...(a.stores || []).map((s, k) => btn(s.href, s.label, k === 0 || !!s.href)),
    a.links.support && btn(a.links.support, "Destek"),
    a.links.privacy && btn(a.links.privacy, "Gizlilik")
  ].filter(Boolean);

  const others = APPS.filter((o) => o.id !== a.id);

  return (
    head({ title: `${a.seo.title} | EY Apps`, description: a.seo.description, path: `/${a.id}/`, image: a.icon, card: "summary", extra, ld }) +
    nav(a.id) +
    `
  <main id="top" class="app-page">
    <section class="app" style="--a:${a.accent};--a2:${a.accent2}">
      <div class="app-bg" aria-hidden="true"></div>
      <nav class="crumbs reveal" aria-label="Konum"><a href="/">EY Apps</a><span>/</span><a href="/#uygulamalar">Uygulamalar</a><span>/</span><span aria-current="page">${esc(a.name)}</span></nav>
      <div class="app-grid">
        <div class="app-copy">
          <div class="app-head reveal">
            <img src="${a.icon}" alt="${esc(a.name)} uygulama simgesi" width="64" height="64">
            <div><div class="num">${pad(i + 1)} / ${pad(APPS.length)} · ${esc(a.platforms.join(" · "))}</div><h1>${esc(a.name)}</h1></div>
          </div>
          <p class="lead reveal">${esc(a.tagline)}</p>
          <p class="summary reveal">${esc(a.summary)}</p>
          <div class="meta reveal">${chips(a.platforms)}<span class="chip">v${esc(a.version)}</span>${chips(a.requirements || [])}<span class="chip">${esc(a.price)}</span></div>
          ${a.download ? `<div class="dl-info reveal"><span>✓ ${esc(a.download.note)} DMG'yi açıp uygulamayı Applications klasörüne sürükleyin.</span><code title="SHA-256">SHA-256 ${esc(a.download.sha256.slice(0, 16))}…<button type="button" data-copy="${esc(a.download.sha256)}">Kopyala</button></code></div>` : ""}
          <div class="actions reveal">
            ${actions.join("\n            ")}
          </div>
          ${a.note ? `<p class="note reveal">${esc(a.note)}</p>` : ""}
        </div>
        ${visualFor(a)}
      </div>
    </section>

    <section class="section app-section" style="--a:${a.accent}" aria-labelledby="ozellikler">
      <div class="section-head reveal">
        <p class="kicker">01 — Özellikler</p>
        <h2 id="ozellikler">${esc(a.name)} neler yapar?</h2>
      </div>
      <div class="features">
        ${a.features.map((f, j) => `<div class="feature reveal" style="--d:${(j % 3) * 0.07}s"><h3>${esc(f.t)}</h3><p>${esc(f.d)}</p></div>`).join("\n        ")}
      </div>
    </section>

    <section class="section app-section" style="--a:${a.accent}" aria-labelledby="ayrintilar">
      <div class="section-head reveal">
        <p class="kicker">02 — Ayrıntılar</p>
        <h2 id="ayrintilar">Yakından bakış</h2>
      </div>
      <div class="about-grid">
        <div class="about">
          ${a.about.map((b) => `<article class="about-block reveal"><h3>${esc(b.h)}</h3>${b.p.map((p) => `<p>${esc(p)}</p>`).join("")}</article>`).join("\n          ")}
        </div>
        <aside class="specs reveal" aria-label="Teknik bilgiler">
          <img src="${a.icon}" alt="" width="72" height="72" loading="lazy">
          <dl>
            ${specs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("\n            ")}
          </dl>
          <div class="specs-actions">${actions[0]}</div>
        </aside>
      </div>
    </section>

    <section class="section app-section" style="--a:${a.accent}" aria-labelledby="sss">
      <div class="section-head reveal">
        <p class="kicker">03 — Sık sorulanlar</p>
        <h2 id="sss">Sorular &amp; cevaplar</h2>
      </div>
      <div class="faq">
        ${a.faq.map((f) => `<details class="reveal"><summary><h3>${esc(f.q)}</h3></summary><p>${esc(f.a)}</p></details>`).join("\n        ")}
      </div>
    </section>

    <section class="section" aria-labelledby="diger">
      <div class="section-head reveal">
        <p class="kicker">04 — Diğer uygulamalar</p>
        <h2 id="diger">Bunlara da göz atın.</h2>
      </div>
      <div class="cards cards-3">${others.map((o, k) => card(o, k)).join("")}
      </div>
    </section>
  </main>
` +
    foot
  );
}

/* ---------- write ---------- */
const write = (rel, content) => {
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  console.log("✓", rel);
};

write("index.html", homePage());
APPS.forEach((a, i) => write(`${a.id}/index.html`, appPage(a, i)));

write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${APPS.map(
  (a) => `  <url>
    <loc>${SITE}/${a.id}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image><image:loc>${abs(a.icon)}</image:loc></image:image>
${[...(a.shots?.tv || []), ...(a.shots?.phone || [])].map((s) => `    <image:image><image:loc>${abs(s)}</image:loc></image:image>\n`).join("")}  </url>`
).join("\n")}
</urlset>
`
);

write(
  "robots.txt",
  `User-agent: *
Allow: /
Disallow: /scripts/
Disallow: /src/

Sitemap: ${SITE}/sitemap.xml
`
);
