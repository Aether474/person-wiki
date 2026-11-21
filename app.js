// Shared layout + page rendering. Content lives in entries.js.

const LOGO = `
<svg viewBox="0 0 100 100" aria-hidden="true">
  <circle cx="50" cy="50" r="44" fill="none" stroke="#ddd" stroke-width="6"/>
  <circle cx="50" cy="50" r="34" fill="none" stroke="#ddd" stroke-width="2" stroke-dasharray="6 5"/>
  <circle cx="50" cy="38" r="10" fill="#ddd"/>
  <path d="M30 72 Q30 52 50 52 Q70 52 70 72 Z" fill="#ddd"/>
  <rect x="47" y="2" width="6" height="14" fill="#ddd"/><rect x="47" y="84" width="6" height="14" fill="#ddd"/>
  <rect x="2" y="47" width="14" height="6" fill="#ddd"/><rect x="84" y="47" width="14" height="6" fill="#ddd"/>
</svg>`;

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Escape, then turn [[text]] into hover-reveal redaction bars and line breaks into paragraphs.
function fmt(text) {
  return esc(text)
    .replace(/\[\[(.+?)\]\]/g, '<span class="redact" title="hover to declassify">$1</span>')
    .split(/\n\s*\n/)
    .map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function link(d) { return `doc.html?id=${encodeURIComponent(d.id)}`; }

function shell(contentHtml) {
  const list = DOCS.map(d => `<li><a href="${link(d)}">${esc(d.nav)}</a></li>`).join("");
  document.body.innerHTML = `
  <div id="header"><div class="inner">
    <a class="logo" href="index.html">${LOGO}
      <div><h1>PERSON WIKI</h1><h2>Secure. Contain. Lose Track Of.</h2></div>
    </a>
  </div></div>
  <div id="topbar"><div class="inner">
    <a href="index.html">Main</a>
    <a href="doc.html?id=main">SCP-PERSON</a>
    <a href="doc.html?id=breaches">Breach Log</a>
    <a href="cctv.html">Security Feeds</a>
    <a href="missing.html">Missing Poster</a>
    <a href="shop.html">Gift Shop</a>
    <a href="badge.html">Get Your Badge</a>
    <a href="about.html">About</a>
  </div></div>
  <div id="ticker"><b>SITE-31 NEWS</b><div class="tk"><span id="tkt"></span></div></div>
  <div id="layout">
    <div id="side">
      <div class="box status"><h3>Containment Status</h3>
        <div id="st" class="contained">CONTAINED</div>
        <small>Facility: Site-31</small><br><small>Last seen: <span id="loc">Containment Cell 12, Site-31</span></small></div>
      <div class="box"><h3>SCP-PERSON Files</h3><ul>${list}</ul></div>
      <div class="box"><h3>Extras</h3><ul>
        <li><a href="cctv.html">Security Feeds</a></li><li><a href="missing.html">Missing Poster</a></li>
        <li><a href="shop.html">Gift Shop</a></li><li><a href="badge.html">Get Your Badge</a></li>
        <li><a href="blink.html">Don't Blink (game)</a></li></ul></div>
      <div class="box"><button id="sight" class="sightbtn">Report a Sighting</button></div>
      <div class="box"><h3>Your Clearance</h3><span id="clr"></span></div>
    </div>
    <div id="main">${contentHtml}</div>
  </div>
  <div id="footer">Person Wiki is a joke. SCP-PERSON is real, unfortunately.<br>CCTV footage from a camera effect by Luke Newell.<br>
  Format inspired by the SCP Wiki (scp-wiki.wikidot.com), used under CC BY-SA 3.0. This site's text is likewise CC BY-SA 3.0.</div>
  <div id="gate"><div class="card"></div></div>
  <div id="viewing">👁 <span id="vtxt">1 other person viewing this page</span></div>
  <div id="alarm"><span>⚠ SCP-PERSON CONTAINMENT BREACH IN PROGRESS. ALL PERSONNEL REMAIN CALM. ⚠</span><button onclick="this.parentNode.style.display='none'">dismiss</button></div>`;
  document.getElementById("sight").onclick = showSighting;
  maybeAlarm();
  listenForSecret();
  listenForTerminal();
  tabTitleTrick();
  setTimeout(vanishingWords, 50);
  document.getElementById("clr").textContent = "Level " + getClearance();
  nightShift();
  startStatus();
  statusClicks();
  startTicker();
  viewingIndicator();
  cursorFigure();
  setTimeout(rareTakeover, 100);
  maybeRegionBlock();
}

// The sidebar status flips to BREACHED at random, because of course it does.
function startStatus() {
  const st = document.getElementById("st"), loc = document.getElementById("loc");
  // Pick a wait time with no pattern: sometimes a split second, sometimes a minute or more.
  function nextDelay() {
    const r = Math.random();
    if (r < 0.15) return 300 + Math.random() * 1200;      // quick flicker
    if (r < 0.55) return 2000 + Math.random() * 8000;     // a few seconds
    if (r < 0.85) return 10000 + Math.random() * 20000;   // a while
    return 30000 + Math.random() * 60000;                 // lulls you into a false sense of security
  }
  function tick() {
    if (window._stuck || isIdk()) return setTimeout(tick, 2000);
    const breached = window._night ? true : Math.random() < 0.5;
    st.textContent = breached ? "BREACHED" : "CONTAINED";
    st.className = breached ? "breached" : "contained";
    loc.textContent = breached
      ? LOCATIONS[1 + Math.floor(Math.random() * (LOCATIONS.length - 1))]
      : LOCATIONS[0];
    setTimeout(tick, nextDelay());
  }
  if (isIdk()) showIdk();
  setTimeout(tick, nextDelay());
}

function renderSection(s) {
  let inner;
  if (s.table) {
    const th = s.table.cols.map(c => `<th>${esc(c)}</th>`).join("");
    const tr = s.table.rows.map(r => `<tr>${r.map(c => `<td>${fmtInline(c)}</td>`).join("")}</tr>`).join("");
    inner = `<table class="log"><tr>${th}</tr>${tr}</table>`;
  } else inner = fmt(s.body);
  if (s.collapsed) return `<div class="addendum"><details class="collapse"><summary>+ ${esc(s.heading)}</summary>${inner}</details></div>`;
  return (s.heading ? `<p class="field"><b>${esc(s.heading)}</b></p>` : "") + inner;
}

function fmtInline(t) {
  return esc(t).replace(/\[\[(.+?)\]\]/g, '<span class="redact" title="hover to declassify">$1</span>');
}

function renderDoc() {
  const id = window.IS_404 ? "__404" : (new URLSearchParams(location.search).get("id") || "main");
  const doc = DOCS.find(d => d.id === id);
  if (!doc) {
    shell(`<h1 id="page-title">Page Not Found</h1>
      <div class="notice">This page has breached containment. It was here a second ago.</div>
      <p><a href="doc.html?id=main">Return to SCP-PERSON</a></p>`);
    return;
  }
  document.title = `${doc.title} - Person Wiki`;

  let top = "";
  if (doc.item) {
    const photo = doc.photo ? `<img src="${esc(doc.photo)}" alt="${esc(doc.item)}">` : `<div class="ph">[IMAGE REDACTED]</div>`;
    top = `<div class="img-block">${photo}<p>${esc(doc.photoCaption || "")}</p></div>
      <p class="field"><b>Item #:</b> ${esc(doc.item)}</p>
      <p class="field"><b>Common Name:</b> ${esc(doc.commonName)}</p>
      ${doc.facility ? `<p class="field"><b>Assigned Facility:</b> ${esc(doc.facility)} (location <span class="redact">unknown</span>)</p>` : ""}
      <div class="classbar">
        <div><small>Clearance</small><b>Level ${doc.clearance}</b></div>
        ${doc.facility ? `<div><small>Facility</small><b>${esc(doc.facility)}</b></div>` : ""}
        <div class="${doc.objectClass.toLowerCase().replace(/[^a-z]/g, "")}"><small>Object Class</small><b>${esc(doc.objectClass)}</b></div>
      </div>`;
  }

  shell(`
    <div class="rating">rating: <span id="rt">+${doc.rating}</span>
      <button onclick="vote(1)">+</button><button onclick="vote(-1)">–</button></div>
    <h1 id="page-title">${esc(doc.title)}</h1>
    ${top}
    ${doc.sections.map(renderSection).join("")}
    ${doc.id === "main" ? '<p class="hidden-msg">if you can read this, Person is behind you.</p>' : ""}
    <p style="clear:both;margin-top:30px">« <a href="doc.html?id=main">SCP-PERSON</a> »</p>
    ${pageInfo(doc.id)}
    ${discussion(doc.id)}`);

  window._rating = doc.rating;
  wireDiscussion();
  if (doc.clearance > getClearance()) showGate(doc);
}

function vote(d) {
  window._rating += d;
  document.getElementById("rt").textContent = (window._rating >= 0 ? "+" : "") + window._rating;
}

function showGate(doc) {
  const gate = document.getElementById("gate");
  gate.querySelector(".card").innerHTML = `
    <h2>ACCESS RESTRICTED</h2>
    <p>This file requires Level ${doc.clearance} clearance.<br>Your clearance: Level ${getClearance()}.</p>
    <p>Do you swear you know Person and can handle this information?</p>
    <button id="swear">I SWEAR</button>`;
  gate.style.display = "flex";
  document.getElementById("swear").onclick = () => {
    setClearance(doc.clearance);
    gate.style.display = "none";
    document.getElementById("clr").textContent = "Level " + doc.clearance;
  };
}

function renderHome() {
  const files = DOCS.map(d => `<li><a href="${link(d)}">${esc(d.title)}</a></li>`).join("");
  shell(`<h1 id="page-title">Person Wiki</h1>
    <div class="notice"><b>WARNING:</b> THE FOLLOWING FILES ARE CLASSIFIED. ACCESS BY UNAUTHORIZED PERSONNEL IS STRICTLY PROHIBITED. ALSO, IF YOU SEE PERSON, PLEASE TELL SOMEONE.</div>
    <p>Welcome to the Person Wiki, the official archive for <a href="doc.html?id=main">SCP-PERSON</a>: one humanoid entity, one containment cell, and a breach count we've stopped reporting to management.</p>
    <p style="text-align:center;font-size:16px;letter-spacing:2px"><b>SECURE. CONTAIN. LOSE TRACK OF.</b></p>
    <div class="counter"><small>DAYS SINCE LAST SCP-PERSON BREACH</small><b>0</b><small>Previous record: 0</small></div>
    <h2 class="section">Files</h2><ul>${files}</ul>
    <p class="hidden-msg">you found the hidden text. Person found it first. Person left a note: "hi :)"</p>`);
}

function renderAbout() {
  shell(`<h1 id="page-title">About the Person Wiki</h1>
    <p>The Person Wiki was established on ██/██/20██ after SCP-PERSON breached containment for the <span class="redact">hundredth</span> time and somebody finally said "we should write this down."</p>
    <p>All files are written by people who know SCP-PERSON personally. SCP-PERSON may object to any file by filing a complaint, which will be <span class="redact">read aloud in the group chat</span>.</p>`);
}

function getClearance() {
  try { return parseInt(localStorage.getItem("clearance") || "1", 10); } catch (e) { return 1; }
}
function setClearance(n) {
  try { localStorage.setItem("clearance", String(n)); } catch (e) {}
}


// Rare full-width breach alarm. Roughly 1 in 4 page loads, after a random delay.
function maybeAlarm() {
  if (Math.random() > 0.25) return;
  setTimeout(() => { document.getElementById("alarm").style.display = "flex"; }, 4000 + Math.random() * 40000);
}

const SIGHTING_REPLIES = [
  "Report filed. SCP-PERSON was already there when we arrived. SCP-PERSON was also not there.",
  "Thank you. Security has been dispatched. Security has also breached containment.",
  "Report received. SCP-PERSON has confirmed this sighting personally, via email.",
  "Unable to verify. Our cameras show SCP-PERSON in the cell, waving.",
  "Report filed. This is the 4th sighting at that location in the last minute, all from different people.",
  "Thank you. Please do not blink while you wait."
];

function showSighting() {
  const gate = document.getElementById("gate");
  const opts = LOCATIONS.slice(1).map(l => `<option>${esc(l)}</option>`).join("");
  gate.querySelector(".card").innerHTML = `
    <h2>REPORT A SIGHTING</h2>
    <p>Where did you see SCP-PERSON?</p>
    <select id="where">${opts}</select>
    <div><button id="file">FILE REPORT</button> <button id="close">CANCEL</button></div>`;
  gate.style.display = "flex";
  document.getElementById("close").onclick = () => gate.style.display = "none";
  document.getElementById("file").onclick = () => {
    const r = SIGHTING_REPLIES[Math.floor(Math.random() * SIGHTING_REPLIES.length)];
    gate.querySelector(".card").innerHTML = `<h2>REPORT #${Math.floor(1000 + Math.random() * 9000)}</h2><p>${esc(r)}</p><button id="close">OK</button>`;
    document.getElementById("close").onclick = () => gate.style.display = "none";
  };
}

// Secret: type "person" anywhere on the site.
function listenForSecret() {
  let typed = "";
  document.addEventListener("keydown", ev => {
    if (ev.target.tagName === "INPUT" || ev.target.tagName === "SELECT") return;
    typed = (typed + ev.key.toLowerCase()).slice(-6);
    if (typed === "person") location.href = "classified.html";
  });
}

function renderSecret() {
  shell(`<h1 id="page-title">SCP-PERSON: Level 5 File</h1>
    <div class="notice"><b>LEVEL 5 CLEARANCE GRANTED.</b> We don't know how you got here either.</div>
    <p>After ██ years of research, ████ breaches and one (1) very long meeting, the Foundation has finally determined how SCP-PERSON escapes containment.</p>
    <p>SCP-PERSON uses the door.</p>
    <p>The door has never been locked. The guard with the key has been on lunch break since 20██.</p>
    <p>The guard has also breached containment.</p>`);
}

const CAMS = [
  { src: "cctv/cam1.mp4", label: "CAM 01 — STAIRWELL A", note: "Subject observed. Subject was not observed by any other camera before or after." },
  { src: "cctv/cam2.mp4", label: "CAM 02 — STAIRWELL B", note: "Movement detected at 00:03:47. Guard reports \"just a shadow.\" Guard has since transferred." },
  { src: "cctv/cam3.mp4", label: "CAM 03 — EAST CORRIDOR", note: "This corridor leads to SCP-PERSON's cell. Corridor is usually longer." },
  { src: "cctv/cam4.mp4", label: "CAM 04 — PARKING LEVEL", note: "The van is not Foundation property. Nobody owns the van." }
];

function renderCCTV() {
  document.title = "Security Feeds - Person Wiki";
  const cams = CAMS.map(c => `
    <div class="cam"><div class="screen"><video src="${c.src}" autoplay muted loop playsinline></video>
      <div class="scan"></div><div class="rec">● REC</div><div class="camlabel">${esc(c.label)}</div></div>
      <p>${esc(c.note)}</p></div>`).join("");
  shell(`<h1 id="page-title">Site-31 Security Feeds</h1>
    <p>Live and archived footage from Site-31 security cameras assigned to SCP-PERSON. All cameras are pointed at SCP-PERSON's containment cell. None of them show SCP-PERSON's containment cell.</p>
    <div id="feeds">
    <h2 class="section">CAM 00 — CONTAINMENT CELL 12 (LIVE)</h2>
    <div class="cam"><div class="screen live"><canvas id="noise" width="320" height="180"></canvas>
      <div class="scan"></div><div class="rec">● LIVE</div><div class="camlabel">CAM 00 — CELL 12</div>
      <div id="livemsg">SUBJECT NOT DETECTED</div></div>
      <p>Feed has displayed "SUBJECT NOT DETECTED" since installation, including while SCP-PERSON was confirmed to be in the cell.</p></div>
    <h2 class="section">Archived Feeds — Breach 031</h2>
    <div class="camgrid">${cams}</div>
    <div id="ohshit">oh shit</div>
    </div>
    <div class="addendum"><details class="collapse"><summary>+ Full Multi-Camera Recording, Breach 031</summary>
      <div class="screen"><video src="cctv/all.mp4" controls muted loop playsinline preload="none"></video><div class="scan"></div></div>
      <p>Investigators note that SCP-PERSON appears on Cam 01 and Cam 02 at the same time. SCP-PERSON maintains this was "a different person." SCP-PERSON is the only person.</p></details></div>`);
  startNoise();
  scheduleCameraFailure();
}

function startNoise() {
  const cv = document.getElementById("noise"); if (!cv) return;
  const ctx = cv.getContext("2d"), img = ctx.createImageData(cv.width, cv.height);
  const msg = document.getElementById("livemsg");
  const msgs = ["SUBJECT NOT DETECTED", "SUBJECT NOT DETECTED", "SUBJECT NOT DETECTED", "SIGNAL LOST", "SUBJECT DETECTED BEHIND CAMERA"];
  let frame = 0;
  (function draw() {
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 30 + Math.random() * 70;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    if (++frame % 90 === 0) msg.textContent = msgs[Math.floor(Math.random() * msgs.length)];
    requestAnimationFrame(draw);
  })();
}

function renderHomeExtras() {
  const el = document.getElementById("days"); if (el) el.textContent = "0";
}


function drawStatic(cv) {
  const ctx = cv.getContext("2d"), img = ctx.createImageData(cv.width, cv.height);
  (function draw() {
    if (!cv.isConnected) return;
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 20 + Math.random() * 80;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    requestAnimationFrame(draw);
  })();
}

// After a while the archived cameras cut out one at a time, then the live feed, then: oh shit.
function scheduleCameraFailure() {
  const screens = [...document.querySelectorAll(".camgrid .screen")].sort(() => Math.random() - 0.5);
  let t = 15000 + Math.random() * 15000;
  screens.forEach(scr => {
    setTimeout(() => killScreen(scr, "SIGNAL LOST"), t);
    t += 1500 + Math.random() * 5000;
  });
  setTimeout(() => {
    const msg = document.getElementById("livemsg");
    if (msg) msg.textContent = "SUBJECT DETECTED";
    setTimeout(() => {
      const live = document.querySelector(".screen.live");
      if (live) { live.innerHTML = '<div class="dead"></div>'; }
      const st = document.getElementById("st");
      if (st) { st.textContent = "BREACHED"; st.className = "breached"; window._stuck = true; }
      setTimeout(() => {
        document.getElementById("feeds").classList.add("down");
        document.getElementById("ohshit").style.display = "flex";
      }, 1800);
    }, 1200);
  }, t + 2000);
}

function killScreen(scr, label) {
  scr.classList.add("glitch");
  setTimeout(() => {
    scr.classList.remove("glitch");
    const v = scr.querySelector("video"); if (v) v.remove();
    const rec = scr.querySelector(".rec"); if (rec) rec.textContent = "● NO SIGNAL";
    const cv = document.createElement("canvas"); cv.width = 240; cv.height = 135;
    scr.prepend(cv); drawStatic(cv);
    const m = document.createElement("div"); m.className = "lost"; m.textContent = label; scr.appendChild(m);
  }, 600);
}


// Secret: tap the logo 5 times quickly to open the guard terminal.
function listenForTerminal() {
  const logo = document.querySelector("#header a.logo");
  let taps = 0, timer;
  logo.addEventListener("click", ev => {
    ev.preventDefault();
    taps++;
    clearTimeout(timer);
    if (taps >= 5) { location.href = "terminal.html"; return; }
    timer = setTimeout(() => { if (taps < 5) location.href = "index.html"; taps = 0; }, 600);
  });
}


// ---------- Site-wide effects ----------

function tabTitleTrick() {
  const real = document.title;
  let t1, t2;
  document.addEventListener("visibilitychange", () => {
    clearTimeout(t1); clearTimeout(t2);
    if (document.hidden) {
      document.title = "Person has left the chat";
      t1 = setTimeout(() => { document.title = "come back"; }, 8000);
      t2 = setTimeout(() => { document.title = "Person is in your other tab"; }, 25000);
    } else {
      document.title = "...Person is back";
      t1 = setTimeout(() => { document.title = real; }, 1500);
    }
  });
}

// Wrap every "Person" in the article, then make one blink out of existence now and then.
function vanishingWords() {
  const main = document.getElementById("main"); if (!main) return;
  const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) {
    const n = walker.currentNode;
    if (/person/i.test(n.nodeValue) && !n.parentNode.closest("a, button, h1, select, .redact, #livemsg, .camlabel")) nodes.push(n);
  }
  nodes.forEach(n => {
    const frag = document.createDocumentFragment();
    n.nodeValue.split(/(SCP-PERSON|Person)/g).forEach(part => {
      if (part === "SCP-PERSON" || part === "Person") {
        const s = document.createElement("span"); s.className = "pw"; s.textContent = part; frag.appendChild(s);
      } else if (part) frag.appendChild(document.createTextNode(part));
    });
    n.parentNode.replaceChild(frag, n);
  });
  const words = main.querySelectorAll(".pw");
  if (!words.length) return;
  (function loop() {
    setTimeout(() => {
      const w = words[Math.floor(Math.random() * words.length)];
      w.classList.add("gone");
      setTimeout(() => w.classList.remove("gone"), 700 + Math.random() * 1300);
      loop();
    }, 3000 + Math.random() * 9000);
  })();
}

function hashNum(s) { let h = 7; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; }

function pageInfo(id) {
  let mine = 1;
  try { mine = parseInt(localStorage.getItem("views:" + id) || "0", 10) + 1; localStorage.setItem("views:" + id, mine); } catch (e) {}
  const base = 2000 + hashNum(id) % 8000;
  const views = base + mine;
  const rev = 12 + hashNum(id + "r") % 80;
  const mins = 1 + Math.floor(Math.random() * 59);
  return `<div class="pageinfo">
    page revision: ${rev}, last edited: ${mins} minute${mins === 1 ? "" : "s"} ago by <b>SCP-PERSON</b>
    <span class="dimtxt">(we did not give SCP-PERSON edit access)</span><br>
    This page has been viewed ${views.toLocaleString()} times. SCP-PERSON viewed it ${(views - 1).toLocaleString()} of those. You viewed it ${mine}.
  </div>`;
}

// ---------- Missing poster ----------

function renderMissing() {
  document.title = "MISSING - Person Wiki";
  const photo = POSTER_PHOTO ? `<img src="${esc(POSTER_PHOTO)}" alt="SCP-PERSON">` : `<div class="silhouette">${LOGO}<span>PHOTO DEVELOPED BLANK</span></div>`;
  shell(`<div class="poster">
    <div class="ptop">MISSING</div>
    <div class="psub">HAVE YOU SEEN THIS PERSON?</div>
    <div class="pphoto">${photo}</div>
    <table class="pfacts">
      <tr><td>NAME</td><td>SCP-PERSON ("Person")</td></tr>
      <tr><td>LAST SEEN</td><td>Containment Cell 12, Site-31. Also the break room. Also here.</td></tr>
      <tr><td>HEIGHT</td><td>Person-sized</td></tr>
      <tr><td>DESCRIPTION</td><td>Looks like a normal person. That's how it gets you.</td></tr>
      <tr><td>MISSING SINCE</td><td>About 4 seconds ago, every time</td></tr>
    </table>
    <div class="pwarn">IF FOUND: DO NOT APPROACH. DO NOT BLINK. CALL SITE-31.</div>
    <div class="preward">REWARD: <span class="redact">one (1) bag of chips</span></div>
    <div class="tabs">${Array(8).fill('<div>SITE-31<br>ext. 31</div>').join("")}</div>
  </div>
  <p style="text-align:center"><button class="sightbtn" style="width:auto;padding:7px 18px" onclick="window.print()">Print Poster</button></p>`);
}

// ---------- Gift shop ----------

const SHOP = [
  { name: "\"I Survived a Person Breach\" T-Shirt", price: "$24.99", icon: "👕", desc: "100% cotton. Available in all sizes except the one you need." },
  { name: "Person-Proof Door Lock*", price: "$89.99", icon: "🔒", desc: "*Not Person-proof. No lock is Person-proof. This is a regular lock." },
  { name: "Site-31 Guard Eye Drops", price: "$9.99", icon: "💧", desc: "Never blink again. Results not guaranteed. Sneezing not covered." },
  { name: "SCP-PERSON Plush", price: "$34.99", icon: "🧸", desc: "Soft, huggable, and somewhere else by the time you look back." },
  { name: "Empty Cell Snow Globe", price: "$19.99", icon: "🔮", desc: "Comes with a tiny Cell 12. The figure inside was there at the factory." },
  { name: "\"Days Since Last Breach\" Sign", price: "$14.99", icon: "🪧", desc: "Comes preset to 0. Has no other numbers." },
  { name: "Signed Break Room Microwave", price: "$249.99", icon: "📦", desc: "Signed by SCP-PERSON. Nobody saw SCP-PERSON sign it." },
  { name: "Mystery Box", price: "$4.99", icon: "🎁", desc: "Box is empty. Box was not empty when we packed it." }
];
const SHOP_REPLIES = [
  "SOLD OUT", "ITEM HAS BREACHED CONTAINMENT", "SCP-PERSON BOUGHT THE LAST ONE",
  "ADDED TO CART. CART IS MISSING.", "OUT OF STOCK (STOCK IS IN THE BREAK ROOM)", "BACKORDERED UNTIL PERSON IS FOUND"
];

function renderShop() {
  document.title = "Gift Shop - Person Wiki";
  const items = SHOP.map((it, i) => `<div class="item"><div class="icon">${it.icon}</div>
    <b>${esc(it.name)}</b><div class="price">${it.price}</div><p>${esc(it.desc)}</p>
    <button class="sightbtn" onclick="buy(this)">Add to Cart</button></div>`).join("");
  shell(`<h1 id="page-title">Site-31 Gift Shop</h1>
    <p>Official SCP-PERSON merchandise. All proceeds go toward a new containment cell. Again.</p>
    <div class="shop">${items}</div>
    <p class="dimtxt" style="font-size:11px">This is a joke shop. Nothing is for sale. Nothing was ever for sale.</p>`);
}
function buy(btn) {
  btn.textContent = SHOP_REPLIES[Math.floor(Math.random() * SHOP_REPLIES.length)];
  btn.disabled = true; btn.classList.add("soldout");
}

// ---------- Clearance badge ----------

const ASSIGN = ["Cell 12 Watch (Blinking Rotation)", "Break Room Surveillance", "Conference Room B", "Vending Machine Detail",
  "Breach Paperwork", "Camera 00 Monitoring (nothing to see)", "Door Holder", "Microwave Security"];
const STATUSES = ["Has not seen Person", "Has seen Person (twice, at the same time)", "Is not Person (probably)",
  "Blinked once. On probation.", "Was in Exploration E-2", "Person knows their name"];

function renderBadge() {
  document.title = "Get Your Badge - Person Wiki";
  shell(`<h1 id="page-title">Site-31 Personnel Clearance Badge</h1>
    <p>All personnel must carry a valid badge. Enter your name to be issued one. Badges are randomly assigned, just like real Foundation jobs.</p>
    <div class="badgeform"><input id="bname" maxlength="24" placeholder="Your name"><button class="sightbtn" id="bgo">Issue Badge</button></div>
    <canvas id="badge" width="640" height="400"></canvas>
    <p id="bdl" style="display:none"><button class="sightbtn" style="width:auto;padding:7px 18px" id="bsave">Download Badge</button></p>`);
  const go = () => drawBadge(document.getElementById("bname").value.trim() || "Unnamed Personnel");
  document.getElementById("bgo").onclick = go;
  document.getElementById("bname").addEventListener("keydown", e => { if (e.key === "Enter") go(); });
  document.getElementById("bsave").onclick = () => {
    const a = document.createElement("a"); a.download = "site31-badge.png";
    a.href = document.getElementById("badge").toDataURL("image/png"); a.click();
  };
}

function drawBadge(name) {
  const cv = document.getElementById("badge"), c = cv.getContext("2d");
  const isPerson = /person/i.test(name);
  const r = (arr, seed) => arr[(hashNum(name + seed)) % arr.length];
  const level = isPerson ? "ALL" : String(1 + hashNum(name + "lvl") % 5);
  const id = isPerson ? "000-000" : String(100 + hashNum(name) % 900) + "-" + String(1000 + hashNum(name + "x") % 9000);
  cv.style.display = "block"; document.getElementById("bdl").style.display = "block";

  c.fillStyle = "#f2f2f2"; c.fillRect(0, 0, 640, 400);
  c.fillStyle = isPerson ? "#3b0a57" : "#1c1c1c"; c.fillRect(0, 0, 640, 86);
  c.fillStyle = "#600"; c.fillRect(0, 86, 640, 6);
  // logo
  c.strokeStyle = "#ddd"; c.lineWidth = 4; c.beginPath(); c.arc(50, 43, 30, 0, Math.PI * 2); c.stroke();
  c.fillStyle = "#ddd"; c.beginPath(); c.arc(50, 36, 8, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.moveTo(36, 62); c.quadraticCurveTo(36, 46, 50, 46); c.quadraticCurveTo(64, 46, 64, 62); c.fill();
  c.fillStyle = "#eee"; c.font = "bold 28px Arial"; c.fillText("SITE-31", 96, 42);
  c.font = "13px Arial"; c.fillStyle = "#bbb"; c.fillText("SECURE. CONTAIN. LOSE TRACK OF.", 96, 66);
  // photo box
  c.fillStyle = "#222"; c.fillRect(28, 116, 150, 190);
  c.fillStyle = "#555"; c.beginPath(); c.arc(103, 180, 32, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.moveTo(53, 290); c.quadraticCurveTo(53, 220, 103, 220); c.quadraticCurveTo(153, 220, 153, 290); c.fill();
  c.fillStyle = "#999"; c.font = "bold 11px Courier New"; c.fillText(isPerson ? "PHOTO MISSING" : "PHOTO ON FILE", 53, 300);
  // text
  c.fillStyle = "#111"; c.font = "bold 26px Arial";
  let nm = name.toUpperCase(); while (c.measureText(nm).width > 420) nm = nm.slice(0, -1);
  c.fillText(nm, 200, 140);
  const rows = isPerson
    ? [["ID", id], ["ASSIGNMENT", "Wherever it wants"], ["STATUS", "This badge was not issued. It was taken."]]
    : [["ID", id], ["ASSIGNMENT", r(ASSIGN, "a")], ["STATUS", r(STATUSES, "s")]];
  rows.forEach(([k, v], i) => {
    c.fillStyle = "#777"; c.font = "bold 11px Arial"; c.fillText(k, 200, 175 + i * 46);
    c.fillStyle = "#222"; c.font = "16px Arial"; c.fillText(v, 200, 195 + i * 46);
  });
  // clearance block
  c.fillStyle = isPerson ? "#7a2fb0" : ["#2a7d2a", "#2a7d2a", "#c78c00", "#c78c00", "#b00"][parseInt(level, 10) - 1] || "#b00";
  c.fillRect(470, 230, 140, 76);
  c.fillStyle = "#fff"; c.font = "bold 12px Arial"; c.fillText("CLEARANCE", 504, 252);
  c.font = "bold 34px Arial"; const lw = c.measureText("LVL " + level).width; c.fillText("LVL " + level, 540 - lw / 2, 292);
  // barcode
  c.fillStyle = "#111";
  for (let x = 28, i = 0; x < 610; i++) { const w = 1 + hashNum(name + i) % 4; if (i % 2 === 0) c.fillRect(x, 330, w, 40); x += w + 1; }
  c.fillStyle = "#666"; c.font = "10px Courier New";
  c.fillText("IF FOUND, RETURN TO SITE-31. IF SCP-PERSON FOUND, ALSO RETURN TO SITE-31.", 28, 388);
}


// ---------- Ticker ----------
function startTicker() {
  const el = document.getElementById("tkt");
  const list = window._night
    ? ["NIGHT SHIFT: all guards asleep", "NIGHT SHIFT: SCP-PERSON awake", ...HEADLINES]
    : [...HEADLINES].sort(() => Math.random() - 0.5);
  el.textContent = list.join("   ✦   ") + "   ✦   ";
  el.style.animationDuration = Math.max(40, el.textContent.length / 6) + "s";
}

// ---------- "1 other person viewing" ----------
function viewingIndicator() {
  const box = document.getElementById("viewing"), t = document.getElementById("vtxt");
  setTimeout(() => box.classList.add("show"), 2500);
  (function loop() {
    setTimeout(() => {
      t.textContent = "SCP-PERSON is viewing this page"; box.classList.add("creepy");
      setTimeout(() => { t.textContent = "1 other person viewing this page"; box.classList.remove("creepy"); loop(); }, 600 + Math.random() * 900);
    }, 8000 + Math.random() * 25000);
  })();
}

// ---------- Little figure that follows the cursor sometimes ----------
function cursorFigure() {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  const fig = document.createElement("div");
  fig.id = "follower";
  fig.innerHTML = '<svg viewBox="0 0 20 30"><circle cx="10" cy="6" r="5"/><path d="M2 30 Q2 13 10 13 Q18 13 18 30 Z"/></svg>';
  document.body.appendChild(fig);
  let mx = -100, my = -100, fx = -100, fy = -100, on = false;
  document.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });
  (function follow() {
    fx += (mx - 28 - fx) * 0.12; fy += (my + 14 - fy) * 0.12;
    fig.style.transform = `translate(${fx}px, ${fy}px)`;
    requestAnimationFrame(follow);
  })();
  (function loop() {
    setTimeout(() => {
      fx = mx - 120; fy = my + 40;
      fig.classList.add("on"); on = true;
      setTimeout(() => { fig.classList.remove("on"); on = false; loop(); }, 2000 + Math.random() * 2000);
    }, 30000 + Math.random() * 60000);
  })();
}

// ---------- 1 in 50 visits: person person person ----------
function rareTakeover() {
  if (Math.random() > 0.02 && !location.search.includes("takeover")) return;
  const main = document.getElementById("main");
  setTimeout(() => {
    const cover = document.createElement("div");
    cover.id = "takeover";
    cover.textContent = "person ".repeat(1500);
    main.appendChild(cover);
    setTimeout(() => cover.remove(), 2000);
  }, 3000 + Math.random() * 5000);
}

// ---------- Click the status 10 times: it gives up ----------
function isIdk() { try { return localStorage.getItem("idk") === "1"; } catch (e) { return false; } }
function showIdk() {
  const st = document.getElementById("st"), loc = document.getElementById("loc");
  st.textContent = "idk"; st.className = "idk"; loc.textContent = "¯\\_(ツ)_/¯";
}
function statusClicks() {
  const st = document.getElementById("st");
  let n = 0, timer;
  st.style.cursor = "pointer";
  st.addEventListener("click", () => {
    n++; clearTimeout(timer); timer = setTimeout(() => n = 0, 3000);
    if (n < 10) return;
    n = 0;
    try {
      if (isIdk()) { localStorage.removeItem("idk"); st.textContent = "fine."; st.className = "contained"; }
      else { localStorage.setItem("idk", "1"); showIdk(); }
    } catch (e) { showIdk(); }
  });
}

// ---------- 3 AM: night shift mode ----------
function nightShift() {
  const h = new Date().getHours();
  if (h !== 3 && !location.search.includes("night")) return;
  window._night = true;
  document.body.classList.add("night");
  const st = document.getElementById("st");
  st.textContent = "BREACHED"; st.className = "breached";
  document.getElementById("loc").textContent = "Guards asleep. Location unknown.";
  const box = document.querySelector(".box.status h3");
  box.textContent = "Containment Status (Night Shift)";
}



// ---------- Discussion section ----------

function discussion(id) {
  const list = COMMENTS[id] || COMMENTS.default;
  const items = list.map(([who, text], i) => `<div class="cmt"><b class="${who.startsWith("SCP-PERSON") ? "pname" : ""}">${esc(who)}</b>
    <span class="when">${3 + i * 7} minutes ago</span><p>${esc(text)}</p></div>`).join("");
  return `<div class="addendum discuss"><details class="collapse"><summary>+ Discussion (${list.length})</summary>
    <div id="cmts">${items}</div>
    <div class="cform"><input id="cname" maxlength="30" placeholder="Name"><textarea id="ctext" maxlength="300" placeholder="Write a comment..."></textarea>
    <button class="sightbtn" id="cpost">Post Comment</button></div></details></div>`;
}

const REMOVALS = [
  "[comment removed by SCP-PERSON]",
  "[comment has breached containment]",
  "[comment was here a second ago]",
  "[comment edited by SCP-PERSON to just say \"nice\"]"
];

function wireDiscussion() {
  const btn = document.getElementById("cpost"); if (!btn) return;
  btn.onclick = () => {
    const name = document.getElementById("cname").value.trim() || "Anonymous";
    const text = document.getElementById("ctext").value.trim();
    if (!text) return;
    const d = document.createElement("div");
    d.className = "cmt mine";
    d.innerHTML = `<b>${esc(name)}</b> <span class="when">just now</span><p>${esc(text)}</p>`;
    document.getElementById("cmts").appendChild(d);
    document.getElementById("ctext").value = "";
    setTimeout(() => {
      d.querySelector("p").textContent = REMOVALS[Math.floor(Math.random() * REMOVALS.length)];
      d.classList.add("removed");
    }, 2500 + Math.random() * 2500);
  };
}

// ---------- Don't Blink game ----------

function renderBlink() {
  document.title = "Don't Blink - Person Wiki";
  let best = 0; try { best = parseFloat(localStorage.getItem("blinkbest") || "0"); } catch (e) {}
  shell(`<h1 id="page-title">Guard Training: Don't Blink</h1>
    <p>Every Site-31 guard must pass this test. Keep your cursor on SCP-PERSON (or keep your finger on it, on a phone). If you let go, look away, or switch tabs, SCP-PERSON is gone.</p>
    <p>SCP-PERSON will try to get away. Don't let it.</p>
    <div id="arena"><div id="target">${LOGO}</div><div id="amsg">PRESS AND HOLD ON SCP-PERSON TO START</div></div>
    <div class="gamestats"><span>TIME: <b id="gt">0.0</b>s</span><span>YOUR RECORD: <b id="gb">${best.toFixed(1)}</b>s</span><span>SCP-PERSON'S RECORD: <b>∞</b></span></div>`);
  startBlinkGame(best);
}

function startBlinkGame(best) {
  const arena = document.getElementById("arena"), tgt = document.getElementById("target"), msg = document.getElementById("amsg");
  const gt = document.getElementById("gt"), gb = document.getElementById("gb");
  let playing = false, t0 = 0, x = 0, y = 0, vx = 0, vy = 0, raf, lostAt = 0;
  function place() {
    const w = arena.clientWidth - 70, h = arena.clientHeight - 70;
    x = w / 2; y = h / 2; tgt.style.transform = `translate(${x}px, ${y}px)`; tgt.style.opacity = 1;
  }
  place();
  function start(ev) {
    if (playing) return; ev.preventDefault();
    playing = true; t0 = performance.now(); msg.textContent = ""; vx = 0; vy = 0;
    arena.classList.add("live");
    loop();
  }
  function loop() {
    if (!playing) return;
    const s = (performance.now() - t0) / 1000;
    gt.textContent = s.toFixed(1);
    const speed = s < 1.5 ? 0.08 : 0.25 + s * 0.22;     // calm start, then gets faster the longer you last
    vx += (Math.random() - 0.5) * speed; vy += (Math.random() - 0.5) * speed;
    vx *= 0.96; vy *= 0.96;
    if (s > 3 && Math.random() < 0.004 + s * 0.0008) { vx += (Math.random() - 0.5) * 30; vy += (Math.random() - 0.5) * 30; } // sudden lunge
    const w = arena.clientWidth - 70, h = arena.clientHeight - 70;
    x += vx; y += vy;
    if (x < 0 || x > w) { vx = -vx; x = Math.max(0, Math.min(w, x)); }
    if (y < 0 || y > h) { vy = -vy; y = Math.max(0, Math.min(h, y)); }
    tgt.style.transform = `translate(${x}px, ${y}px)`;
    raf = requestAnimationFrame(loop);
  }
  function lose(reason) {
    if (!playing) return;
    playing = false; lostAt = performance.now(); cancelAnimationFrame(raf); arena.classList.remove("live");
    const s = (performance.now() - t0) / 1000;
    tgt.style.opacity = 0;
    if (s > best) { best = s; gb.textContent = s.toFixed(1); try { localStorage.setItem("blinkbest", s.toFixed(1)); } catch (e) {} }
    const verdict = s < 3 ? "Training failed. Please report to the transfer office."
      : s < 8 ? "Not bad. Guard #1101 lasted 3 days doing this."
      : s < 15 ? "Impressive. You may watch Cell 12 for one (1) shift."
      : "Unbelievable. SCP-PERSON would like to know your name.";
    msg.innerHTML = `${esc(reason)}<br>POOF. GONE. You lasted ${s.toFixed(1)}s.<br><small>${esc(verdict)}</small><br><small>Tap or click to try again.</small>`;
  }
  tgt.addEventListener("mousedown", start);
  tgt.addEventListener("touchstart", start, { passive: false });
  tgt.addEventListener("mouseleave", () => lose("You looked away."));
  document.addEventListener("mouseup", () => lose("You let go."));
  document.addEventListener("touchend", () => lose("You let go."));
  tgt.addEventListener("touchmove", ev => {
    const t = ev.touches[0], r = tgt.getBoundingClientRect();
    if (t.clientX < r.left || t.clientX > r.right || t.clientY < r.top || t.clientY > r.bottom) lose("You looked away.");
    ev.preventDefault();
  }, { passive: false });
  window.addEventListener("blur", () => lose("You blinked."));
  document.addEventListener("visibilitychange", () => { if (document.hidden) lose("You blinked."); });
  const reset = () => { if (!playing && tgt.style.opacity === "0" && performance.now() - lostAt > 600) { place(); msg.textContent = "PRESS AND HOLD ON SCP-PERSON TO START"; } };
  arena.addEventListener("mousedown", reset);
  arena.addEventListener("touchstart", reset);
}


// About 1 in 60 visits: "region blocked" (the parody Wikidot block page). Not on the same page twice in a row.
function maybeRegionBlock() {
  if (Math.random() > 1 / 60) return;
  try { if (sessionStorage.getItem("blocked")) return; sessionStorage.setItem("blocked", "1"); } catch (e) { return; }
  const here = location.pathname.split("/").pop() + location.search;
  setTimeout(() => { location.href = "blocked.html?from=" + encodeURIComponent(here || "index.html"); }, 1500);
}
