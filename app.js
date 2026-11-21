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
    <a href="doc.html?id=hearsay">Staff Hearsay</a>
    <a href="about.html">About</a>
  </div></div>
  <div id="layout">
    <div id="side">
      <div class="box status"><h3>Containment Status</h3>
        <div id="st" class="contained">CONTAINED</div>
        <small>Facility: Site-31</small><br><small>Last seen: <span id="loc">Containment Cell 12, Site-31</span></small></div>
      <div class="box"><h3>SCP-PERSON Files</h3><ul>${list}<li><a href="cctv.html">Security Feeds</a></li></ul></div>
      <div class="box"><button id="sight" class="sightbtn">Report a Sighting</button></div>
      <div class="box"><h3>Your Clearance</h3><span id="clr"></span></div>
    </div>
    <div id="main">${contentHtml}</div>
  </div>
  <div id="footer">Person Wiki is a joke. SCP-PERSON is real, unfortunately.<br>CCTV footage from a camera effect by Luke Newell.<br>
  Format inspired by the SCP Wiki (scp-wiki.wikidot.com), used under CC BY-SA 3.0. This site's text is likewise CC BY-SA 3.0.</div>
  <div id="gate"><div class="card"></div></div>
  <div id="alarm"><span>⚠ SCP-PERSON CONTAINMENT BREACH IN PROGRESS. ALL PERSONNEL REMAIN CALM. ⚠</span><button onclick="this.parentNode.style.display='none'">dismiss</button></div>`;
  document.getElementById("sight").onclick = showSighting;
  maybeAlarm();
  listenForSecret();
  document.getElementById("clr").textContent = "Level " + getClearance();
  startStatus();
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
    const breached = Math.random() < 0.5;
    st.textContent = breached ? "BREACHED" : "CONTAINED";
    st.className = breached ? "breached" : "contained";
    loc.textContent = breached
      ? LOCATIONS[1 + Math.floor(Math.random() * (LOCATIONS.length - 1))]
      : LOCATIONS[0];
    setTimeout(tick, nextDelay());
  }
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
    <p style="clear:both;margin-top:30px">« <a href="doc.html?id=main">SCP-PERSON</a> »</p>`);

  window._rating = doc.rating;
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
    <h2 class="section">Files</h2><ul>${files}</ul>`);
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
    <h2 class="section">CAM 00 — CONTAINMENT CELL 12 (LIVE)</h2>
    <div class="cam"><div class="screen live"><canvas id="noise" width="320" height="180"></canvas>
      <div class="scan"></div><div class="rec">● LIVE</div><div class="camlabel">CAM 00 — CELL 12</div>
      <div id="livemsg">SUBJECT NOT DETECTED</div></div>
      <p>Feed has displayed "SUBJECT NOT DETECTED" since installation, including while SCP-PERSON was confirmed to be in the cell.</p></div>
    <h2 class="section">Archived Feeds — Breach 031</h2>
    <div class="camgrid">${cams}</div>
    <div class="addendum"><details class="collapse"><summary>+ Full Multi-Camera Recording, Breach 031</summary>
      <div class="screen"><video src="cctv/all.mp4" controls muted loop playsinline preload="none"></video><div class="scan"></div></div>
      <p>Investigators note that SCP-PERSON appears on Cam 01 and Cam 02 at the same time. SCP-PERSON maintains this was "a different person." SCP-PERSON is the only person.</p></details></div>`);
  startNoise();
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
