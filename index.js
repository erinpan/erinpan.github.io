/* ============================================================
   animations.js v3 — Portfolio for 潘佳音
   Inspired by eugenewan.art
   Add <script src="animations.js"></script> before </body>
   ============================================================ */

/* ----------------------------------------------------------
   GLOBAL STYLES
   ---------------------------------------------------------- */
   (function injectStyles() {
    const s = document.createElement("style");
    s.textContent = `
      /* --- Custom cursor (minimal dot, like eugenewan.art) --- */
      *, *::before, *::after { cursor: none !important; }
  
      #erin-cursor {
        position: fixed;
        width: 10px; height: 10px;
        background: #E9A5D2;
        border-radius: 50%;
        pointer-events: none;
        z-index: 99999;
        transform: translate(-50%, -50%);
        transition: width 0.2s ease, height 0.2s ease, background 0.2s ease, opacity 0.2s ease;
        mix-blend-mode: multiply;
      }
      #erin-cursor.hovering {
        width: 40px; height: 40px;
        background: rgba(233,165,210,0.25);
        border: 1.5px solid #E9A5D2;
      }
      #erin-cursor.clicking { transform: translate(-50%,-50%) scale(0.7); }
  
      /* --- Scroll progress bar --- */
      #scroll-prog {
        position: fixed; top: 0; left: 0; z-index: 99998;
        height: 2.5px; width: 0%;
        background: linear-gradient(90deg, #E9A5D2 0%, #FDAD0E 50%, #82E600 100%);
        pointer-events: none;
        transition: width 0.07s linear;
      }
  
      /* --- Page-load fade-in --- */
      body { opacity: 0; transition: opacity 0.6s ease; }
      body.page-ready { opacity: 1; }
  
      /* --- Clip-mask text reveal (eugenewan style) --- */
      .clip-reveal {
      overflow: hidden;
      display: inline-block;
    }
      .clip-reveal-inner {
        display: block;
        transform: translateY(105%);
        transition: transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .clip-reveal-inner.revealed {
        transform: translateY(0%);
      }
  
      /* --- Infinite marquee strip --- */
      #erin-marquee {
        overflow: hidden;
        width: 100%;
        padding: 18px 0;
        margin: 8px 0 32px;
        position: relative;
      }
      #erin-marquee::before,
      #erin-marquee::after {
        content: '';
        position: absolute;
        top: 0; bottom: 0;
        width: 80px;
        z-index: 2;
        pointer-events: none;
      }
      #erin-marquee::before { left: 0;  background: linear-gradient(to right,  #FFF4FB, transparent); }
      #erin-marquee::after  { right: 0; background: linear-gradient(to left, #FFF4FB, transparent); }
      .marquee-track {
        display: flex;
        gap: 16px;
        width: max-content;
        animation: marqueeScroll 28s linear infinite;
      }
      #erin-marquee:hover .marquee-track { animation-play-state: paused; }
      @keyframes marqueeScroll {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      .marquee-tag {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 7px 18px;
        border: 1.5px solid rgba(233,165,210,0.55);
        border-radius: 999px;
        white-space: nowrap;
        font-size: 15px;
        color: #000;
        background: rgba(233,165,210,0.08);
        transition: background 0.2s ease, border-color 0.2s ease;
      }
      .marquee-tag:hover {
        background: rgba(233,165,210,0.22);
        border-color: #E9A5D2;
      }
      .marquee-dot {
        width: 7px; height: 7px;
        border-radius: 50%;
        flex-shrink: 0;
      }
  
      /* --- Hover image preview on exp rows (eugenewan list hover) --- */
      #hover-preview {
        position: fixed;
        pointer-events: none;
        z-index: 9990;
        width: 200px;
        border-radius: 12px;
        overflow: hidden;
        opacity: 0;
        transform: scale(0.88) rotate(-3deg);
        transition: opacity 0.25s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1);
        box-shadow: 0 12px 36px rgba(0,0,0,0.12);
      }
      #hover-preview.active {
        opacity: 1;
        transform: scale(1) rotate(-1.5deg);
      }
      #hover-preview img { width: 100%; display: block; border-radius: 12px; }
  
      /* --- Nav float bob --- */
      @keyframes floatBob {
        0%,100% { transform: translateY(0); }
        50%      { transform: translateY(-6px); }
      }
      .nav-item img { animation: floatBob 2.4s ease-in-out infinite; }
      .nav-item:nth-child(2) img { animation-delay: 0.35s; }
      .nav-item:nth-child(3) img { animation-delay: 0.7s; }
      .nav-item:hover img { animation-play-state: paused; }
  
      /* --- Sparkle keyframe --- */
      @keyframes sparkUp {
        0%   { opacity: 1; transform: translate(-50%,-50%) scale(1) rotate(0deg); }
        100% { opacity: 0; transform: translate(-50%, calc(-50% - 28px)) scale(0.15) rotate(35deg); }
      }
  
      /* --- Exp row accent --- */
      .exp-row {
        border-left: 3px solid transparent;
        padding-left: 12px;
        transition: border-color 0.3s ease, padding-left 0.3s ease;
      }
      .exp-row.visible:hover {
        border-left-color: #E9A5D2;
        padding-left: 20px;
      }
  
      /* --- Staggered exp rows --- */
      .exp-row { transition-delay: var(--exp-delay, 0ms); }
  
      /* --- Typewriter blink --- */
      @keyframes twBlink { 0%,100%{opacity:1} 50%{opacity:0} }
      .tw-cursor {
        display: inline-block;
        width: 2px; height: 0.85em;
        background: #E9A5D2;
        margin-left: 3px;
        vertical-align: middle;
        animation: twBlink 0.9s step-end infinite;
      }
  
      /* --- Footer link underline --- */
      .footer-link { position: relative; }
      .footer-link::after {
        content: '';
        position: absolute; bottom: -1px; left: 0;
        width: 0; height: 1.5px;
        background: #E9A5D2;
        transition: width 0.3s ease;
      }
      .footer-link:hover::after { width: 100%; }
  
      /* --- Magnetic nav --- */
      .nav-item { transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94); }
  
      /* --- Smooth scroll --- */
      html { scroll-behavior: smooth; }
  
      /* --- Section title reveal --- */
      .section-title {
        opacity: 0;
        transform: translateX(-20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      .section-title.title-visible {
        opacity: 1;
        transform: translateX(0);
      }
  
      /* --- Slide btn ripple --- */
      .slide-btn { position: relative; overflow: hidden; }
      .slide-btn::after {
        content: '';
        position: absolute;
        width: 0; height: 0;
        border-radius: 50%;
        background: rgba(255,255,255,0.3);
        top: 50%; left: 50%;
        transform: translate(-50%,-50%);
        transition: width 0.45s ease, height 0.45s ease, opacity 0.4s ease;
        opacity: 0;
      }
      .slide-btn:active::after {
        width: 200px; height: 200px; opacity: 1; transition: 0s;
      }
  
      /* --- 3D tilt --- */
      .carousel-slide { will-change: transform; }
  
      /* --- About photo hover --- */
      .about-photo.visible:hover {
        transform: rotate(-2deg) scale(1.05) !important;
        transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1) !important;
      }
    `;
    document.head.appendChild(s);
  })();
  
  
  /* ----------------------------------------------------------
     1. PAGE LOAD FADE-IN
     ---------------------------------------------------------- */
  window.addEventListener("load", () => {
    document.body.classList.add("page-ready");
  });
  
  
  /* ----------------------------------------------------------
     2. CUSTOM CURSOR (minimal dot, eugenewan style)
     ---------------------------------------------------------- */
  (function () {
    const cursor = document.createElement("div");
    cursor.id = "erin-cursor";
    document.body.appendChild(cursor);
  
    let cx = -100, cy = -100;
    document.addEventListener("mousemove", e => {
      cx = e.clientX; cy = e.clientY;
      cursor.style.left = cx + "px";
      cursor.style.top  = cy + "px";
    });
  
    const hoverSel = "a, button, .carousel-arrow, .nav-item, .slide-btn, .about-photo, .exp-row, .footer-link, .pegboard-card";
    document.querySelectorAll(hoverSel).forEach(el => {
      el.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("hovering"));
    });
    document.addEventListener("mousedown", () => cursor.classList.add("clicking"));
    document.addEventListener("mouseup",   () => cursor.classList.remove("clicking"));
  })();
  

  
  /* ----------------------------------------------------------
     4. TYPEWRITER — "Hello!" on load
     ---------------------------------------------------------- */
  (function () {
    const el = document.querySelector(".intro-hello");
  if (!el) return;
  el.textContent = "";
  el.style.minHeight = "1.2em";
  const cursor = document.createElement("span");
  cursor.className = "tw-cursor";
  el.appendChild(cursor);

  const phrase1 = "Hello!";
  const phrase2 = "你好!";

  function setContent(text) {
    el.textContent = text;
    el.appendChild(cursor);
  }

  function typeForward(text, cb) {
    let i = 0;
    function tick() {
      setContent(text.slice(0, i));
      i++;
      if (i <= text.length) setTimeout(tick, 85);
      else cb && setTimeout(cb, 600);
    }
    setTimeout(tick, 350);
  }

  function typeBackspace(text, cb) {
    let i = text.length;
    function tick() {
      setContent(text.slice(0, i));
      i--;
      if (i >= 0) setTimeout(tick, 55);
      else cb && setTimeout(cb, 200);
    }
    tick();
  }

  typeForward(phrase1, () => {
    typeBackspace(phrase1, () => {
      typeForward(phrase2, () => {
        typeBackspace(phrase2, () => {
          typeForward(phrase1, () => {
            setTimeout(() => cursor.remove(), 2000);
          });
        });
      });
    });
  });
  })();
  
  
  /* ----------------------------------------------------------
     5. CLIP-MASK TEXT REVEAL (eugenewan.art style)
        Wraps .section-subtitle and .intro-body words in clip masks
     ---------------------------------------------------------- */
  (function () {
    const targets = document.querySelectorAll(".section-subtitle, .intro-body");
    targets.forEach(el => {
      // Build word-wrapped HTML preserving inner <span> tags
      const children = Array.from(el.childNodes);
      el.innerHTML = "";
      children.forEach(node => {
        if (node.nodeType === 3) { // text node
          node.textContent.split(/(\s+)/).forEach(part => {
            if (!part.trim()) { el.appendChild(document.createTextNode(" ")); return; }
            const wrap  = document.createElement("span");
            const inner = document.createElement("span");
            wrap.className  = "clip-reveal";
            inner.className = "clip-reveal-inner";
            inner.textContent = part;
            wrap.appendChild(inner);
            el.appendChild(wrap);
            el.appendChild(document.createTextNode(" "));
          });
        } else {
          // preserve styled spans like .design .tech .modeling
          const wrap  = document.createElement("span");
          const inner = document.createElement("span");
          wrap.className  = "clip-reveal";
          inner.className = "clip-reveal-inner";
          inner.appendChild(node.cloneNode(true));
          wrap.appendChild(inner);
          el.appendChild(wrap);
          el.appendChild(document.createTextNode(" "));
        }
      });
    });
  
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const inners = entry.target.querySelectorAll(".clip-reveal-inner");
        inners.forEach((inn, i) => {
          setTimeout(() => inn.classList.add("revealed"), i * 40);
        });
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
  
    targets.forEach(el => obs.observe(el));
  })();
  
  
  /* ----------------------------------------------------------
     6. INFINITE MARQUEE STRIP — skills/tools ticker
        Inserted above the carousel in #work section
     ---------------------------------------------------------- */
  (function () {
    const worksSection = document.querySelector(".recent-works");
    if (!worksSection) return;
  
    const tags = [
      { label: "Figma",         color: "#E9A5D2" },
      { label: "Python",        color: "#FDAD0E" },
      { label: "SQL",           color: "#82E600" },
      { label: "SolidWorks",    color: "#E9A5D2" },
      { label: "OnShape",       color: "#FDAD0E" },
      { label: "Product Design",color: "#82E600" },
      { label: "Data Analysis", color: "#E9A5D2" },
      { label: "ML / AI",       color: "#FDAD0E" },
      { label: "CAD / 3D",      color: "#82E600" },
      { label: "UX Research",   color: "#E9A5D2" },
      { label: "A/B Testing",   color: "#FDAD0E" },
      { label: "Operations",    color: "#82E600" },
    ];
  
    // Duplicate for seamless loop
    const allTags = [...tags, ...tags];
  
    const marqueeEl = document.createElement("div");
    marqueeEl.id = "erin-marquee";
  
    const track = document.createElement("div");
    track.className = "marquee-track";
  
    allTags.forEach(tag => {
      const pill = document.createElement("div");
      pill.className = "marquee-tag";
      pill.innerHTML = `<span class="marquee-dot" style="background:${tag.color}"></span>${tag.label}`;
      track.appendChild(pill);
    });
  
    marqueeEl.appendChild(track);
  
    // Insert between subtitle and carousel wrapper
    const carousel = worksSection.querySelector(".carousel-wrapper");
    if (carousel) {
      worksSection.insertBefore(marqueeEl, carousel);
    } else {
      worksSection.appendChild(marqueeEl);
    }
  })();
  
  /* ----------------------------------------------------------
     8. SPARKLE TRAIL (throttled by distance)
     ---------------------------------------------------------- */
  (function () {
    const glyphs  = ["★", "✦", "·", "✿", "❋"];
    const palette = ["#E9A5D2", "#FDAD0E", "#82E600", "#d4a6ff"];
    let lastX = 0, lastY = 0;
  
    document.addEventListener("mousemove", e => {
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist < 22) return;
      lastX = e.clientX; lastY = e.clientY;
      const span = document.createElement("span");
      span.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
      Object.assign(span.style, {
        position:      "fixed",
        left:          e.clientX + "px",
        top:           e.clientY + "px",
        fontSize:      (10 + Math.random() * 12) + "px",
        color:         palette[Math.floor(Math.random() * palette.length)],
        pointerEvents: "none",
        zIndex:        "9985",
        userSelect:    "none",
        lineHeight:    "1",
        animation:     "sparkUp 0.65s ease forwards",
      });
      document.body.appendChild(span);
      setTimeout(() => span.remove(), 700);
    });
  })();
  
  
  /* ----------------------------------------------------------
     9. MAGNETIC NAV
     ---------------------------------------------------------- */
  (function () {
    document.querySelectorAll(".nav-item").forEach(item => {
      item.addEventListener("mousemove", e => {
        const r  = item.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width  / 2)) * 0.28;
        const dy = (e.clientY - (r.top  + r.height / 2)) * 0.28;
        item.style.transform = `translate(${dx}px,${dy}px)`;
        item.style.transition = "transform 0.08s linear";
      });
      item.addEventListener("mouseleave", () => {
        item.style.transform = "translate(0,0)";
        item.style.transition = "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)";
      });
    });
  })();
  
  
  /* ----------------------------------------------------------
     10. TEXT SCRAMBLE on nav labels
     ---------------------------------------------------------- */
  (function () {
    const chars = "abcdefghijklmnopqrstuvwxyz";
  function scramble(el) {
    const orig = el.dataset.orig || el.textContent;
    el.dataset.orig = orig;
    // Lock width so layout never shifts
    el.style.display = "inline-block";
    el.style.minWidth = el.offsetWidth + "px";
    let f = 0;
    const tot = 12;
    const id = setInterval(() => {
      el.textContent = orig.split("").map((ch, i) => {
        if (ch === " " || ch === "." || ch === "!") return ch;
        return f / tot > i / orig.length ? ch : chars[Math.floor(Math.random() * chars.length)];
      }).join("");
      if (++f > tot) { el.textContent = orig; clearInterval(id); }
    }, 38);
  }
  document.querySelectorAll(".section-title, .intro-hello, .slide-title").forEach(el => {
    el.addEventListener("mouseenter", () => scramble(el));
  });
  })();
  
  
  
  /* ----------------------------------------------------------
     12. STAGGERED EXP ROWS + SECTION TITLE REVEAL
     ---------------------------------------------------------- */
  (function () {
    // Stagger delays
    document.querySelectorAll(".exp-row").forEach((row, i) => {
      row.style.setProperty("--exp-delay", `${i * 90}ms`);
    });
  
    // Section title slide-in
    const titleObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("title-visible");
          titleObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll(".section-title").forEach(t => titleObs.observe(t));
  })();

  
  /* ----------------------------------------------------------
     15. SMOOTH SCROLL for anchor links
     ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
    });
  });
