/* B-VI — bureau, fenêtres, visionneuse et animations. Aucune dépendance. */
(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const rand = (a, b) => a + Math.random() * (b - a);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = () => innerWidth <= 768;
  const footerH = () => $("#footer").offsetHeight || 52;
  const A = "assets/";

  /* ---------- Index des nœuds ---------- */
  let uid = 0;
  const walk = (nodes) => nodes.forEach((n) => { n.id = "w" + uid++; if (n.children) walk(n.children); });
  walk(SITE);
  CONTACT.id = "w-contact";
  CONTACT.isContact = true;

  /* ---------- Fond : spotlight qui suit le curseur ---------- */
  let spotRaf = 0;
  addEventListener("pointermove", (e) => {
    if (spotRaf) return;
    spotRaf = requestAnimationFrame(() => {
      document.documentElement.style.setProperty("--mx", e.clientX + "px");
      document.documentElement.style.setProperty("--my", e.clientY + "px");
      spotRaf = 0;
    });
  });

  /* ---------- Bureau ---------- */
  const desktop = $("#desktop");
  const makeIcon = (node, icon) => {
    const f = el("div", "folder folder-item");
    f.tabIndex = 0;
    f.setAttribute("role", "button");
    f.innerHTML = `<img src="${A}${icon}" alt="" /><h2>${esc(node.name)}</h2>`;
    const open = () => {
      document.querySelectorAll(".folder.selected").forEach((x) => x.classList.remove("selected"));
      f.classList.add("selected");
      openWindow(node, f.querySelector("img"));
    };
    f.addEventListener("click", open);
    f.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    return f;
  };
  SITE.forEach((n) => desktop.append(makeIcon(n, "dossier.png")));
  desktop.append(makeIcon(CONTACT, "ordi.png"));
  desktop.addEventListener("pointerdown", (e) => {
    if (e.target === desktop) document.querySelectorAll(".folder.selected").forEach((x) => x.classList.remove("selected"));
  });

  /* ---------- Fenêtres ---------- */
  const wins = new Map();
  const layer = $("#windows");
  const tabs = $("#tabs");
  let z = 100;
  let cascade = 0;

  const genie = (win, fromRect, reverse = false, duration = 480) => {
    const r = win.getBoundingClientRect();
    if (!fromRect || reduced) return Promise.resolve();
    const dx = fromRect.left + fromRect.width / 2 - (r.left + r.width / 2);
    const dy = fromRect.top + fromRect.height / 2 - (r.top + r.height / 2);
    const s = Math.max(0.04, fromRect.width / r.width);
    const small = { transform: `translate(${dx}px, ${dy}px) scale(${s})`, opacity: 0, filter: "blur(6px)" };
    const big = { transform: "translate(0,0) scale(1)", opacity: 1, filter: "blur(0)" };
    const a = win.animate(reverse ? [big, small] : [small, big], {
      duration,
      easing: reverse ? "cubic-bezier(.55,0,.75,.3)" : "cubic-bezier(.2,1.1,.3,1)",
      fill: reverse ? "forwards" : "none",
    });
    return a.finished.then(() => { if (reverse) a.cancel(); }).catch(() => {});
  };

  function focusWin(id) {
    const w = wins.get(id);
    if (!w) return;
    w.el.style.zIndex = ++z;
    wins.forEach((o, k) => {
      const on = k === id;
      o.el.classList.toggle("active-w", on);
      o.el.classList.toggle("unactive-w", !on);
      o.tab.classList.toggle("activeFF", on && !o.min);
    });
    w.tab.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduced ? "auto" : "smooth" });
  }

  function openWindow(node, originEl) {
    const existing = wins.get(node.id);
    if (existing) {
      if (existing.min) restore(node.id);
      else {
        focusWin(node.id);
        if (!reduced) existing.el.animate(
          [{ transform: "scale(1)" }, { transform: "scale(1.025)" }, { transform: "scale(0.99)" }, { transform: "scale(1)" }],
          { duration: 380, easing: "ease-out" }
        );
      }
      return;
    }

    const win = el("section", "windows active-w" + (node.isContact ? " contactW" : ""));
    win.setAttribute("aria-label", node.name);
    const icon = node.isContact ? "contact-small.png" : "dossier-ouvert-black.png";
    win.innerHTML = `
      <div class="window-header">
        <div class="header-left"><img class="${node.isContact ? "contact" : ""}" src="${A}${icon}" alt="" /><p>${esc(node.name)}</p></div>
        <div class="header-right">
          <button class="min" aria-label="Réduire"><img src="${A}window-noir-reduire.png" alt="" /></button>
          <button class="fs" aria-label="Plein écran"><img src="${A}window-noir-fullscreen.png" alt="" /></button>
          <button class="close" aria-label="Fermer"><img src="${A}window-noir-close.png" alt="" /></button>
        </div>
      </div>
      <div class="window-content${node.isContact ? " contact" : ""}"></div>
      <div class="resize-handle"></div>`;
    const content = $(".window-content", win);

    // Taille & position (comme l'original : position aléatoire, en cascade)
    const vw = innerWidth, vh = innerHeight - footerH();
    const w = Math.min(800, vw - 20);
    const h = Math.min(node.isContact ? 550 : 400, vh - 20);
    const left = clamp(rand(20, 300) + (cascade % 6) * 28, 10, Math.max(10, vw - w - 10));
    const top = clamp(rand(110, 190) + (cascade % 6) * 22, 10, Math.max(10, vh - h - 10));
    cascade++;
    Object.assign(win.style, { width: w + "px", height: h + "px", left: left + "px", top: top + "px" });
    layer.append(win);

    // Onglet dans la barre des tâches
    const tab = el("div", "folder-footer");
    tab.innerHTML = `<img src="${A}${node.isContact ? "contact-small.png" : "dossier-ouvert.png"}" alt="" /><span>${esc(node.name)}</span>`;
    tabs.append(tab);

    const state = { el: win, tab, node, min: false };
    wins.set(node.id, state);
    focusWin(node.id);

    // Contenu
    if (node.isContact) renderContact(content);
    else renderFolder(node, content, win);

    // Contrôles
    $(".min", win).addEventListener("click", (e) => { e.stopPropagation(); minimize(node.id); });
    $(".fs", win).addEventListener("click", (e) => { e.stopPropagation(); toggleFs(win); });
    $(".close", win).addEventListener("click", (e) => { e.stopPropagation(); closeWin(node.id); });
    $(".window-header", win).addEventListener("dblclick", (e) => { if (!e.target.closest("button")) toggleFs(win); });
    win.addEventListener("pointerdown", () => focusWin(node.id));
    tab.addEventListener("click", () => {
      if (state.min) restore(node.id);
      else if (win.classList.contains("active-w")) minimize(node.id);
      else focusWin(node.id);
    });
    makeDraggable(win);
    makeResizable(win);

    genie(win, originEl && originEl.getBoundingClientRect());
  }

  function renderFolder(node, content, win) {
    const left = el("div", "left-content");
    content.append(left);
    let i = 0;
    (node.items || []).forEach((it, idx) => {
      const card = el("div", "imgPlusTitle");
      card.style.setProperty("--d", 0.18 + i++ * 0.045 + "s");
      card.innerHTML = `<div class="thumb"><img alt="${esc(it.title || node.name)}" loading="lazy" decoding="async" /></div>${it.title ? `<h2>${esc(it.title)}</h2>` : ""}`;
      const im = $("img", card);
      const th = $(".thumb", card);
      im.onload = () => th.classList.add("loaded");
      im.onerror = () => { th.classList.add("loaded"); };
      im.src = it.src;
      card.addEventListener("click", () => openLightbox(node, idx, im));
      left.append(card);
    });
    (node.children || []).forEach((child) => {
      const f = el("div", "foldersInW folder-item");
      f.style.setProperty("--d", 0.18 + i++ * 0.05 + "s");
      f.innerHTML = `<img src="${A}dossier.png" alt="" /><h2>${esc(child.name)}</h2>`;
      f.addEventListener("click", () => openWindow(child, $("img", f)));
      left.append(f);
    });
    requestAnimationFrame(() => left.querySelectorAll(".imgPlusTitle, .foldersInW").forEach((c) => c.classList.add("in")));

    if (node.desc) {
      const right = el("div", "right-content");
      const h3 = el("h3");
      right.append(h3);
      content.append(right);
      typewrite(h3, node.desc, 250);
    }
  }

  function renderContact(content) {
    let d = 0.15;
    CONTACT.lines.forEach((l) => {
      let node;
      if (l.gap) node = el("br");
      else if (l.small != null) {
        node = el("h4");
        node.append(document.createTextNode(l.small));
        (l.links || []).forEach(([t, h], k) => {
          if (k) node.append(" - ");
          const a = el("a"); a.href = h; a.target = "_blank"; a.rel = "noopener"; a.textContent = t; node.append(a);
        });
      } else {
        node = el("h2");
        node.append(document.createTextNode(l.big));
        if (l.link) {
          const a = el("a"); a.href = l.href; a.textContent = l.link;
          if (!l.href.startsWith("mailto")) { a.target = "_blank"; a.rel = "noopener"; }
          node.append(a);
        }
      }
      if (node.tagName !== "BR") { node.classList.add("line-in"); node.style.setProperty("--d", (d += 0.07) + "s"); }
      content.append(node);
    });
  }

  function typewrite(target, text, delay = 0) {
    if (reduced) { target.textContent = text; return; }
    const caret = el("span", "caret");
    const tn = document.createTextNode("");
    target.append(tn, caret);
    const total = clamp(text.length * 9, 400, 1400);
    let start = 0;
    const step = (t) => {
      if (!start) start = t;
      const p = clamp((t - start) / total, 0, 1);
      tn.data = text.slice(0, Math.round(p * text.length));
      if (p < 1) requestAnimationFrame(step);
      else setTimeout(() => caret.remove(), 900);
    };
    setTimeout(() => requestAnimationFrame(step), delay);
  }

  function minimize(id, delay = 0) {
    const w = wins.get(id);
    if (!w || w.min) return;
    w.min = true;
    w.tab.classList.remove("activeFF");
    w.tab.classList.add("minim");
    setTimeout(() => {
      genie(w.el, w.tab.getBoundingClientRect(), true, 380).then(() => w.el.classList.add("minimized"));
    }, delay);
  }

  function restore(id) {
    const w = wins.get(id);
    if (!w) return;
    w.min = false;
    w.tab.classList.remove("minim");
    w.el.classList.remove("minimized");
    focusWin(id);
    genie(w.el, w.tab.getBoundingClientRect());
  }

  function closeWin(id) {
    const w = wins.get(id);
    if (!w) return;
    wins.delete(id);
    w.tab.classList.add("out");
    setTimeout(() => w.tab.remove(), reduced ? 0 : 300);
    const done = () => w.el.remove();
    if (reduced) return done();
    w.el.animate(
      [{ transform: "scale(1)", opacity: 1, filter: "blur(0)" }, { transform: "scale(0.88)", opacity: 0, filter: "blur(4px)" }],
      { duration: 260, easing: "cubic-bezier(.4,0,1,1)", fill: "forwards" }
    ).finished.then(done, done);
    // Re-focus the top-most remaining window
    let best = null, bz = -1;
    wins.forEach((o, k) => { const zz = +o.el.style.zIndex || 0; if (!o.min && zz > bz) { bz = zz; best = k; } });
    if (best) focusWin(best);
  }

  function toggleFs(win) {
    if (isMobile()) return;
    win.classList.add("anim-geom");
    win.classList.toggle("window-fullscreen");
    setTimeout(() => win.classList.remove("anim-geom"), 520);
  }

  function makeDraggable(win) {
    const header = $(".window-header", win);
    let sx, sy, ox, oy, lastX, vx = 0, dragging = false;
    header.addEventListener("pointerdown", (e) => {
      if (e.button !== 0 || e.target.closest("button") || isMobile() || win.classList.contains("window-fullscreen")) return;
      dragging = true;
      header.setPointerCapture(e.pointerId);
      sx = e.clientX; sy = e.clientY; ox = win.offsetLeft; oy = win.offsetTop; lastX = e.clientX;
      win.classList.add("dragging");
      win.style.transition = "";
    });
    header.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const maxTop = innerHeight - footerH() - 40;
      win.style.left = clamp(ox + e.clientX - sx, -win.offsetWidth + 80, innerWidth - 80) + "px";
      win.style.top = clamp(oy + e.clientY - sy, 0, maxTop) + "px";
      vx = vx * 0.7 + (e.clientX - lastX) * 0.3;
      lastX = e.clientX;
      if (!reduced) win.style.transform = `rotate(${clamp(vx * 0.35, -4, 4)}deg) scale(1.01)`;
    });
    const end = () => {
      if (!dragging) return;
      dragging = false; vx = 0;
      win.classList.remove("dragging");
      win.style.transition = "transform .6s cubic-bezier(.34,1.56,.64,1)";
      win.style.transform = "";
      setTimeout(() => (win.style.transition = ""), 600);
    };
    header.addEventListener("pointerup", end);
    header.addEventListener("pointercancel", end);
  }

  function makeResizable(win) {
    const h = $(".resize-handle", win);
    let sx, sy, sw, sh, on = false;
    h.addEventListener("pointerdown", (e) => {
      e.stopPropagation();
      on = true; h.setPointerCapture(e.pointerId);
      sx = e.clientX; sy = e.clientY; sw = win.offsetWidth; sh = win.offsetHeight;
    });
    h.addEventListener("pointermove", (e) => {
      if (!on) return;
      win.style.width = Math.max(300, sw + e.clientX - sx) + "px";
      win.style.height = Math.max(200, sh + e.clientY - sy) + "px";
    });
    h.addEventListener("pointerup", () => (on = false));
  }

  /* ---------- Visionneuse ---------- */
  const lb = $("#lightbox"), track = $("#lbTrack"), counter = $("#lbCounter");
  let lbItems = [], lbIndex = 0, lbOpen = false;

  function openLightbox(node, index) {
    lbItems = node.items;
    track.innerHTML = "";
    track.style.transition = "none";
    lbItems.forEach((it) => {
      const s = el("div", "carousel_item");
      s.innerHTML = `<img class="imgCarousel" alt="${esc(it.title || node.name)}" />${it.desc ? `<h3 class="description_img">${esc(it.desc)}</h3>` : ""}`;
      track.append(s);
    });
    const many = lbItems.length > 1;
    $("#lbPrev").style.display = $("#lbNext").style.display = many ? "" : "none";
    counter.style.display = many ? "" : "none";
    go(index, true);
    lb.classList.add("bg-active");
    lbOpen = true;
    requestAnimationFrame(() => requestAnimationFrame(() => (track.style.transition = "")));
  }

  function load(i) {
    const s = track.children[i];
    if (!s) return;
    const im = $("img", s);
    if (!im.src) {
      const ok = () => s.classList.add("ready");
      im.onload = ok; im.onerror = ok;
      im.src = lbItems[i].src;
    }
  }

  function go(i, instant) {
    const n = lbItems.length;
    lbIndex = (i + n) % n;
    [lbIndex, (lbIndex + 1) % n, (lbIndex - 1 + n) % n].forEach(load);
    if (instant) track.style.transition = "none";
    track.style.transform = `translateX(${-lbIndex * 100}%)`;
    [...track.children].forEach((c, k) => c.classList.toggle("current", k === lbIndex));
    counter.innerHTML = `<b class="tick">${lbIndex + 1}</b> / ${n}`;
  }

  function closeLightbox() {
    lb.classList.remove("bg-active");
    lbOpen = false;
  }

  $("#lbNext").addEventListener("click", () => go(lbIndex + 1));
  $("#lbPrev").addEventListener("click", () => go(lbIndex - 1));
  $("#lbClose").addEventListener("click", closeLightbox);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });

  // Swipe
  let swX = null, swDX = 0;
  track.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") { swX = e.clientX; swDX = 0; track.style.transition = "none"; } });
  track.addEventListener("pointermove", (e) => {
    if (swX == null) return;
    swDX = e.clientX - swX;
    track.style.transform = `translateX(calc(${-lbIndex * 100}% + ${swDX}px))`;
  });
  const swEnd = () => {
    if (swX == null) return;
    track.style.transition = "";
    if (Math.abs(swDX) > 50) go(lbIndex + (swDX < 0 ? 1 : -1));
    else go(lbIndex);
    swX = null;
  };
  track.addEventListener("pointerup", swEnd);
  track.addEventListener("pointercancel", swEnd);

  addEventListener("keydown", (e) => {
    if (!lbOpen) return;
    if (e.key === "ArrowRight") go(lbIndex + 1);
    else if (e.key === "ArrowLeft") go(lbIndex - 1);
    else if (e.key === "Escape") closeLightbox();
  });

  /* ---------- Barre des tâches ---------- */
  $("#b6").addEventListener("click", () => {
    let k = 0;
    [...wins.keys()].reverse().forEach((id) => minimize(id, reduced ? 0 : k++ * 70));
  });

  const clock = $("#clock");
  const tickClock = () => {
    const d = new Date();
    const p = (n) => String(n).padStart(2, "0");
    clock.innerHTML = `${p(d.getHours())}<span class="colon">:</span>${p(d.getMinutes())}`;
  };
  tickClock();
  setInterval(tickClock, 5000);

  /* ---------- Démarrage ---------- */
  function startDesktop() {
    $("#footer").classList.add("in");
    [...desktop.children].forEach((f, i) => {
      f.style.setProperty("--d", 0.1 + i * 0.08 + "s");
      f.classList.add("in");
    });
  }

  function boot() {
    const b = $("#boot");
    let seen = false;
    try { seen = sessionStorage.getItem("bvi-boot") === "1"; sessionStorage.setItem("bvi-boot", "1"); } catch (_) {}
    if (seen || reduced) { b.remove(); startDesktop(); return; }

    const bar = $("#bootBar"), txt = $("#bootText");
    const N = 14;
    for (let i = 0; i < N; i++) bar.append(el("span"));
    const word = "B-VI";
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      b.classList.add("out");
      setTimeout(() => { b.remove(); startDesktop(); }, 650);
    };
    b.addEventListener("click", finish);
    let i = 0;
    const iv = setInterval(() => {
      if (i < N) bar.children[i].classList.add("on");
      txt.textContent = word.slice(0, Math.ceil(((i + 1) / N) * word.length));
      if (++i > N) { clearInterval(iv); setTimeout(finish, 280); }
    }, 85);
  }
  boot();

  /* ---------- Économiseur d'écran (B6 qui rebondit) ---------- */
  const saver = $("#saver"), logo = $("img", saver);
  let idle, sx = 80, sy = 80, svx = 2.2, svy = 1.8, hue = 0, sRaf = 0;
  const bounce = () => {
    const W = innerWidth - 120, H = innerHeight - 120;
    sx += svx; sy += svy;
    let hit = false;
    if (sx <= 0 || sx >= W) { svx *= -1; sx = clamp(sx, 0, W); hit = true; }
    if (sy <= 0 || sy >= H) { svy *= -1; sy = clamp(sy, 0, H); hit = true; }
    if (hit) { hue = (hue + 67) % 360; logo.style.filter = `hue-rotate(${hue}deg) saturate(3)`; }
    logo.style.transform = `translate(${sx}px, ${sy}px) rotate(${sx * 0.5}deg)`;
    sRaf = requestAnimationFrame(bounce);
  };
  const wake = () => {
    if (saver.classList.contains("on")) { saver.classList.remove("on"); cancelAnimationFrame(sRaf); }
    clearTimeout(idle);
    if (!reduced) idle = setTimeout(() => { saver.classList.add("on"); sRaf = requestAnimationFrame(bounce); }, 90000);
  };
  ["pointermove", "pointerdown", "keydown", "wheel", "touchstart"].forEach((ev) => addEventListener(ev, wake, { passive: true }));
  wake();

  /* ---------- Konami code ---------- */
  const seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let buf = [];
  addEventListener("keydown", ({ key }) => {
    buf = [...buf, key].slice(-seq.length);
    if (seq.every((k, i) => k === buf[i])) {
      for (let i = 0; i < 40; i++) {
        const r = el("img", "rain");
        r.src = A + "B6_round_small.png";
        r.style.left = rand(0, innerWidth - 60) + "px";
        document.body.append(r);
        r.animate(
          [{ transform: "translateY(0) rotate(0)" }, { transform: `translateY(${innerHeight + 160}px) rotate(${rand(-720, 720)}deg)` }],
          { duration: rand(1400, 2800), delay: rand(0, 900), easing: "cubic-bezier(.5,0,1,1)", fill: "both" }
        ).finished.then(() => r.remove());
      }
    }
  });
})();
