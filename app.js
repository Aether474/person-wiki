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
    <a href="doc.html?id=hearsay">Staff Hearsay</a>
    <a href="about.html">About</a>
  </div></div>
  <div id="layout">
    <div id="side">
      <div class="box status"><h3>Containment Status</h3>
        <div id="st" class="contained">CONTAINED</div>
        <small>Last seen: <span id="loc">Containment Cell 12</span></small></div>
      <div class="box"><h3>SCP-PERSON Files</h3><ul>${list}</ul></div>
      <div class="box"><h3>Your Clearance</h3><span id="clr"></span></div>
    </div>
    <div id="main">${contentHtml}</div>
  </div>
  <div id="footer">Person Wiki is a joke. SCP-PERSON is real, unfortunately.<br>
  Format inspired by the SCP Wiki (scp-wiki.wikidot.com), used under CC BY-SA 3.0. This site's text is likewise CC BY-SA 3.0.</div>
  <div id="gate"><div class="card"></div></div>`;
  document.getElementById("clr").textContent = "Level " + getClearance();
  startStatus();
}

// The sidebar status flips to BREACHED at random, because of course it does.
function startStatus() {
  const st = document.getElementById("st"), loc = document.getElementById("loc");
  function tick() {
    const breached = Math.random() < 0.45;
    st.textContent = breached ? "BREACHED" : "CONTAINED";
    st.className = breached ? "breached" : "contained";
    loc.textContent = breached
      ? LOCATIONS[1 + Math.floor(Math.random() * (LOCATIONS.length - 1))]
      : LOCATIONS[0];
    setTimeout(tick, 2500 + Math.random() * 5000);
  }
  setTimeout(tick, 3000);
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
  const id = new URLSearchParams(location.search).get("id") || "main";
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
      <div class="classbar">
        <div><small>Clearance</small><b>Level ${doc.clearance}</b></div>
        <div class="${doc.objectClass.toLowerCase()}"><small>Object Class</small><b>${esc(doc.objectClass)}</b></div>
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
