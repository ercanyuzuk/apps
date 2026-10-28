(() => {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* old one-page anchors (/#eyconsol) now live on their own pages */
  if (location.hash) {
    const page = $(`.cards a[href="/${CSS.escape(location.hash.slice(1))}/"]`);
    if (page) { location.replace(page.href); return; }
  }

  $("#year").textContent = new Date().getFullYear();

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
      const host = el.closest(".app") || el.parentElement;
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

  /* ---------- nav: hide on scroll down ---------- */
  const nav = $("#nav");
  let lastY = scrollY;
  addEventListener("scroll", () => {
    const y = scrollY;
    nav.classList.toggle("hidden", y > lastY && y > 300);
    lastY = y;
  }, { passive: true });

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

  /* ---------- copy checksum ---------- */
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-copy]");
    if (!b) return;
    navigator.clipboard?.writeText(b.dataset.copy).then(() => {
      b.textContent = "Kopyalandı ✓";
      setTimeout(() => (b.textContent = "Kopyala"), 1600);
    });
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

  /* ---------- EYFlash window: running TFTP transfer ---------- */
  $$("[data-flash]").forEach((win) => {
    if (reduced) return;
    const st = $("[data-flash-st]", win), total = 1229;
    let done = 452;
    setInterval(() => {
      if (document.hidden) return;
      const speed = 10.5 + Math.random() * 3;
      done = done >= total ? 0 : Math.min(total, done + speed * 1.2);
      const pct = Math.round((done / total) * 100);
      win.style.setProperty("--p", pct + "%");
      st.textContent = done >= total
        ? "Tamamlandı · 1,2 GB · 1 dk 44 sn"
        : `${Math.round(done)} MB / 1,2 GB · %${pct} · ${speed.toFixed(1).replace(".", ",")} MB/sn`;
    }, 1200);
  });

  /* ---------- EYCleaner window: live meters ---------- */
  $$("[data-cleaner]").forEach((win) => {
    if (reduced) return;
    const meters = $$(".cl-m", win), score = $("[data-score]", win);
    const base = meters.map((m) => parseInt($("em", m).textContent, 10));
    setInterval(() => {
      if (document.hidden) return;
      let load = 0;
      meters.forEach((m, k) => {
        const swing = k === 2 ? 1 : k === 1 ? 6 : 14; // disk barely moves, CPU/network jump around
        const v = Math.max(3, Math.min(97, base[k] + Math.round((Math.random() - 0.5) * 2 * swing)));
        $("i", m).style.setProperty("--v", v + "%");
        $("em", m).textContent = v + "%";
        load += v;
      });
      const s = Math.round(100 - load / meters.length / 4);
      score.textContent = s;
      win.style.setProperty("--score", s);
    }, 1800);
  });
})();
