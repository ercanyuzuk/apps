(() => {
  "use strict";

  const APPS = window.APPS || [];
  const ROADMAP = window.ROADMAP || [];
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  $("#year").textContent = new Date().getFullYear();

  /* ---------- render ---------- */
  const arrow = '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12h14m0 0-6-6m6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  $("#navLinks").innerHTML =
    APPS.map((a) => `<a href="#${a.id}">${esc(a.name)}</a>`).join("") + '<a href="#yakinda">Yakında</a>';

  $("#heroIcons").innerHTML = APPS.map(
    (a) => `<a href="#${a.id}" style="--glow:${a.accent}" tabindex="-1"><img src="${a.icon}" alt="${esc(a.name)}" width="96" height="96"></a>`
  ).join("");

  const words = ["SSH", "Serial", "SFTP", "Ping", "Port Scan", "Traceroute", "DNS", "Canlı TV", "Apple TV", "SwiftUI", "Keychain", "macOS", "iPhone", "Gizlilik", "Reklamsız"];
  const mq = words.map((w) => `<span>${esc(w)}</span>`).join("");
  $("#marquee").innerHTML = mq + mq;

  $("#cards").innerHTML = APPS.map(
    (a, i) => `
    <a class="card reveal tilt" href="#${a.id}" style="--a:${a.accent};--d:${i * 0.08}s">
      <img class="card-icon" src="${a.icon}" alt="" width="78" height="78" loading="lazy">
      <h3>${esc(a.name)}</h3>
      <p class="tag">${esc(a.tagline)}</p>
      <div class="platforms">${a.platforms.map((p) => `<span class="chip">${esc(p)}</span>`).join("")}</div>
      <span class="arrow">${arrow}</span>
    </a>`
  ).join("");

  const linkBtn = (href, label, primary) =>
    href
      ? `<a class="btn ${primary ? "btn-primary" : "btn-ghost"} magnetic" href="${href}" ${href.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}><span>${label}</span></a>`
      : `<span class="btn ${primary ? "btn-primary" : "btn-ghost"} disabled"><span>${label} · Yakında</span></span>`;

  const visualFor = (a) => {
    if (a.visual === "terminal") {
      return `
      <div class="visual reveal" style="--d:.1s">
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
    const imgs = (list, alt) => list.map((s, i) => `<img src="${s}" alt="${esc(alt)} ekran görüntüsü ${i + 1}" loading="lazy" decoding="async"${i === 0 ? ' class="on"' : ""}>`).join("");
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
    const n = p.length;
    return `
      <div class="visual reveal carousel" style="--d:.1s">
        <div class="stage phones">
          <div class="phone back"><div class="screen" data-slides data-offset="${n - 1}">${imgs(p, a.name)}</div></div>
          <div class="phone back2"><div class="screen" data-slides data-offset="1">${imgs(p, a.name)}</div></div>
          <div class="phone front"><div class="screen" data-slides>${imgs(p, a.name)}</div></div>
          <div class="radar" aria-hidden="true"><i style="left:30%;top:28%"></i><i style="left:68%;top:40%;animation-delay:-1s"></i><i style="left:44%;top:70%;animation-delay:-2s"></i></div>
        </div>
        ${dots(n)}
      </div>`;
  };

  $("#details").innerHTML = APPS.map(
    (a, i) => `
    <section class="app" id="${a.id}" style="--a:${a.accent};--a2:${a.accent2}">
      <div class="app-bg" aria-hidden="true"></div>
      <div class="app-grid">
        <div class="app-copy">
          <div class="app-head reveal">
            <img src="${a.icon}" alt="" width="64" height="64" loading="lazy">
            <div><div class="num">${String(i + 1).padStart(2, "0")} / ${String(APPS.length).padStart(2, "0")}</div><h2>${esc(a.name)}</h2></div>
          </div>
          <p class="lead reveal">${esc(a.tagline)}</p>
          <p class="summary reveal">${esc(a.summary)}</p>
          <div class="meta reveal">${a.platforms.map((p) => `<span class="chip">${esc(p)}</span>`).join("")}<span class="chip">v${esc(a.version)}</span></div>
          ${a.note ? `<p class="note reveal">${esc(a.note)}</p>` : ""}
          <div class="actions reveal">
            ${"download" in a.links ? linkBtn(a.links.download, "İndir (DMG)", true) : linkBtn(a.links.appStore, "App Store", true)}
            ${a.links.support ? linkBtn(a.links.support, "Destek") : ""}
            ${a.links.privacy ? linkBtn(a.links.privacy, "Gizlilik") : ""}
          </div>
        </div>
        ${visualFor(a)}
      </div>
      <div class="features">
        ${a.features.map((f, j) => `<div class="feature reveal" style="--d:${(j % 3) * 0.07}s"><b>${esc(f.t)}</b><p>${esc(f.d)}</p></div>`).join("")}
      </div>
    </section>`
  ).join("");

  $("#roadmap").innerHTML = ROADMAP.map(
    (r, i) => `
    <${r.href ? `a href="${r.href}"` : "div"} class="soon reveal tilt" style="--d:${i * 0.08}s">
      <div class="q">${r.href ? "+" : "?"}</div>
      <h3>${esc(r.name)}</h3>
      <p>${esc(r.desc)}</p>
      <div class="row"><span class="status">${esc(r.status)}</span><span class="chip">${esc(r.platform)}</span></div>
    </${r.href ? "a" : "div"}>`
  ).join("");

  /* ---------- background: particle network ---------- */
  const canvas = $("#bg");
  const ctx = canvas.getContext("2d");
  let W, H, DPR, pts = [];
  const mouse = { x: -9999, y: -9999 };
  const colors = ["90,180,255", "139,123,255", "34,211,238"];

  function resize() {
    DPR = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const n = Math.round(Math.min(110, (W * H) / 16000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 0.4, c: colors[(Math.random() * colors.length) | 0]
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    const link = 130;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      const mdx = p.x - mouse.x, mdy = p.y - mouse.y, md = Math.hypot(mdx, mdy);
      if (md < 160) { p.x += (mdx / md) * 1.2; p.y += (mdy / md) * 1.2; }
      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < link) {
          ctx.strokeStyle = `rgba(${p.c},${(1 - d / link) * 0.22})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
      ctx.fillStyle = `rgba(${p.c},0.8)`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    }
    if (!reduced) requestAnimationFrame(draw);
  }
  resize(); draw();
  addEventListener("resize", resize);

  /* ---------- cursor glow ---------- */
  const glow = $(".cursor-glow");
  if (finePointer) {
    addEventListener("pointermove", (e) => {
      mouse.x = e.clientX; mouse.y = e.clientY;
      glow.style.setProperty("--mx", e.clientX + "px");
      glow.style.setProperty("--my", e.clientY + "px");
    }, { passive: true });
  } else glow.style.display = "none";

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach((el) => io.observe(el));
  $$(".hero .reveal").forEach((el, i) => el.style.setProperty("--d", i * 0.12 + "s"));

  /* ---------- text scramble ---------- */
  const glyphs = "!<>-_\\/[]{}—=+*^?#ÇĞİÖŞÜ01";
  $$(".scramble").forEach((el) => {
    if (reduced) return;
    const final = el.dataset.text;
    let frame = 0;
    const queue = [...final].map((ch, i) => ({ ch, start: (Math.random() * 20) | 0, end: 20 + i * 1.6 + ((Math.random() * 14) | 0) }));
    (function tick() {
      let out = "", done = 0;
      queue.forEach((q) => {
        if (frame >= q.end || q.ch === " ") { out += q.ch; done++; }
        else if (frame >= q.start) out += `<span style="color:var(--c2);opacity:.7">${esc(glyphs[(Math.random() * glyphs.length) | 0])}</span>`;
        else out += "&nbsp;";
      });
      el.innerHTML = out;
      frame++;
      if (done < queue.length) requestAnimationFrame(tick);
    })();
  });

  /* ---------- counters ---------- */
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, to = +el.dataset.count, suf = el.dataset.suffix || "", t0 = performance.now(), dur = 1600;
      (function step(t) {
        const k = Math.min(1, (t - t0) / dur), v = Math.round(to * (1 - Math.pow(1 - k, 3)));
        el.textContent = v + suf;
        if (k < 1) requestAnimationFrame(step);
      })(t0);
      cio.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => cio.observe(el));

  /* ---------- tilt + spotlight ---------- */
  if (finePointer && !reduced) {
    $$(".tilt").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 10}deg) rotateY(${(x - 0.5) * 12}deg) translateY(-4px)`;
        el.style.setProperty("--px", x * 100 + "%");
        el.style.setProperty("--py", y * 100 + "%");
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
    $$(".tilt-soft").forEach((el) => {
      const host = el.closest(".app");
      host.addEventListener("pointermove", (e) => {
        const r = host.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--ry", -8 + x * 10 + "deg");
        el.style.setProperty("--rx", 4 - y * 8 + "deg");
      });
    });

    /* magnetic buttons */
    $$(".magnetic").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      });
      b.addEventListener("pointerleave", () => { b.style.transform = ""; });
    });
  }

  /* ---------- nav: hide on scroll down, highlight section ---------- */
  const nav = $("#nav");
  let lastY = scrollY;
  addEventListener("scroll", () => {
    const y = scrollY;
    nav.classList.toggle("hidden", y > lastY && y > 300);
    lastY = y;
  }, { passive: true });
  const navMap = new Map($$("#navLinks a").map((a) => [a.getAttribute("href").slice(1), a]));
  const sio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const a = navMap.get(e.target.id);
      if (a) a.classList.toggle("active", e.isIntersecting);
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  navMap.forEach((_, id) => { const s = document.getElementById(id); if (s) sio.observe(s); });

  /* ---------- carousels ---------- */
  $$(".carousel").forEach((c) => {
    const screens = $$("[data-slides]", c), dots = $$(".dots button", c);
    const n = $$("img", screens[screens.length - 1]).length;
    let idx = 0, timer;
    const show = (i) => {
      idx = (i + n) % n;
      screens.forEach((s) => {
        const imgs = $$("img", s), off = +(s.dataset.offset || 0);
        imgs.forEach((im, k) => im.classList.toggle("on", k === (idx + off) % imgs.length));
      });
      dots.forEach((d, k) => d.classList.toggle("on", k === idx));
    };
    const start = () => { if (!reduced) { clearInterval(timer); timer = setInterval(() => show(idx + 1), 3200); } };
    dots.forEach((d, k) => d.addEventListener("click", () => { show(k); start(); }));
    c.addEventListener("pointerenter", () => clearInterval(timer));
    c.addEventListener("pointerleave", start);
    start();
  });

  /* ---------- lightbox ---------- */
  const lb = $("#lightbox"), lbImg = $("img", lb);
  let lbList = [], lbIdx = 0;
  const lbShow = (i) => { lbIdx = (i + lbList.length) % lbList.length; lbImg.src = lbList[lbIdx]; };
  const lbClose = () => lb.classList.remove("open");
  document.addEventListener("click", (e) => {
    const img = e.target.closest("[data-slides] img");
    if (!img) return;
    const screen = img.parentElement;
    lbList = $$("img", screen).map((i) => i.getAttribute("src"));
    lbShow($$("img", screen).findIndex((i) => i.classList.contains("on")));
    lb.classList.add("open");
  });
  $(".lb-close", lb).addEventListener("click", lbClose);
  $(".lb-prev", lb).addEventListener("click", () => lbShow(lbIdx - 1));
  $(".lb-next", lb).addEventListener("click", () => lbShow(lbIdx + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) lbClose(); });
  addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") lbClose();
    if (e.key === "ArrowLeft") lbShow(lbIdx - 1);
    if (e.key === "ArrowRight") lbShow(lbIdx + 1);
  });

  /* ---------- EYConsol terminal animation ---------- */
  const scripts = {
    ssh: [
      ["p", "ercan@mac ~ % "], ["t", "ssh admin@sw01"],
      ["o", "\n", 300], ["d", "Connected to sw01 (ED25519)\n"],
      ["d", "Şifre Keychain'den girildi ✓\n\n", 400],
      ["p", "sw01# "], ["t", "show int status"],
      ["o", "\n", 300],
      ["o", "Gi1/0/1   uplink  connected  1G\n"],
      ["o", "Gi1/0/12  ap-2    connected  1G\n"],
      ["o", "Gi1/0/24  nas-01  connected  10G\n\n", 600],
      ["p", "sw01# "], ["t", "write memory"],
      ["o", "\n", 200], ["g", "Building configuration...\n[OK]\n\n", 900]
    ],
    serial: [
      ["d", "— cu.usbserial · 9600 8N1 —\n\n", 500],
      ["o", "\n", 200], ["p", "Router> "], ["t", "enable"], ["o", "\n", 200],
      ["p", "Router# "], ["t", "show version | i up"], ["o", "\n", 300],
      ["o", "uptime is 41 weeks, 3 days\n\n", 500],
      ["p", "Router# "], ["t", "ping 10.0.0.1"], ["o", "\n", 300],
      ["o", "Sending 5 ICMP Echos:\n"], ["g", "!!!!!\n", 500],
      ["o", "Success rate 100% (5/5)\n\n", 1200]
    ]
  };
  function runTerm(el, script) {
    let html = "";
    const caret = '<span class="caret"></span>';
    const render = () => { el.innerHTML = html + caret; el.scrollTop = el.scrollHeight; };
    async function loop() {
      for (;;) {
        html = "";
        for (const [cls, text, pause = 0] of script) {
          if (cls === "t") {
            for (const ch of text) { html += esc(ch); render(); await wait(45 + Math.random() * 70); }
            await wait(250);
          } else {
            html += `<span class="${cls}">${esc(text)}</span>`;
            render();
            await wait(pause || 60);
          }
        }
        await wait(1800);
      }
    }
    if (reduced) { html = script.map(([c, t]) => (c === "t" ? esc(t) : `<span class="${c}">${esc(t)}</span>`)).join(""); render(); return; }
    loop();
  }
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const tio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      runTerm(e.target, scripts[e.target.dataset.term]);
      tio.unobserve(e.target);
    });
  }, { threshold: 0.3 });
  $$("[data-term]").forEach((el) => tio.observe(el));
})();
